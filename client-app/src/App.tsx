import {observer} from "mobx-react-lite";
import "./styling/styles.css";
import {Button, Center, ChakraProvider, Link} from "@chakra-ui/react";
import Theme from "./theme/theme.ts";

export default observer(function App() {
    
    return (
        <ChakraProvider theme={Theme}>
            <Center h='calc(100vh)'>
                <Button as={Link} href='/app'>Take me to the app!</Button>
            </Center>
        </ChakraProvider>
    )
})
