import axios, {AxiosResponse} from "axios";
import {BudgetCategory} from "../models/budgetCategory.ts";
import {CashAccount} from "../models/cashAccount.ts";
import {CreditAccount} from "../models/creditAccount.ts";
import {LoanAccount} from "../models/loanAccount.ts";

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
    getCashAccounts: () => requests.get<CashAccount[]>('/CashAccount'),
    getCreditAccounts: () => requests.get<CreditAccount[]>('/CreditAccount'),
    getLoanAccounts: () => requests.get<LoanAccount[]>('/LoanAccount'),
    createCashAccount: (account: CashAccount) => requests.post('/CashAccount', account),
    createCreditAccount: (account: CreditAccount) => requests.post('/CreditAccount', account),
    createLoanAccount: (account: LoanAccount) => requests.post('/LoanAccount', account),
    deleteCashAccount: (id: string) => requests.del(`/CashAccount/${id}`),
    deleteCreditAccount: (id: string) => requests.del(`/CreditAccount/${id}`),
    deleteLoanAccount: (id: string) => requests.del(`/LoanAccount/${id}`),
// (activity: ActivityFormValues) => requests.post('/activities', activity),
}

const agent = {
    BudgetCategories,
    FinanceAccounts
}

export default agent;
