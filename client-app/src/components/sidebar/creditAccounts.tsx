import {observer} from "mobx-react-lite";
import {ChevronDown, ChevronRight} from "lucide-react";
import {useStore} from "../../stores/store.ts";
import {useState} from "react";
import {CreditAccount} from "../../models/creditAccount.ts";
import {Box, Collapse, MantineProvider, NavLink, Text} from "@mantine/core";

export default observer(function CreditAccounts() {

    const {accountStore} = useStore();
    const {creditBalance, flattenCreditAccountRegistry} = accountStore;
    const [show, setShow] = useState(true);
    const handleToggle = () => setShow(!show);
    
    return (
        <MantineProvider >
            <Box className='SidebarLinkComponent'>

                <NavLink className='SidebarLink'
                         onClick={handleToggle}
                         label={<Text size='sm' fw={600}>Credit</Text>}
                         leftSection={!show ? <ChevronRight style={{marginRight: '5px'}}/> : <ChevronDown style={{marginRight: '5px'}} />}
                         rightSection={<Text size='sm' style={{marginLeft: '5px'}}>${creditBalance}</Text>}/>

                <Collapse in={show} className='AccountSidebarDetails'>
                    {flattenCreditAccountRegistry().map((account: CreditAccount) => (
                        <NavLink href={`/Accounts/${account.id}`} key={account.id} className='SidebarLink'
                                 label={<Text size='sm'>{account.name}</Text>}
                                 rightSection={<Text size='sm'>${account.balance}</Text>}
                        />
                    ))}
                </Collapse>
            </Box>
        </MantineProvider>
    )
})