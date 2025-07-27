import {observer} from "mobx-react-lite";
import {Button, Flex, Group, Select, Text, TextInput, Tooltip} from "@mantine/core";
import {useStore} from "../../stores/store.ts";
import {useState} from "react";
import {useForm} from "@mantine/form";
import {Account} from "../../models/account.ts";
import {v4 as uuidv4} from 'uuid';
import {CircleHelp} from "lucide-react";

interface CreateAccountFormProps {
    onCloseModal?: () => void
}

export default observer(function CreateAccountForm({ onCloseModal }: CreateAccountFormProps) {

    const { accountStore } = useStore();
    const { createAccount } = accountStore;
    // const {createAccount, createLoanAccount, createCreditAccount} = accountStore;
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

            interestRate: (value: number) =>
                interestAccount && value <= 0 ? 'Interest rate must be greater than 0' : null,
            monthlyPayment: (value: number) =>
                interestAccount && value < 0 ? 'Monthly payment must be 0 or greater' : null,
            accountDescription: (value: string) =>
                value.length > 255 ? 'Description must be 255 characters or less' : null
        },
    });

    form.watch('accountType', ({ value }) => {
        setShowInterestAccount(value === "Loan" || value === "Credit")
    });

    function handleFormSubmit(values: any) {
        const account = new Account(
            uuidv4(), // Generate a unique ID
            values.accountName, // Assign the account name from form values
            values.accountBalance, // Assign the account balance from form values
            values.accountType, // Assign the account type from form values
            values.accountBalance,
            values.accountDescription || '', // Assign the optional account description
            values.interestRate || 0, // Assign the optional interest rate
            values.monthlyPayment || 0 // Assign the optional monthly payment
        );
        createAccount(account).then(() => {
        })
    }

    return (
        <form onSubmit={form.onSubmit((values) => handleFormSubmit(values))}>
            <TextInput name="account"
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
                    label={
                        <Flex align='center'>
                            <Text>Monthly Payment</Text>
                            <Tooltip label="The monthly payment for this account. If this is a dynamic value (such 
                            as a credit card, it can be left blank as it will get set with your monthly budget.)">
                                <CircleHelp size={15} style={{ marginLeft: '10px' }} />
                            </Tooltip>
                        </Flex>
                    }

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
                <Button onClick={onCloseModal} variant="default">
                    Cancel
                </Button>
                <Button type="submit" onClick={handleCloseModal} disabled={!form.isValid()}>Create Account</Button>
            </Group>

        </form>
    )
})