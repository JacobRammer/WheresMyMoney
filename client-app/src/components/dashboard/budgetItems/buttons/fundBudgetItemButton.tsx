import {observer} from "mobx-react-lite";
import {Button, NumberFormatter, Text} from "@mantine/core";
import {BudgetItem} from "../../../../models/budgetItem.ts";
import AssignedTransaction from "../../../../models/assignedTransaction.ts";
import {v4 as uuidv4} from "uuid";
import {useStore} from "../../../../stores/store.ts";

interface Props {
    variant?: string;
    color?: string;
    text?: string;
}

export default observer(function FundBudgetItemButton({
                                                          variant = "filled",
                                                          color = "blue",
                                                          text = "Underfunded"
                                                      }: Props) {

    const {budgetStore, accountStore} = useStore();
    const {primaryAccountId, updateAvailableBalance} = accountStore;
    const {updateBudgetItemFunding, selectedBudgetItem} = budgetStore

    function amountNeededToReachTarget() {
        if (
            selectedBudgetItem!.assigned >= selectedBudgetItem!.target &&
            selectedBudgetItem!.available >= 0
        )
            return 0;
        return Math.max(
            Math.abs(selectedBudgetItem!.target - selectedBudgetItem!.assigned),
            selectedBudgetItem!.outflow
        );
    }

    async function UpdateAssigned(assignedTransaction: AssignedTransaction) {
        await updateAvailableBalance(assignedTransaction)
    }

    async function FundBudgetItem() {
        const updatedBudgetItem = BudgetItem.fromBudgetItem(selectedBudgetItem!);
        const amountNeeded = amountNeededToReachTarget();
        if (amountNeeded == 0) return;
        const tempAssigned = new AssignedTransaction(
            uuidv4(),
            selectedBudgetItem!.id,
            new Date(),
            amountNeeded,
            primaryAccountId
        );
        await updateBudgetItemFunding(updatedBudgetItem!, tempAssigned);
        await UpdateAssigned(tempAssigned);

    }

    return (
        <Button
            radius='lg'
            onClick={FundBudgetItem}
            disabled={amountNeededToReachTarget() <= 0}
            color={color}
            variant={variant}
            w='100%'
            leftSection={<Text>{text}</Text>}
            rightSection={
                <NumberFormatter
                    value={amountNeededToReachTarget()}
                    prefix="$ "
                    decimalScale={2}
                    fixedDecimalScale={true}
                />
            }
            justify="space-between"
        />
    )
})