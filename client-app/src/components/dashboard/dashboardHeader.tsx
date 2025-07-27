import {observer} from "mobx-react-lite";
import {Box, Button, Center, Flex, NumberFormatter, Text, Title, Tooltip,} from "@mantine/core";
import {CircleArrowLeft, CircleArrowRight} from "lucide-react";
import {useStore} from "../../stores/store.ts";
import {useState} from "react";

export default observer(function DashboardHeader() {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const { accountStore } = useStore();
  const {balanceReadyToAssign} = accountStore;

  const { budgetStore } = useStore();
  const { activeDate, setActiveDate } = budgetStore;

  const [date, setDate] = useState(activeDate);

  function dateChange(direction: number) {
    const newDate = new Date(date.setMonth(date.getMonth() + direction));
    setDate(newDate);
    setActiveDate(newDate);
  }

  function FMe() {
    setDate(new Date());
    setActiveDate(new Date());
  }

  function isActiveDateNotToday() {
    if (date.getFullYear() !== new Date().getFullYear()) return true;
    return date.getMonth() !== new Date().getMonth();
  }

  return (
    <Flex align="center">
      <Flex w={240} align="center" style={{ marginLeft: '10px' }} className="noSelect">
        <Tooltip
          label={
            monthNames[
            Math.abs(date.getMonth() - 1 < 0 ? 11 : date.getMonth() - 1)
            ]
          }
        >
          <CircleArrowLeft
            size={40}
            style={{ marginRight: "10px" }}
            onClick={() => dateChange(-1)}
            className="blueBackgroundColor"
          />
        </Tooltip>

        <Title order={2}>
          {monthNames[date.getMonth()]} {date.getFullYear()}
        </Title>

        <Tooltip
          label={
            monthNames[date.getMonth() + 1 > 11 ? 0 : date.getMonth() + 1]
          }
        >
          <CircleArrowRight
            size={40}
            style={{ marginLeft: "10px" }}
            onClick={() => dateChange(1)}
            className="blueBackgroundColor"
          />
        </Tooltip>
      </Flex>

      <Box w={150}>
        {isActiveDateNotToday() && (
          <Tooltip
            label={
              <Text>
                Go back to today ({monthNames[new Date().getMonth()]})
              </Text>
            }
          >
            <Button onClick={FMe} radius="lg">
              Today
            </Button>
          </Tooltip>
        )}
      </Box>

      {/* height comes from budget info: header={{ height: 60 }} */}
      <Center h={60}><Flex h={50} align='center'
        style={{
          backgroundColor:
              balanceReadyToAssign > 0 ? "rgba(16, 219, 89)" : "rgba(255, 99, 99)",
          borderRadius: "10px", marginLeft: "250px"
        }}
      >
        <Text
          size="xl"
          fw={800}
          style={{ marginLeft: "10px", marginRight: "10px" }}
        >
          Available:&nbsp;
          <NumberFormatter
            prefix="$"
            value={balanceReadyToAssign}
            decimalScale={2}
            fixedDecimalScale={true}
            thousandSeparator
          />
        </Text>
      </Flex></Center>
    </Flex>
  );
});
