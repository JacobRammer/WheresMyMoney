import {observer} from "mobx-react-lite";
import {Box, Button, Center, Flex, NumberFormatter, Text, Title, Tooltip} from "@mantine/core";
import {CircleArrowLeft, CircleArrowRight} from "lucide-react";
import {useStore} from "../../stores/store.ts";
import {useState} from "react";

export default observer(function DashboardHeader() {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

    const {accountStore} = useStore();
    const {cashBalance} = accountStore
    const [date, setDate] = useState(new Date());

    function dateChange(direction: number) {
        setDate(new Date(date.setMonth(date.getMonth() + direction)));
        
    }
    
    function isActiveDateNotToday()
    {
        if (date.getFullYear() !== new Date().getFullYear())
            return true;
        return date.getMonth() !== new Date().getMonth();
    }
    
    return (
            <Flex align='center'>
                <Flex w={240} align='center'>
                    <Center className='noSelect'>
                        <Tooltip label={monthNames[Math.abs(date.getMonth() - 1 < 0 ? 11 : date.getMonth() - 1)]}>
                                <CircleArrowLeft size={40} style={{marginRight: '10px'}} onClick={() => dateChange(-1)}
                                    className='blueBackgroundColor'/>
                        </Tooltip>
                        
                        <Title order={2}>{monthNames[date.getMonth()]} {date.getFullYear()}</Title>
                        
                        <Tooltip label={monthNames[date.getMonth() + 1 > 11 ? 0 : date.getMonth() + 1]}>
                                <CircleArrowRight size={40} style={{marginLeft: '10px'}} onClick={() => dateChange(1)}
                                    className='blueBackgroundColor'/>
                        </Tooltip>
                            
                        
                    </Center>
                </Flex>

                <Box w={150}>
                    { isActiveDateNotToday()
                        &&
                        <Tooltip label={
                            <Text>
                                Go back to today ({monthNames[new Date().getMonth()]})
                            </Text>}>
                            
                            <Button onClick={() => setDate(new Date())} radius='lg'>Today</Button>
                        </Tooltip>
                    }
                </Box>

            <Flex style={{marginLeft: '250px'}} >
                <Box style={{backgroundColor: cashBalance > 0 ? 'rgba(16, 219, 89)' : 'rgba(255, 99, 99)', borderRadius: '10px'}} >
                    <Center w="auto" h={50}>
                        <Text size='xl' fw={800} style={{marginLeft: '10px', marginRight: '10px'}}>Available:
                            <NumberFormatter prefix=" $" value={cashBalance} decimalScale={2} fixedDecimalScale={true}
                                thousandSeparator/>
                        </Text>
                    </Center>
                </Box>
            </Flex>
        </Flex>
    )
})