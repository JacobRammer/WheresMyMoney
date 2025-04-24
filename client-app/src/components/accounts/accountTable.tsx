import {observer} from "mobx-react-lite";
import {ActionIcon, Box, Modal, Table, Text, Tooltip} from "@mantine/core";
import {Account} from "../../models/account.ts";
import {useStore} from "../../stores/store.ts";
import {useState} from "react";
import {Pencil, Trash2} from "lucide-react";
import DeleteAccountModal from "./deleteAccountModal.tsx";
import EditAccount from "./editAccount.tsx";

export default observer(function accountTable() {
    const {accountStore} = useStore();
    const {getAllAccounts} = accountStore;

    const [deleteModalState, setDeleteModalState] = useState(false);

    const [editModalState, setEditModalState] = useState(false);

    const [account, setAccount] = useState(new Account("", "", 0, "", ""));

    // Sets the delete modal open state and sets the current account
    function SetupDeleteAccountModal(accountToDelete: Account) {
        setDeleteModalState(true);
        setAccount(accountToDelete);
    }

    // Set the edit modal open state and sets the current account
    function SetupEditAccountModal(accountToEdit: Account) {
        setEditModalState(true);
        setAccount(accountToEdit);
    }

    const rows = getAllAccounts().map((account: Account) => (
        <Table.Tr key={account.id}>
            <Table.Td onClick={() => {
                useBoxForNavigation(account)
            }} style={{cursor: "pointer"}}>
                <Text fw={500}>{account.name}</Text>
            </Table.Td>
            <Table.Td onClick={() => {
                useBoxForNavigation(account)
            }} style={{cursor: "pointer"}}>
                <Text fw={500}>{account.accountType}</Text>
            </Table.Td>
            <Table.Td onClick={() => {
                useBoxForNavigation(account)
            }} style={{cursor: "pointer"}}>
                <Text fw={500}>{account.description}</Text>
            </Table.Td>
            <Table.Td onClick={() => {
                useBoxForNavigation(account)
            }} style={{cursor: "pointer"}}>
                <Text fw={500} c={account.balance < 0 ? 'red' : 'black'}>
                    ${account.balance}
                </Text>
            </Table.Td>
            <Table.Td ta="right" width={50}>
                <Box style={{display: "flex", zIndex: 1}}>
                    <Tooltip label="Delete account" position="top-start">
                        <ActionIcon size={30} style={{marginRight: "10px"}} color="red">
                            <Trash2 style={{width: '70%', height: '70%'}}
                                    onClick={() => SetupDeleteAccountModal(account)}/>
                        </ActionIcon>
                    </Tooltip>

                    <Tooltip label="Edit account" position="top-start">
                        <ActionIcon size={30}>
                            <Pencil style={{width: '70%', height: '70%'}}
                                    onClick={() => SetupEditAccountModal(account)}/>
                        </ActionIcon>
                    </Tooltip>
                </Box>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <Box>
            <Table horizontalSpacing="lg" verticalSpacing="xs" striped highlightOnHover withColumnBorders
                   withTableBorder>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Account</Table.Th>
                        <Table.Th>Account Type</Table.Th>
                        <Table.Th>Description</Table.Th>
                        <Table.Th>Balance</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>


            <Modal opened={deleteModalState} onClose={() => setDeleteModalState(false)} title="Delete Account" centered>
                <DeleteAccountModal account={account} onCloseModal={() => setDeleteModalState(false)}/>
            </Modal>

            <Modal opened={editModalState} onClose={() => setEditModalState(false)} title="Edit Account" centered>
                <EditAccount onCloseModal={() => setEditModalState(false)} accountToEdit={account}/>
            </Modal>
           
        </Box>

    )
})

function useBoxForNavigation(account: Account) {
    window.location.href = `/account/${account.id}`;
}