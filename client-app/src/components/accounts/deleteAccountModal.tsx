import {observer} from "mobx-react-lite";
import {Box, Button, Group, Text} from "@mantine/core";
import {useStore} from "../../stores/store.ts";
import {AccountBase} from "../../models/accountBase.ts";

interface CreateAccountFormProps {
    onCloseModal?: () => void;
    account: AccountBase;
}
export default observer(function DeleteAccountModal({onCloseModal, account}: CreateAccountFormProps) {
    const {accountStore} = useStore();
    const deleteAccount = accountStore.deleteAccount;

    function handleCloseModal() {
         deleteAccount(account.accountType, account.id).then(() => {
             if (onCloseModal) {
                 onCloseModal()
             }
         });
    }
    return (
        <Box>
            <Text>Are you sure you want to delete account {account.name}? This action cannot be undone.</Text>
            <Group mt="lg" justify="flex-end">
                <Button onClick={onCloseModal} variant="default">
                    Cancel
                </Button>
                <Button onClick={() => handleCloseModal()} color="red">
                    Delete
                </Button>
            </Group>
        </Box>
            
    )
})