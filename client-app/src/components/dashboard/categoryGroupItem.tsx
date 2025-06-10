import {observer} from "mobx-react-lite";
import {ActionIcon, Box, Center, Flex, Menu, NumberFormatter, Text, Tooltip} from "@mantine/core";
import {BudgetGroup} from "../../models/budgetGroup.ts";
import CategoryItem from "./Category/categoryItem.tsx";
import {v4 as uuidv4} from "uuid";
import {useState} from "react";
import {CirclePlus} from "lucide-react";
import {useHover} from "@mantine/hooks";
import AddCategoryItemForm from "./Category/addCategoryItemForm.tsx";
import {BudgetItem} from "../../models/budgetItem.ts";

interface Props {
    budgetGroup: BudgetGroup;
}

export default observer(function CategoryGroupItem({budgetGroup}: Props) {
    const { hovered, ref } = useHover();
    const [active, setActive] = useState(false)
    
    return (
        <Box>
        <Flex className='categoryGroupItemFlex' >
            
            <Box className='dashboardBudgetGroupFormat' ref={ref}>
                <Flex>
                    <Center><Text>{budgetGroup.title}</Text>
                    {(hovered || active) &&
                        <Menu onChange={setActive}>
                            <Menu.Target>
                                <ActionIcon variant="transparent" onClick={() => setActive(true)}>
                                    <Tooltip label="Add Budget Item" withArrow>
                                    <CirclePlus size={18} />
                                    </Tooltip>
                                </ActionIcon>
                            </Menu.Target>
                            <Menu.Dropdown>
                                <AddCategoryItemForm updateMenuState={() => setActive(false)} budgetGroupId={budgetGroup.id}/>
                            </Menu.Dropdown>
                        </Menu>
                    }
                        </Center>
                </Flex>
            </Box>
            <Center w={100}> 
                <NumberFormatter value={budgetGroup.assigned} prefix="$" decimalScale={2} fixedDecimalScale={true}/>
            </Center>
            <Center w={100}>
                <NumberFormatter 
                value={budgetGroup.outflow} prefix="$" decimalScale={2} fixedDecimalScale={true}/>

            </Center>
            <Center w={100} className='dashboardBudgetCategoryFinalFlexItem'>
                <NumberFormatter value={budgetGroup.available} prefix="$" decimalScale={2} fixedDecimalScale={true}/>
            </Center>
        </Flex>
            {budgetGroup.categories.length !== 0 ?
                budgetGroup.categories.map((category: BudgetItem) => (
                    <Box key={uuidv4()}>
                        <CategoryItem budgetItem={category}/>
                    </Box>
                )) : <Text style={{margin: '10px'}}>No budget items</Text>}
        </Box>
    )
})