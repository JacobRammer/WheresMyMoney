import {observer} from "mobx-react-lite";
import {ActionIcon, Tooltip} from "@mantine/core";
import {X} from "lucide-react";
import {useStore} from "../../../../stores/store.ts";

export default observer(function DeselectBudgetItemButton() {

    const {budgetStore} = useStore();
    const {setSelectedBudgetItem} = budgetStore;

    function DeselectBudgetItem() {
        setSelectedBudgetItem(undefined)
    }

    return (
        <Tooltip label='Close budget' position='bottom' withArrow>
            <ActionIcon className='closeBudgetItemActionIcon' variant='light' onClick={DeselectBudgetItem}>
                <X/>
            </ActionIcon>
        </Tooltip>

    )
})