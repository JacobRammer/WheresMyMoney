import {Box, Center, Divider, Flex, NumberFormatter, Text, Title} from '@mantine/core';
import {observer} from 'mobx-react-lite';
import {useStore} from '../../../stores/store';
import {getBudgetItemColor} from '../../../utils/budgetHelpers';
import SelectedBudgetItemUpdateTitle from './selectedBudgetItemUpdateTitle';

export default observer(function SelectedBudgetItemSpendingInfo() {
    const {budgetStore} = useStore();
    const {selectedBudgetItem} = budgetStore;

    return (
        <Box className='SelectedBudgetItemOuterBox'>
            <Box className="SelectedBudgetItemInnerBox">
                <Flex>
                    <Title order={2}>
                        {selectedBudgetItem?.title}
                    </Title>
                    <SelectedBudgetItemUpdateTitle/>

                    <Center style={{marginLeft: 'auto'}}>
                        <Title
                            order={4}
                            style={{
                                backgroundColor: getBudgetItemColor(selectedBudgetItem),
                                padding: '5px',
                                borderRadius: '10px'
                            }}
                        >
                            <NumberFormatter value={selectedBudgetItem?.available} prefix="$ " decimalScale={2}
                                             fixedDecimalScale={true}/>
                        </Title>
                    </Center>
                </Flex>
                <Divider size='md' className='selectedBudgetInfoDivider'/>
                <Flex className="selectedBudgetItemInfoFlex">
                    <Text>Available:</Text>
                    <NumberFormatter value={selectedBudgetItem?.available} prefix="$ " decimalScale={2}
                                     fixedDecimalScale={true}/>
                </Flex>
                <Flex className="selectedBudgetItemInfoFlex">
                    <Text>Outflow:</Text>
                    <NumberFormatter value={selectedBudgetItem?.outflow} prefix="$ " decimalScale={2}
                                     fixedDecimalScale={true}/>
                </Flex>
                <Flex className="selectedBudgetItemInfoFlex">
                    <Text>Spent Last Month:</Text>
                    <NumberFormatter value='0' prefix="$ " decimalScale={2} fixedDecimalScale={true}/>
                </Flex>
                <Flex className="selectedBudgetItemInfoFlex">
                    <Text>Average Spend Last Three Months:</Text>
                    <NumberFormatter value='0' prefix="$ " decimalScale={2} fixedDecimalScale={true}/>
                </Flex>
            </Box>
        </Box>

    );
});