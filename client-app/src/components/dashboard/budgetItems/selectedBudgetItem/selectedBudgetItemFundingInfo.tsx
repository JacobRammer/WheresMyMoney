import {observer} from "mobx-react-lite";
import {Box, Divider, Flex, NumberFormatter, Text, Title} from "@mantine/core";
import {useStore} from "../../../../stores/store.ts";
import BudgetItemFundingProgress from "./budgetItemFundingProgress.tsx";

export default observer(function SelectedBudgetItemFundingInfo() {

    const {budgetStore} = useStore();
    const {selectedBudgetItem} = budgetStore;

    return (
        <Box className='SelectedBudgetItemOuterBox'>
            <Box className="SelectedBudgetItemInnerBox">
                <Title order={5}>Funding Options</Title>
                <Divider size='md' className='selectedBudgetInfoDivider'/>

                <Flex>
                    <Text>Monthly budget of
                        <NumberFormatter value={selectedBudgetItem!.target} prefix=" $" decimalScale={2}
                                         fixedDecimalScale={true}/>
                    </Text>
                </Flex>
                <Text>I want date needed by here</Text>
                <Divider size='md' className='selectedBudgetInfoDivider'/>
                {selectedBudgetItem!.target > 0 ?
                    <BudgetItemFundingProgress/>
                    :
                    <Text>No budget set... Set one up</Text>
                }
            </Box>
        </Box>
    )
})