import {observer} from "mobx-react-lite";
import Sidebar from "../sidebar/sidebar.tsx";
import {Box, Flex, MantineProvider, ScrollArea} from "@mantine/core";
import DashboardHeader from "./dashboardHeader.tsx";
import CategoryTable from "./categoryTable.tsx";
import CategoryGroupHeader from "./categoryGroupHeader.tsx";
import CategoryGroupItem from "./categoryGroupItem.tsx";
import {BudgetGroup} from "../../models/budgetGroup.ts";
import {useStore} from "../../stores/store.ts";
import {useEffect} from "react";

export default observer(function Dashboard() {
    
    const {budgetStore} = useStore();
    const {loadBudgetCategories, budgetCategories, getBudgetCategoryMap} = budgetStore;

    useEffect(() => {
        if (budgetCategories.size === 0) {
            loadBudgetCategories();
        }
    }, [budgetCategories]);


    return (
        <MantineProvider>
            <Flex>
                <Sidebar/>
                <Box className='BoxFlexGrow'>
                    <Box className='DashboardHeaderBox'>
                        <Box className='DetailHeaderWithUnderline'>
                            <Box className='DetailHeaderDetailsWithMargin'>
                                <DashboardHeader/>
                            </Box>
                        </Box>

                    </Box>
                    <Flex className='BoxFlexGrow'>
                        <Box className='BudgetTable'>
                            <CategoryTable/>
                            <CategoryGroupHeader/>
                            <ScrollArea className="CategoriesScrollArea" overscrollBehavior="contain">
                                {
                                    getBudgetCategoryMap().map((budgetGroup: BudgetGroup) => (
                                        <Box key={budgetGroup.id}>
                                            <CategoryGroupItem budgetGroup={budgetGroup}/>
                                        </Box>))
                                }

                                {
                                    getBudgetCategoryMap().map((budgetGroup: BudgetGroup) => (
                                        <Box key={budgetGroup.id}>
                                            <CategoryGroupItem budgetGroup={budgetGroup}/>
                                        </Box>))
                                }

                                {
                                    getBudgetCategoryMap().map((budgetGroup: BudgetGroup) => (
                                        <Box key={budgetGroup.id}>
                                            <CategoryGroupItem budgetGroup={budgetGroup}/>
                                        </Box>))
                                }
                            </ScrollArea>
                        </Box>
                        <Box h={500} w={400} style={{backgroundColor: 'red'}}/>
                    </Flex>
                </Box>
            </Flex>
        </MantineProvider>
    )
})