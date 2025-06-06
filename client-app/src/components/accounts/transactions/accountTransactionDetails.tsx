import {observer} from "mobx-react-lite";
import {ActionIcon, Box, Modal, Table, Text, Tooltip} from "@mantine/core";
import {Account} from "../../../models/account.ts";
import {Pencil, Trash2} from "lucide-react";
import {Transaction} from "../../../models/transaction.ts";
import {useState} from "react";
import DeleteTransactionModal from "./deleteTransactionModal.tsx";
import AddEditTransactionForm from "./addEditTransactionForm.tsx";

interface Props {
    account: Account
}

export default observer(function AccountTransactionDetails({account}: Props) {
    const [deleteModalState, setDeleteModalState] = useState(false);
    const [editModalState, setEditModalState] = useState(false);
    const [transaction, setTransaction] = useState<Transaction>({
        id: '',
        title: '',
        amount: 0,
        date: new Date().toString(),
        accountId: ''
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

    const rows = account.transactions.map((transaction: Transaction) => (
        <Table.Tr key={transaction.id}>
            <Table.Td>
                <Text fw={500}>{new Intl.DateTimeFormat('en-US', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                }).format(new Date(transaction.date))}</Text>
            </Table.Td>
            <Table.Td>
                <Text fw={500}>{transaction.title}</Text>
            </Table.Td>
            <Table.Td>
                <Text>
                    ${transaction.amount}
                </Text>
            </Table.Td>
            <Table.Td ta="right" width={50} align="right">
                <Box style={{display: "flex", zIndex: 1}}>
                    <Tooltip label="Delete transaction" position="top-start">
                        <ActionIcon size={30} style={{marginRight: "10px"}} color="red">
                            <Trash2 style={{width: '70%', height: '70%'}}
                                    onClick={() => SetupDeleteAccountModal(transaction)}/>
                        </ActionIcon>
                    </Tooltip>

                    <Tooltip label="Edit transaction" position="top-start">
                        <ActionIcon size={30}>
                            <Pencil style={{width: '70%', height: '70%'}}
                                    onClick={() => SetupEditAccountModal(transaction)}/>
                        </ActionIcon>
                    </Tooltip>
                </Box>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <Box>
            <Table horizontalSpacing="lg" verticalSpacing="xs" striped withColumnBorders withTableBorder
                layout={"fixed"}>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th w={300}>Date</Table.Th>
                        <Table.Th>Title</Table.Th>
                        <Table.Th w={100}>Amount</Table.Th>
                        <Table.Th w={100}>Actions</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>

            <Modal opened={deleteModalState} onClose={() => setDeleteModalState(false)} title="Delete Transaction"
                centered>
                <DeleteTransactionModal transaction={transaction} accountId={account.id}
                                        oncloseModal={() => setDeleteModalState(false)}/>
            </Modal>

            <Modal opened={editModalState} onClose={() => setEditModalState(false)} title="Edit Transaction"
                centered>
                <AddEditTransactionForm transaction={transaction} account={account}
                                        onCloseModal={() => setEditModalState(false)}/>
            </Modal>
        </Box>
    )
})