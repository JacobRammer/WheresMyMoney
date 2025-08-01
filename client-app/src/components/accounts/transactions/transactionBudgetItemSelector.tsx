import { Text, Select } from "@mantine/core";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../stores/store";
import { Transaction } from "../../../models/transaction";
import { useEffect, useState } from "react";
import { runInAction } from "mobx";

interface Props {
  transaction: Transaction;
  onSubmit: () => void;
}

export default observer(function TransactionBudgetItemSelector({
  transaction, onSubmit
}: Props) {
  const { budgetStore } = useStore();
  const {
    getAllBudgetItems,
    budgetCategories,
    getBudgetGroupFromMapByName: getBudgetItemFromMapByName,
    getBudgetGroupFromMap: getBudgetItemFromMap,
    loadBudgetCategories,
    updateBudgetItem,
  } = budgetStore;

  const { accountStore } = useStore();
  const { addBudgetToTransaction, updateTransaction } = accountStore;

  const [availableBudgetItems, setAvailableBudgetItems] = useState<string[]>(
    []
  );

  const [searchValue, setSearchValue] = useState("");

  async function HandleChangingBudgetItem(value: string | null) {
    if (value === null) {
      runInAction(() => {
        transaction.budgetItemId = undefined;
      })
      await updateTransaction(transaction);
      onSubmit();
      return;
    }

    const budgetItem = getBudgetItemFromMapByName(value!);

    if (budgetItem === null) return;

    const budget = getBudgetItemFromMapByName(value)!;
    addBudgetToTransaction(transaction, budget);

    await updateBudgetItem(budget);
    onSubmit();
  }

  useEffect(() => {
    if (budgetCategories.size === 0) loadBudgetCategories();
    setAvailableBudgetItems(
      getAllBudgetItems()
        .map((b) => b.title)
        .sort((a, b) => a.localeCompare(b))
    );
  }, [budgetCategories.size, budgetCategories]);

  return (
    <Select
      name="budgetItemSelect"
      placeholder="Budget"
      allowDeselect
      data={[
        {
          group: "Selected",
          items: transaction.budgetItemId
            ? [getBudgetItemFromMap(transaction.budgetItemId)?.title!]
            : [],
        },
        {
          group: "Current Budgets",
          items: availableBudgetItems.filter(
            (b) => b !== getBudgetItemFromMap(transaction.budgetItemId)?.title!
          ),
        },
      ]}
      value={getBudgetItemFromMap(transaction.budgetItemId)?.title || ''}
      searchable
      onFocus={(event) => event.target.select()}
      onSearchChange={setSearchValue}
      onChange={(value) => {
        if (value) {
          setSearchValue(''); // Clear search when selecting
        }
        HandleChangingBudgetItem(value);
      }}
      nothingFoundMessage={
        <Text>No budget named {searchValue}. Please go to the dashboard to create it</Text>
      }
    />
  );
});
