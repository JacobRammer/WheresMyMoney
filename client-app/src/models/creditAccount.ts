export interface CreditAccount {
    id: string;
    name: string;
    balance: number;
    MonthlyPaymentDue: number;
    description: string;
}

export class CreditAccount implements CreditAccount {
    constructor(init?: CreditAccountValues) {
        Object.assign(this, init);
    }
}

export class CreditAccountValues {
    id?: string = undefined;
    name: string = '';
    balance: number = 0;
    MonthlyPaymentDue: number = 0;
    
    constructor(creditAccount?: CreditAccountValues) {
        if (creditAccount) {
            this.id = creditAccount.id;
            this.name = creditAccount.name;
            this.balance = creditAccount.balance;
            this.MonthlyPaymentDue = creditAccount.MonthlyPaymentDue;
        }
    }
}