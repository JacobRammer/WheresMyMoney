import {observer} from "mobx-react-lite";
import {useForm} from '@mantine/form';
import {Button, Group, Select, TextInput} from "@mantine/core";
import {useStore} from "../../stores/store.ts";
import {CashAccount} from "../../models/cashAccount.ts";
import {v4 as uuidv4} from 'uuid';
import {useState} from "react";
import {CreditAccount} from "../../models/creditAccount.ts";
import {LoanAccount} from "../../models/loanAccount.ts";

interface CreateAccountFormProps {
    onCloseModal?: () => void
}

export default observer(function CreateAccountForm({onCloseModal}: CreateAccountFormProps) {

    const {accountStore} = useStore();
    const {createCashAccount, createLoanAccount, createCreditAccount} = accountStore;
    const [interestAccount, setShowInterestAccount] = useState<boolean>(false)
    
    function handleCloseModal() {
        if (form.isValid()) {
            if (onCloseModal) {
                onCloseModal()
            }
        }
    }

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            accountName: '',
            accountBalance: 0,
            accountType: '',
            accountDescription: '',
            monthlyPayment: 0,
            interestRate: 0
        },

        validate: {
            accountName: (value: string) => value.length !== 0 ? null : 'Account name is required',
            accountType: (value: string) => value.length !== 0 ? null : 'Account type is required',
            accountBalance: (value: number) => value.toString().length !== 0 ? null : 'Account balance is required',

        },
    });

    form.watch('accountType', ({value}) => {
        setShowInterestAccount(value === "Loan" || value === "Credit")
    });

    function handleFormSubmit(values: any) {
        if (values.accountType === "Checking" || values.accountType === "Savings") {
            const account = new CashAccount(uuidv4(), values.accountName, values.accountBalance, values.accountDescription, values.accountType);
            createCashAccount(account).then(() => {})
        }

        else if (values.accountType === "Credit") {
            const account = new CreditAccount(uuidv4(), values.accountName, 
                values.accountBalance, values.monthlyPayment, 
                values.accountDescription, values.accountType, values.interestRate);
            createCreditAccount(account).then(() => {})
        }

        else if (values.accountType === "Loan") {
            const account = new LoanAccount(uuidv4(), values.accountName,
                values.accountBalance, values.monthlyPayment,
                values.accountDescription, values.accountType, values.interestRate);
            createLoanAccount(account).then(() => {})
        }
        

    }

    return (
        <form onSubmit={form.onSubmit((values) => handleFormSubmit(values))}>
            <TextInput name="fuckoff_safaris_search"
                    withAsterisk
                    label="Account Name"
                    placeholder="Checking Account"
                    key={form.key('accountName')}
                    type="text" autoComplete="off"
                    {...form.getInputProps('accountName')}
            />

            <TextInput
                label="Account Description"
                placeholder="I am an account"
                key={form.key('accountDescription')}
                type="text" autoComplete="off"
                {...form.getInputProps('accountDescription')}
            />

            <TextInput
                label="Account Balance"
                withAsterisk
                key={form.key('accountBalance')}
                type="number" autoComplete="off"
                {...form.getInputProps('accountBalance')}
            />

            <Select
                label="Account Type"
                withAsterisk
                placeholder="Account Type"
                data={['Checking', "Savings", 'Credit', 'Loan']}
                {...form.getInputProps('accountType')}
            />

            {interestAccount &&
                <TextInput
                    label="Monthly Payment"
                    withAsterisk
                    key={form.key('monthlyPayment')}
                    type="number" autoComplete="off"
                    {...form.getInputProps('monthlyPayment')}
                />
            }

            {interestAccount &&
                <TextInput
                    label="Interest Rate"
                    withAsterisk
                    key={form.key('interestRate')}
                    type="number" autoComplete="off"
                    {...form.getInputProps('interestRate')}
                />
            }
            
            <Group justify="flex-end" mt="md">
                <Button type="submit" onClick={handleCloseModal}>Create Account</Button>
            </Group>

        </form>
    )
})