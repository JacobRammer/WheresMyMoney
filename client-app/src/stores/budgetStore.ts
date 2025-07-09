import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent.ts";
import { BudgetGroup } from "../models/budgetGroup.ts";
import { BudgetItem } from "../models/budgetItem.ts";
import AssignedTransaction from "../models/assignedTransaction.ts";

export default class BudgetCategoryStore {
    budgetCategories = new Map<string, BudgetGroup>();

    selectedBudgetItem: BudgetItem | undefined = undefined;

    loading = false;


    /**
     * The month of the current budget
     *
     * @type {number}
     */
    activeDate: number = new Date().getMonth();

    constructor() {
        makeAutoObservable(this)
    }

    /**
     * Sets the activeDate
     * @param dateToSet the month as an int
     */
    setActiveDate = (dateToSet: number) => {
        runInAction(() => {
            this.activeDate = dateToSet;
        })
    }

    getBudgetItemsByMonth = (budgetGroup: BudgetGroup) => {
        return budgetGroup.categories;
    }

    setSelectedBudgetItem = (budgetItem: BudgetItem | undefined) => {
        runInAction(() => this.selectedBudgetItem = budgetItem)
    }

    loadBudgetCategories = async () => {
        this.loading = true;
        try {
            const budgetCategories = await agent.CategoryGroup.getBudgetGroups();
            budgetCategories.sort((a, b) => a.dateCreated.localeCompare(b.dateCreated));
            runInAction(() => {
                budgetCategories.forEach((budgetCategory: BudgetGroup) => {
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
                });
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    updateBudgetItem = async (category: BudgetItem) => {
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
                    this.selectedBudgetItem = category;

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

    getBudgetItemById = (id: string) => {
        if (this.budgetCategories.size === 0)
            this.loadBudgetCategories()
        return this.budgetCategories.get(id);
    }

    getBudgetGroupByBudgetItem = (id: string) => {
        for (const [groupId, group] of this.budgetCategories.entries()) {
            if (group.categories.find(category => category.id === id)) {
                return this.budgetCategories.get(groupId);
            }
        }
        return undefined
    }

    getBudgetGroupFromMap = (id: string | undefined) => {
        if (id === undefined)
            return;
        for (const [groupId, group] of this.budgetCategories.entries()) {
            if (group.categories.find(category => category.id === id)) {
                const budgetGroup = this.budgetCategories.get(groupId);
                return budgetGroup?.categories.find(c => c.id === id);
            }
        }
        return undefined
    }

    getBudgetGroupFromMapByName = (id: string) => {
        for (const [groupId, group] of this.budgetCategories.entries()) {
            if (group.categories.find(category => category.title === id)) {
                const budgetGroup = this.budgetCategories.get(groupId);
                return budgetGroup?.categories.find(c => c.title === id);
            }
        }
        return undefined
    }

    getAllBudgetItems = (): BudgetItem[] => {
        const items: BudgetItem[] = [];
        this.budgetCategories.forEach(group => {
            items.push(...group.categories);
        });
        return items;
    }

    updateBudgetItemFunding = async (budgetItem: BudgetItem, assignedTransaction: AssignedTransaction) => {
        runInAction(() => {
            budgetItem.assigned += assignedTransaction.amount;
        })
        await this.updateBudgetItem(budgetItem);
    }
}