import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store.ts";
import { useParams } from "react-router-dom";
import Sidebar from "../sidebar/sidebar.tsx";
import { AppShell, MantineProvider } from "@mantine/core";
import { useEffect, useState } from "react";
import { Account } from "../../models/account.ts";
import AccountTransactionDetails from "./transactions/accountTransactionDetails.tsx";
import TransactionDashboardHeader from "./transactions/transactionDashboardHeader.tsx";
export default observer(function AccountDetails() {
    const { accountStore } = useStore();
    const { accountRegistry, numberOfTransactions, isCashAccount } = accountStore;
    const { id } = useParams()
    const [account, setAccount] = useState(new Account("", "", 0, "", 0, ""));

    useEffect(() => {
        const tempAccount = accountRegistry.get(id!);
        if (id !== undefined && tempAccount !== undefined)
            setAccount(tempAccount!);
    }, [id, accountRegistry.size, numberOfTransactions]);
    return (

        <MantineProvider>
            <AppShell
                layout="alt"
                navbar={{ width: 250, breakpoint: 'sm' }}
                header={{ height: isCashAccount(account) ? 100 : 73 }}
                padding='md'
            >
                <AppShell.Header p='xs'>
                    <TransactionDashboardHeader account={account} />
                </AppShell.Header>
                <AppShell.Navbar>
                    <Sidebar />
                </AppShell.Navbar>
                <AppShell.Main>
                    <AccountTransactionDetails account={account} setAccount={setAccount} />
                </AppShell.Main>
            </AppShell>
        </MantineProvider>
    )
})