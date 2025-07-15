import { Payee } from "./payee";

export interface Transaction {
    id: string;
    title: string;
    amount: number;
    date: string;
    accountId: string;

    payee: Payee | null;

    budgetItemId: string | undefined
}

export class Transaction implements Transaction {

    constructor(id: string, title: string, amount: number, date: string, accountId: string, payee: Payee, budgetItemId: string | undefined = undefined) {
        this.id = id;
        this.title = title;
        this.amount = amount;
        this.date = date;
        this.accountId = accountId;
        this.payee = payee;
        this.budgetItemId = budgetItemId;
    }
}