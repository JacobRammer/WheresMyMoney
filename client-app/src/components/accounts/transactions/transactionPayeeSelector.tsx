import { Box, Button, Menu, Select } from "@mantine/core";
import { observer } from "mobx-react-lite";
import { Transaction } from "../../../models/transaction";
import { useStore } from "../../../stores/store";
import { useEffect, useState } from "react";
import { runInAction } from "mobx";
import { v4 as uuidv4 } from 'uuid';
import { Payee } from "../../../models/payee";

interface Props {
    transaction: Transaction;

    onSubmit: () => void;
}

export default observer(function TransactionPayeeSelector({ transaction, onSubmit }: Props) {
    const { accountStore } = useStore()
    const { updateTransaction, payeeMap, loadPayees, createPayee } = accountStore;

    const payeeNames = Array.from(payeeMap.values())
        .map(payee => payee.payeeName)
        .sort((a, b) => a.localeCompare(b));

    const [searchValue, setSearchValue] = useState('');

    function CreateTransactionPayee(payeeName: string) {
        const payee = new Payee(uuidv4(), payeeName);
        createPayee(payee);
    }

    async function HandleUpdateTransaction(payeeName: string | null) {
        console.log(payeeName)
        if (payeeName === null) {
            runInAction(() => {
                transaction.payee = null;
            })
        } else {
            runInAction(() => {
                const payee = payeeMap.get(payeeName);
                if (payee) {
                    transaction.payee = payee;
                }
            });
        }

        await updateTransaction(transaction);
        onSubmit();
    }

    useEffect(() => {
        if (payeeMap.size === 0)
            loadPayees();
    }, [payeeMap])

    return (
        <Select name="payeeSelect"
            placeholder="Select Payee"
            allowDeselect
            data={[
                { group: "Selected", items: transaction.payee ? [transaction.payee.payeeName] : [] },
                {
                    group: "Saved Payees", items: payeeNames.filter(
                        name => name !== transaction.payee?.payeeName)
                }
            ]}
            value={transaction.payee?.payeeName || (searchValue || '')}
            searchable
            onSearchChange={setSearchValue}
            comboboxProps={{ width: 250 }}
            onChange={(value) => {
                if (value) {
                    setSearchValue(''); // Clear search when selecting
                }
                HandleUpdateTransaction(value)
            }}
            onFocus={(event) => event.target.select()}
            nothingFoundMessage={
                <Button
                    variant="light"
                    radius="md"
                    style={{ maxWidth: '200px' }}
                    onClick={() => {
                        CreateTransactionPayee(searchValue);
                        setSearchValue(''); // Clear after creating
                    }}>
                    Create "{searchValue}"
                </Button>
            }
        />
    )
})