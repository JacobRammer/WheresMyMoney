import {observer} from "mobx-react-lite";
import {ChartArea, Landmark, PiggyBank} from "lucide-react";
import {Box, NavLink, Text} from "@mantine/core";

export default observer(function Links() {

    return (
        <Box style={{marginLeft: '0'}}>

            <NavLink className='SidebarLink'
                     href="/app"
                     label={<Text size='xl' fw={600}>Budget</Text>}
                     leftSection={<PiggyBank size={30}/>}
            />

            <NavLink className='SidebarLink'
                     href="/reports"
                     label={<Text size='xl' fw={600}>Reports</Text>}
                     leftSection={<ChartArea size={30}/>}
            />

            <NavLink className='SidebarLink'
                     href="/accounts"
                     label={<Text size='xl' fw={600}>Accounts</Text>}
                     leftSection={<Landmark size={30}/>}
            />
        </Box>
        

            
    )
})