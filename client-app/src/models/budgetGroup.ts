import {Category} from "./Category.ts";

export class BudgetGroup {
    id: string;
    title: string;
    categories: Category[];
    assigned: number;
    outflow: number;
    available: number;

    constructor(id: string, name: string, categories: Category[], amountAssigned: number, outflow: number) {
        this.id = id;
        this.title = name;
        this.categories = categories;
        this.assigned = amountAssigned;
        this.outflow = outflow;
        this.available = this.availableBalance();
    }

    public availableBalance = () => {
        return this.assigned - this.outflow;
    }
}