import {observer} from "mobx-react-lite";
import {useStore} from "../../stores/store.ts";
import {useEffect, useState} from "react";
import {useForm} from "@mantine/form";
import {Account} from "../../models/account.ts";
import {Button, Flex, Group, Text, TextInput, Tooltip} from "@mantine/core";
import {CircleHelp} from "lucide-react";

interface EditAccountProps {
    onCloseModal: () => void
    accountToEdit: Account
}

export default observer(function EditAccount({onCloseModal, accountToEdit}: EditAccountProps) {
    const {accountStore} = useStore();
    const {editAccount} = accountStore;
    const [interestAccount, setShowInterestAccount] = useState<boolean>(false)

    function handleCloseModal() {
        if (form.isValid()) {
            if (onCloseModal) {
                onCloseModal()
            }
        }
    }

    useEffect(() => {
        setShowInterestAccount(accountToEdit.accountType === "Loan" || accountToEdit.accountType === "Credit")
    });

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            accountName: accountToEdit.name,
            accountBalance: accountToEdit.balance,
            accountType: accountToEdit.accountType,
            accountDescription: accountToEdit.description || '',
            monthlyPayment: accountToEdit.monthlyPayment || 0,
            interestRate: accountToEdit.interestRate || 0,
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

    function handleFormSubmit(values: any) {

        const account = new Account(
            accountToEdit.id,
            values.accountName,
            accountToEdit.balance,
            accountToEdit.accountType,
            values.accountDescription || '',
            values.interestRate,
            values.monthlyPayment,
        )

        editAccount(account).then(() => {
        })
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

            {interestAccount &&
                <TextInput
                    label={
                        <Flex align='center'>
                            <Text>Monthly Payment</Text>
                            <Tooltip label="The monthly payment for this account. If this is a dynamic value (such 
                            as a credit card, it can be left blank as it will get set with your monthly budget.)">
                                <CircleHelp size={15} style={{marginLeft: '10px'}}/>
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
                <Button type="submit" onClick={handleCloseModal}>Update Account</Button>
            </Group>

        </form>
    )
})