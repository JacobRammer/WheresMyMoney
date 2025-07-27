import { observer } from "mobx-react-lite";
import { runInAction } from "mobx";
import { Transaction } from "../../../models/transaction.ts";
import { useStore } from "../../../stores/store.ts";
import { useForm } from "@mantine/form";
import { v4 as uuidv4 } from "uuid";
import { ActionIcon, Center, Table, TextInput, Tooltip } from "@mantine/core";
import { DatePickerInput } from '@mantine/dates';
import { useState, useMemo } from "react";
import { CalendarSearch, Save } from "lucide-react";
import { Account } from "../../../models/account.ts";

interface AddTransactionProps {
    showForm: boolean;
    account: Account;
    onAdd: () => void;
}

export default observer(function AddTransactionForm({ showForm, account, onAdd }: AddTransactionProps) {
    const { accountStore } = useStore();
    const { createTransaction, sumAccountBalances } = accountStore;

    // Generate a stable ID for this form instance
    const transactionId = useMemo(() => uuidv4(), []);

    // Create a blank new transaction
    const [transaction, setTransaction] = useState<Transaction>(() => ({
        id: transactionId,
        title: '',
        amount: 0,
        date: new Date().toISOString(),
        accountId: account.id,
        payee: null,
        budgetItemId: undefined
    }));

    const [transactionDate, setTransactionDate] = useState<Date>(new Date());

    // Memoize maxDate to prevent recreation on every render
    const maxDate = useMemo(() => {
        const today = new Date();
        return new Date(today.getFullYear(), today.getMonth(), today.getDate());
    }, []);

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            title: '',
            amount: 0
        },

        validate: {
            title: (value: string) => value.length !== 0 ? null : 'Title is required',
        },
    })

    function handleFormSubmit(values: any) {
        if (form.isValid()) {
            runInAction(() => {
                transaction.date = transactionDate.toJSON();
                transaction.title = values.title;
                transaction.amount = values.amount;
            })
            onAdd();
            createTransaction(account, transaction).then(() => {
            })
        }
    }

    return (

        <Table.Tr key={transaction.id} style={{ visibility: showForm ? 'visible' : 'collapse' }}
            h={60}
        >
            <Table.Td >
                <DatePickerInput
                    leftSection={<CalendarSearch size={16} />}
                    leftSectionPointerEvents="none"
                    placeholder="Pick date"
                    value={transactionDate}
                    maxDate={maxDate}
                    onChange={(value) => setTransactionDate(value ?? new Date())}
                />
            </Table.Td>
            <Table.Td>
                {/* <TransactionPayeeSelector transaction={transaction} /> */}
            </Table.Td>
            <Table.Td>
                <TextInput
                    placeholder="groceries"
                    key={form.key('title')}
                    {...form.getInputProps('title')}
                />                        </Table.Td>
            <Table.Td>
                {/* <TransactionBudgetItemSelector transaction={transaction} /> */}
            </Table.Td>
            <Table.Td>
                <TextInput
                    placeholder="0.00"
                    key={form.key('amount')}
                    {...form.getInputProps('amount')}
                />
            </Table.Td>
            <Table.Td>
                <Center>
                    <Tooltip label="Create transaction" position="top-start">
                        <ActionIcon
                            size={30}
                            style={{ marginRight: "10px" }}
                            color="Green"
                            onClick={() => handleFormSubmit(form.getValues())}
                        >
                            <Save style={{ width: '70%', height: '70%' }} />
                        </ActionIcon>
                    </Tooltip>
                </Center>
            </Table.Td>
        </Table.Tr>
    )
})