import {BudgetItem} from "./budgetItem.ts";

export class BudgetGroup {
    id: string;
    title: string;
    categories: BudgetItem[];
    assigned: number;
    outflow: number;
    available: number;
    dateCreated: string;

    constructor(id: string, name: string, dateCreated: string, categories: BudgetItem[] = [], amountAssigned: number = 0, outflow: number = 0) {
        this.id = id;
        this.title = name;
        this.categories = categories;
        this.assigned = amountAssigned;
        this.outflow = outflow;
        this.dateCreated = dateCreated;
        this.available = this.availableBalance();
    }

    public availableBalance = () => {
        return this.assigned - this.outflow;
    }
}