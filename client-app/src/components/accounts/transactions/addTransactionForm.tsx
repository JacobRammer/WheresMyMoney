import {observer} from "mobx-react-lite";
import {Transaction} from "../../../models/transaction.ts";
import {useStore} from "../../../stores/store.ts";
import {useForm} from "@mantine/form";
import {v4 as uuidv4} from "uuid";

interface AddTransactionProps {
    onCloseModal: () => void;
    transaction: Transaction | undefined;
    accountId: string;
}

export default observer(function AddTransactionForm({onCloseModal, transaction, accountId}: AddTransactionProps) {
    const {accountStore} = useStore();
    const {createTransaction} = accountStore;

    const newTransactionFormValues = useForm({
        mode: 'uncontrolled',
        initialValues: {
            title: '',
            amount: 0,
            Date: new Date().toLocaleDateString('en-US', {
                year: 'numeric', month: '2-digit',
                day: '2-digit'
            })
        }
    })

    function handleFormSubmit(values: any) {

        const transaction: Transaction = {
            id: uuidv4(),
            title: values.title,
            amount: values.amount,
            date: new Date(values.Date),
        };
        createTransaction(transaction).then(() => {

        })
    }

    return (
        <form onSubmit={newTransactionFormValues.onSubmit((values) => handleFormSubmit(values))}>

        </form>
    )
})