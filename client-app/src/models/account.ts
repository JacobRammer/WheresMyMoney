export interface Account {
    id: string;
    name: string;
    balance: number;
    description?: string;
    accountType: string;
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
        this.accountType = accountType;
    }
}