import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store.ts";
import Sidebar from "../sidebar/sidebar.tsx";
import { AppShell, Flex, MantineProvider, Modal, NumberFormatter, Text, Title, Tooltip } from "@mantine/core";
import { CircleHelp, CirclePlus, Smile } from "lucide-react";
import AccountTable from "./accountTable.tsx";
import { useDisclosure } from "@mantine/hooks";
import CreateAccountForm from "./createAccountForm.tsx";
import { BudgetItemAvailableStyling } from "../../constants/budgetItemAvailableStyling.ts";

;

export default observer(function AccountDashboard() {

    const { accountStore } = useStore();
    const { cashBalance, totalBalance, balanceReadyToAssign } = accountStore;

    const [opened, { open, close }] = useDisclosure(false);

    return (
        <MantineProvider >

            <AppShell
                layout="alt"
                navbar={{ width: 250, breakpoint: 'sm' }}
                header={{ height: 125 }}
                padding='md'
            >
                <AppShell.Header p='xs'>
                    <Title order={2}>Account Dashboard</Title>
                    <Flex align='center'>
                        <Text>Cash balance:&nbsp;
                            <NumberFormatter prefix="$" decimalScale={2} fixedDecimalScale={true} value={cashBalance}
                                style={{ color: cashBalance > 0 ? 'black' : BudgetItemAvailableStyling.COLOR.REDWARNING }} />
                        </Text>
                        <Tooltip label="This is the balance of all your cash accounts combined.
                                    (checking & savings accounts)"
                            multiline
                            w={220}
                        >
                            <CircleHelp size={15} style={{ marginLeft: '10px' }} />
                        </Tooltip>
                    </Flex>

                    <Flex align='center'>
                        <Text>Available cash:&nbsp;
                            <NumberFormatter prefix="$" decimalScale={2} fixedDecimalScale={true} value={balanceReadyToAssign}
                                style={{ color: balanceReadyToAssign > 0 ? 'black' : BudgetItemAvailableStyling.COLOR.REDWARNING }} />
                        </Text>
                        <Tooltip label="This is the balance of your cash accounts minus funds assigned to budgets."
                            multiline
                            w={220}
                        >
                            <CircleHelp size={15} style={{ marginLeft: '10px' }} />
                        </Tooltip>
                    </Flex>

                    <Flex align='center'>
                        <Text>Total balance:&nbsp;
                            <NumberFormatter value={totalBalance()} prefix="$" decimalScale={2} fixedDecimalScale={true}
                                style={{ color: totalBalance() > 0 ? 'black' : BudgetItemAvailableStyling.COLOR.REDWARNING }} />
                        </Text>
                        <Tooltip label={<Text>This number is often times depressing. This is your net worth (available cash
                            - debts). I hated to see this number too the first time I added up my debts. I believe in you! <Smile size={15} style={{ marginBottom: '-2px' }} /></Text>}
                            multiline
                            w={220}
                        >
                            <CircleHelp size={15} style={{ marginLeft: '10px' }} />
                        </Tooltip>
                    </Flex>
                </AppShell.Header>
                <AppShell.Navbar>
                    <Sidebar />
                </AppShell.Navbar>
                <AppShell.Main>
                    <AccountTable />
                    <Tooltip label="Add account" position="top-start">
                        <CirclePlus size={40} className="AddActionCircleBottom" onClick={open} />
                    </Tooltip>

                    <Modal opened={opened} onClose={close} title="Add Account" centered closeOnClickOutside={false}>
                        <CreateAccountForm onCloseModal={close} />
                    </Modal>
                </AppShell.Main>
            </AppShell>

        </MantineProvider>


    )
})