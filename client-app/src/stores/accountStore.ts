import {makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent.ts";
import {Account} from "../models/account.ts";
import {Transaction} from "../models/transaction.ts";
import { Payee } from "../models/payee.ts";
import BudgetCategoryStore from "./budgetStore.ts";
import { BudgetItem } from "../models/budgetItem.ts";

const budgetCategoryStore = new BudgetCategoryStore();

const Savings = "Savings";
const Checking = "Checking";
const Credit = "Credit";
const Loan = "Loan";
export default class AccountStore {
    accountRegistry = new Map<string, Account>();

    payeeMap: Map<string, Payee> = new Map();
    
    /**
     * This is the primary balance where the assigned amounts for budget 
     * items will get taken out of
     *
     * @type {number}
     */
    checkingBalance: number = 0;
    savingsBalance: number = 0;
    creditBalance: number = 0;
    loanBalance: number = 0;
    numberOfTransactions: number = 0;
    
    


    constructor() {
        makeAutoObservable(this);
    }

    /**
     * Loads all of the payees from the DB
     */
    loadPayees = async () => {
        try {
            const payees = await agent.Payees.GetAllPayees();

            runInAction(() => {
                this.payeeMap = new Map();
                payees.forEach((payee: Payee) => {
                    this.payeeMap.set(payee.payeeName, payee);
                })
            })
        } catch (error) {
            console.log(error); 
        }
    }

    createPayee = async (payee: Payee) => {

        try {

            if (this.payeeMap.has(payee.payeeName)) {
                return;
            }

            this.payeeMap.set(payee.payeeName, payee);
            await agent.Payees.CreatePayee(payee);

        } catch (error) {
            console.log(error);
        }
    }

    loadAccounts = async () => {
        
        try {
            const account = await agent.FinanceAccounts.getAllAccounts();
            
            // Reset the cash balance on load
            runInAction(() => {
                this.savingsBalance = 0;
                this.loanBalance = 0;
                this.creditBalance = 0;
                this.checkingBalance = 0;
            })
            account.forEach((account: Account) => {
                this.setAccountRegistry(account);
                runInAction(() => {
                    this.sumAccountBalances(account);
                });
            })
            // this.setLoadingInitial(false);
        } catch (error) {
            console.log(error)
            // this.setLoadingInitial(false);
        }
    }

    private sumAccountBalances = (account: Account) => {
        // Why JS concatenates numbers instead of adding, I got no fucking clue
        // So we have to convert to a string for it to actually add, lmfao

        if (account.accountType === Savings) {
            this.savingsBalance += parseFloat(account.balance.toString())
        }

        else if (account.accountType == Checking) {
            this.checkingBalance += parseFloat(account.balance.toString())
        }

        else if (account.accountType === Credit) {
            this.creditBalance += parseFloat(account.balance.toString())
        } 
        
        else if (account.accountType === Loan) {
            this.loanBalance += parseFloat(account.balance.toString())
        }
    }

    private removeFromAccountBalance = (account: Account) => {
        // Why JS concatenates numbers instead of adding, I got no fucking clue
        // So we have to convert to a string for it to actually add, lmfao

        if (account.accountType === Savings) {
            this.savingsBalance -= parseFloat(account.balance.toString())
        } 

        else if (account.accountType == Checking) {
            this.checkingBalance -= parseFloat(account.balance.toString())
        }
        
        else if (account.accountType === Credit) {
            this.creditBalance -= parseFloat(account.balance.toString())
        } 
        
        else if (account.accountType === Loan) {
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
        return this.savingsBalance + this.loanBalance + this.creditBalance + this.checkingBalance;
    }
    createAccount = async (account: Account) => {
        try {
            await agent.FinanceAccounts.createAccount(account);
            runInAction(() => this.accountRegistry.set(account.id, account));
            this.sumAccountBalances(account);
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

    // Delete the transaction from the account and update the registry
    deleteTransaction = async (accountId: string, transaction: Transaction) => {
        try {
            await agent.Transactions.deleteTransaction(transaction.id);
            const updatedAccount = await agent.FinanceAccounts.getAccount(accountId);
            runInAction(() => {
                this.accountRegistry.set(accountId, updatedAccount);
                this.numberOfTransactions++;
            })
        } catch (error) {
            console.log(error);
        }
    }

    createTransaction = async (account: Account, transaction: Transaction) => {
        try {
            await agent.Transactions.addTransaction(transaction);
            const updatedAccount = await agent.FinanceAccounts.getAccount(account.id);
            runInAction(() => {
                this.accountRegistry.set(account.id, updatedAccount);
                this.numberOfTransactions++;
            })
        } catch (error) {
            console.log(error);
        }
    }

    updateTransaction = async (transaction: Transaction) => {
        try {
            await agent.Transactions.updateTransaction(transaction);
            const account = this.accountRegistry.get(transaction.accountId);
            if (account) {
                const idx = account.transactions.findIndex(t => t.id === transaction.id);
                if (idx !== -1) {
                    runInAction(() => {
                        account.transactions[idx] = { ...account.transactions[idx], ...transaction };
                    });
                }
            }
            const updatedAccount = account;
            runInAction(() => {
                if (updatedAccount) {
                    this.accountRegistry.set(transaction.accountId, updatedAccount);
                }
                this.numberOfTransactions++;
            })
        } catch (error) {
            console.log(error);
        }
    }

    addBudgetToTransaction = async (transaction: Transaction, budgetItem: BudgetItem) => {
        runInAction(() => {
            transaction.budgetItemId = budgetItem.id;
            budgetItem.outflow += transaction.amount;
            this.updateTransaction(transaction);
        });

        // try {
        //     await this.updateTransaction(transaction);
        // } catch (error) {
        //     console.log(error);
        // }
        return budgetItem;
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

    getPayeeBudgetItem = (accountId: string, budgetId: string) => {

        if (accountId === null || budgetId === null)
            return;
        const account = this.accountRegistry.get(accountId);

        if (account === undefined)
            return;

        const budgetItem = budgetCategoryStore.getBudgetItemById(budgetId);

        if (budgetItem === undefined)
            return;

        return budgetItem.title;

    }

    /**
     * Returns the total cash balance (checking + savings)
     */
    get cashBalance(): number {
        return this.checkingBalance + this.savingsBalance;
    }
}