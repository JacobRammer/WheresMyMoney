import {makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent.ts";
import {BudgetGroup} from "../models/budgetGroup.ts";
import {Category} from "../models/Category.ts";

export default class BudgetCategoryStore {
    budgetCategories = new Map<string, BudgetGroup>();

    constructor() {
        makeAutoObservable(this)
    }
    
    loadBudgetCategories = async () => {
        try {
            const budgetCategories = await agent.CategoryGroup.getBudgetGroups();
            runInAction(() => {
                budgetCategories.forEach((budgetCategory: BudgetGroup) => {
                    // Convert plain categories to Category instances
                    budgetCategory.categories = budgetCategory.categories.map(cat => 
                        new Category(
                            cat.id,
                            cat.title,
                            cat.categoryGroupId,
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
    
    updateCategory = async (category: Category) => {
        try {
            const categoryGroup = this.budgetCategories.get(category.categoryGroupId);
            
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
            
            await agent.Categories.updateCategory(category);
            
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
    isCategoryItemTheSame = (itemOne: Category, itemTwo: Category) => {

        return itemOne.assigned === itemTwo.assigned &&
            itemOne.outflow === itemTwo.outflow &&
            itemOne.target === itemTwo.target &&
            itemOne.title === itemTwo.title;
    }

    createCategory = async (category: Category) => {
        try {
            await agent.Categories.createCategory(category);
            runInAction(() => {
                this.budgetCategories.get(category.categoryGroupId)?.categories.push(category);
            })
        } catch (error) {
            console.log(error)
        }
    }
}