import {Transaction} from "./transaction.ts";

export interface Account {
    id: string;
    name: string;
    balance: number;
    available: number;
    description?: string;
    accountType: string;
    interestRate?: number;
    monthlyPayment?: number;
    transactions: Transaction[];
}

export class Account implements Account {

    constructor(
        id: string,
        name: string,
        balance: number,
        accountType: string,
        available: number,
        description?: string,
        interestRate?: number,
        monthlyPayment?: number,
        transactions?: Transaction[],
    ) {
        this.id = id;
        this.name = name;
        this.balance = balance;
        this.description = description;
        this.available = available;
        this.interestRate = interestRate;
        this.monthlyPayment = monthlyPayment;
        this.accountType = accountType;
        this.transactions = transactions ?? [];
    }
}