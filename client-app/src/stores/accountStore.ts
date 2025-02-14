import {CashAccount} from "../models/cashAccount.ts";
import {makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent.ts";
import {LoanAccount} from "../models/loanAccount.ts";
import {CreditAccount} from "../models/creditAccount.ts";

export default class AccountStore {
    cashAccountRegistry = new Map<string, CashAccount>();
    creditAccountRegistry = new Map<string, CreditAccount>();
    loanAccountRegistry = new Map<string, LoanAccount>();
    cashBalance = 0;
    creditBalance = 0;
    loanBalance = 0;
    
    constructor() {
        makeAutoObservable(this);
    }
    
    loadCashAccounts = async() => {
        
        try {
            const account = await agent.FinanceAccounts.getCashAccounts();
            
            // Reset the cash balance on load
            runInAction(() => this.cashBalance = 0)
            account.forEach((accountType: CashAccount) => {
                this.setCashRegistry(accountType);
                runInAction(() => this.cashBalance += accountType.balance);
            })
            // this.setLoadingInitial(false);
        } catch (error) {
            console.log(error)
            // this.setLoadingInitial(false);
        }
    }
    
    loadCreditAccounts = async() => {
        try {
            const creditAccounts = await agent.FinanceAccounts.getCreditAccounts();
            runInAction(() => this.creditBalance = 0);
            creditAccounts.forEach((accountType: CreditAccount) => {
                this.setCreditRegistry(accountType);
                runInAction(() => this.creditBalance += accountType.balance);
            })
        } catch (error) {
            console.log(error)
        }
    }
    
    loadLoanAccounts = async() => {
        try {
            const account = await agent.FinanceAccounts.getLoanAccounts();

            // Reset the cash balance on load
            runInAction(() => this.loanBalance = 0)
            account.forEach((accountType: LoanAccount) => {
                this.setLoanAccount(accountType);
                runInAction(() => this.loanBalance += accountType.balance);
            })
            // this.setLoadingInitial(false);
        } catch (error) {
            console.log(error)
            // this.setLoadingInitial(false);
        }
    }
    
    getCashAccounts = () => {
        return this.cashAccountRegistry.get("cash");
    }

    private setCashRegistry = (budget: CashAccount) => {
        this.cashAccountRegistry.set(budget.id, budget);
    }
    
    private setCreditRegistry = (account: CreditAccount) => {
        this.creditAccountRegistry.set(account.id, account);
    }
    
    private setLoanAccount = (account: LoanAccount) => {
        this.loanAccountRegistry.set(account.id, account);
    }
    
    flattenCashAccountRegistry = () => {
        return Array.from(this.cashAccountRegistry.values());
    }
    
    flattenCreditAccountRegistry = () => {
        return Array.from(this.creditAccountRegistry.values());
    }
    
    flattenLoanAccountRegistry = () => {
        return Array.from(this.loanAccountRegistry.values());
    }
    
    loadAllAccounts = async() => {
        if (this.cashAccountRegistry.size === 0) {
            await this.loadCashAccounts();
        }
        
        if (this.loanAccountRegistry.size === 0) {
            await this.loadLoanAccounts();
        }
        
        if (this.loanAccountRegistry.size === 0) {
            await this.loadCreditAccounts();
        }
    }
    
    totalBalance = () => {
        return this.cashBalance + this.loanBalance + this.creditBalance;
    }
}