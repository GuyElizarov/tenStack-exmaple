import { Box, Icon, InputGroup, InputLeftElement, Input, HStack } from "@chakra-ui/react"
import { SearchIcon } from "../assets/img/icons/SearchIcon.jsx"
import { FilterPopover } from "./filterPopover.jsx"


export const Filters = ({ columnFilters, setColumnFilters }) => {

    const taskName = columnFilters.find(filterItem => filterItem.id === "task")?.value || ""

    const onFilterChange = (id, value) =>
        setColumnFilters(prev =>
            prev.filter(filterItem =>
                filterItem.id !== "task").concat({ id, value }))

    return (
        <HStack mb='6' spacing={3}>

            <InputGroup size="sm" maxW="12rem" >
                <InputLeftElement pointerEvents="none" bg={'gray.700'} >
                    <Icon as={SearchIcon} overflow={'hidden'} />
                </InputLeftElement>
                <Input type="text" variant="filled" placeholder="Task name"
                    borderRadius={5} bg={'gray.700'}
                    value={taskName} onChange={(ev) => onFilterChange("task", ev.target.value)} />
            </InputGroup>
            <FilterPopover columnFilters={columnFilters} setColumnFilters={setColumnFilters} />

        </HStack>)
}
