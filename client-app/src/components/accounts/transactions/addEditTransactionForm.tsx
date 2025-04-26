import {observer} from "mobx-react-lite";
import {runInAction} from "mobx";
import {Transaction} from "../../../models/transaction.ts";
import {useStore} from "../../../stores/store.ts";
import {useForm} from "@mantine/form";
import {v4 as uuidv4} from "uuid";
import {Button, Group, TextInput, Tooltip} from "@mantine/core";
import {DatePickerInput} from '@mantine/dates';
import {useState} from "react";
import {CalendarSearch, CircleHelp} from "lucide-react";
import {Account} from "../../../models/account.ts";


interface AddTransactionProps {
    onCloseModal: () => void;
    transaction: Transaction | undefined;
    account: Account;
}

export default observer(function AddTransactionForm({onCloseModal, transaction, account}: AddTransactionProps) {
    const {accountStore} = useStore();
    const {createTransaction, updateTransaction} = accountStore;

    const [transactionDate, setTransactionDate] = useState<Date>(transaction ? new Date(transaction.date) : new Date());

    const outflowTooltip = (
        <Tooltip
            label="The amount leaving the account such as using your debit card at the store."
            multiline
            w={220}>
            <CircleHelp size={15}/>
        </Tooltip>
    );

    const inflowTooltip = (
        <Tooltip
            label="This is the amount incoming into the account such as payroll."
            multiline
            w={220}>
            <CircleHelp size={15}/>
        </Tooltip>
    );

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            title: transaction?.title ?? '',
            inflow: transaction?.amount && transaction.amount > 0 ? transaction.amount.toString() : '',
            outflow: transaction?.amount && transaction.amount < 0 ? Math.abs(transaction.amount).toString() : ''
        },

        validate: {
            title: (value: string) => value.length !== 0 ? null : 'Title is required',
        },
    })

    function handleFormSubmit(values: any) {
        if (form.isValid()) {
            if (transaction === undefined) {
                const transaction: Transaction = {
                    id: uuidv4(),
                    title: values.title,
                    amount: values.inflow > 0 ? values.inflow : -values.outflow,
                    date: transactionDate.toJSON(),
                    accountId: account.id,
                };
                createTransaction(account, transaction).then(() => {
                })
            } else {
                runInAction(() => {
                    transaction.title = values.title;
                    transaction.amount = values.inflow > 0 ? values.inflow : -values.outflow;
                    transaction.date = transactionDate.toJSON();
                });
                updateTransaction(transaction).then(() => {
                })
            }
            
            
        }
    }

    function handleCloseModal() {
        if (form.isValid()) {
            if (onCloseModal) {
                onCloseModal()
            }
        }
    }

    return (
        <form onSubmit={form.onSubmit((values) => handleFormSubmit(values))}>
            <TextInput
                withAsterisk
                label="Transaction Title"
                placeholder="groceries"
                key={form.key('title')}
                {...form.getInputProps('title')}
            />

            <TextInput
                label="Outflow"
                rightSection={outflowTooltip}
                placeholder="0.00"
                key={form.key('outflow')}
                {...form.getInputProps('outflow')}
            />

            <TextInput
                label="Inflow"
                rightSection={inflowTooltip}
                placeholder="0.00"
                key={form.key('inflow')}
                {...form.getInputProps('inflow')}
            />

            <DatePickerInput
                leftSection={<CalendarSearch size={16}/>}
                leftSectionPointerEvents="none"
                label="Transaction Date"
                placeholder="Pick date"
                value={transactionDate}
                key={form.key('Date')}
                onChange={(value) => setTransactionDate(value ?? new Date())}
            />

            <Group justify="flex-end" mt="md">
                <Button onClick={onCloseModal} variant="default">
                    Cancel
                </Button>
                <Button type="submit" onClick={handleCloseModal}>
                    {transaction === undefined ? 'Create Transaction' : 'Update Transaction'}
                </Button>
            </Group>
        </form>
    )
})