import { observer } from 'mobx-react-lite';
import { Box, Button, Modal, NumberFormatter, Text } from '@mantine/core';
import { Trash2 } from 'lucide-react';
import { useStore } from '../../../../stores/store';
import DeleteBudgetItemModal from '../modals/deleteBudgetItemModal';
import { useDisclosure } from '@mantine/hooks';

export default observer(function DeleteSelectedBudgetItem() {
    const { budgetStore } = useStore();
    const { selectedBudgetItem } = budgetStore;




    const [opened, { open, close }] = useDisclosure(false);

    if (!selectedBudgetItem) {
        return null;
    }

    return (
        <Box className='deleteBudgetItemBox'>
            <Button
                color='red'
                leftSection={<Trash2 size={16} />}
                onClick={open}
                fullWidth
            >
                Delete &nbsp; <Text fs='italic' fw='bold'>{selectedBudgetItem!.title}</Text>
            </Button>
            <Modal opened={opened} onClose={close} centered title={<Text>Budget has an extra&nbsp;
                <NumberFormatter prefix="$"
                    value={selectedBudgetItem!.available}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    thousandSeparator />
            </Text>}
            >
                <DeleteBudgetItemModal onCloseModal={close} />
            </Modal>

        </Box>
    );
});