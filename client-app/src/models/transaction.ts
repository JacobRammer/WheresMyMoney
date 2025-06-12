import { Payee } from "./payee";

export interface Transaction {
    id: string;
    title: string;
    amount: number;
    date: string;
    accountId: string;

    payee: Payee;
}

export class Transaction implements Transaction {

    constructor(id: string, title: string, amount: number, date: string, accountId: string, payee: Payee) {
        this.id = id;
        this.title = title;
        this.amount = amount;
        this.date = date;
        this.accountId = accountId;
        this.payee = payee;
    }
}