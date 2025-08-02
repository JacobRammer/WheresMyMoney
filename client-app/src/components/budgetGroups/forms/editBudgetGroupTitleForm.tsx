import { observer } from "mobx-react-lite";
import { Button, Flex, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { BudgetGroup } from "../../../models/budgetGroup.ts";
import { runInAction } from "mobx";
import { useStore } from "../../../stores/store.ts";

interface EditBudgetGroupTitleFormProps {
    budgetGroup: BudgetGroup;
    updateMenuState: () => void;
}

export default observer(function EditBudgetGroupTitleForm({ budgetGroup, updateMenuState }: EditBudgetGroupTitleFormProps) {
    const { budgetStore } = useStore();
    const { updateBudgetGroup } = budgetStore;

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            groupTitle: budgetGroup.title,
        },

        validate: {
            groupTitle: (value: string) => value.length !== 0 ? null : 'Budget group title is required',
        },
    });

    async function handleFormSubmit(values: any) {
        if (!form.isValid()) return;

        try {
            runInAction(() => {
                budgetGroup.title = values.groupTitle;
            })
            await updateBudgetGroup(budgetGroup).then(() => {
                updateMenuState()
            })
        } catch (error) {
            console.error('Error updating budget group:', error);
        }
    }

    return (
        <form onSubmit={form.onSubmit((values) => handleFormSubmit(values))}>
            <TextInput
                name="groupTitle"
                withAsterisk
                label="Budget Group Title"
                placeholder="Enter budget group title"
                key={form.key('groupTitle')}
                type="text"
                autoComplete="off"
                onFocus={(event) => event.target.select()}
                {...form.getInputProps('groupTitle')}
            />

            <Flex justify='space-between' mt="md">
                <Button
                    style={{ backgroundColor: 'red' }}
                    onClick={updateMenuState}
                >
                    Cancel
                </Button>

                <Button
                    type='submit'
                    disabled={!form.isValid()}
                >
                    Update
                </Button>
            </Flex>
        </form>
    );
});
