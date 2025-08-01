import { observer } from "mobx-react-lite";
import { ActionIcon, Box, Center, Loader, Modal, NumberFormatter, Table, Text, Tooltip } from "@mantine/core";
import { Account } from "../../../models/account.ts";
import { CirclePlus, Trash2 } from "lucide-react";
import { Transaction } from "../../../models/transaction.ts";
import { useEffect, useState } from "react";
import DeleteTransactionModal from "./deleteTransactionModal.tsx";
import AddEditTransactionForm from "./addTransactionForm.tsx";
import TransactionPayeeSelector from "./transactionPayeeSelector.tsx";
import { useStore } from "../../../stores/store.ts";
import TransactionBudgetItemSelector from "./transactionBudgetItemSelector.tsx";
import TransactionTitleForm from "./transactionTitleForm.tsx";
import TransactionDatePickerInput from "./transactionDatePickerInput.tsx";
import TransactionAmountInput from "./transactionAmountInput.tsx";
import { v4 as uuidv4 } from 'uuid';

interface Props {
    account: Account

    setAccount: (account: Account) => void;
}

export default observer(function AccountTransactionDetails({ account, setAccount }: Props) {

    const { budgetStore, accountStore } = useStore();
    const { loadBudgetCategories, budgetCategories, loading, getBudgetGroupFromMap: getBudgetItemFromMap } = budgetStore;
    const [deleteModalState, setDeleteModalState] = useState(false);
    const [] = useState(false);
    const [transactionToDelete, setTransactionToDelete] = useState<Transaction>({
        id: '',
        title: '',
        amount: 0,
        date: new Date().toString(),
        accountId: '',
        payee: null,
        budgetItemId: undefined,
    });

    const { Checking } = accountStore;

    const [addTransaction, setAddTransaction] = useState(false);

    // Sets the delete modal open state and sets the current account
    function SetupDeleteAccountModal(transactionToDelete: Transaction) {
        setTransactionToDelete(transactionToDelete);
        setDeleteModalState(true);
    }

    function HandleAddTransaction() {
        setAddTransaction(!addTransaction)

        if (selectedRow.length > 0) {
            setSelectedRow("");
            return;
        }
    }

    const [selectedRow, setSelectedRow] = useState<string>("");


    const rows = account.transactions.slice().sort((a, b) => b.date.localeCompare(a.date)).map((transaction: Transaction) => (
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
                        <TransactionDatePickerInput transaction={transaction} onSubmit={() => setSelectedRow("")} />
                }

            </Table.Td>
            <Table.Td>
                {
                    selectedRow !== transaction.id ?
                        <Text>
                            {transaction.payee?.payeeName && transaction.payee.payeeName.length > 0 ? transaction.payee.payeeName : "..."}
                        </Text>
                        :
                        <TransactionPayeeSelector transaction={transaction} onSubmit={() => setSelectedRow("")} />
                }

            </Table.Td>
            <Table.Td>
                {
                    selectedRow !== transaction.id ? <Text fw={500} className="noSelect">{transaction.title}</Text>
                        :
                        <TransactionTitleForm transaction={transaction} onSubmit={() => setSelectedRow("")} />
                }

            </Table.Td>
            <Table.Td>
                {
                    selectedRow !== transaction.id ?
                        <Text>
                            {getBudgetItemFromMap(transaction.budgetItemId) && getBudgetItemFromMap(transaction.budgetItemId)!.title.length > 0
                                ? getBudgetItemFromMap(transaction.budgetItemId)!.title
                                : "..."}
                        </Text>
                        :
                        <Box style={{ visibility: account.accountType === Checking ? "visible" : 'collapse' }}>
                            <TransactionBudgetItemSelector transaction={transaction} onSubmit={() => setSelectedRow("")} />
                        </Box>
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
                            <TransactionAmountInput transaction={transaction} updateAccount={setAccount} onSubmit={() => setSelectedRow("")} />
                    }
                </Center>
            </Table.Td>
            <Table.Td ta="right" width={50} align="right">
                <Center>
                    <Tooltip label="Delete transaction" position="top-start">
                        <ActionIcon size={30} style={{ marginRight: "10px" }} color="red">
                            <Trash2 style={{ width: '70%', height: '70%' }}
                                onClick={() => SetupDeleteAccountModal(transaction)} />
                        </ActionIcon>
                    </Tooltip>
                </Center>
            </Table.Td>
        </Table.Tr>
    ));

    rows.push(
        <AddEditTransactionForm key={uuidv4()} showForm={addTransaction && selectedRow.length == 0} account={account} onAdd={() => setAddTransaction(false)} />
    )

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
                <Tooltip label="Add Transaction" position="top-start">
                    <CirclePlus size={40} className="AddActionCircleBottom"
                        onClick={HandleAddTransaction} />
                </Tooltip>

                <Modal opened={deleteModalState} onClose={() => setDeleteModalState(false)} title="Delete Transaction"
                    centered>
                    <DeleteTransactionModal transaction={transactionToDelete} accountId={account.id}
                        oncloseModal={() => setDeleteModalState(false)} />
                </Modal>
            </Box>
        )

    )
})