import {observer} from "mobx-react-lite";
import {ActionIcon, Box, Modal, Table, Text, Tooltip} from "@mantine/core";
import {useStore} from "../../stores/store.ts";
import {AccountBase} from "../../models/accountBase.ts";
import {Pencil, Trash2} from "lucide-react";
import {useDisclosure} from "@mantine/hooks";
import DeleteAccountModal from "./deleteAccountModal.tsx";
import {useState} from "react";

export default observer(function accountTable() {
    const {accountStore} = useStore();
    const loadBaseRegistry = accountStore.getAccountBaseRegistry;

    const [opened, { open, close }] = useDisclosure(false);
    
    const [account, setAccount] = useState(new AccountBase("", "", 0, "", ""));

    function SetupDeleteAccountModal(accountBase: AccountBase) {
        open();
        setAccount(accountBase);
    }

    const rows = loadBaseRegistry().map((account: AccountBase) => (
        <Table.Tr key={account.id}>
            <Table.Td onClick={() => useBoxForNavigation(account.id)} style={{cursor: "pointer"}}><Text fw={500}>{account.name}</Text></Table.Td>
            <Table.Td onClick={() => useBoxForNavigation(account.id)} style={{cursor: "pointer"}}><Text fw={500}>{account.accountType}</Text></Table.Td>
            <Table.Td onClick={() => useBoxForNavigation(account.id)} style={{cursor: "pointer"}}><Text fw={500}>{account.description}</Text></Table.Td>
            <Table.Td onClick={() => useBoxForNavigation(account.id)} style={{cursor: "pointer"}}><Text fw={500} c={account.balance < 0 ? 'red' : 'black'}>{account.balance}</Text></Table.Td>
            <Table.Td ta="right" width={50} >
                <Box style={{display: "flex", zIndex: 1}}>
                    <Tooltip label="Delete account" position="top-start">
                        <ActionIcon size={30} style={{marginRight: "10px"}} color="red">
                            <Trash2 style={{ width: '70%', height: '70%' }} onClick={() => SetupDeleteAccountModal(account)}/>
                        </ActionIcon>
                    </Tooltip>
                    
                    <Tooltip label="Edit account" position="top-start">
                        <ActionIcon size={30}>
                            <Pencil style={{ width: '70%', height: '70%' }}/>
                        </ActionIcon>
                    </Tooltip>
                </Box>
            </Table.Td>
        </Table.Tr>
    ))
    
    return (
        <Box>
            <Text></Text>
            <Table horizontalSpacing="lg" verticalSpacing="xs" striped highlightOnHover withColumnBorders withTableBorder>
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
                <DeleteAccountModal onCloseModal={close} account={account} />
            </Modal>
            {/*<Modal {...stack.register('delete-page')} title="Delete this page?">*/}
            {/*    Are you sure you want to delete this page? This action cannot be undone.*/}
            {/*    <Group mt="lg" justify="flex-end">*/}
            {/*        <Button onClick={stack.closeAll} variant="default">*/}
            {/*            Cancel*/}
            {/*        </Button>*/}
            {/*        <Button onClick={() => stack.open('confirm-action')} color="red">*/}
            {/*            Delete*/}
            {/*        </Button>*/}
            {/*    </Group>*/}
            {/*</Modal>*/}
        </Box>
        
    )
})

function useBoxForNavigation(id: string) {
    // Here you can write all the code that should happen before the redirect.
    window.location.href = `/accounts/${id}`;
}