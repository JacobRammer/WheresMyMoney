import {observer} from "mobx-react-lite";
import {useStore} from "../../stores/store.ts";
import Sidebar from "../sidebar/sidebar.tsx";
import {CircleHelp} from "lucide-react";
import {Box, Button, Flex, MantineProvider, Text, Tooltip} from "@mantine/core";
import {useEffect} from "react";

export default observer(function AccountDashboard() {

    const {accountStore} = useStore();
    const creditAccountRegistry = accountStore.cashAccountRegistry;
    const {cashBalance, creditBalance, loanBalance, loadAllAccounts, totalBalance} = accountStore;
    
    useEffect(() => {
        loadAllAccounts();
    }, [loadAllAccounts]);
    
    return (
        <MantineProvider >
            <Flex>
                <Sidebar/>
                <Text>{totalBalance()}</Text>
            </Flex>
            
        </MantineProvider>
            

    )
})