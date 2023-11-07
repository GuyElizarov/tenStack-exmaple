import { Button, ButtonGroup, Center, Flex, Heading, IconButton, useColorMode } from "@chakra-ui/react"
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { useNavigate } from "react-router-dom"
import { Outlet } from "react-router-dom"

export const MainLayout = () => {
    const navigate = useNavigate()
    const { colorMode, toggleColorMode } = useColorMode(); // Use the color mode hook

    const bgColor = { light: 'gray.50', dark: 'gray.800' };
    const color = { light: 'black', dark: 'white' };

    return <Flex flexDir={'column'} minHeight={'100vh'} bg={bgColor[colorMode]} color={color[colorMode]} >

        <Flex className="header" h={'120px'} boxShadow={'0 4px 2px -2px #333'} alignItems={'center'}
            width={'100%'} p={'35px'} gap={'10px'} justifyContent={'space-between'}>
            <ButtonGroup>
                <Button colorScheme='green' onClick={() => navigate('/')}>Home</Button>
                {/* <Button colorScheme='green' onClick={() => navigate('/responsive-table')}>Responsive Table</Button> */}
                <Button colorScheme='green' onClick={() => navigate('/basic-table')}>Basic Table</Button>
            </ButtonGroup>
            <IconButton icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                isRound={true} size="md" colorScheme='green' onClick={toggleColorMode} />
        </Flex>

        <Flex flexGrow={'1'} >
            <Outlet />
        </Flex>


    </Flex>
}