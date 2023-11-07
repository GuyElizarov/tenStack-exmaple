import { Button, Center, Flex, Heading } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { Outlet } from "react-router-dom"

export const MainLayout = () => {
    const navigate = useNavigate()

    return <Flex flexDir={'column'} minHeight={'100vh'} >

        <Flex className="header" h={'120px'} boxShadow={'0 4px 2px -2px #333'} alignItems={'center'}
         width={'100%'} p={'35px'} gap={'35px'}>
                <Button colorScheme='green' onClick={() => navigate('/')}>Home</Button>
                {/* <Button colorScheme='green' onClick={() => navigate('/responsive-table')}>Responsive Table</Button> */}
                <Button colorScheme='green' onClick={() => navigate('/basic-table')}>Basic Table</Button>
        </Flex>

        <Flex flexGrow={'1'} >
            <Outlet />
        </Flex>


    </Flex>
}