import {observer} from "mobx-react-lite";
import {ActionIcon, Box, Center, Modal, NumberFormatter, Table, Text, Tooltip} from "@mantine/core";
import {Account} from "../../models/account.ts";
import {useStore} from "../../stores/store.ts";
import {useState} from "react";
import {Pencil, Trash2} from "lucide-react";
import DeleteAccountModal from "./deleteAccountModal.tsx";
import EditAccount from "./editAccount.tsx";

export default observer(function accountTable() {
    const { accountStore } = useStore();
    const { getAllAccounts } = accountStore;

    const [deleteModalState, setDeleteModalState] = useState(false);

    const [editModalState, setEditModalState] = useState(false);

    const [account, setAccount] = useState(new Account("", "", 0, "", 0, ""));

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
            }} style={{ cursor: "pointer" }}>
                <Text fw={500}>{account.name}</Text>
            </Table.Td>
            <Table.Td onClick={() => {
                useBoxForNavigation(account)
            }} style={{ cursor: "pointer" }}>
                <Text fw={500}>{account.accountType}</Text>
            </Table.Td>
            <Table.Td onClick={() => {
                useBoxForNavigation(account)
            }} style={{ cursor: "pointer" }}>
                <Text fw={500}>{account.description}</Text>
            </Table.Td>
            <Table.Td onClick={() => {
                useBoxForNavigation(account)
            }} style={{ cursor: "pointer" }}>
                <Text fw={500} c={account.balance < 0 ? 'red' : 'black'}>
                    <NumberFormatter value={account.balance} prefix="$" decimalScale={2} fixedDecimalScale={true} />
                </Text>
            </Table.Td>
            <Table.Td>
                <Center><Box style={{ display: "flex", zIndex: 1 }}>
                    <Tooltip label="Delete account" position="top-start">
                        <ActionIcon size={30} style={{ marginRight: "10px" }} color="red">
                            <Trash2 onClick={() => SetupDeleteAccountModal(account)} />
                        </ActionIcon>
                    </Tooltip>

                    <Tooltip label="Edit account" position="top-start">
                        <ActionIcon size={30}>
                            <Pencil onClick={() => SetupEditAccountModal(account)} />
                        </ActionIcon>
                    </Tooltip>
                </Box></Center>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <Box>
            <Table horizontalSpacing="lg" striped highlightOnHover withColumnBorders
                withTableBorder>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th w={200}>Account</Table.Th>
                        <Table.Th>Account Type</Table.Th>
                        <Table.Th >Description</Table.Th>
                        <Table.Th w={150}>Balance</Table.Th>
                        <Table.Th w={100}>Actions</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>


            <Modal opened={deleteModalState} onClose={() => setDeleteModalState(false)} title="Delete Account" centered>
                <DeleteAccountModal account={account} onCloseModal={() => setDeleteModalState(false)} />
            </Modal>

            <Modal opened={editModalState} onClose={() => setEditModalState(false)} title="Edit Account" centered>
                <EditAccount onCloseModal={() => setEditModalState(false)} accountToEdit={account} />
            </Modal>

        </Box>

    )
})

function useBoxForNavigation(account: Account) {
    window.location.href = `/account/${account.id}`;
}