import {AppShell, Box, ScrollArea, Tooltip} from '@mantine/core';
import {CircleHelp} from 'lucide-react';
import {observer} from 'mobx-react-lite';
import SelectedBudgetItemInfo from './budgetItems/selectedBudgetItemInfo';
import CategoryGroupItem from './categoryGroupItem';
import CategoryTable from './categoryTable';
import CategoryGroupHeader from './categoryGroupHeader';
import Sidebar from '../sidebar/sidebar';
import DashboardHeader from './dashboardHeader';
import {BudgetGroup} from '../../models/budgetGroup';
import {useStore} from '../../stores/store';
import BudgetInsights from "./aside/budgetInsights.tsx";

export default observer(function BudgetInfo() {

  const { budgetStore } = useStore();
  const {
    getBudgetCategoryMap,
    selectedBudgetItem,
  } = budgetStore;

  return (
    <AppShell
      layout="alt"
      header={{ height: 60 }}
      navbar={{ width: 250, breakpoint: "sm" }}
      aside={{ width: 450, breakpoint: "md", collapsed: { desktop: false } }}
    >
      <AppShell.Header>
        <DashboardHeader />
      </AppShell.Header>
      <AppShell.Navbar>
        <Sidebar />
      </AppShell.Navbar>
      <AppShell.Main>
        <Box>
          <CategoryTable />
          <CategoryGroupHeader />

          <ScrollArea className="CategoriesScrollArea">
            {getBudgetCategoryMap().map((budgetGroup: BudgetGroup) => (
              <Box key={budgetGroup.id}>
                <CategoryGroupItem budgetGroup={budgetGroup} />
              </Box>
            ))}
          </ScrollArea>
        </Box>
      </AppShell.Main>
      <AppShell.Aside p="md">
        {selectedBudgetItem ?
            <SelectedBudgetItemInfo/>
            :
            <BudgetInsights/>
        }
        
        <Tooltip label="Help" position="top-start">
          <CircleHelp size={40} className="AddActionCircleBottom" />
        </Tooltip>
      </AppShell.Aside>
    </AppShell>
  );
});