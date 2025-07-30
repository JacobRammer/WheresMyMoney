import { observer } from "mobx-react-lite";
import { ActionIcon, Box, Center, Divider, Flex, NumberFormatter, RingProgress, Text } from "@mantine/core";
import { Frown, Smile } from "lucide-react";
import { BudgetItemAvailableStyling } from "../../../../constants/budgetItemAvailableStyling.ts";
import FundBudgetItemButton from "../buttons/fundBudgetItemButton.tsx";
import UpdateBudgetTargetMenu from "../forms/updateBudgetTargetMenu.tsx";
import { useStore } from "../../../../stores/store.ts";

export default observer(function BudgetItemFundingProgress() {

    const { budgetStore } = useStore();
    const { selectedBudgetItem } = budgetStore;

    const BudgetItemAssignedPercent = selectedBudgetItem!.target === 0
        ? 0
        : (selectedBudgetItem!.assigned / selectedBudgetItem!.target) * 100;


    return (
        <Box>
            <Center>
                {selectedBudgetItem!.available >= 0 ?
                    <RingProgress
                        sections={[{
                            value: BudgetItemAssignedPercent,
                            color: BudgetItemAssignedPercent < 100 ? 'yellow' : 'green'
                        }]}
                        label={
                            BudgetItemAssignedPercent >= 100 ?
                                (
                                    selectedBudgetItem!.assigned <= selectedBudgetItem!.target ?
                                        <Center>
                                            <ActionIcon color="green" variant="light" radius="xl" size="xl">
                                                <Smile size={22} />
                                            </ActionIcon>
                                        </Center>

                                        :
                                        <Center>
                                            <ActionIcon color={BudgetItemAvailableStyling.COLOR.REDWARNING} variant="light" radius="xl" size="xl">
                                                <Frown size={22} />
                                            </ActionIcon>
                                        </Center>
                                )

                                :
                                <Text ta="center">{BudgetItemAssignedPercent}%</Text>
                        }
                        transitionDuration={250}
                    />
                    :
                    <RingProgress
                        sections={[{
                            value: BudgetItemAssignedPercent,
                            color: BudgetItemAvailableStyling.COLOR.REDWARNING
                        }]}
                        label={
                            <Center>
                                <ActionIcon color={BudgetItemAvailableStyling.COLOR.REDWARNING} variant="light" radius="xl" size="xl">
                                    <Frown size={22} />
                                </ActionIcon>
                            </Center>
                        }
                        transitionDuration={250}
                    />
                }
            </Center>
            {
                BudgetItemAssignedPercent !== 100 ?
                    selectedBudgetItem!.available >= 0 ?

                        // If the budget is partially funded and has a positive available

                        (selectedBudgetItem!.assigned <= selectedBudgetItem!.target ?
                            <Box className='SelectedBudgetItemFundingOptionFundBox'
                                style={{ backgroundColor: BudgetItemAvailableStyling.COLOR.YELLOWGOLDISH }}>
                                <Center style={{ marginBottom: '10px' }}>
                                    <Text>Assign
                                        <NumberFormatter value={selectedBudgetItem!.target - selectedBudgetItem!.assigned}
                                            prefix=" $" decimalScale={2} fixedDecimalScale={true} />
                                        &nbsp;more to cover this budget.
                                    </Text>
                                </Center>
                                <Box style={{ marginLeft: '15%', marginRight: '15%' }}>
                                    <FundBudgetItemButton color={BudgetItemAvailableStyling.COLOR.PINKISH} text="Cover me!" />
                                </Box>
                            </Box>
                            :
                            <Box>
                                <Box className='SelectedBudgetItemFundingOptionFundBox'
                                    style={{ backgroundColor: BudgetItemAvailableStyling.COLOR.REDWARNING }}>
                                    <Text>
                                        You have exceeded this budget for this month. You exceeded this
                                        budget by&nbsp;<NumberFormatter prefix="$" decimalScale={2} fixedDecimalScale={true}
                                            value={Math.abs(selectedBudgetItem!.target - selectedBudgetItem!.assigned)} />
                                    </Text>

                                </Box>
                                <Divider size='md' className='selectedBudgetInfoDivider' />
                            </Box>
                        )


                        :

                        // If the outflow is greater than assigned
                        <Box className='SelectedBudgetItemFundingOptionFundBox'
                            style={{ backgroundColor: BudgetItemAvailableStyling.COLOR.REDWARNING }}>
                            <Text style={{ marginBottom: '10px' }}>
                                You currently don't have enough funds assigned to this budget.
                            </Text>
                            <FundBudgetItemButton color={BudgetItemAvailableStyling.COLOR.PINKISH} text="Cover me!" />

                        </Box>
                    :
                    selectedBudgetItem!.available > 0 ?
                        <Box>
                            <Text>You have covered this budget for the month!</Text>
                            <Divider size='md' className='selectedBudgetInfoDivider' />
                        </Box>
                        :
                        <Box className='SelectedBudgetItemFundingOptionFundBox'
                            style={{ backgroundColor: BudgetItemAvailableStyling.COLOR.REDWARNING }}>
                            <Text style={{ marginBottom: '10px' }}>
                                You have spent more than your set monthly budget!
                            </Text>
                            <FundBudgetItemButton color={BudgetItemAvailableStyling.COLOR.PINKISH} text="Cover Overspending!" />
                        </Box>

            }
            <Flex className="selectedBudgetItemInfoFlex">
                <Text>Assigned so far:</Text>
                <NumberFormatter value={selectedBudgetItem!.assigned} prefix="$ " decimalScale={2}
                    fixedDecimalScale={true} />
            </Flex>
            <Divider size='md' className='selectedBudgetInfoDivider' />
            <UpdateBudgetTargetMenu buttonText="Update budget funding" />

        </Box>
    )
})