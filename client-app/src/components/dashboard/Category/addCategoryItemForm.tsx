import { Button, Flex, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../stores/store";
import { v4 as uuidv4 } from "uuid";
import { BudgetItem } from "../../../models/budgetItem.ts";

interface AddBudgetItemProps {
    budgetGroupId: string;
    updateMenuState: () => void;
}
export default observer(function AddCategoryItemForm({ updateMenuState, budgetGroupId }: AddBudgetItemProps) {
    const { budgetStore } = useStore();
    const { createBudgetItem, setSelectedBudgetItem } = budgetStore;

    function CreateNewCategory() {
        if (form.isValid()) {
            // updateMenuState();
        }
    }

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            budgetTitle: '',
        },

        validate: {
            budgetTitle: (value: string) => value.length !== 0 ? null : 'Budget title is required',
        },
    });

    async function handleFormSubmit(values: any) {

        const budgetItem = new BudgetItem(
            uuidv4(), // Generate a unique ID
            values.budgetTitle,
            budgetGroupId,
            new Date().toJSON(),
            0,
            0,
            0,
        );
        await createBudgetItem(budgetItem).then(() => {
            updateMenuState()
        });

        setSelectedBudgetItem(budgetItem);
    }

    return (
        <form onSubmit={form.onSubmit((values) => handleFormSubmit(values))}>
            <TextInput name="title"
                withAsterisk
                label="Budget Title"
                placeholder="Rent"
                key={form.key('budgetTitle')}
                type="text" autoComplete="off"
                {...form.getInputProps('budgetTitle')}
            />

            <Flex justify='space-between' mt="md">
                <Button style={{ backgroundColor: 'red' }} onClick={updateMenuState}>
                    Cancel
                </Button>

                <Button onClick={CreateNewCategory} type='submit' disabled={!form.isValid()}>
                    Create
                </Button>
            </Flex>
        </form>
    )
})