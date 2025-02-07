import {observer} from "mobx-react-lite";
import {
    Box,
    Center,
    ChakraProvider,
    Heading,
    Link,
    List,
    ListIcon,
    ListItem,
} from "@chakra-ui/react";
import {ChartBarBig, Landmark, PiggyBank} from "lucide-react";
import {useStore} from "../../stores/store.ts";
import CashAccounts from "./cashAccounts.tsx";
import {useEffect} from "react";

export default observer(function Sidebar() {
    const {accountStore} = useStore();
    const {accountRegistry, loadAccounts} = accountStore;

    useEffect(() => {
        if (accountRegistry.size === 0)
            loadAccounts()
    }, [accountRegistry.size, loadAccounts()]);
    return (
        <ChakraProvider>
            <Box>
                <Box className='sidebar'>
                    
                    <Center>
                        <Heading size="lg">Your Budget</Heading>
                    </Center>
                    
                    <Box paddingTop='25px'>
                        <List className='sidebar-list'>
                            
                            <ListItem fontSize='2xl'>
                                <Link href='/app' _hover={{textDecoration: 'none'}}>
                                <ListIcon style={{marginBottom: '6px'}}> 
                                <PiggyBank viewBox='0 0 24 24' />
                                </ListIcon>Budget</Link>
                            </ListItem>

                            <ListItem fontSize='2xl'>
                                <Link href='/reports' _hover={{textDecoration: 'none'}}>
                                <ListIcon style={{marginBottom: '6px'}}>
                                <ChartBarBig viewBox='0 0 24 24' />
                                </ListIcon>Reports</Link>
                            </ListItem>

                            <ListItem fontSize='2xl'>
                                <Link href='/accounts' _hover={{textDecoration: 'none'}}>
                                <ListIcon style={{marginBottom: '6px'}}>
                                <Landmark viewBox='0 0 24 24' />
                                </ListIcon>Accounts</Link>
                            </ListItem>
                        </List>
                    </Box>
                    <Box>
                        {accountRegistry.size !== 0 && 
                            <CashAccounts/>
                        }
                    </Box>
                </Box>
            </Box>
        </ChakraProvider>
    )
})