import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"
import {ColorIcon} from './colorIcon.jsx'
import { STATUSES } from "../data"

export const StatusCell = ({ getValue, row, column, table }) => {
    const { updateData } = table.options.meta
    const { name, color } = getValue() || {}
    
    return <Menu isLazy offset={[0, 0]} flip={false} autoSelect={'false'}  w={'full'} >
        <MenuButton h={"100%"} w={"100%"} textAlign={'left'} p={1.5} bg={color || 'transparent'} color={'gray.900'}>
            {name}
        </MenuButton>
        <MenuList bg={'gray.700'}>
                <MenuItem bg={'gray.700'} onClick={()=> updateData(row.index, column.id, null)}>
                <ColorIcon color={'red.400'} mr={3}/>
                None
            </MenuItem >
            {STATUSES.map(status =>( 
                <MenuItem bg={'gray.700'} key={status.id} onClick={()=> updateData(row.index, column.id, status)}>
                <ColorIcon color={status.color} mr={3}/>
                {status.name}
            </MenuItem >
            ))}
               
        </MenuList>
    </Menu>
}