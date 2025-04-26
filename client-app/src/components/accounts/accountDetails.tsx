import {observer} from "mobx-react-lite";
import {useStore} from "../../stores/store.ts";
import {useParams} from "react-router-dom";
import Sidebar from "../sidebar/sidebar.tsx";
import {Box, Flex, MantineProvider, Modal, Text, Title, Tooltip} from "@mantine/core";
import {CircleHelp, CirclePlus} from "lucide-react";
import {useEffect, useState} from "react";
import {Account} from "../../models/account.ts";
import AccountTransactionDetails from "./transactions/accountTransactionDetails.tsx";
import AddEditTransactionForm from "./transactions/addEditTransactionForm.tsx";

export default observer(function AccountDetails() {
    const {accountStore} = useStore();
    const {accountRegistry, numberOfTransactions} = accountStore;
    const {id} = useParams()

    const [addTransactionSate, setAddTransactionModalState] = useState(false);
    const [account, setAccount] = useState(new Account("", "", 0, "", ""));

    useEffect(() => {
        const tempAccount = accountRegistry.get(id!);
        if (id !== undefined && tempAccount !== undefined)
            setAccount(tempAccount!);
    }, [id, accountRegistry.size, numberOfTransactions]);
    return (
        <MantineProvider>
            <Flex>
                <Sidebar/>
                <Box className='DetailsPage'>
                    <Box className='DetailHeaderWithUnderline'>
                        <Box className='DetailHeaderDetailsWithMargin'>
                            <Title order={2}>{account.name}</Title>
                            <Flex align='center'>
                                <Text style={{paddingRight: '5px'}}>Balance:</Text> <Text
                                c={account.balance < 0 ? 'red' : 'black'}
                                fw={account.balance < 0 ? 600 : 400}>${account.balance}</Text>
                                <Tooltip label="This is the total balance of this account."
                                         multiline
                                         w={220}
                                >
                                    <CircleHelp size={15} style={{marginLeft: '5px'}}/>
                                </Tooltip>
                            </Flex>
                        </Box>
                    </Box>

                    <AccountTransactionDetails account={account}/>
                </Box>

                <Tooltip label="Add Transaction" position="top-start">
                    <CirclePlus size={40} className="AddActionCircle"
                                onClick={() => setAddTransactionModalState(true)}/>
                </Tooltip>

                <Modal opened={addTransactionSate} onClose={() => setAddTransactionModalState(false)}
                       title="Add Transaction" centered>
                    <AddEditTransactionForm onCloseModal={() => setAddTransactionModalState(false)}
                                            transaction={undefined}
                                        account={account}/>
                </Modal>
            </Flex>
        </MantineProvider>
    )
})