import {observer} from "mobx-react-lite";
import {Button, Flex, TextInput} from "@mantine/core";
import {useForm} from "@mantine/form";
import {BudgetGroup} from "../../models/budgetGroup.ts";
import {v4 as uuidv4} from 'uuid';
import {useStore} from "../../stores/store.ts";

interface AddCategoryFormProps {
    updateMenuState: () => void;
}

export default observer(function AddBudgetGroupForm({updateMenuState}: AddCategoryFormProps) {

    const {budgetStore} = useStore();
    const {createBudgetGroup} = budgetStore;

    function CreateNewCategory() {
        if (form.isValid()) {
            updateMenuState();
        }
    }

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            categoryTitle: '',
        },

        validate: {
            categoryTitle: (value: string) => value.length !== 0 ? null : 'Category title is required',
        },
    });

    function handleFormSubmit(values: any) {
        const budgetGroup = new BudgetGroup(
            uuidv4(), // Generate a unique ID
            values.categoryTitle,
            new Date().toJSON(),
        );
        console.log(budgetGroup.title);
        createBudgetGroup(budgetGroup).then(() => {
        })
    }
    
    return (
        <form onSubmit={form.onSubmit((values) => handleFormSubmit(values))}>
            <TextInput name="title"
                    withAsterisk
                    label="Category Title"
                    placeholder="Utilities"
                    key={form.key('categoryTitle')}
                    type="text" autoComplete="off"
                    {...form.getInputProps('categoryTitle')}
            />
            
            <Flex justify='space-between' mt="md">
                <Button style={{backgroundColor: 'red'}} onClick={updateMenuState}>
                    Cancel
                </Button>

                <Button onClick={CreateNewCategory} type='submit' disabled={!form.isValid()}>
                    Create
                </Button>
            </Flex>
        </form>
    )
})