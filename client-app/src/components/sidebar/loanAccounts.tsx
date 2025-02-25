import {observer} from "mobx-react-lite";
import {useStore} from "../../stores/store.ts";
import {useState} from "react";
import {ChevronDown, ChevronRight} from "lucide-react";
import {LoanAccount} from "../../models/loanAccount.ts";
import {Box, Collapse, MantineProvider, NavLink, Text} from "@mantine/core";

export default observer(function LoanAccounts() {
    const {accountStore} = useStore();
    const {loanBalance, flattenLoanAccountRegistry} = accountStore;
    const [show, setShow] = useState(true);
    const handleToggle = () => setShow(!show);
    
    return (

        <MantineProvider >
            <Box className='SidebarLinkComponent'>

                <NavLink className='SidebarLink'
                         onClick={handleToggle}
                         label={<Text size='sm' fw={600}>Loans</Text>}
                         leftSection={!show ? <ChevronRight style={{marginRight: '5px'}}/> : <ChevronDown style={{marginRight: '5px'}} />}
                         rightSection={<Text size='sm' style={{marginLeft: '5px',
                             backgroundColor: loanBalance < 0 ? 'white' : 'transparent', borderRadius: '10px',
                             padding: '1px'}} c={loanBalance < 0 ? 'red' : 'black'}
                             fw={loanBalance < 0 ? 600: 400}>${loanBalance}</Text>}/>
                
                <Collapse in={show} className='AccountSidebarDetails'>
                    {flattenLoanAccountRegistry().map((account: LoanAccount) => (
                        <NavLink href={`/Accounts/${account.id}`} key={account.id} className='SidebarLink'
                                 label={<Text size='sm'>{account.name}</Text>}
                                 rightSection={<Box style={{backgroundColor: account.balance < 0 ? 'white' : 'transparent', borderRadius: '10px', padding: '1px'}}><Text size='sm' c={account.balance < 0 ? 'red' : 'black'} 
                                              fw={account.balance < 0 ? 600: 400}>${account.balance}</Text></Box>}
                        />
                    ))}
                </Collapse>
            </Box>
        </MantineProvider>
    )
})