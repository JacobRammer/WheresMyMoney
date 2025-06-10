import {observer} from "mobx-react-lite";
import Sidebar from "../sidebar/sidebar.tsx";
import {AppShell, MantineProvider, ScrollArea, Box, Tooltip} from "@mantine/core";
import DashboardHeader from "./dashboardHeader.tsx";
import CategoryTable from "./categoryTable.tsx";
import CategoryGroupHeader from "./categoryGroupHeader.tsx";
import CategoryGroupItem from "./categoryGroupItem.tsx";
import {BudgetGroup} from "../../models/budgetGroup.ts";
import {useStore} from "../../stores/store.ts";
import {useEffect} from "react";
import { CircleHelp } from "lucide-react";
import SelectedBudgetItemInfo from "./aside/selectedBudgetItemInfo.tsx";


export default observer(function Dashboard() {
    
    const {budgetStore} = useStore();
    const {loadBudgetCategories, budgetCategories, getBudgetCategoryMap, selectedBudgetItem} = budgetStore;

    useEffect(() => {
        if (budgetCategories.size === 0) {
            loadBudgetCategories();
        }
    }, [budgetCategories]);


    return (
        <MantineProvider>

            <AppShell layout="alt"
                header={{ height: 60 }}
                navbar={{ width: 250, breakpoint: 'sm'}}
                aside={{ width: 450, breakpoint: 'md', collapsed: { desktop: false} }}
            >
                <AppShell.Header>
                    <DashboardHeader />
                </AppShell.Header>
                <AppShell.Navbar>
                    <Sidebar/>
                </AppShell.Navbar>
                <AppShell.Main>

                    <CategoryTable />
                    <CategoryGroupHeader />

                    <ScrollArea className="CategoriesScrollArea">
                        {
                            getBudgetCategoryMap().map((budgetGroup: BudgetGroup) => (
                                <Box key={budgetGroup.id}>
                                    <CategoryGroupItem budgetGroup={budgetGroup} />
                                </Box>))
                        }

                        {
                            getBudgetCategoryMap().map((budgetGroup: BudgetGroup) => (
                                <Box key={budgetGroup.id}>
                                    <CategoryGroupItem budgetGroup={budgetGroup} />
                                </Box>))
                        }

                        {
                            getBudgetCategoryMap().map((budgetGroup: BudgetGroup) => (
                                <Box key={budgetGroup.id}>
                                    <CategoryGroupItem budgetGroup={budgetGroup} />
                                </Box>))
                        }
                    </ScrollArea>
                    
                </AppShell.Main>
                <AppShell.Aside p="md">
                    {selectedBudgetItem !== undefined && 
                    <SelectedBudgetItemInfo/>}
                    <Tooltip label="Help" position="top-start">
                        <CircleHelp size={40} className="AddActionCircle" />
                    </Tooltip>
                </AppShell.Aside>
            </AppShell>
        </MantineProvider>
    )
})