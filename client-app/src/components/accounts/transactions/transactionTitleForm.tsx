import { observer } from 'mobx-react-lite';
import { Transaction } from '../../../models/transaction';
import { Button, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useStore } from '../../../stores/store';
import { useState } from 'react';
import { runInAction } from 'mobx';

interface Props {
    transaction: Transaction;

    onSubmit: () => void;
}

export default observer(function TransactionTitleForm({ transaction, onSubmit }: Props) {
    const { accountStore } = useStore();
    const { updateTransaction } = accountStore;

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            title: transaction.title
        },
        validate: {
            title: (value: string) => value.length === 0 ? 'Title is required' : null,
        },
    });

    async function handleFormSubmit(values: any) {
        if (!form.isValid() || !form.isDirty()) return;
        try {
            // Update the transaction title
            runInAction(() => {
                transaction.title = values.title;
            });

            // Call the updateTransaction method from accountStore
            await updateTransaction(transaction);
            onSubmit();
        } catch (error) {
            console.error('Error updating transaction title:', error);
        } finally {
        }
    }

    return (
        <form onSubmit={form.onSubmit((values) => handleFormSubmit(values))}>
            <TextInput
                withAsterisk
                placeholder="Enter transaction title"
                key={form.key('title')}
                {...form.getInputProps('title')}
                autoFocus
                onBlur={() => {
                    if (form.isValid()) {
                        form.onSubmit((values) => handleFormSubmit(values))();
                    }
                }}
            />
        </form>
    );
});