import {observer} from "mobx-react-lite"
import {Box, Divider, Flex, NumberFormatter, Text, Title} from "@mantine/core";
import {useStore} from "../../../stores/store.ts";

export default observer(function BudgetInsights() {

    const {budgetStore} = useStore();
    const {activeDate, monthList, assignedLastMonth, spentLastMonth} = budgetStore;


    return (
        <Box className='SelectedBudgetItemOuterBox'>
            <Box className="SelectedBudgetItemInnerBox">
                <Title order={3}>
                    {monthList[activeDate.getMonth()]}'s Budget Insights
                </Title>
                <Divider size='md' className='selectedBudgetInfoDivider'/>

                <Flex className="selectedBudgetItemInfoFlex">
                    <Text>Spent Last Month:</Text>
                    <NumberFormatter value={spentLastMonth} prefix="$ " decimalScale={2} fixedDecimalScale={true}/>
                </Flex>

                <Flex className="selectedBudgetItemInfoFlex">
                    <Text>Assigned Last Month:</Text>
                    <NumberFormatter value={assignedLastMonth} prefix="$ " decimalScale={2} fixedDecimalScale={true}/>
                </Flex>

                <Flex className="selectedBudgetItemInfoFlex">
                    <Text>{monthList[activeDate.getMonth()]}'s Budget Target:</Text>
                    <NumberFormatter value='0' prefix="$ " decimalScale={2} fixedDecimalScale={true}/>
                </Flex>

                <Flex className="selectedBudgetItemInfoFlex">
                    <Text>Left to assign this month:</Text>
                    <NumberFormatter value='0' prefix="$ " decimalScale={2} fixedDecimalScale={true}/>
                </Flex>
            </Box>
        </Box>
    )
})