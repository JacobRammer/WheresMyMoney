export interface CreditAccount {
    id: string;
    name: string;
    balance: number;
    monthlyPayment: number;
    interestRate: number;
    description: string;
    accountType: string;
}

export class CreditAccount implements CreditAccount {
    constructor(id: string, name: string, balance: number, monthlyPaymentDue: number, 
                description: string, accountType: string, interestRate: number) {
        this.id = id;
        this.name = name;
        this.balance = balance;
        this.monthlyPayment = monthlyPaymentDue;
        this.description = description;
        this.accountType = accountType;
        this.interestRate = interestRate;
    }
}