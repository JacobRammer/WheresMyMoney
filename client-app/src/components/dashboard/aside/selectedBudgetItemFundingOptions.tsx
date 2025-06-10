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

    function FundBudgetItem(amountToAssign: number) {
        const updatedBudgetItem = BudgetItem.fromBudgetItem(selectedBudgetItem!);
        updatedBudgetItem.assigned = amountToAssign;
        updateBudgetItem(updatedBudgetItem);
    }

    return (
        <Box className='SelectedBudgetItemFundingOptions'>
            <Box className="SelectedBudgetItemFundingOptionsButton">
                <Button onClick={() => FundBudgetItem(amountNeededToReachTarget())}
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
                    onClick={() => FundBudgetItem(0)}/>
            </Box>
        </Box>
    )
})