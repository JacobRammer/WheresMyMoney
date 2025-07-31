import { observer } from 'mobx-react-lite';
import { Box, Button, Group, Select, Text } from '@mantine/core';
import { useStore } from '../../../../stores/store';
import { useState } from 'react';
import AssignedTransaction from '../../../../models/assignedTransaction';
import { v4 as uuidv4 } from 'uuid';

interface Props {
    onCloseModal: () => void;
}

export default observer(function DeleteBudgetItemModal({ onCloseModal }: Props) {
    const { budgetStore, accountStore } = useStore();
    const { deleteBudgetItem, selectedBudgetItem } = budgetStore;

    // Get only checking and savings accounts
    const cashAccounts = accountStore.getCashAccounts();
    const { updateAvailableBalance, accountRegistry } = accountStore;


    const [accountId, setAccountId] = useState<string | null>(null);

    const handleDelete = async () => {
        if (selectedBudgetItem!.available > 0) {
            if (accountId === null)
                return;

            const account = accountRegistry.get(accountId)
            if (account && selectedBudgetItem !== undefined) {
                // Create an assigned transaction to transfer the available funds back to the account
                const assignedTransaction = new AssignedTransaction(
                    uuidv4(),
                    accountId,
                    new Date(),
                    -selectedBudgetItem.available,
                    account.id
                );

                updateAvailableBalance(assignedTransaction);
            }

            onCloseModal();
        }
        try {
            await deleteBudgetItem(selectedBudgetItem!.id);
            onCloseModal();
        } catch (error) {
            console.error('Error deleting budget item:', error);
        }

    };

    const accountOptions = cashAccounts.map(account => ({
        value: account.id,
        label: `${account.name} - $${account.balance.toFixed(2)}`
    }));

    return (
        <Box>
            <Box>

                {selectedBudgetItem!.available > 0 &&
                    <Box style={{ marginBottom: '10px' }}>
                        <Text style={{ marginBottom: '10px' }}>You currently have excess funds assigned to {selectedBudgetItem!.title}. Choose
                            which account to move the funds to. This will go into the available balance for this account.
                        </Text>
                        <Select
                            label="Select Account"
                            placeholder="Choose an account"
                            data={accountOptions}
                            searchable
                            clearable
                            withAsterisk
                            allowDeselect
                            onChange={(value) => setAccountId(value)}
                        />
                    </Box>
                }

                {selectedBudgetItem!.available === 0 &&
                    <Text>
                        Are you sure you want to delete the budget {selectedBudgetItem!.title}?.
                    </Text>
                }
            </Box>

            <Group mt="lg" justify="flex-end">
                <Button onClick={onCloseModal} variant="default">
                    Cancel
                </Button>
                <Button onClick={handleDelete} color="red" disabled={accountId === null}>
                    Delete
                </Button>
            </Group>
        </Box>
    );
});
