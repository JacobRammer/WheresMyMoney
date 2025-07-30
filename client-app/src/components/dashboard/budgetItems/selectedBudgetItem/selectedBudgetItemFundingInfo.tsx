import { observer } from "mobx-react-lite";
import { Box, Divider, Flex, NumberFormatter, Text, Title } from "@mantine/core";
import { useStore } from "../../../../stores/store.ts";
import BudgetItemFundingProgress from "./budgetItemFundingProgress.tsx";
import UpdateBudgetTargetMenu from "../forms/updateBudgetTargetMenu.tsx";
import { BudgetItemAvailableStyling } from "../../../../constants/budgetItemAvailableStyling.ts";

export default observer(function SelectedBudgetItemFundingInfo() {

    const { budgetStore } = useStore();
    const { selectedBudgetItem } = budgetStore;

    return (
        <Box className='SelectedBudgetItemOuterBox'>
            <Box className="SelectedBudgetItemInnerBox">
                <Title order={5}>Funding Options</Title>
                <Divider size='md' className='selectedBudgetInfoDivider' />

                <Flex justify='space-between'>
                    <Text>Monthly budget of&nbsp;</Text>
                    <NumberFormatter value={selectedBudgetItem!.target} prefix=" $" decimalScale={2}
                        fixedDecimalScale={true} />
                </Flex>

                <Text>I want date needed by here</Text>
                <Divider size='md' className='selectedBudgetInfoDivider' />
                {selectedBudgetItem!.target > 0 ?
                    <BudgetItemFundingProgress />
                    :
                    <Box className='SelectedBudgetItemFundingOptionFundBox'
                        style={{ backgroundColor: BudgetItemAvailableStyling.COLOR.REDWARNING }}>
                        <Text style={{ marginBottom: '10px' }}>You don't have a monthly budget set up.
                            &nbsp;This is the amount of money you don't want to exceed this month, or the amount needed per month. Set up one now!
                        </Text>
                        <UpdateBudgetTargetMenu buttonText="Create a monthly budget" buttonColor={BudgetItemAvailableStyling.COLOR.DARKGREEN} />
                    </Box>
                }
            </Box>
        </Box>
    )
})