import { observer } from "mobx-react-lite";
import {
  MantineProvider,
  Loader,
  Center,
} from "@mantine/core";
import { useStore } from "../../stores/store.ts";
import { useEffect } from "react";
import BudgetInfo from "./budgetInfo.tsx";

export default observer(function Dashboard() {
  const { budgetStore } = useStore();
  const {
    loadBudgetCategories,
    budgetCategories,
    loading, 
    activeDate
  } = budgetStore;

  useEffect(() => {
    loadBudgetCategories();
  }, [budgetCategories, activeDate]);

  return (
    <MantineProvider>
      {loading ? 
      <Center className="CategoriesScrollArea">
        <Loader type="bars" size='xl' color="rgb(203, 239, 208)"/>
      </Center> :
      <BudgetInfo/>
      }
      
    </MantineProvider>
  );
});
