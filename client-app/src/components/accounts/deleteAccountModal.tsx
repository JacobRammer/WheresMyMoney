import {observer} from "mobx-react-lite";
import {Box, Button, Group, Text} from "@mantine/core";
import {useStore} from "../../stores/store.ts";
import {Account} from "../../models/account.ts";

interface CreateAccountFormProps {
    account: Account;
    onCloseModal?: () => void;
}

export default observer(function DeleteAccountModal({account, onCloseModal}: CreateAccountFormProps) {
    const {accountStore} = useStore();
    const deleteAccount = accountStore.deleteAccount;

    function handleCloseModal() {
        deleteAccount(account.id).then(() => {
            if (onCloseModal) {
                onCloseModal()
            }
        });
    }

    function handleModalClose() {
        if (onCloseModal) {
            onCloseModal()
        }
    }
    return (

        <Box>
            <Text>
                {`Are you sure you want to delete account ${account?.name}? This action cannot be undone.`}
            </Text>
            <Group mt="lg" justify="flex-end">
                <Button onClick={handleModalClose} variant="default">
                    Cancel
                </Button>
                <Button onClick={handleCloseModal} color="red">
                    Delete
                </Button>
            </Group>
        </Box>
    )
})