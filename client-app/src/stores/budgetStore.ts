import {BudgetCategory} from "../models/budgetCategory.ts";
import {makeAutoObservable} from "mobx";
import agent from "../api/agent.ts";

export default class BudgetCategoryStore {
    budgetCategoryRegistry = new Map<string, BudgetCategory>();

    constructor() {
        makeAutoObservable(this)
    }

    loadBudgets = async () => {
        // this.setLoadingInitial(true);
        try {
            const budgets = await agent.BudgetCategories.list();
            budgets.forEach(budget => {
                this.setActivity(budget);
            })
            // this.setLoadingInitial(false);
        } catch (error) {
            console.log(error)
            // this.setLoadingInitial(false);
        }
    }
    private setActivity = (budget: BudgetCategory) => {
        
        this.budgetCategoryRegistry.set(budget.id, budget);
    }
}