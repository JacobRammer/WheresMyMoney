import {observer} from "mobx-react-lite";
import {Link, List, ListIcon, ListItem} from "@chakra-ui/react";
import {ChartBarBig, Landmark, PiggyBank} from "lucide-react";

export default observer(function Links() {

    return (
        <List className='sidebar-list'>

            <ListItem fontSize='2xl'>
                <Link href='/app' _hover={{textDecoration: 'none'}}>
                    <ListIcon style={{marginBottom: '6px'}}>
                        <PiggyBank viewBox='0 0 24 24' />
                    </ListIcon>Budget</Link>
            </ListItem>

            <ListItem fontSize='2xl'>
                <Link href='/reports' _hover={{textDecoration: 'none'}}>
                    <ListIcon style={{marginBottom: '6px'}}>
                        <ChartBarBig viewBox='0 0 24 24' />
                    </ListIcon>Reports</Link>
            </ListItem>

            <ListItem fontSize='2xl'>
                <Link href='/accounts' _hover={{textDecoration: 'none'}}>
                    <ListIcon style={{marginBottom: '6px'}}>
                        <Landmark viewBox='0 0 24 24' />
                    </ListIcon>Accounts</Link>
            </ListItem>
        </List>
    )
})