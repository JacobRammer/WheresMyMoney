import { observer } from "mobx-react-lite";
import { ActionIcon, Box, Center, Loader, LoadingOverlay, Modal, NumberFormatter, Table, Text, Tooltip } from "@mantine/core";
import { Account } from "../../../models/account.ts";
import { Pencil, Trash2 } from "lucide-react";
import { Transaction } from "../../../models/transaction.ts";
import { useEffect, useState } from "react";
import DeleteTransactionModal from "./deleteTransactionModal.tsx";
import AddEditTransactionForm from "./addEditTransactionForm.tsx";
import TransactionPayeeSelector from "./transactionPayeeSelector.tsx";
import { useStore } from "../../../stores/store.ts";
import TransactionBudgetItemSelector from "./transactionBudgetItemSelector.tsx";
import { DatePicker, DatePickerInput } from "@mantine/dates";
import { useClickOutside } from "@mantine/hooks";
import TransactionTitleForm from "./transactionTitleForm.tsx";
import TransactionDatePickerInput from "./transactionDatePickerInput.tsx";
import TransactionAmountInput from "./transactionAmountInput.tsx";

interface Props {
    account: Account

    setAccount: (account: Account) => void;
}

export default observer(function AccountTransactionDetails({ account, setAccount }: Props) {
    const { accountStore } = useStore();
    const { getPayeeBudgetItem } = accountStore;

    const { budgetStore } = useStore();
    const { loadBudgetCategories, budgetCategories, loading, getBudgetGroupFromMap: getBudgetItemFromMap } = budgetStore;

    const [deleteModalState, setDeleteModalState] = useState(false);
    const [editModalState, setEditModalState] = useState(false);
    const [transaction, setTransaction] = useState<Transaction>({
        id: '',
        title: '',
        amount: 0,
        date: new Date().toString(),
        accountId: '',
        payee: null,
        budgetItemId: undefined,
    });

    // Sets the delete modal open state and sets the current account
    function SetupDeleteAccountModal(transactionToDelete: Transaction) {
        setTransaction(transactionToDelete);
        setDeleteModalState(true);
    }

    function SetupEditAccountModal(transactionToEdit: Transaction) {
        setTransaction(transactionToEdit);
        setEditModalState(true);
    }

    const [selectedRow, setSelectedRow] = useState<string>("");


    const rows = account.transactions.map((transaction: Transaction) => (
        <Table.Tr key={transaction.id}
            bg={selectedRow === transaction.id ? 'var(--mantine-color-blue-light)' : undefined}
            onClick={() => setSelectedRow(transaction.id)}
            h={60}
        >
            <Table.Td >
                {
                    selectedRow !== transaction.id ? <Text className='noSelect' fw={500}>{new Intl.DateTimeFormat('en-US', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                    }).format(new Date(transaction.date))}</Text>
                        :
                        <TransactionDatePickerInput transaction={transaction} />
                }

            </Table.Td>
            <Table.Td>
                {
                    selectedRow !== transaction.id ? <Text>{transaction.payee?.payeeName}</Text>
                        :
                        <TransactionPayeeSelector transaction={transaction} />
                }

            </Table.Td>
            <Table.Td>
                {
                    selectedRow !== transaction.id ? <Text fw={500} className="noSelect">{transaction.title}</Text>
                        :
                        <TransactionTitleForm transaction={transaction} />
                }

            </Table.Td>
            <Table.Td>
                {
                    selectedRow !== transaction.id ? <Text>{getBudgetItemFromMap(transaction.budgetItemId)?.title}</Text>
                        :
                        <TransactionBudgetItemSelector transaction={transaction} />
                }
            </Table.Td>
            <Table.Td>
                <Center>
                    {
                        selectedRow !== transaction.id ?
                            <Text fw={500} className="noSelect">
                                <NumberFormatter value={transaction.amount} prefix="$" decimalScale={2} fixedDecimalScale={true} />
                            </Text>
                            :
                            <TransactionAmountInput transaction={transaction} updateAccount={setAccount} />
                    }
                </Center>
            </Table.Td>
            <Table.Td ta="right" width={50} align="right">
                <Center><Box style={{ display: "flex", zIndex: 1 }}>
                    <Tooltip label="Delete transaction" position="top-start">
                        <ActionIcon size={30} style={{ marginRight: "10px" }} color="red">
                            <Trash2 style={{ width: '70%', height: '70%' }}
                                onClick={() => SetupDeleteAccountModal(transaction)} />
                        </ActionIcon>
                    </Tooltip>
                </Box></Center>
            </Table.Td>
        </Table.Tr>
    ));

    useEffect(() => {
        if (budgetCategories.size === 0)
            loadBudgetCategories();

    }, [budgetCategories.size, budgetCategories]);


    return (
        (loading ? <Loader /> :
            <Box w='100%'>
                <Table horizontalSpacing="lg" verticalSpacing="xs" striped withColumnBorders withTableBorder
                    layout={"fixed"}>
                    <Table.Thead >
                        <Table.Tr>
                            <Table.Th w={200}>Date</Table.Th>
                            <Table.Th w={200}>Payee</Table.Th>
                            <Table.Th >Title</Table.Th>
                            <Table.Th w={300}>Associated Budget</Table.Th>
                            <Table.Th w={125}>Amount</Table.Th>
                            <Table.Th w={100}>Actions</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>

                <Modal opened={deleteModalState} onClose={() => setDeleteModalState(false)} title="Delete Transaction"
                    centered>
                    <DeleteTransactionModal transaction={transaction} accountId={account.id}
                        oncloseModal={() => setDeleteModalState(false)} />
                </Modal>

                <Modal opened={editModalState} onClose={() => setEditModalState(false)} title="Edit Transaction"
                    centered>
                    <AddEditTransactionForm transaction={transaction} account={account}
                        onCloseModal={() => setEditModalState(false)} />
                </Modal>
            </Box>)
    )
})