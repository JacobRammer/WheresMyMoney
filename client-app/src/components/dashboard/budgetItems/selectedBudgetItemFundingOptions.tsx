import {Box, Button, Flex, NumberFormatter, Text} from "@mantine/core";
import {observer} from "mobx-react-lite";
import {useStore} from "../../../stores/store";
import {BudgetItem} from "../../../models/budgetItem";
import AssignedTransaction from "../../../models/assignedTransaction";
import {v4 as uuidv4} from "uuid";
import FundBudgetItemButton from "./buttons/fundBudgetItemButton.tsx";

export default observer(function SelectedBudgetItemFundingOptions() {
    const {budgetStore, accountStore} = useStore();
    const {primaryAccountId, updateAvailableBalance} = accountStore;
    const {selectedBudgetItem, updateBudgetItemFunding} = budgetStore;

    async function UpdateAssigned(assignedTransaction: AssignedTransaction) {
        await updateAvailableBalance(assignedTransaction)
    }

    async function UnfundBudgetItem() {
        const updatedBudgetItem = BudgetItem.fromBudgetItem(selectedBudgetItem!);
        if (updatedBudgetItem.assigned === 0) return;
        const tempAssigned = new AssignedTransaction(
            uuidv4(),
            selectedBudgetItem!.id,
            new Date(),
            updatedBudgetItem.assigned * -1,
            primaryAccountId
        );
        await updateBudgetItemFunding(updatedBudgetItem!, tempAssigned);
        await UpdateAssigned(tempAssigned);
    }

    return (
        <Box className="SelectedBudgetItemFundingOptions">
            <Box className="SelectedBudgetItemFundingOptionsButton">
                <Flex><FundBudgetItemButton variant='light'/></Flex>
            </Box>
            <Box>
                <Button
                    variant="light"
                    justify="space-between"
                    fullWidth
                    leftSection={<Text>Reset Assigned</Text>}
                    rightSection={
                        <NumberFormatter
                            value="0"
                            prefix="$ "
                            decimalScale={2}
                            fixedDecimalScale={true}
                        />
                    }
                    onClick={UnfundBudgetItem}
                    disabled={selectedBudgetItem!.assigned <= 0}
                />
            </Box>
        </Box>
    );
});
