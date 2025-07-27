import { observer } from 'mobx-react-lite';
import { Transaction } from '../../../models/transaction';
import { NumberInput } from '@mantine/core';
import { useStore } from '../../../stores/store';
import { useState } from 'react';
import { runInAction } from 'mobx';
import { Account } from '../../../models/account';

interface Props {
    transaction: Transaction;
    updateAccount: (account: Account) => void;
}

export default observer(function TransactionAmountInput({ transaction, updateAccount }: Props) {
    const { accountStore } = useStore();
    const { updateTransaction, accountRegistry } = accountStore;
    const [currentValue, setCurrentValue] = useState<string | number>(transaction.amount);

    async function handleAmountChange(value: string | number) {
        if (value === '' || value === null) return;
        const newAmount = typeof value === 'string' ? parseFloat(value) : value;
        if (isNaN(newAmount)) return;

        try {
            const account = accountRegistry.get(transaction.accountId);
            if (!account) return;

            const currentAmount = transaction.amount;

            // Update the transaction amount
            runInAction(() => {
                transaction.amount = newAmount;

                // Update account balance based on the difference
                const difference = currentAmount - newAmount;
                if (difference < 0) {
                    account.balance += Math.abs(difference);
                } else {
                    account.balance -= Math.abs(difference);
                }

                accountRegistry.set(account.id, account);

            });

            // Call the updateTransaction method from accountStore
            await updateTransaction(transaction);
            updateAccount(account);
        } catch (error) {
            console.error('Error updating transaction amount:', error);
        } finally {

        }
    }

    return (
        <NumberInput
            value={transaction.amount}
            onChange={(value) => setCurrentValue(value)}
            onBlur={() => {
                handleAmountChange(currentValue);
            }}
            prefix="$"
            min={0}
            hideControls
        />
    );
});