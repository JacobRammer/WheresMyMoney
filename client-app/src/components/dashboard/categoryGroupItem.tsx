import { observer } from "mobx-react-lite";
import { ActionIcon, Box, Center, Flex, Menu, Modal, NumberFormatter, Text, Tooltip, } from "@mantine/core";
import { BudgetGroup } from "../../models/budgetGroup.ts";
import CategoryItem from "./Category/categoryItem.tsx";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { CirclePlus, Pencil, Trash2 } from "lucide-react";
import { useDisclosure, useHover } from "@mantine/hooks";
import AddCategoryItemForm from "./Category/addCategoryItemForm.tsx";
import { BudgetItem } from "../../models/budgetItem.ts";
import { useStore } from "../../stores/store.ts";
import EditBudgetGroupTitleForm from "../budgetGroups/forms/editBudgetGroupTitleForm.tsx";
import DeleteBudgetGroupModal from "../budgetGroups/modals/deleteBudgetGroupModal.tsx";

interface Props {
  budgetGroup: BudgetGroup;
}

export default observer(function CategoryGroupItem({ budgetGroup }: Props) {
  const { hovered, ref } = useHover();
  const { budgetStore } = useStore();
  const [active, setActive] = useState(false);
  const { getBudgetItemsByMonth } = budgetStore;

  const [opened, { open, close }] = useDisclosure(false);


  return (
    <Box>
      <Flex className="categoryGroupItemFlex">
        <Box className="dashboardBudgetGroupFormat" ref={ref}>
          <Flex>
            <Center>
              <Text>{budgetGroup.title}</Text>
              {(hovered || active) && (
                <Flex>
                  {/* Add Budget Item Menu */}
                  <Menu shadow="md" radius={20}>
                    <Menu.Target>
                      <ActionIcon variant="transparent" onClick={() => setActive(true)}>
                        <Tooltip label="Add Budget Item" withArrow>
                          <CirclePlus size={18} />
                        </Tooltip>
                      </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Box style={{ margin: '10px' }}>
                        <AddCategoryItemForm
                          updateMenuState={() => { setActive(false) }}
                          budgetGroupId={budgetGroup.id}
                        />
                      </Box>
                    </Menu.Dropdown>
                  </Menu>

                  {/* Edit Title Menu */}
                  <Menu shadow="md" radius={20}>
                    <Menu.Target>
                      <ActionIcon variant="transparent" onClick={() => setActive(true)}>
                        <Tooltip label="Edit Title" withArrow>
                          <Pencil size={18} />
                        </Tooltip>
                      </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Box style={{ margin: '10px' }}>
                        <EditBudgetGroupTitleForm budgetGroup={budgetGroup} updateMenuState={() => { setActive(false) }} />
                      </Box>
                    </Menu.Dropdown>
                  </Menu>

                  {/* delete menu */}
                  <ActionIcon variant="transparent" onClick={open} color="red">
                    <Tooltip label="Delete Budget Group" withArrow>
                      <Trash2 size={18} />
                    </Tooltip>
                  </ActionIcon>
                </Flex>
              )}
            </Center>
          </Flex>
          <Modal opened={opened} onClose={close} title='Delete Budget Group?' centered>
            <DeleteBudgetGroupModal onClose={close} budgetGroup={budgetGroup} />
          </Modal>
        </Box>




        <Center w={100} style={{ marginLeft: "10px" }}>
          <NumberFormatter
            value={budgetGroup.assigned}
            prefix="$"
            decimalScale={2}
            fixedDecimalScale={true}
          />
        </Center>
        <Center w={100}>
          <NumberFormatter
            value={budgetGroup.outflow}
            prefix="$"
            decimalScale={2}
            fixedDecimalScale={true}
          />
        </Center>
        <Center w={100} className="dashboardBudgetCategoryFinalFlexItem">
          <NumberFormatter
            value={budgetGroup.available}
            prefix="$"
            decimalScale={2}
            fixedDecimalScale={true}
          />
        </Center>
      </Flex>
      {budgetGroup.categories.length !== 0 ? (
        getBudgetItemsByMonth(budgetGroup).map((category: BudgetItem) => (
          <Box key={uuidv4()}>
            <CategoryItem budgetItem={category} />
          </Box>
        ))
      ) : (
        <Text style={{ margin: "10px" }}>No budget items</Text>
      )}
    </Box>
  );
});
