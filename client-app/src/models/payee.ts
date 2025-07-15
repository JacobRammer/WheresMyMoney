export class Payee {
    id: string;
    payeeName: string;

    lastBudgetItem: string;

    constructor(id: string, title: string, lastBudgetItem: string = "") {
        this.id = id;
        this.payeeName = title;
        this.lastBudgetItem = lastBudgetItem;
    }
}