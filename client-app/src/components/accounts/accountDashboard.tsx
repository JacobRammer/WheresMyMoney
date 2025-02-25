import {observer} from "mobx-react-lite";
import {useStore} from "../../stores/store.ts";
import Sidebar from "../sidebar/sidebar.tsx";
import {Box, Flex, MantineProvider, Title, Text, Tooltip, Modal} from "@mantine/core";
import {useEffect} from "react";
import {CircleHelp, CirclePlus, Smile} from "lucide-react";
import AccountTable from "./accountTable.tsx";
import {useDisclosure} from "@mantine/hooks";
import CreateAccountForm from "./createAccountForm.tsx";

;

export default observer(function AccountDashboard() {

    const {accountStore} = useStore();
    const {cashBalance, totalBalance} = accountStore;

    const [opened, { open, close }] = useDisclosure(false);


    useEffect(() => {
        
    }, [cashBalance]);
    
    return (
        <MantineProvider >
            <Flex>
                <Sidebar/>
                <Box className='AccountDashboard'>
                    <Box className='AccountDashboardTitleBar'>
                        <Box className='AccountDashboardTitleBarDetails'>
                            <Title order={2}>Account Dashboard</Title>
                            <Flex align='center'>
                                <Text>Available cash: ${cashBalance}</Text>
                                <Tooltip label="This is the amount of available cash you have immediate access to
                                    (checking & savings accounts)"
                                    multiline
                                    w={220}
                                >
                                    <CircleHelp size={15} style={{marginLeft: '10px'}}/>
                                </Tooltip>
                            </Flex>

                            <Flex align='center'>
                                <Text>Total balance: ${totalBalance()}</Text>
                                <Tooltip label={<Text>This number is often times depressing. This is your net worth (available cash
                                    - debts). I hated to see this number too the first time I added up my debts. I believe in you! <Smile size={15} style={{marginBottom: '-2px'}}/></Text>}
                                    multiline
                                    w={220}
                                >
                                    <CircleHelp size={15} style={{marginLeft: '10px'}}/>
                                </Tooltip>
                            </Flex>
                        </Box>
                    </Box>

                    <AccountTable/>
                    <Tooltip label="Add account" position="top-start">
                        <CirclePlus size={40} className="AccountDashboardAddAccount" onClick={open}/>
                    </Tooltip>

                    <Modal opened={opened} onClose={close} title="Add Account" centered>
                        <CreateAccountForm onCloseModal={close}/>
                    </Modal>
                </Box>
                
            </Flex>
            
        </MantineProvider>
            

    )
})