import {observer} from "mobx-react-lite";
import {useStore} from "../../stores/store.ts";
import {useEffect} from "react";
import Links from "./links.tsx";
import {Box, Center, Text, Title} from "@mantine/core";
import AccountList from "./accountList.tsx";

export default observer(function Sidebar() {
    const {accountStore} = useStore();
    const {
        accountRegistry, loadAccounts, getCashAccounts, getLoanAccounts, getCreditAccounts,
        cashBalance, loanBalance, creditBalance
    } = accountStore;

    useEffect(() => {
        if (accountRegistry.size === 0)
            loadAccounts();
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
                    {getCashAccounts().length !== 0 &&
                        <AccountList header="Cash" accounts={getCashAccounts()} balance={cashBalance}/>
                        }
                    {getCreditAccounts().length !== 0 &&
                        <AccountList header="Credit" accounts={getCreditAccounts()} balance={creditBalance}/>
                        }
                    {getLoanAccounts().length !== 0 &&
                        <AccountList header="Loans" accounts={getLoanAccounts()} balance={loanBalance}/>
                    }
                </Box>
            </Box>
    )
})