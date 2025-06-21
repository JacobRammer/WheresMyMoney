import {observer} from "mobx-react-lite";
import {ActionIcon, Box, Center, Modal, Table, Text, Tooltip} from "@mantine/core";
import {Account} from "../../../models/account.ts";
import {Pencil, Trash2} from "lucide-react";
import {Transaction} from "../../../models/transaction.ts";
import {useState} from "react";
import DeleteTransactionModal from "./deleteTransactionModal.tsx";
import AddEditTransactionForm from "./addEditTransactionForm.tsx";
import { Payee } from "../../../models/payee.ts";
import { v4 as uuidv4 } from "uuid";
import TransactionPayeeSelector from "./transactionPayeeSelector.tsx";
import {useStore} from "../../../stores/store.ts";

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
        accountId: '',
        payee: new Payee(uuidv4())
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
                <TransactionPayeeSelector transaction={transaction}/>
            </Table.Td>
            <Table.Td>
                <Text fw={500}>{transaction.title}</Text>
            </Table.Td>
            <Table.Td>
                <Center><Text fw={500}>
                    ${transaction.amount}
                </Text></Center>
            </Table.Td>
            <Table.Td ta="right" width={50} align="right">
                <Center><Box style={{display: "flex", zIndex: 1}}>
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
                </Box></Center>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <Box w='100%'>
            <Table horizontalSpacing="lg" verticalSpacing="xs" striped withColumnBorders withTableBorder
                layout={"fixed"}>
                <Table.Thead >
                    <Table.Tr>
                        <Table.Th w={150}>Date</Table.Th>
                        <Table.Th w={200}>Payee</Table.Th>
                        <Table.Th >Title</Table.Th>
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
        </Box>
        
    )
})