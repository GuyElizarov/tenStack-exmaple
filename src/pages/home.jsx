import { Center, Flex } from '@chakra-ui/react'
import { TaskTable } from '../cmps/task-table.jsx'
export const Home = () => {


    return <Flex justifyContent={'center'} pt={'50px'} minW={'100%'} >
        <TaskTable />
    </Flex >
}