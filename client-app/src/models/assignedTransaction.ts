/**
 * Similar to a Transaction, but represents a 
 * transaction assigning money to a BudgetItem
 */
export interface IAssignedTransaction {
    id: string;
    budgetItemId: string;
    date: Date;
    amount: number;
}

/**
 * AssignedTransaction class to manage budget item assignments
 */
export default class AssignedTransaction implements IAssignedTransaction {
    id: string;
    budgetItemId: string;
    date: Date;
    amount: number;

    /**
     * Creates a new AssignedTransaction
     * @param id The id of the transaction
     * @param budgetItemId The BudgetItem Id
     * @param date The date money was assigned
     * @param amount The amount assigned
     */
    constructor(id: string, budgetItemId: string, date: Date, amount: number) {
        this.id = id;
        this.budgetItemId = budgetItemId;
        this.date = date;
        this.amount = amount;
    }
}
