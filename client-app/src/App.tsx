import {observer} from "mobx-react-lite";
import "./styling/styles.css";
import {Button, Center, MantineProvider} from "@mantine/core";
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';


export default observer(function App() {
    
    return (
        <MantineProvider defaultColorScheme="dark">
            <Center h='calc(100vh)'>
                <Button component='a' href='/app'>Take me to the app!</Button>
            </Center>
        </MantineProvider>
    )
})
