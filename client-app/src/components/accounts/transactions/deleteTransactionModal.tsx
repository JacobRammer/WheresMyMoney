import {observer} from "mobx-react-lite";
import {Transaction} from "../../../models/transaction.ts";
import {Box, Button, Group, Text} from "@mantine/core";
import {useStore} from "../../../stores/store.ts";

interface Props {
    transaction: Transaction;
    oncloseModal: () => void;
    accountId: string
}

export default observer(function DeleteTransactionModal({transaction, oncloseModal, accountId}: Props) {

    const {accountStore} = useStore();
    const {deleteTransaction} = accountStore;

    function deleteTransactionCloseModal() {
        deleteTransaction(accountId, transaction).then(() => {
            oncloseModal();
        })
    }

    return (
        <Box>
            <Text>Are you sure you want to delete {transaction.title}?</Text>

            <Group mt="lg" justify="flex-end">
                <Button onClick={oncloseModal} variant="default">
                    Cancel
                </Button>
                <Button onClick={deleteTransactionCloseModal} color="red">
                    Delete
                </Button>
            </Group>
        </Box>
    )
})