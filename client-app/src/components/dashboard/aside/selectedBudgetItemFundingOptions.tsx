import {Box, Button, NumberFormatter, Text} from "@mantine/core";
import {observer} from "mobx-react-lite";
import {useStore} from "../../../stores/store";
import {BudgetItem} from "../../../models/budgetItem";
import AssignedTransaction from "../../../models/assignedTransaction";
import {v4 as uuidv4} from "uuid";

export default observer(function SelectedBudgetItemFundingOptions() {
  const {budgetStore, accountStore} = useStore();
  const {primaryAccountId, updateAvailableBalance} = accountStore;
  const { selectedBudgetItem, updateBudgetItemFunding } = budgetStore;

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

  function FundBudgetItem() {
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
    updateBudgetItemFunding(updatedBudgetItem!, tempAssigned);
    UpdateAssigned(tempAssigned);
    
  }

  function UpdateAssigned(assignedTransaction: AssignedTransaction) {
    updateAvailableBalance(assignedTransaction)
  }

  function UnfundBudgetItem() {
    const updatedBudgetItem = BudgetItem.fromBudgetItem(selectedBudgetItem!);
    if (updatedBudgetItem.assigned === 0) return;
    const tempAssigned = new AssignedTransaction(
      uuidv4(),
      selectedBudgetItem!.id,
      new Date(),
        updatedBudgetItem.assigned * -1,
        primaryAccountId
    );
    updateBudgetItemFunding(updatedBudgetItem!, tempAssigned);
    UpdateAssigned(tempAssigned);
  }

  return (
    <Box className="SelectedBudgetItemFundingOptions">
      <Box className="SelectedBudgetItemFundingOptionsButton">
        <Button
          onClick={FundBudgetItem}
          disabled={amountNeededToReachTarget() <= 0}
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
