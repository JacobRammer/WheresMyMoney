import {observer} from "mobx-react-lite";
import {Box, Center, Flex, NumberFormatter, Progress, Text, Tooltip} from "@mantine/core"
import {useHover} from "@mantine/hooks";
import {useState} from "react";
import CategoryAmountAssignedForm from "./categoryAmountAssignedForm.tsx";
import {BudgetItem} from "../../../models/budgetItem.ts";
import { useStore } from "../../../stores/store.ts";
import { getBudgetItemColor } from "../../../utils/budgetHelpers.ts";

interface Props {
    budgetItem: BudgetItem;
}

export default observer(function CategoryItem({budgetItem}: Props) {
    const { hovered, ref } = useHover();
    const [showAssignedInputForm, setShowAssignedInputForm] = useState(false);
    const {budgetStore} = useStore();
    const {setSelectedBudgetItem, selectedBudgetItem} = budgetStore;
    const isItemSelected = budgetItem.id === selectedBudgetItem?.id;

    function test() {
        setSelectedBudgetItem(budgetItem)
    }

    return (
        <Flex className='categoryItem' onClick={test}  style={{ background: isItemSelected ? 'rgba(0, 153, 255, 0.2)' : 'transparent'}}>
        <Box className='dashboardBudgetGroupFormat'>
            <Flex justify='space-between'>
                    <Text>{budgetItem.title}</Text>
                <Text>Monthly budget of
                        <NumberFormatter value={budgetItem.target} prefix=" $" thousandSeparator decimalScale={2}
                        fixedDecimalScale/>
                </Text>
            </Flex>
            <Box>
                <Tooltip label={<Text>You have spent
                        <NumberFormatter value={budgetItem.outflow} prefix=" $" thousandSeparator decimalScale={2}
                        fixedDecimalScale/>
                    &nbsp;of your monthly budget of
                        <NumberFormatter value={budgetItem.target} prefix=" $" thousandSeparator decimalScale={2}
                        fixedDecimalScale/>
                </Text>} withArrow arrowPosition="side" position="top-start">
                        <Progress radius="xl" value={(budgetItem.outflow / budgetItem.target) * 100}
                            color={budgetItem.outflow > budgetItem.target? 'red' : 'green'}/>
                </Tooltip>
            </Box>
        </Box>
            <Center w={100} ref={ref} onClick={() => setShowAssignedInputForm(true)}>
                {hovered || showAssignedInputForm  ?  
                    <CategoryAmountAssignedForm handleClickOutside={() => setShowAssignedInputForm(false)} category={budgetItem} />               
                :
                    <NumberFormatter value={budgetItem.assigned} prefix="$" decimalScale={2} fixedDecimalScale={true}/>
            }
        </Center>
        <Center w={100}>
                <NumberFormatter value={budgetItem.outflow} prefix="$" decimalScale={2} fixedDecimalScale={true}/>
        </Center>
        <Center w={100} className='dashboardBudgetCategoryFinalFlexItem'>
            <NumberFormatter style={{backgroundColor: getBudgetItemColor(budgetItem), padding: '1px 5px 1px 5px', borderRadius: '5px'}} value={budgetItem.available} prefix="$" decimalScale={2} fixedDecimalScale={true}/>
        </Center>
        </Flex>
    )
})