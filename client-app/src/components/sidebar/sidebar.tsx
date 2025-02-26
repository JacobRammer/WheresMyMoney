import {observer} from "mobx-react-lite";
import {useStore} from "../../stores/store.ts";
import CashAccounts from "./cashAccounts.tsx";
import {useEffect} from "react";
import Links from "./links.tsx";
import CreditAccounts from "./creditAccounts.tsx";
import LoanAccounts from "./loanAccounts.tsx";
import {Box, Center, Text, Title} from "@mantine/core";

export default observer(function Sidebar() {
    const {accountStore} = useStore();
    const cashAccountRegistry = accountStore.accountRegistry;
    const loadCashAccounts = accountStore.loadAccounts;
    const loadCreditAccounts = accountStore.loadCreditAccounts;
    const creditAccountRegistry = accountStore.creditAccountRegistry;
    const loanAccountRegistry = accountStore.loanAccountRegistry;
    const loadLoanAccounts = accountStore.loadLoanAccounts;

    useEffect(() => {
        if (cashAccountRegistry.size === 0)
            loadCashAccounts()
        if (creditAccountRegistry.size === 0)
            loadCreditAccounts()
        if (loanAccountRegistry.size === 0)
            loadLoanAccounts()
    }, []);
    return (
            <Box>
                <Box className='sidebar'>
                    
                    <Center>
                        <Text component='a' href='/app' className='SidebarHeader' style={{marginTop: '10px'}}><Title order={1}>Your Budget</Title></Text>
                    </Center>
                    
                    <Box className='SidebarLinkComponent'>
                        <Links/>
                    </Box>
                        {cashAccountRegistry.size !== 0 && 
                            <CashAccounts/>
                        }
                        {creditAccountRegistry.size !== 0 &&
                            <CreditAccounts/>
                        }
                    {loanAccountRegistry.size !== 0 && 
                        <LoanAccounts/>
                    }
                </Box>
            </Box>
    )
})