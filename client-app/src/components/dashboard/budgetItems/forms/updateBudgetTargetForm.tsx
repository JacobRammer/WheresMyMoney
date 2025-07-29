import {observer} from "mobx-react-lite"
import {useStore} from "../../../../stores/store.ts";
import {useForm} from "@mantine/form";
import {BudgetItem} from "../../../../models/budgetItem.ts";
import {Button, Flex, NumberInput} from "@mantine/core";
import {DatePickerInput} from "@mantine/dates";
import {CalendarDays, PiggyBank} from "lucide-react";

interface Props {
    onClose: () => void;
}

export default observer(function UpdateBudgetTargetMenu({onClose}: Props) {

    const {budgetStore} = useStore();
    const {selectedBudgetItem, updateBudgetItem, setSelectedBudgetItem} = budgetStore

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            budgetTarget: selectedBudgetItem!.target,
            budgetDate: new Date(),
        },

        validate: {
            budgetTarget: (value: number | string) => {
                if (value === null || value === undefined || value === '') {
                    return 'Budget target is required';
                }
                const numValue = typeof value === 'string' ? parseFloat(value) : value;
                if (isNaN(numValue)) {
                    return 'Budget target must be a number';
                }
                if (numValue < 0) {
                    return 'Budget target cannot be negative';
                }
                return null;
            },
        },
    });

    async function HandleFormSubmit(values: any) {
        const temp = new BudgetItem(
            selectedBudgetItem!.id,
            selectedBudgetItem!.title,
            selectedBudgetItem!.budgetGroupId,
            selectedBudgetItem!.dateCreated,
            selectedBudgetItem!.assigned,
            values.budgetTarget,
            selectedBudgetItem!.outflow,
        )
        await updateBudgetItem(temp);
        setSelectedBudgetItem(temp);
        onClose();
    }

    return (
        <form onSubmit={form.onSubmit((values) => HandleFormSubmit(values))}>
            <NumberInput
                withAsterisk
                value={selectedBudgetItem!.target}
                key={form.key('budgetTarget')}
                {...form.getInputProps("budgetTarget")}
                label="Monthly Budget Target"
                onFocus={(event) => event.target.select()}
                hideControls
                allowNegative={false}
                prefix="$"
                decimalScale={2}
                thousandSeparator=","
                leftSection={<PiggyBank/>}

            />

            <DatePickerInput withAsterisk defaultValue={form.values.budgetDate}
                             key={form.key('budgetDate')}
                             {...form.getInputProps("budgetDate")}
                             label="Need To Fund By"
                             leftSection={<CalendarDays/>}
            />

            <Flex justify='space-between' mt="md">
                <Button style={{backgroundColor: 'red'}} onClick={onClose}>
                    Cancel
                </Button>

                <Button onClick={() => {
                }} type='submit'>
                    Update
                </Button>
            </Flex>
        </form>
    );
})