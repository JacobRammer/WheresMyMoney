import { observer } from 'mobx-react-lite';
import { Transaction } from '../../../models/transaction';
import { DatePickerInput } from '@mantine/dates';
import { useStore } from '../../../stores/store';
import { useState } from 'react';
import { runInAction } from 'mobx';

interface Props {
    transaction: Transaction
}

export default observer(function TransactionDatePickerInput({ transaction }: Props) {
    const { accountStore } = useStore();
    const { updateTransaction } = accountStore;

    async function handleDateChange(date: Date | null) {
        if (!date) return;
        try {
            // Update the transaction date
            runInAction(() => {
                transaction.date = date.toISOString();
            });

            // Call the updateTransaction method from accountStore
            await updateTransaction(transaction);
        } catch (error) {
            console.error('Error updating transaction date:', error);
        } finally {
        }
    }

    return (
        <DatePickerInput
            value={new Date(transaction.date)}
            onChange={handleDateChange}
            maxDate={new Date()}
        />
    );
});