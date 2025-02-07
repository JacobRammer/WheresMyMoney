import {CashAccount} from "../models/cashAccount.ts";
import {makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent.ts";

export default class AccountStore {
    accountRegistry = new Map<string, CashAccount>();
    cashBalance = 0;
    
    constructor() {
        makeAutoObservable(this);
    }
    
    loadAccounts = async() => {
        
        try {
            const account = await agent.FinanceAccounts.getCashAccounts();
            
            // Reset the cash balance on load
            runInAction(() => this.cashBalance = 0)
            account.forEach((accountType: CashAccount) => {
                this.setActivity(accountType);
                runInAction(() => this.cashBalance += accountType.balance);
            })
            // this.setLoadingInitial(false);
        } catch (error) {
            console.log(error)
            // this.setLoadingInitial(false);
        }
    }
    
    getCashAccounts = () => {
        return this.accountRegistry.get("cash");
    }

    private setActivity = (budget: CashAccount) => {
        this.accountRegistry.set(budget.id, budget);
    }
    
    flattenRegistry = () => {
        return Array.from(this.accountRegistry.values());
    }
}