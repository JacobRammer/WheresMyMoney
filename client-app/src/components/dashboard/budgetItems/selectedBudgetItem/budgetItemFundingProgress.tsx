import {observer} from "mobx-react-lite";
import {ActionIcon, Box, Center, Divider, Flex, NumberFormatter, RingProgress, Text} from "@mantine/core";
import {Smile} from "lucide-react";
import {BudgetItemAvailableStyling} from "../../../../constants/budgetItemAvailableStyling.ts";
import FundBudgetItemButton from "../buttons/fundBudgetItemButton.tsx";
import UpdateBudgetTargetMenu from "../forms/updateBudgetTargetMenu.tsx";
import {useStore} from "../../../../stores/store.ts";

export default observer(function BudgetItemFundingProgress() {

    const {budgetStore} = useStore();
    const {selectedBudgetItem} = budgetStore;

    const BudgetItemAssignedPercent = selectedBudgetItem!.target === 0
        ? 0
        : (selectedBudgetItem!.assigned / selectedBudgetItem!.target) * 100;


    return (
        <Box>
            <Center>
                <RingProgress
                    sections={[{
                        value: BudgetItemAssignedPercent,
                        color: BudgetItemAssignedPercent < 100 ? 'yellow' : 'green'
                    }]}
                    label={
                        BudgetItemAssignedPercent === 100 ?
                            <Center>
                                <ActionIcon color="green" variant="light" radius="xl" size="xl">
                                    <Smile size={22}/>
                                </ActionIcon>
                            </Center>
                            :
                            <Text ta="center">{BudgetItemAssignedPercent}%</Text>
                    }
                    transitionDuration={250}
                />
            </Center>
            {
                BudgetItemAssignedPercent !== 100 ?
                    <Box className='SelectedBudgetItemFundingOptionFundBox'
                         style={{backgroundColor: BudgetItemAvailableStyling.COLOR.YELLOWGOLDISH}}>
                        <Center style={{marginBottom: '10px'}}>
                            <Text>Assign
                                <NumberFormatter value={selectedBudgetItem!.target - selectedBudgetItem!.assigned}
                                                 prefix=" $" decimalScale={2} fixedDecimalScale={true}/>
                                &nbsp;to cover this budget.
                            </Text>
                        </Center>
                        <Box style={{marginLeft: '15%', marginRight: '15%', color: 'red'}}>
                            <FundBudgetItemButton color={BudgetItemAvailableStyling.COLOR.PINKISH} text="Cover me!"/>
                        </Box>
                    </Box>
                    :
                    // TODO    
                    <Text>budget is covered</Text>
            }
            <Flex className="selectedBudgetItemInfoFlex">
                <Text>Assigned so far:</Text>
                <NumberFormatter value={selectedBudgetItem!.assigned} prefix="$ " decimalScale={2}
                                 fixedDecimalScale={true}/>
            </Flex>
            <Divider size='md' className='selectedBudgetInfoDivider'/>
            <UpdateBudgetTargetMenu/>

        </Box>
    )
})