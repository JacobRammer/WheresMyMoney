import {observer} from "mobx-react-lite";
import {useStore} from "../../stores/store.ts";
import Sidebar from "../sidebar/sidebar.tsx";
import {AppShell, Box, Flex, MantineProvider, Modal, Skeleton, Text, Title, Tooltip} from "@mantine/core";
import {CircleHelp, CirclePlus, Group, Smile} from "lucide-react";
import AccountTable from "./accountTable.tsx";
import {useDisclosure} from "@mantine/hooks";
import CreateAccountForm from "./createAccountForm.tsx";

;

export default observer(function AccountDashboard() {

    const {accountStore} = useStore();
    const {cashBalance, totalBalance} = accountStore;

    const [opened, { open, close }] = useDisclosure(false);
    
    return (
        <MantineProvider >

            <AppShell
                layout="alt"
                navbar={{ width: 250, breakpoint: 'sm'}}
                header={{ height: 100 }}
                padding='md'
            >
                <AppShell.Header p='xs'>
                            <Title order={2}>Account Dashboard</Title>
                            <Flex align='center'>
                                <Text>Available cash: ${cashBalance}</Text>
                                <Tooltip label="This is the amount of available cash you have immediate access to
                                    (checking & savings accounts)"
                                    multiline
                                    w={220}
                                >
                                    <CircleHelp size={15} style={{ marginLeft: '10px' }} />
                                </Tooltip>
                            </Flex>

                            <Flex align='center'>
                                <Text>Total balance: ${totalBalance()}</Text>
                                <Tooltip label={<Text>This number is often times depressing. This is your net worth (available cash
                                    - debts). I hated to see this number too the first time I added up my debts. I believe in you! <Smile size={15} style={{ marginBottom: '-2px' }} /></Text>}
                                    multiline
                                    w={220}
                                >
                                    <CircleHelp size={15} style={{ marginLeft: '10px' }} />
                                </Tooltip>
                            </Flex>
                </AppShell.Header>
                <AppShell.Navbar>
                    <Sidebar/>
                </AppShell.Navbar>
                <AppShell.Main>
                    <AccountTable/>
                    <Tooltip label="Add account" position="top-start">
                        <CirclePlus size={40} className="AddActionCircle" onClick={open} />
                    </Tooltip>

                    <Modal opened={opened} onClose={close} title="Add Account" centered closeOnClickOutside={false}>
                        <CreateAccountForm onCloseModal={close} />
                    </Modal>
                </AppShell.Main>
            </AppShell>
            
        </MantineProvider>
            

    )
})