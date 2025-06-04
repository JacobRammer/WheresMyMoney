import {makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent.ts";
import {BudgetGroup} from "../models/budgetGroup.ts";
import {BudgetItem} from "../models/budgetItem.ts";

export default class BudgetCategoryStore {
    budgetCategories = new Map<string, BudgetGroup>();

    constructor() {
        makeAutoObservable(this)
    }
    
    loadBudgetCategories = async () => {
        try {
            const budgetCategories = await agent.CategoryGroup.getBudgetGroups();
            budgetCategories.sort((a, b) => a.dateCreated.localeCompare(b.dateCreated));
            runInAction(() => {
                budgetCategories.forEach((budgetCategory: BudgetGroup) => {
                    // Convert plain categories to Category instances
                    budgetCategory.categories.sort((a, b) => a.dateCreated.localeCompare(b.dateCreated));
                    budgetCategory.categories = budgetCategory.categories.map(cat =>
                        new BudgetItem(
                            cat.id,
                            cat.title,
                            cat.budgetGroupId,
                            cat.dateCreated,
                            cat.assigned,
                            cat.target,
                            cat.outflow
                        )
                    );
                    this.budgetCategories.set(budgetCategory.id, budgetCategory);
                })
            })
        } catch (error) {
            console.log(error)
        }
    }

    updateCategory = async (category: BudgetItem) => {
        try {
            const categoryGroup = this.budgetCategories.get(category.budgetGroupId);
            
            if (categoryGroup === undefined) {
                console.log('Budget category group not found');
                return;
            }
            
            const budgetCategory = categoryGroup.categories.find(budgetCategory => budgetCategory.id === category.id);
            
            if (budgetCategory === undefined) {
                console.log('Budget category not found');
                return;
            }
            const assignedDifference = category.assigned - budgetCategory.assigned;
            const availableDifference = category.available - budgetCategory.available;

            await agent.Budgets.updateBudgetItem(category);
            
            runInAction(() => {
                categoryGroup.assigned += assignedDifference;
                categoryGroup.available += availableDifference;
                const categoryIndex = categoryGroup.categories.findIndex(c => c.id === category.id);
                if (categoryIndex !== -1) {
                    categoryGroup.categories[categoryIndex] = category;
                    
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    getBudgetCategoryMap = () => {
        return Array.from(this.budgetCategories.values());
    }

    // Are the budget items the same?
    isCategoryItemTheSame = (itemOne: BudgetItem, itemTwo: BudgetItem) => {

        return itemOne.assigned === itemTwo.assigned &&
            itemOne.outflow === itemTwo.outflow &&
            itemOne.target === itemTwo.target &&
            itemOne.title === itemTwo.title;
    }

    createBudgetItem = async (category: BudgetItem) => {
        try {
            await agent.Budgets.createBudgetItem(category);
            runInAction(() => {
                this.budgetCategories.get(category.budgetGroupId)?.categories.push(category);
            })
        } catch (error) {
            console.log(error)
        }
    }

    createBudgetGroup = async (budgetGroup: BudgetGroup) => {
        try {
            await agent.Budgets.createBudgetGroup(budgetGroup);
            runInAction(() => {
                this.budgetCategories.set(budgetGroup.id, budgetGroup);
            })
        } catch (error) {
            console.log(error)
        }
    }
}