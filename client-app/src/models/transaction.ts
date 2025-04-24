export interface Transaction {
    id: string;
    title: string;
    amount: number;
    date: Date;
}

export class Transaction implements Transaction {

    constructor(id: string, title: string, amount: number, date: Date) {
        this.id = id;
        this.title = title;
        this.amount = amount;
        this.date = date;
    }
}