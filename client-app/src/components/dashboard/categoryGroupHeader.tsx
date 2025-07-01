import { observer } from "mobx-react-lite";
import { Box, Center, Flex, Text } from "@mantine/core";
export default observer(function CategoryGroupHeader() {
  return (
    <Flex className="dashboardFlexFormatWithUnderline">
      <Box className="dashboardBudgetGroupFormat">
        <Text>Category</Text>
      </Box>
      <Center w={85} style={{ marginLeft: "20px" }}>
        <Text>Assigned</Text>
      </Center>
      <Center w={100}>
        <Text>Outflow</Text>
      </Center>
      <Center w={100} className="dashboardBudgetCategoryFinalFlexItem">
        <Text>Available</Text>
      </Center>
    </Flex>
  );
});
