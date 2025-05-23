import {Box, Button, Flex, Menu, Text} from "@mantine/core";
import {observer} from "mobx-react-lite";
import {CirclePlus} from "lucide-react";
import {useState} from "react";
import AddCategoryForm from "./addCategoryForm.tsx";

export default observer(function CategoryTable() {
    
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <Box className='CategoryTableHeader'>
            <Flex className='CategoryTableFlex'>
                <Menu shadow="md" radius={20} withArrow opened={isMenuOpen} onDismiss={() => setIsMenuOpen(false)}>
                    <Menu.Target>
                        <Button onClick={() =>setIsMenuOpen(!isMenuOpen)}
                                leftSection={<CirclePlus size={20}/>} radius='lg' variant='outline' 
                                color='rgb(121, 173, 220)'>
                            <Text size='xl' fw={600}>Add Category</Text>
                        </Button>
                    </Menu.Target>

                    <Menu.Dropdown>
                        <Menu.Label>Create Budget Category</Menu.Label>
                        <Box style={{margin: '10px'}}>
                            <AddCategoryForm createCategorySubmit={() => console.log("hut")} updateMenuState={() => setIsMenuOpen(false)}/>
                        </Box>
                    </Menu.Dropdown>
                </Menu>
                
            </Flex>
        </Box>
    )
})