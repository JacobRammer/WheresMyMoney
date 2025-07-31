import { Box } from "@mantine/core";
import { observer } from "mobx-react-lite";
import SelectedBudgetItemFundingOptions from "./selectedBudgetItemFundingOptions";
import SelectedBudgetItemSpendingInfo from "./selectedBudgetItemSpendingInfo";
import SelectedBudgetItemFundingInfo from "./selectedBudgetItem/selectedBudgetItemFundingInfo.tsx";
import DeleteSelectedBudgetItem from "./buttons/deleteSelectedBudgetItem.tsx";

export default observer(function SelectedBudgetItemInfo() {

    return (
        <Box>
            <SelectedBudgetItemSpendingInfo />
            <SelectedBudgetItemFundingInfo />
            <SelectedBudgetItemFundingOptions />
            <DeleteSelectedBudgetItem />
        </Box>
    )
})