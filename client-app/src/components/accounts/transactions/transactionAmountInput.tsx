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

    onSubmit: () => void;

    column: string;
}

export default observer(function TransactionAmountInput({ transaction, updateAccount, onSubmit, column }: Props) {
    const { accountStore } = useStore();
    const { updateTransaction, accountRegistry } = accountStore;
    const [currentValue, setCurrentValue] = useState<string | number>(transaction.amount);

    async function handleAmountChange(value: string | number) {
        if (value === '' || value === null || value === transaction.amount) return;
        let newAmount = typeof value === 'string' ? parseFloat(value) : value;
        if (isNaN(newAmount)) return;

        if (column === 'outflow' && newAmount > 0)
            newAmount *= -1;

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
                if (transaction.amount > 0 && transaction.budgetItemId !== undefined)
                    transaction.budgetItemId = undefined;

                accountRegistry.set(account.id, account);
            });

            // Call the updateTransaction method from accountStore
            await updateTransaction(transaction);
            updateAccount(account);
            onSubmit();
        } catch (error) {
            console.error('Error updating transaction amount:', error);
        } finally {

        }
    }

    function generateValue() {
        if (transaction.amount < 0 && column === 'inflow')
            return undefined;
        if (transaction.amount > 0 && column === 'outflow')
            return undefined;
        return Math.abs(transaction.amount);
    }

    return (
        <NumberInput
            value={generateValue()}
            onChange={(value) => setCurrentValue(value)}
            onFocus={(event) => event.target.select()}
            placeholder={column}
            onBlur={() => {
                handleAmountChange(currentValue).then();
            }}
            prefix="$"
            min={0}
            hideControls
        />

    );
});