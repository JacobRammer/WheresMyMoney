import {observer} from "mobx-react-lite";
import {useState} from "react";
import {Box, Button, Menu} from "@mantine/core";
import UpdateBudgetTargetForm from "./updateBudgetTargetForm.tsx";

export default observer(function UpdateBudgetTargetMenu() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <Menu shadow="md" radius={20} withArrow opened={isMenuOpen} onDismiss={() => setIsMenuOpen(false)}>
            <Menu.Target>
                <Button fullWidth radius='lg' onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    Update budget funding
                </Button>
            </Menu.Target>

            <Menu.Dropdown>
                <Box style={{margin: '10px'}}>
                    <UpdateBudgetTargetForm onClose={() => setIsMenuOpen(false)}/>
                </Box>
            </Menu.Dropdown>
        </Menu>
    );
})