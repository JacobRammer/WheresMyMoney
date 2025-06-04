import {observer} from "mobx-react-lite";
import {Box, Center, Flex, NumberFormatter, Progress, Text, Tooltip} from "@mantine/core"
import {useHover} from "@mantine/hooks";
import {useState} from "react";
import CategoryAmountAssignedForm from "./categoryAmountAssignedForm.tsx";
import {BudgetItem} from "../../../models/budgetItem.ts";

interface Props {
    category: BudgetItem;
}

export default observer(function CategoryItem({category}: Props) {
    const { hovered, ref } = useHover();
    const [active, setActive] = useState(false)

    return (
        <Flex className='categoryItem'>
        <Box className='dashboardBudgetGroupFormat'>
            <Flex justify='space-between'>
                <Text>{category.title}</Text>
                <Text>Monthly budget of
                    <NumberFormatter value={category.target} prefix=" $" thousandSeparator decimalScale={2}
                                     fixedDecimalScale/>
                </Text>
            </Flex>
            <Box>
                <Tooltip label={<Text>You have spent
                    <NumberFormatter value={category.outflow} prefix=" $" thousandSeparator decimalScale={2}
                                     fixedDecimalScale/>
                    &nbsp;of your monthly budget of
                    <NumberFormatter value={category.target} prefix=" $" thousandSeparator decimalScale={2}
                                     fixedDecimalScale/>
                </Text>} withArrow arrowPosition="side" position="top-start">
                <Progress radius="xl" value={(category.outflow / category.target) * 100}
                    color={category.assigned === category.target? 'red' : 'green'}/>
                </Tooltip>
            </Box>
        </Box>
        <Center w={100} ref={ref}>
            {!hovered && !active ?                 
                <NumberFormatter value={category.assigned} prefix="$" decimalScale={2} fixedDecimalScale={true}/>
                :
                <CategoryAmountAssignedForm category={category} onClick={() => setActive(true)} closeForm={() => setActive(false)}/>

            }
        </Center>
        <Center w={100}>
            <NumberFormatter value={category.outflow} prefix="$" decimalScale={2} fixedDecimalScale={true}/>
        </Center>
        <Center w={100} className='dashboardBudgetCategoryFinalFlexItem'>
            <NumberFormatter value={category.assigned} prefix="$" decimalScale={2} fixedDecimalScale={true}/>
        </Center>
        </Flex>
    )
})