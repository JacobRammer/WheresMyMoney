import {makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent.ts";
import {BudgetGroup} from "../models/budgetGroup.ts";
import {BudgetItem} from "../models/budgetItem.ts";
import AssignedTransaction from "../models/assignedTransaction.ts";

export default class BudgetCategoryStore {
    budgetCategories = new Map<string, BudgetGroup>();

    selectedBudgetItem: BudgetItem | undefined = undefined;

    loading = false;

    hoveredBudgetItem: BudgetItem | undefined;

    assignedLastMonth: number = 0;

    spentLastMonth: number = 0;

    /**
     * The month of the current budget
     *
     * @type {number}
     */
    activeDate: Date = new Date();

    monthListAbbreviated: string[] =
        [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "June",
            "July",
            "Aug",
            "Sept",
            "Oct",
            "Nov",
            "Dec",
        ];

    monthList: string[] =
        [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ]

    constructor() {
        makeAutoObservable(this)
    }

    setHoveredBudgetItem = (budgetItem: BudgetItem | undefined) => {
        runInAction(() => {
            this.hoveredBudgetItem = budgetItem;
        })
    }

    /**
     * Sets the activeDate
     * @param dateToSet the month as an int
     */
    setActiveDate = async (dateToSet: Date) => {
        runInAction(() => {
            this.activeDate = dateToSet;
        })
        await this.updatePreviousMonthSpendingInfo();
    }

    async updatePreviousMonthSpendingInfo() {
        await this.getAssignedLastMonth();
        await this.getSpentLastMonth();
    }

    async getAssignedLastMonth() {
        try {
            const assigned = await agent.AssignedTransactions.getAssignedForMonth(this.activeDate.getMonth());
            runInAction(() => {
                this.assignedLastMonth = assigned;
            })
        } catch (error) {
            console.log(error);
        }
    }

    async getSpentLastMonth() {
        try {
            const spent = await agent.Transactions.getSpendingForMonth(this.activeDate.getMonth());
            runInAction(() => {
                this.spentLastMonth = spent;
            })
        } catch (error) {
            console.log(error);
        }
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
            const budgetCategories = await agent.CategoryGroup.getBudgetGroups(this.activeDate.getMonth() + 1);
            await this.updatePreviousMonthSpendingInfo();
            budgetCategories.sort((a, b) => a.dateCreated.localeCompare(b.dateCreated));
            runInAction(() => {
                this.budgetCategories.clear();
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
                    this.loading = false;
                });
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }

    }

    sleep = async (msec: number) => {
        return new Promise(resolve => setTimeout(resolve, msec));
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
            this.setSelectedBudgetItem(category);
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
        await agent.Budgets.updateBudgetItemAssigned(assignedTransaction);
    }

    deleteBudgetItem = async (budgetItemId: string) => {
        try {
            await agent.Budgets.deleteBudgetItem(budgetItemId);

            runInAction(() => {
                // Find and remove the budget item from the store
                for (const group of this.budgetCategories.values()) {
                    const itemIndex = group.categories.findIndex(item => item.id === budgetItemId);
                    if (itemIndex !== -1) {
                        const budgetItem = group.categories[itemIndex];

                        // Update group totals by subtracting the deleted item's amounts
                        group.assigned -= budgetItem.assigned;
                        group.available -= budgetItem.available;

                        // Remove the item from the categories array
                        group.categories.splice(itemIndex, 1);
                        break;
                    }
                }

                // Clear selected item if it was the deleted one
                if (this.selectedBudgetItem?.id === budgetItemId) {
                    this.selectedBudgetItem = undefined;
                }
            });
        } catch (error) {
            console.error('Error deleting budget item:', error);
            throw error;
        }
    }

    updateBudgetGroup = async (budgetGroup: BudgetGroup) => {
        try {
            this.budgetCategories.set(budgetGroup.id, budgetGroup);
            await agent.Budgets.updateBudgetGroup(budgetGroup);
        } catch (error) {
            console.log(error);
        }

    }

    deleteBudgetGroup = async (budgetGroup: BudgetGroup) => {
        try {
            this.budgetCategories.delete(budgetGroup.id);
            await agent.Budgets.deleteBudgetGroup(budgetGroup.id);
        } catch (error) {
            console.log(error);
        }

    }
}