import {observer} from "mobx-react-lite";
import {
    Box,
    Center,
    Heading, Link,
} from "@chakra-ui/react";
import {useStore} from "../../stores/store.ts";
import CashAccounts from "./cashAccounts.tsx";
import {useEffect} from "react";
import Links from "./links.tsx";
import CreditAccounts from "./creditAccounts.tsx";
import LoanAccounts from "./loanAccounts.tsx";

export default observer(function Sidebar() {
    const {accountStore} = useStore();
    const cashAccountRegistry = accountStore.cashAccountRegistry;
    const loadCashAccounts = accountStore.loadCashAccounts;
    const loadCreditAccounts = accountStore.loadCreditAccounts;
    const creditAccountRegistry = accountStore.creditAccountRegistry;
    const loanAccountRegistry = accountStore.loanAccountRegistry;
    const loadLoanAccounts = accountStore.loadLoanAccounts;
    const loanBalance = accountStore.loanBalance;

    useEffect(() => {
        if (cashAccountRegistry.size === 0)
            loadCashAccounts()
        if (creditAccountRegistry.size === 0)
            loadCreditAccounts()
        if (loanAccountRegistry.size === 0)
            loadLoanAccounts()
    }, [cashAccountRegistry.size, loadCashAccounts(), creditAccountRegistry.size, loadCreditAccounts(),
    loanAccountRegistry, loanBalance]);
    return (
            <Box>
                <Box className='sidebar'>
                    
                    <Center>
                        <Link href='/app'><Heading size="lg">Your Budget</Heading></Link>
                    </Center>
                    
                    <Box paddingTop='25px'>
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