import {observer} from "mobx-react-lite";
import Sidebar from "../sidebar/sidebar.tsx";
import {AppShell, Text, Burger, Flex, MantineProvider, ScrollArea, Group, Skeleton, Box} from "@mantine/core";
import DashboardHeader from "./dashboardHeader.tsx";
import CategoryTable from "./categoryTable.tsx";
import CategoryGroupHeader from "./categoryGroupHeader.tsx";
import CategoryGroupItem from "./categoryGroupItem.tsx";
import {BudgetGroup} from "../../models/budgetGroup.ts";
import {useStore} from "../../stores/store.ts";
import {useEffect} from "react";
import { useDisclosure } from "@mantine/hooks";
import { Circle } from "lucide-react";


export default observer(function Dashboard() {
    
    const {budgetStore} = useStore();
    const {loadBudgetCategories, budgetCategories, getBudgetCategoryMap} = budgetStore;
    const [opened, { toggle }] = useDisclosure();

    useEffect(() => {
        if (budgetCategories.size === 0) {
            loadBudgetCategories();
        }
    }, [budgetCategories]);


    return (
        <MantineProvider>

            <AppShell
                layout="alt"
                header={{ height: 60 }}
                navbar={{ width: 250, breakpoint: 'sm'}}
                aside={{ width: 300, breakpoint: 'md', collapsed: { desktop: false} }}
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
                <AppShell.Aside p="md">Aside</AppShell.Aside>
            </AppShell>
        </MantineProvider>
    )
})