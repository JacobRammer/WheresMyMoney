import { Box, Flex, NumberFormatter, Text, Title, Tooltip } from '@mantine/core';
import { CircleHelp } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { Account } from '../../../models/account';
import { useStore } from '../../../stores/store';

interface Props {
    account: Account
}

export default observer(function TransactionDashboardHeader({ account }: Props) {
    const { accountStore } = useStore();
    const { isCashAccount } = accountStore;

    return (
        <Box>
            <Title order={2}>{account.name}</Title>
            <Flex align='center'>
                <Text style={{ paddingRight: '5px' }}>Balance:</Text> <Text
                    c={account.balance < 0 ? 'red' : 'black'}
                    fw={account.balance < 0 ? 600 : 400}>
                    <NumberFormatter value={account.balance} prefix="$" decimalScale={2} fixedDecimalScale={true} />
                </Text>
                <Tooltip label="This is the total balance of this account."
                    multiline
                    w={220}
                >
                    <CircleHelp size={15} style={{ marginLeft: '5px' }} />
                </Tooltip>
            </Flex>

            {
                isCashAccount(account) &&
                <Flex align='center'>
                    <Text style={{ paddingRight: '5px' }}>Balance:</Text> <Text
                        c={account.balance < 0 ? 'red' : 'black'}
                        fw={account.balance < 0 ? 600 : 400}>
                        <NumberFormatter value={account.available} prefix="$" decimalScale={2} fixedDecimalScale={true} />
                    </Text>
                    <Tooltip label="This is the account balance minus funds assigned to budgets"
                        multiline
                        w={220}
                    >
                        <CircleHelp size={15} style={{ marginLeft: '5px' }} />
                    </Tooltip>
                </Flex>
            }
        </Box>
    );
});