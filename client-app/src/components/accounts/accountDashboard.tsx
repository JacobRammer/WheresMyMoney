import {observer} from "mobx-react-lite";
import {useStore} from "../../stores/store.ts";
import {useEffect} from "react";
import Sidebar from "../sidebar/sidebar.tsx";
import {Box, Button, ChakraProvider, Text, Tooltip} from "@chakra-ui/react";
import {CircleHelp} from "lucide-react";

export default observer(function AccountDashboard() {

    const {accountStore} = useStore();
    const creditAccountRegistry = accountStore.cashAccountRegistry;
    const {cashBalance, creditBalance, loanBalance, loadAllAccounts, totalBalance} = accountStore;
    
    // useEffect(() => {
    //     loadAllAccounts();
    // }, [loadAllAccounts]);
    
    return (
        <ChakraProvider>
            <Box className='FlexSpaceAround'>
                    <Sidebar/>
                <Box className='RightOfSidebar'>
                    <Box className='AccountDashboardTitleBar'>
                        <Text className='PageHeader'>All Accounts</Text>
                    </Box>
                    <Box className="AccountDashboardBalance">
                        <Text>Cash Balance</Text> <Tooltip content='This is the available cash you have available.
                        (Checking + Savings balance)'><CircleHelp /></Tooltip>
                    </Box>
                    <Tooltip content="This is the tooltip content">
                        <Button variant="outline" size="sm">
                            Hover me
                        </Button>
                    </Tooltip>
                </Box>
            </Box>
            
        </ChakraProvider>
            

    )
})