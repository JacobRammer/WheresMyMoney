import BudgetCategoryStore from "./budgetStore.ts";
import {createContext, useContext} from "react";
import AccountStore from "./accountStore.ts";

interface Store {
    budgetStore: BudgetCategoryStore;
    accountStore: AccountStore
}

export const store: Store = {
    budgetStore: new BudgetCategoryStore(),
    accountStore: new AccountStore(),
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}