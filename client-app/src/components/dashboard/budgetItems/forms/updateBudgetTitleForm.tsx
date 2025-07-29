import {useForm} from '@mantine/form';
import {observer} from 'mobx-react-lite';
import {useStore} from '../../../../stores/store';
import {Button, Flex, TextInput} from '@mantine/core';
import {BudgetItem} from '../../../../models/budgetItem';

interface Props {
    onClose: () => void;
}

export default observer(function UpdateBudgetTitleForm({onClose}: Props) {

    const {budgetStore} = useStore();
    const {selectedBudgetItem, updateBudgetItem, setSelectedBudgetItem} = budgetStore

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            budgetTitle: selectedBudgetItem!.title,
        },

        validate: {
            budgetTitle: (value: string) => value.length !== 0 && value !== selectedBudgetItem!.title ? null : 'Budget Title title is required',
        },
    });

    async function HandleFormSubmit(values: any) {
        const temp = new BudgetItem(
            selectedBudgetItem!.id,
            values.budgetTitle,
            selectedBudgetItem!.budgetGroupId,
            selectedBudgetItem!.dateCreated,
            selectedBudgetItem!.assigned,
            selectedBudgetItem!.target,
            selectedBudgetItem!.outflow,
        )
        await updateBudgetItem(temp);
        setSelectedBudgetItem(temp);
        onClose();
    }

    return (
        <form onSubmit={form.onSubmit((values) => HandleFormSubmit(values))}>
            <TextInput withAsterisk defaultValue={selectedBudgetItem!.title}
                       key={form.key('budgetTitle')}
                       {...form.getInputProps("budgetTitle")}
                       onFocus={(event) => event.target.select()}
                       label="Budget Title"
            />
            <Flex justify='space-between' mt="md">
                <Button style={{backgroundColor: 'red'}} onClick={onClose}>
                    Cancel
                </Button>

                <Button onClick={() => {
                }} type='submit' disabled={!form.isValid()}>
                    Update
                </Button>
            </Flex>
        </form>
    );
});