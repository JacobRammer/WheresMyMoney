import { observer } from "mobx-react-lite";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Account } from "../../models/account.ts";
import { Box, Collapse, MantineProvider, NavLink, NumberFormatter, Text } from "@mantine/core";
import { useStore } from "../../stores/store.ts";

interface Props {
    accounts: Account[];
    header: string;
    balance: number;
}

export default observer(function AccountList({ accounts, header, balance }: Props) {
    const [show, setShow] = useState(true);
    const handleToggle = () => setShow(!show);
    return (
        <MantineProvider >
            <Box className='SidebarLinkComponent'>

                <NavLink className='SidebarLink'
                    onClick={handleToggle}
                    label={<Text size='sm' fw={600}>{header}</Text>}
                    leftSection={!show ? <ChevronRight style={{ marginRight: '5px' }} /> : <ChevronDown style={{ marginRight: '5px' }} />}
                    rightSection={
                        <Text c={balance < 0 ? 'red' : 'black'} fw={600}><NumberFormatter style={{
                            marginLeft: '5px',
                            backgroundColor: balance < 0 ? 'white' : 'transparent', borderRadius: '10px',
                            padding: '1px'
                        }} value={balance} prefix="$" decimalScale={2} fixedDecimalScale={true} /></Text>
                    } />

                <Collapse in={show} className='AccountSidebarDetails'>
                    {accounts.map((account: Account) => (
                        <NavLink href={`/account/${account.id}`} key={account.id} className='SidebarLink'
                            label={<Text size='sm'>{account.name}</Text>}
                            rightSection={
                                <Box style={{ backgroundColor: account.balance < 0 ? 'white' : 'transparent', borderRadius: '10px', padding: '1px' }}>
                                    <Text size='sm' c={account.balance < 0 ? 'red' : 'black'}
                                        fw={600}><NumberFormatter style={{
                                            marginLeft: '5px',
                                            backgroundColor: balance < 0 ? 'white' : 'transparent', borderRadius: '10px',
                                            padding: '1px'
                                        }} value={account.balance} prefix="$" decimalScale={2} fixedDecimalScale={true} /></Text>
                                </Box>
                            } />
                    ))}

                </Collapse>
            </Box>
        </MantineProvider>
    )
})