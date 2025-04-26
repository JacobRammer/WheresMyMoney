import axios, {AxiosResponse} from "axios";
import {BudgetCategory} from "../models/budgetCategory.ts";
import {Account} from "../models/account.ts";
import {Transaction} from "../models/transaction.ts";

axios.defaults.baseURL = 'http://localhost:5241/api';

const responseBody =  <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody),
}

const BudgetCategories = {
    list: () => requests.get<BudgetCategory[]>('/BudgetGroup'),
    details: (id: string) => requests.get<BudgetCategory>(`/BudgetGroup/${id}`),
    // create: (activity: ActivityFormValues) => requests.post('/BudgetGroup', activity),
    // update: (activity: ActivityFormValues) => requests.put(`/BudgetGroup/${activity.id}`, activity),
    delete: (id: string) => requests.del(`/BudgetGroup/${id}`),
}

const FinanceAccounts = {
    getAllAccounts: () => requests.get<Account[]>('/Account'),
    getAccount: (id: string) => requests.get<Account>(`/Account/${id}`),
    createAccount: (account: Account) => requests.post('/Account', account),
    editAccount: (account: Account) => requests.put('/Account', account),
    deleteAccount: (id: string) => requests.del(`/Account/${id}`),
}

const Transactions = {
    deleteTransaction: (id: string) => requests.del(`/Transaction/${id}`),
    addTransaction: (transaction: Transaction) => requests.post('/Transaction', transaction),
    updateTransaction: (transaction: Transaction) => requests.put('/Transaction', transaction),
}

const agent = {
    BudgetCategories,
    FinanceAccounts,
    Transactions
}

export default agent;
