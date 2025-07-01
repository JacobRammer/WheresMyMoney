export class BudgetItem {
    id: string;
    title: string;
    target: number;
    outflow: number;
    assigned: number;
    budgetGroupId: string;
    dateCreated: string;

    constructor(id: string, name: string, categoryGroupId: string, dateCreated: string, assigned: number = 0, target: number = 0, outflow: number = 0) {
        this.id = id;
        this.title = name;
        this.assigned = assigned;
        this.target = target;
        this.outflow = outflow;
        this.budgetGroupId = categoryGroupId;
        this.dateCreated = dateCreated;
    }

    private calculateAvailable(): number {
        return this.assigned - (-this.outflow);
    }

    // Getter for available
    get available(): number {
        return this.calculateAvailable();
    }

    static fromBudgetItem(budgetItem: BudgetItem): BudgetItem {
        return new BudgetItem(
            budgetItem.id,
            budgetItem.title,
            budgetItem.budgetGroupId,
            budgetItem.dateCreated,
            budgetItem.assigned,
            budgetItem.target,
            budgetItem.outflow
        );
    }
}