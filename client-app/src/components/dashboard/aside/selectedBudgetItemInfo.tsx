import { Box, Center, Divider, Flex, NumberFormatter, Text, Title } from "@mantine/core";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../stores/store";
import SelectedBudgetItemFundingOptions from "./selectedBudgetItemFundingOptions";
import { getBudgetItemColor } from "../../../utils/budgetHelpers";

export default observer(function SelectedBudgetItemInfo() {
    const {budgetStore} = useStore();
    const {selectedBudgetItem} = budgetStore;

    return (
        <Box>
            <Box className='SelectedBudgetItemOuterBox'>
                <Box className="SelectedBudgetItemInnerBox">
                    <Flex justify='space-between' >
                        <Title order={2}>{selectedBudgetItem?.title}</Title>
                        <Center>
                            <Title
                                order={4} 
                                style={{
                                    backgroundColor: getBudgetItemColor(selectedBudgetItem), 
                                    padding: '5px', 
                                    borderRadius: '10px'
                                }}
                            >
                                <NumberFormatter value={selectedBudgetItem?.available} prefix="$ " decimalScale={2} fixedDecimalScale={true}/>
                            </Title>
                        </Center>
                    </Flex>
                    <Divider size='md' style={{marginTop: '10px', marginBottom: '10px'}}/>
                    <Flex className="selectedBudgetItemInfoFlex" >
                        <Text>Available</Text>
                        <NumberFormatter value={selectedBudgetItem?.available} prefix="$ " decimalScale={2} fixedDecimalScale={true}/>
                    </Flex>
                    <Flex className="selectedBudgetItemInfoFlex" >
                        <Text>Outflow</Text>
                        <NumberFormatter value={selectedBudgetItem?.outflow} prefix="$ " decimalScale={2} fixedDecimalScale={true} />
                    </Flex>
                    <Flex className="selectedBudgetItemInfoFlex" >
                        <Text>Monthly Target</Text>
                        <NumberFormatter value={selectedBudgetItem?.target} prefix="$ " decimalScale={2} fixedDecimalScale={true} />
                    </Flex>
                    <Flex className="selectedBudgetItemInfoFlex" >
                        <Text>Spent Last Month</Text>
                        <NumberFormatter value='0' prefix="$ " decimalScale={2} fixedDecimalScale={true} />
                    </Flex>
                    <Flex className="selectedBudgetItemInfoFlex" >
                        <Text>Average Spend Last Three Months</Text>
                        <NumberFormatter value='0' prefix="$ " decimalScale={2} fixedDecimalScale={true} />
                    </Flex>
                </Box>
            </Box>
            <SelectedBudgetItemFundingOptions/>
        </Box>
    )
})