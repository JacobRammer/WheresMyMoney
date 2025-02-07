import {observer} from "mobx-react-lite";
import {Box, Button, Center, Collapse, Link} from "@chakra-ui/react";
import {ChevronDown, ChevronRight} from "lucide-react";
import {useStore} from "../../stores/store.ts";
import {useState} from "react";
import {CashAccount} from "../../models/cashAccount.ts";

export default observer(function CashAccount() {
    const {accountStore} = useStore();
    const {cashBalance, flattenRegistry} = accountStore;
    const [show, setShow] = useState(true);
    const handleToggle = () => setShow(!show);
    return (
        <Box>

            <Center>
                <Button onClick={handleToggle} variant='plain' style={{width: '250px'}}>
                    {!show ? <ChevronRight style={{marginRight: '5px'}}/> : <ChevronDown style={{marginRight: '5px'}} />}
                    Cash
                    <Box paddingLeft='50px' w='70%'>${cashBalance}</Box>
                </Button>
            </Center>
            
            
            <Collapse in={show} style={{paddingLeft: '10px'}}>
                {flattenRegistry().map((account: CashAccount) => (
                    <Link _hover={{textDecoration: 'none'}} href={`/Accounts/${account.id}`} key={account.id}>
                        <Box key={account.id} display='table' width='100%' >
                            <Box float='left' width='65%'>{account.name}</Box>
                            <Box>${account.balance}</Box>
                        </Box>
                    </Link>
                    
                ))}
            </Collapse>
        </Box>
    )
})