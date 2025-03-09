import {makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent.ts";
import {Account} from "../models/account.ts";

const Savings = "Savings";
const Checking = "Checking";
const Credit = "Credit";
const Loan = "Loan";
export default class AccountStore {
    accountRegistry = new Map<string, Account>();
    cashBalance: number = 0;
    creditBalance: number = 0;
    loanBalance: number = 0;


    constructor() {
        makeAutoObservable(this);
    }

    loadAccounts = async () => {
        
        try {
            const account = await agent.FinanceAccounts.getAllAccounts();
            
            // Reset the cash balance on load
            runInAction(() => {
                this.cashBalance = 0;
                this.loanBalance = 0;
                this.creditBalance = 0;
            })
            account.forEach((account: Account) => {
                this.setAccountRegistry(account);
                runInAction(() => {
                    this.addSumToAccountBalance(account);
                });
            })
            // this.setLoadingInitial(false);
        } catch (error) {
            console.log(error)
            // this.setLoadingInitial(false);
        }
    }

    private addSumToAccountBalance = (account: Account) => {
        // Why JS concatenates numbers instead of adding, I got no fucking clue
        // So we have to convert to a string for it to actually add, lmfao

        if (account.accountType === Savings ||
            account.accountType === Checking) {
            this.cashBalance += parseFloat(account.balance.toString())
        }

        if (account.accountType === Credit) {
            this.creditBalance += parseFloat(account.balance.toString())
        } else if (account.accountType === Loan) {
            this.loanBalance += parseFloat(account.balance.toString())
        }
    }

    private removeFromAccountBalance = (account: Account) => {
        // Why JS concatenates numbers instead of adding, I got no fucking clue
        // So we have to convert to a string for it to actually add, lmfao

        if (account.accountType === Savings ||
            account.accountType === Checking) {
            this.cashBalance -= parseFloat(account.balance.toString())
        } else if (account.accountType === Credit) {
            this.creditBalance -= parseFloat(account.balance.toString())
        } else if (account.accountType === Loan) {
            this.loanBalance -= parseFloat(account.balance.toString())
        }
    }

    private setAccountRegistry = (account: Account) => {
        this.accountRegistry.set(account.id, account);
    }
    
    flattenCashAccountRegistry = () => {
        return Array.from(this.accountRegistry.values());
    }
    
    totalBalance = () => {
        return this.cashBalance + this.loanBalance + this.creditBalance;
    }
    createAccount = async (account: Account) => {
        try {
            await agent.FinanceAccounts.createAccount(account);
            runInAction(() => this.accountRegistry.set(account.id, account));
            this.addSumToAccountBalance(account);
        } catch (error) {
            console.log(error)
        }
    }

    editAccount = async (account: Account) => {
        try {
            await agent.FinanceAccounts.editAccount(account);
            runInAction(() => {
                this.accountRegistry.set(account.id, account);
            })
        } catch (error) {
            console.log(error);
        }
    }

    deleteAccount = async (id: string) => {
        try {
            await agent.FinanceAccounts.deleteAccount(id);
            runInAction(() => {
                const account = this.accountRegistry.get(id)
                if (account !== undefined) {
                    this.removeFromAccountBalance(account);
                }
                this.accountRegistry.delete(id);
            })
        } catch (error) {
            console.log(error)
        }
    }

    getCashAccounts = () => {
        return Array.from(this.accountRegistry.values()).filter(account => account.accountType === Savings || account.accountType === Checking);
    }

    getCreditAccounts = () => {
        return Array.from(this.accountRegistry.values()).filter(account => account.accountType === Credit);
    }

    getLoanAccounts = () => {
        return Array.from(this.accountRegistry.values()).filter(account => account.accountType === Loan);
    }

    getAllAccounts = () => {
        return Array.from(this.accountRegistry.values());
    }
}