import {observer} from "mobx-react-lite";
import {Box, Button, ChakraProvider, Collapse, Link, Text} from "@chakra-ui/react";
import {ChevronDown, ChevronRight} from "lucide-react";
import {useStore} from "../../stores/store.ts";
import {useState} from "react";
import {CashAccount} from "../../models/cashAccount.ts";

export default observer(function CashAccount() {
    const {accountStore} = useStore();
    const {cashBalance, flattenCashAccountRegistry} = accountStore;
    const [show, setShow] = useState(true);
    const handleToggle = () => setShow(!show);
    return (
        <ChakraProvider>
            <Box>
                <Link onClick={handleToggle} >
                    <Button onClick={handleToggle} variant='plain' >
                        {!show ? <ChevronRight style={{marginRight: '5px'}}/> : <ChevronDown style={{marginRight: '5px'}} />}
                        Cash
                    </Button>
                    <Box float='right' style={{marginRight: '10px', marginTop: '9px', borderRadius: '10px', backgroundColor: cashBalance <= 0? 'red' : 'green', display: 'flex'}}>
                        ${cashBalance}
                    </Box>
                </Link>
                
                <Collapse in={show}>
                    {flattenCashAccountRegistry().map((account: CashAccount) => (
                        <Link _hover={{textDecoration: 'none'}} href={`/Accounts/${account.id}`} key={account.id}>
                                <Box marginBottom='5px' marginLeft='5px'  float='left' width='60%' style={{padding: '2px'}}><Text fontSize='sm'>{account.name}</Text></Box>
                                <Box float='right' marginRight='5px'  style={{padding: '2px', borderRadius: '10px', backgroundColor: account.balance < 0? 'red' : 'transparent'}}>
                                    <Text fontSize='sm'>${account.balance}</Text></Box>
                        </Link>
                    ))}
                </Collapse>
            </Box>
        </ChakraProvider>
    )
})