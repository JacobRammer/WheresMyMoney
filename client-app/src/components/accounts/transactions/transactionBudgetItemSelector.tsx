import { Button, Select } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { BudgetItem } from '../../../models/budgetItem';
import { useStore } from '../../../stores/store';
import { Transaction } from '../../../models/transaction';
import { useEffect, useState } from 'react';
import { runInAction } from 'mobx';

interface Props {
    transaction: Transaction;
}

export default observer(function TransactionBudgetItemSelector({transaction}: Props) {
    
    const {budgetStore} = useStore();
    const { getAllBudgetItems, budgetCategories, getBudgetGroupFromMapByName: getBudgetItemFromMapByName, getBudgetGroupFromMap: getBudgetItemFromMap, loadBudgetCategories, updateBudgetItem } = budgetStore;

    const {accountStore} = useStore();
    const { addBudgetToTransaction } = accountStore;

    const [availableBudgetItems, setAvailableBudgetItems] = useState<string[]>([]);

    const [searchValue, setSearchValue] = useState('');

    async function HandleChangingBudgetItem(value: string | null) {
        if (value === null)
            return;

        const budgetItem = getBudgetItemFromMapByName(value!);

        if (budgetItem === null)
            return;

        const budget = getBudgetItemFromMapByName(value)!;
        addBudgetToTransaction(transaction, budget);
        updateBudgetItem(budget);
    }

    useEffect(() => {
        if (budgetCategories.size === 0)
            loadBudgetCategories();
        setAvailableBudgetItems(getAllBudgetItems()
            .map(b => b.title).sort((a, b) => a.localeCompare(b)));
    }, [budgetCategories.size, budgetCategories])

    return (
        <Select
            name="budgetItemSelect"
            placeholder="Pick value"
            data={[
                { group: "Selected", items: transaction.budgetItemId ? [getBudgetItemFromMap(transaction.budgetItemId)?.title!] : [] },
                {
                    group: "Saved Payees",
                    items: availableBudgetItems.filter(b => b !== getBudgetItemFromMap(transaction.budgetItemId)?.title!)
                }
            ]}
            value={getBudgetItemFromMap(transaction.budgetItemId)?.title!}
            searchable
            onFocus={(event) => event.target.select()}
            onSearchChange={setSearchValue}
            onChange={(value) => {
                HandleChangingBudgetItem(value)
            }}
            nothingFoundMessage={
                <Button
                    variant="light"
                    radius="md"
                    style={{ maxWidth: '200px' }} // maybe pop open a modal?
                    onClick={() => console.log("hi")}>
                    Create "{searchValue}"
                </Button>
            }
        />
    );
});