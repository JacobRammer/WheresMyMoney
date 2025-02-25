/// Represents a base account that has the least amount of information exposed

export interface AccountBase {
    id: string;
    name: string;
    balance: number;
    description: string;
    accountType: string;
}

export class AccountBase implements AccountBase {
    constructor(id: string, name: string, balance: number, description: string, accountType: string) {
        this.id = id;
        this.name = name;
        this.balance = balance;
        this.description = description;
        this.accountType = accountType;
    }
}