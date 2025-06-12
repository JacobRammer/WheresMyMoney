import { Box, Button, NumberFormatter, Text } from "@mantine/core";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../stores/store";
import { BudgetItem } from "../../../models/budgetItem";

export default observer(function SelectedBudgetItemFundingOptions() {

    const {budgetStore} = useStore();
    const {selectedBudgetItem, updateBudgetItem} = budgetStore;

    function amountNeededToReachTarget() {
        if (selectedBudgetItem!.assigned >= selectedBudgetItem!.target && selectedBudgetItem!.available >= 0)
            return 0;
        return Math.max(Math.abs(selectedBudgetItem!.target - selectedBudgetItem!.assigned),
            selectedBudgetItem!.outflow);
    }

    function FundBudgetItem() {
        const updatedBudgetItem = BudgetItem.fromBudgetItem(selectedBudgetItem!);
        const amountNeeded = amountNeededToReachTarget();
        if (amountNeeded == 0)
            return;
        updatedBudgetItem.assigned += amountNeeded;
        updateBudgetItem(updatedBudgetItem);
    }

    function UnfundBudgetItem()
    {
        const updatedBudgetItem = BudgetItem.fromBudgetItem(selectedBudgetItem!);
        if (updatedBudgetItem.assigned === 0)
            return;
        updatedBudgetItem.assigned = 0;
        updateBudgetItem(updatedBudgetItem);
    }

    return (
        <Box className='SelectedBudgetItemFundingOptions'>
            <Box className="SelectedBudgetItemFundingOptionsButton">
                <Button onClick={FundBudgetItem} disabled={amountNeededToReachTarget() <= 0}
                    variant="light"
                    fullWidth
                    leftSection={<Text>Underfunded</Text>}
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
                </Box>
            <Box>
                <Button variant="light" justify="space-between" fullWidth leftSection={<Text>Reset Assigned</Text>}
                    rightSection={<NumberFormatter value='0' prefix="$ " decimalScale={2} fixedDecimalScale={true} />} 
                    onClick={UnfundBudgetItem} disabled={selectedBudgetItem!.assigned <= 0}/>
            </Box>
        </Box>
    )
})