import {observer} from "mobx-react-lite";
import {ActionIcon, Box, Modal, Table, Text, Tooltip} from "@mantine/core";
import {Account} from "../../models/account.ts";
import {useStore} from "../../stores/store.ts";
import {useDisclosure} from "@mantine/hooks";
import {useEffect, useState} from "react";
import {Pencil, Trash2} from "lucide-react";
import DeleteAccountModal from "./deleteAccountModal.tsx";

export default observer(function accountTable() {
    const {accountStore} = useStore();
    const {accountRegistry, getAllAccounts} = accountStore;

    const [opened, {open, close}] = useDisclosure(false);

    const [account, setAccount] = useState(new Account("", "", 0, "", ""));

    useEffect(() => {

    }, [accountRegistry.size])

    function SetupDeleteAccountModal(accountBase: Account) {
        open();
        setAccount(accountBase);
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
                    {account.balance}
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
                            <Pencil style={{width: '70%', height: '70%'}}/>
                        </ActionIcon>
                    </Tooltip>
                </Box>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <Box>
            <Text></Text>
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

            <Modal opened={opened} onClose={close} title="Delete Account" centered>
                <DeleteAccountModal onCloseModal={close} account={account}/>
            </Modal>
        </Box>

    )
})

function useBoxForNavigation(account: Account) {
    window.location.href = `/account/${account.id}`;
}