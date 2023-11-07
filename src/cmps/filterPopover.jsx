import { Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverCloseButton, Button, PopoverArrow, Text, VStack, Flex, Icon } from '@chakra-ui/react'
import { STATUSES } from "../data"
import { ColorIcon } from './colorIcon'
import { FilterIcon } from '../assets/img/icons/FilterIcon'


const StatusItem = ({ status, setColumnFilters, isActive }) => (
  <Flex align="center" cursor="pointer" borderRadius={5} fontWeight="bold" p={1.5}
    bg={isActive ? "gray.800" : "transparent"}
    _hover={{ bg: "gray.800", }}
    onClick={() => setColumnFilters(prev => {
      const statuses = prev?.find(filterItem => filterItem.id === "status")?.value

      if (!statuses) {
        return prev.concat({
          id: "status",
          value: [status.id],
        })
      }

      return prev.map((filterItem) =>
        filterItem.id === "status"
          ? {
            ...filterItem,
            value: isActive
              ? statuses.filter((activeStatus) => activeStatus !== status.id)
              : statuses.concat(status.id)
          }
          : filterItem
      )

    })} >
    <ColorIcon color={status.color} mr={3} />
    {status.name}
  </Flex>
)

export const FilterPopover = ({ setColumnFilters, columnFilters }) => {

  const filletedStatuses = columnFilters.find(filterItem => filterItem.id === "status")?.value || []

  return (
    <Popover  >
      <PopoverTrigger >
        <Button leftIcon={<Icon as={FilterIcon} fontSize={18} />}
        >filter</Button>
      </PopoverTrigger>

      <PopoverContent >

        <PopoverArrow />
        <PopoverCloseButton />

        <PopoverBody >
          <Text fontSize="md" fontWeight="bold" mb={4}>
            Filter By:
          </Text>
          <Text fontWeight="bold" color="gray.400" mb={1}>
            Status
          </Text>
          <VStack align="flex-start" spacing={1}>
            {STATUSES.map((status) => (
              <StatusItem status={status} key={status.id} setColumnFilters={setColumnFilters}
                isActive={filletedStatuses.includes(status.id)} />
            ))}
          </VStack>
        </PopoverBody>

      </PopoverContent>
    </Popover>
  )
}