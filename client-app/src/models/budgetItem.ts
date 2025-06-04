export class BudgetItem {
    id: string;
    title: string;
    target: number;
    outflow: number;
    assigned: number;
    budgetGroupId: string;
    available: number;
    dateCreated: string


    constructor(id: string, name: string, categoryGroupId: string, dateCreated: string, assigned: number = 0, target: number = 0, outflow: number = 0) {
        this.id = id;
        this.title = name;
        this.assigned = assigned;
        this.target = target;
        this.outflow = outflow;
        this.budgetGroupId = categoryGroupId;
        this.available = this.availableBalance();
        this.dateCreated = dateCreated;
    }

    private availableBalance(): number {
        return this.assigned - this.outflow;
    }
}