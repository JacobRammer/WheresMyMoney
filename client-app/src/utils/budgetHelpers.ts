import { BudgetItem } from "../models/budgetItem";
import { BudgetItemAvailableStyling } from "../constants/budgetItemAvailableStyling";

export const getBudgetItemColor = (budgetItem?: BudgetItem): string | undefined => {
    if (!budgetItem) return undefined;

    if (budgetItem.available < 0 || budgetItem.outflow > budgetItem.target) {
        return BudgetItemAvailableStyling.COLOR.RED;
    }
    
    if (budgetItem.assigned === 0) {
        return BudgetItemAvailableStyling.COLOR.GREYISH;
    }
    
    if (budgetItem.outflow <= budgetItem.target) {
        return BudgetItemAvailableStyling.COLOR.GREEN;
    }

    return undefined;
};