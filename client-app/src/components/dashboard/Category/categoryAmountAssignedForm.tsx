import { observer } from "mobx-react-lite";
import { v4 as uuidv4 } from "uuid";
import { Input } from "@mantine/core";
import { useClickOutside } from "@mantine/hooks";
import { useStore } from "../../../stores/store.ts";
import { useForm } from "@mantine/form";
import { BudgetItem } from "../../../models/budgetItem.ts";

interface Props {
  category: BudgetItem;

  handleClickOutside: () => void;
}

export default observer(function CategoryAmountAssignedForm({
  category,
  handleClickOutside,
}: Props) {
  const hep = useClickOutside(() => handleInputSubmit());

  const { budgetStore } = useStore();
  const { updateBudgetItem: updateCategory, setSelectedBudgetItem } =
    budgetStore;

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      amountAssigned: category.assigned.toFixed(2),
    },
  });

  function handleInputSubmit() {
    handleClickOutside();
    // If the user hasn't modified the assigned, then nothing to do
    if (!form.isDirty()) {
      return;
    }
    form.onSubmit((values) => {
      const updatedCategory = new BudgetItem(
        category.id,
        category.title,
        category.budgetGroupId,
        category.dateCreated,
        parseFloat(values.amountAssigned),
        category.target,
        category.outflow
      );

      // Instead of updating the transaction, just create a new
      // assigned transaction and update the assigned property only
      updateCategory(updatedCategory).catch((error) => {
        console.error("Error updating category:", error);
      });

      setSelectedBudgetItem(updatedCategory);
    })();
  }
  return (
    <form>
      <Input
        id={uuidv4()}
        ref={hep}
        size="sm"
        color="red"
        defaultValue={
          category.assigned !== null ? category.assigned.toFixed(2) : 0
        }
        key={form.key("amountAssigned")}
        {...form.getInputProps("amountAssigned")}
        onFocus={(event) => event.target.select()}
      />
    </form>
  );
});
