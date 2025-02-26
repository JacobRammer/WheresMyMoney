import {AccountType} from "../enums/accountType.ts";

export interface Account {
    id: string;
    name: string;
    balance: number;
    description?: string;
    accountType: AccountType;
    interestRate?: number;
    monthlyPayment?: number;
}

export class Account implements Account {

    constructor(
        id: string,
        name: string,
        balance: number,
        accountType: string,
        description?: string,
        interestRate?: number,
        monthlyPayment?: number
    ) {
        this.id = id;
        this.name = name;
        this.balance = balance;
        this.description = description;
        this.interestRate = interestRate;
        this.monthlyPayment = monthlyPayment;

        if (accountType === "Savings") {
            this.accountType = AccountType.Savings;
        } else if (accountType === "Checking") {
            this.accountType = AccountType.Checking;
        } else if (accountType === "Credit") {
            this.accountType = AccountType.Credit;
        } else if (accountType === "Loan") {
            this.accountType = AccountType.Loan;
        } else {
            console.log("Error: Invalid account type")
            this.accountType = AccountType.None;
        }
    }
}