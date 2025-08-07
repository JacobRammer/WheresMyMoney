import {observer} from "mobx-react-lite";
import {v4 as uuidv4} from "uuid";
import {NumberInput} from "@mantine/core"; // Change from Input to NumberInput
import {useClickOutside} from "@mantine/hooks";
import {useStore} from "../../../stores/store.ts";
import {useForm} from "@mantine/form";
import {BudgetItem} from "../../../models/budgetItem.ts";
import AssignedTransaction from "../../../models/assignedTransaction.ts";

interface Props {
  category: BudgetItem;
  handleClickOutside: () => void;
}

export default observer(function CategoryAmountAssignedForm({category, handleClickOutside,}: Props) {
  const hep = useClickOutside(() => handleInputSubmit());

  const {budgetStore, accountStore} = useStore();

  const {updateAvailableBalance, primaryAccountId} = accountStore;
  const { selectedBudgetItem, updateBudgetItemFunding } = budgetStore;

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      amountAssigned: category.assigned.toFixed(2),
    },

    validate: {
      amountAssigned: (value: string) => {
        const numericValue = parseFloat(value);
        if (isNaN(numericValue)) {
          return 'Amount must be a valid number';
        }
        if (numericValue < 0) {
          return 'Amount assigned must be positive';
        }
        return null;
      }
    }
  })  

  function handleInputSubmit() {
    handleClickOutside();
    // If the user hasn't modified the assigned, then nothing to do
    if (!form.isDirty() && !form.isValid()) {
      return;
    }
    form.onSubmit((values) => {
      const currentAssigned = category.assigned;
      const formAssigned = parseFloat(values.amountAssigned);
      const assignedDiff = formAssigned - currentAssigned;

      const budgetItem = BudgetItem.fromBudgetItem(selectedBudgetItem!);

      const tempAssigned = new AssignedTransaction(
        uuidv4(),
        budgetItem.id,
        new Date(),
          assignedDiff,
          primaryAccountId
      );

      // Instead of updating the transaction, just create a new
      // assigned transaction and update the assigned property only
      updateBudgetItemFunding(budgetItem, tempAssigned).catch((error) => {
        console.error("Error updating category:", error);
      });
      updateAvailableBalance(tempAssigned).then();
    })();
  }
  return (
    <form>
      <NumberInput
          hideControls
          prefix="$"
        id={uuidv4()}
        ref={hep}
        size="sm"
          defaultValue={category.assigned !== null ? category.assigned : 0}
        key={form.key("amountAssigned")}
        {...form.getInputProps("amountAssigned")}
        onFocus={(event) => event.target.select()}
          decimalScale={2}
      />
    </form>
  );
});