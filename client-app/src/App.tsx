import {observer} from "mobx-react-lite";
import "./styling/styles.css";
import Sidebar from "./components/sidebar/sidebar.tsx";
import {ChakraProvider} from "@chakra-ui/react";

export default observer(function App() {
    
    return (
        <ChakraProvider>
            <Sidebar/>
        </ChakraProvider>
    )
})
