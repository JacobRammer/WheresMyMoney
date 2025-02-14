import {observer} from "mobx-react-lite";
import {useStore} from "../../stores/store.ts";
import {useState} from "react";
import {Box, Button, Collapse, Link, Text} from "@chakra-ui/react";
import {ChevronDown, ChevronRight} from "lucide-react";
import {LoanAccount} from "../../models/loanAccount.ts";

export default observer(function LoanAccounts() {
    const {accountStore} = useStore();
    const {loanBalance, flattenLoanAccountRegistry} = accountStore;
    const [show, setShow] = useState(true);
    const handleToggle = () => setShow(!show);
    
    return (
    
        <Box>
           <Link onClick={handleToggle} >
                <Button onClick={handleToggle} variant='plain' >
                    {!show ? <ChevronRight style={{marginRight: '5px'}}/> : <ChevronDown style={{marginRight: '5px'}} />}
                    Loans
                </Button>
                <Box float='right' style={{marginRight: '10px', marginTop: '9px', borderRadius: '10px', backgroundColor: loanBalance <= 0? 'red' : 'green', display: 'flex'}}>
                    ${loanBalance}
                </Box>
           </Link>

            <Collapse in={show}>
                {flattenLoanAccountRegistry().map((account: LoanAccount) => (
                    <Link _hover={{textDecoration: 'none'}} href={`/Accounts/${account.id}`} key={account.id}>
                        <Box marginLeft='5px' marginBottom='5px' float='left' width='60%' style={{padding: '2px'}}><Text fontSize='sm'>{account.name}</Text></Box>
                        <Box  marginRight='5px' float='right' style={{padding: '2px', borderRadius: '10px', backgroundColor: account.balance < 0? 'red' : 'transparent', display: 'flex'}}>
                            <Text fontSize='sm'>${account.balance}</Text></Box>
                    </Link>
                ))}
            </Collapse>
        </Box>
    )
})