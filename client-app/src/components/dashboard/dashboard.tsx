import {observer} from "mobx-react-lite";
import Sidebar from "../sidebar/sidebar.tsx";
import {ChakraProvider} from "@chakra-ui/react";

export default observer(function Dashboard() {

    return (
            <ChakraProvider>
        <Sidebar/>
            </ChakraProvider>
    )
})