import { Box, Button, Group, Text } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { BudgetGroup } from '../../../models/budgetGroup';
import { useStore } from '../../../stores/store';

interface Props {
    onClose: () => void;
    budgetGroup: BudgetGroup;
}

export default observer(function DeleteBudgetGroupModal({ onClose, budgetGroup }: Props) {
    const { budgetStore } = useStore();
    const { deleteBudgetGroup } = budgetStore;

    async function handleCloseModal() {
        await deleteBudgetGroup(budgetGroup).then(() => {
            onClose();
        });
    }

    return (
        <Box>
            <Text>
                {`Are you sure you want to delete budget group ${budgetGroup.title}? 
                This will delete all budgets associated with it.`}
            </Text>
            <Group mt="lg" justify="flex-end">
                <Button onClick={onClose} variant="default">
                    Cancel
                </Button>
                <Button onClick={handleCloseModal} color="red">
                    Delete
                </Button>
            </Group>
        </Box>
    );
});