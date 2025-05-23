import {observer} from "mobx-react-lite";
import {v4 as uuidv4} from "uuid";
import {Input} from "@mantine/core";
import {Category} from "../../../models/Category.ts";
import {useClickOutside} from "@mantine/hooks";
import {useStore} from "../../../stores/store.ts";
import {useForm} from "@mantine/form";

interface Props {
    onClick: () => void;
    closeForm: () => void;
    category: Category;
}

export default observer(function CategoryAmountAssignedForm({ category, onClick, closeForm}: Props) {
    const hep = useClickOutside(() => handleInputSubmit());

    const {budgetStore} = useStore();
    const { updateCategory } = budgetStore;

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            amountAssigned: category.assigned.toFixed(2),
        }})
        
    function handleInputSubmit() {
        closeForm();
        form.onSubmit((values) => {
            const updatedCategory = new Category
            (
                category.id,
                category.title, 
                category.categoryGroupId,
                parseFloat(values.amountAssigned), 
                category.target,
                category.outflow,
            );

            // If the user hasn't modified the assigned, then nothing to do
            if (!form.isDirty()) {
                return;
            }
            updateCategory(updatedCategory).catch(error => {
                console.error('Error updating category:', error);
            });
        })();
        
    }
    return (
        <form>
            <Input id={uuidv4()} ref={hep} size="sm" onClick={() => onClick()} color="red"
                defaultValue={category.assigned !== null ? category.assigned.toFixed(2) : 0}
                key={form.key('amountAssigned')} {...form.getInputProps('amountAssigned')}
                onFocus={(event) => event.target.select()}
            />
        </form>

        
    )
})