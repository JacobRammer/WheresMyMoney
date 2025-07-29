import {ActionIcon, Box, Center, Menu, Tooltip} from '@mantine/core';
import {Pencil} from 'lucide-react';
import {observer} from 'mobx-react-lite';
import {useState} from 'react';
import UpdateBudgetTitleForm from "./forms/updateBudgetTitleForm.tsx";

export default observer(function SelectedBudgetItemUpdateTitle() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <Menu shadow="md" radius={20} withArrow opened={isMenuOpen} onDismiss={() => setIsMenuOpen(false)}>
            <Menu.Target>
                <Center>
                    <Tooltip label="Update budget title" position="bottom" withArrow>
                        <ActionIcon variant='subtle' color='cyan' radius="lg" size={30}
                                    style={{marginLeft: '10px'}} onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <Pencil/>
                        </ActionIcon>
                    </Tooltip>
                </Center>
            </Menu.Target>

            <Menu.Dropdown>
                <Box style={{margin: '10px'}}>
                    <UpdateBudgetTitleForm onClose={() => setIsMenuOpen(false)}/>
                </Box>
            </Menu.Dropdown>
        </Menu>
    );
});