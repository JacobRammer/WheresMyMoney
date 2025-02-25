import {CashAccount} from "../models/cashAccount.ts";
import {makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent.ts";
import {LoanAccount} from "../models/loanAccount.ts";
import {CreditAccount} from "../models/creditAccount.ts";
import {AccountBase} from "../models/accountBase.ts";

export default class AccountStore {
    cashAccountRegistry = new Map<string, CashAccount>();
    creditAccountRegistry = new Map<string, CreditAccount>();
    loanAccountRegistry = new Map<string, LoanAccount>();
    cashBalance: number = 0;
    creditBalance: number = 0;
    loanBalance: number = 0;
    
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
    
    getAccountBaseRegistry = () => {
        const accountBaseRegistry = new Map<string, AccountBase>();
        
        this.flattenCashAccountRegistry().map((account: CashAccount) => {
            accountBaseRegistry.set(account.id, new AccountBase(
                account.id, account.name, account.balance, account.description, account.accountType
            ));
        })

        this.creditAccountRegistry.forEach((account: CreditAccount) => {
            accountBaseRegistry.set(account.id, new AccountBase(
                account.id, account.name, account.balance, account.description, account.accountType
            ));
        })

        this.loanAccountRegistry.forEach((account: LoanAccount) => {
            accountBaseRegistry.set(account.id, new AccountBase(
                account.id, account.name, account.balance, account.description, account.accountType
            ));
        })
        
        return Array.from(accountBaseRegistry.values()).sort((a, b) => a.name.localeCompare(b.name));
    }
    createCashAccount = async(cashAccount: CashAccount) => {
        try {
            await agent.FinanceAccounts.createCashAccount(cashAccount);
            runInAction(() => this.cashAccountRegistry.set(cashAccount.id, cashAccount));
            
            // JS wants to fucking concatenate if i just add, lmao
            runInAction(() => this.cashBalance +=  parseInt(cashAccount.balance.toString()));
        } catch (error) {
            console.log(error)
        }
    }

    createCreditAccount = async(creditAccount: CreditAccount) => {
        try {
            await agent.FinanceAccounts.createCreditAccount(creditAccount);
            runInAction(() => this.creditAccountRegistry.set(creditAccount.id, creditAccount));

            // JS wants to fucking concatenate if i just add, lmao
            runInAction(() => this.creditBalance +=  parseInt(creditAccount.balance.toString()));
        } catch (error) {
            console.log(error)
        }
    }
    createLoanAccount = async(loanAccount: LoanAccount) => {
        try {
            await agent.FinanceAccounts.createLoanAccount(loanAccount);
            runInAction(() => this.loanAccountRegistry.set(loanAccount.id, loanAccount));

            // JS wants to fucking concatenate if i just add, lmao
            runInAction(() => this.loanBalance +=  parseInt(loanAccount.balance.toString()));
        } catch (error) {
            console.log(error)
        }
    }
    
    deleteAccount = async(accountType: string, id: string) => {
        if (accountType === "Savings" || accountType === "Checking") {
            await this.deleteCashAccount(id);
        }
        
        if (accountType === "Credit") {
            await this.deleteCreditAccount(id);
        }
        
        if (accountType === "Loan") {
            await this.deleteLoanAccount(id);
        }
    }
    
    deleteCashAccount = async(id: string) => {
        await agent.FinanceAccounts.deleteCashAccount(id).then(() => {
            runInAction(() => {
                const account = this.cashAccountRegistry.get(id)
                if (account !== undefined) {
                    this.cashBalance -= parseInt(account.balance.toString());
                }
                this.cashAccountRegistry.delete(id);
            })
        });
    }

    deleteCreditAccount = async(id: string) => {
        await agent.FinanceAccounts.deleteCreditAccount(id).then(() => {
            runInAction(() => {
                const account = this.creditAccountRegistry.get(id)
                if (account !== undefined) {
                    this.creditBalance -= parseInt(account.balance.toString());
                }
                this.creditAccountRegistry.delete(id);
            })
        });
    }

    deleteLoanAccount = async(id: string) => {
        await agent.FinanceAccounts.deleteLoanAccount(id).then(() => {
            runInAction(() => {
                const account = this.loanAccountRegistry.get(id)
                if (account !== undefined) {
                    this.loanBalance -= parseInt(account.balance.toString());
                }
                this.loanAccountRegistry.delete(id);
            })
        });
    }
}