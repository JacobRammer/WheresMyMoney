export interface LoanAccount {
    id: string;
    name: string;
    balance: number;
    interestRate: number;
    monthlyPayment: number;
    description: string;
    accountType: string;
}

export class LoanAccount implements LoanAccount {
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