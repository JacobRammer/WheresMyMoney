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
}

export default observer(function TransactionPayeeSelector({transaction}: Props) {
    const {accountStore} = useStore()
    const { updateTransaction, payeeMap, loadPayees, createPayee } = accountStore;

    const payeeNames = Array.from(payeeMap.values())
        .map(payee => payee.payeeName)
        .sort((a, b) => a.localeCompare(b));

    const [searchValue, setSearchValue] = useState('');

    function CreateTransactionPayee(payeeName: string) {
        const payee = new Payee(uuidv4(), payeeName);
        createPayee(payee);
    }

    function HandleUpdateTransaction(payeeName: string | null) {
        console.log(payeeName)
        if (payeeName === null)
            return;
        runInAction(() => {
            const payee = payeeMap.get(payeeName);
            if (payee) {
                transaction.payee = payee;
            }
        });
        updateTransaction(transaction);
    }
    
    function test() {
        if (transaction.payee === null)
            return []
        return [transaction.payee.payeeName]
    }

    function test2() {
        if (transaction.payee === undefined)
            return ['placehsolder']
        return payeeNames.filter(name => name !== transaction.payee?.payeeName)
    }

    useEffect(() => {
        if (payeeMap.size === 0)
            loadPayees();
    }, [payeeMap.size])

    return (
        <Select name="dropdown"
            placeholder="Select Payee"
            data={[
                {
                    group: "Selected",
                    items: test()
                },
                {
                    group: "Saved Payees",
                    items: test2()
                }
            ]}
            value={transaction.payee?.payeeName}
            searchable
            onSearchChange={setSearchValue}
            comboboxProps={{ width: 250 }}
            onChange={(value) => {
                HandleUpdateTransaction(value)
            }}
            onFocus={(event) => event.target.select()}
            nothingFoundMessage={
                <Button
                    variant="light"
                    radius="md"
                    style={{ maxWidth: '200px' }} // maybe pop open a modal?
                    onClick={() => CreateTransactionPayee(searchValue)}>
                    Create "{searchValue}"
                </Button>
            }
        />
        
    )
})