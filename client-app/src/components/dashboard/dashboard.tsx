import {observer} from "mobx-react-lite";
import Sidebar from "../sidebar/sidebar.tsx";
import {MantineProvider} from "@mantine/core";

export default observer(function Dashboard() {

    return (
        <MantineProvider>
            <Sidebar/>
        </MantineProvider>
    )
})