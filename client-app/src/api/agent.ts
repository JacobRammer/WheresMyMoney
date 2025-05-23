import axios, {AxiosResponse} from "axios";
import {Account} from "../models/account.ts";
import {Transaction} from "../models/transaction.ts";
import {BudgetGroup} from "../models/budgetGroup.ts";
import {Category} from "../models/Category.ts";

axios.defaults.baseURL = 'http://localhost:5241/api';

const responseBody =  <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody),
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

const CategoryGroup = {
    getBudgetGroups: () => requests.get<BudgetGroup[]>('/CategoryGroup'),
    getBudgetGroupById: (id: string) => requests.get<BudgetGroup[]>(`/CategoryGroup/${id}`),
}

const Categories = {
    updateCategory: (category: Category) => requests.put<Category>('/Category', category),
    createCategory: (category: Category) => requests.post<Category>('/Category', category),
}

const agent = {
    CategoryGroup,
    FinanceAccounts,
    Transactions,
    Categories,
}

export default agent;
