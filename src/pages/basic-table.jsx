
import {
    Table, Thead, Tbody,  Tr, Th, Td, TableContainer, VStack, ButtonGroup, Button, Box, Input, Spinner, IconButton,
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody,
    ModalFooter, FormControl, FormLabel, Select, useColorModeValue, Icon,
} from '@chakra-ui/react'
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import { DateTime } from 'luxon'
import { AddIcon, DeleteIcon, EditIcon, UpDownIcon } from '@chakra-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsLoadingPerson, selectPersons } from '../store/person/personSelectors'
import { addPerson, loadPersons, removePerson, updatePerson } from '../store/person/personActions'
import { personService } from '../services/personService'

const columns = [
    {
        header: 'Actions',
        id: 'actions',
        cell: (info) => (
            <ButtonGroup gap='2'>
                <IconButton icon={<EditIcon />}
                    onClick={() => info.table.options.meta.handleEdit(info.row.original)} />
                <IconButton icon={<DeleteIcon />}
                    onClick={() => info.table.options.meta.handleDelete(info.row.original.id)} />
            </ButtonGroup>
        ),
    },
    {
        header: 'ID',
        accessorKey: 'id',
    },

    // regular name display by showing two columns separately:

    // {
    //     header: 'First name',
    //     accessorKey: 'first_name',
    // },
    // {
    //     header: 'Last name',
    //     accessorKey: 'last_name',
    // },

    // combining tow filed from the data to one column:

    {

        header: 'Full name',
        accessorFn: row => `${row.first_name} ${row.last_name}`,
    },

    // creates another header above the tow column
    // note that if used like this you should use header.isPlaceholder
    // for conditional rendering : 

    // {
    //     header: 'Full name',
    //     columns: [
    //         {
    //             header: 'First ',
    //             accessorKey: 'first_name',
    //         },
    //         {
    //             header: 'Last ',
    //             accessorKey: 'last_name',
    //         },
    //     ]
    // },
    {
        header: 'Email',
        accessorKey: 'email',
    },
    {
        header: 'Gender',
        accessorKey: 'gender',
        enableSorting: false
    },
    {
        header: 'Date of birth',
        accessorKey: 'dob',
        cell: info => DateTime.fromISO(info.getValue()).toLocaleString(DateTime.DATETIME_MED),
        enableSorting: false,
    },
]


export const BasicTable = () => {
    const persons = useSelector(selectPersons)
    const isLoadingPerson = useSelector(selectIsLoadingPerson)
    const [data, setData] = useState(persons)
    const [sorting, setSorting] = useState([])
    const [filtering, setFiltering] = useState('')
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [editingPerson, setEditingPerson] = useState(null)
    const dispatch = useDispatch()
    const bgColor = useColorModeValue('white', 'gray.800')
    const textColor = useColorModeValue('gray.800', 'white')

    useEffect(() => {
        dispatch(loadPersons())
    }, [dispatch])

    useEffect(() => {
        setData(persons)
    }, [persons])


    const handleAdd = () => {
        const newPerson = personService.getEmptyPerson()
        handleEdit(newPerson)
    }

    const handleDelete = (personId) => {
        if (window.confirm('Are you sure you want to delete this person?')) {
            dispatch(removePerson(personId))
        }
    }

    const handleEdit = (person) => {
        setEditingPerson(person)
        setIsEditModalOpen(true)
    }

    const handleSubmitEdit = (person) => {
        setIsEditModalOpen(false)
        if (person.id) {
            dispatch(updatePerson(person))
        } else {
            dispatch(addPerson(person))
        }
        setEditingPerson(null)
    }

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting: sorting,
            globalFilter: filtering
        },
        meta: {
            handleDelete,
            handleEdit
        },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering,
        getFilteredRowModel: getFilteredRowModel(),
        columnResizeMode: "onChange"
    })

    if (isLoadingPerson) return <Spinner />
    return <VStack w={'full'} p='35'>
        <Button leftIcon={<AddIcon />} colorScheme='teal' onClick={handleAdd}>
            Add Person
        </Button>
        <Input maxWidth={'50%'} type='text' placeholder='filter'
            value={filtering} onChange={ev => setFiltering(ev.target.value)} />
        <TableContainer>
            <Table variant='simple'  size={'lg'} >
                <Thead>
                    {table.getHeaderGroups().map(headerGroup =>
                        <Tr key={headerGroup.id}>
                            {headerGroup.headers.map(header =>
                                  <Th key={header.id} w={header.getSize()}  position={'relative'}>
                                    {header.column.getCanSort() && <UpDownIcon onClick={header.column.getToggleSortingHandler()} position={'relative'} left={-1} top={'-2px'}  />}
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(header.column.columnDef.header, header.getContext)}
                                         {{ asc: " 🔼", desc: " 🔽", }[header.column.getIsSorted()]}
                                <Box className={`resizer ${header.column.getIsResizing() ? "isResizing" : ""}`}
                                onMouseDown={header.getResizeHandler()} onTouchStart={header.getResizeHandler()}> </Box>
                                </Th>
                            )}
                        </Tr>)}
                </Thead>
                <Tbody>
                    {table.getRowModel().rows.map(row => (
                        <Tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <Td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </Td>
                            ))}
                        </Tr>
                    ))}

                </Tbody>
            </Table>
        </TableContainer>

        <ButtonGroup size={'sm'} isAttached  bg={bgColor} color={textColor}>
            <Button  
                onClick={() => table.setPageIndex(0)} isDisabled={!table.getCanPreviousPage()}>
                {"First Page"}
            </Button>
            <Button 
                onClick={() => table.previousPage()} isDisabled={!table.getCanPreviousPage()}>
                {"<"}
            </Button>

            <Button 
                onClick={() => table.nextPage()} isDisabled={!table.getCanNextPage()}>
                {">"}
            </Button>
            <Button 
                onClick={() => table.setPageIndex(table.getPageCount() - 1)} isDisabled={!table.getCanNextPage()}>
                {"Last Page"}
            </Button>
        </ButtonGroup>
        {isEditModalOpen && (
            <EditPersonModal
                person={editingPerson}
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSubmit={handleSubmitEdit}
            />
        )}
    </VStack>

}


const EditPersonModal = ({ person, isOpen, onClose, onSubmit }) => {
    const [formValues, setFormValues] = useState(person)
    const bgColor = useColorModeValue('white', 'gray.800')
    const textColor = useColorModeValue('gray.800', 'white')

    useEffect(() => {
        if (person) {
            setFormValues(person)
        }
    }, [person, isOpen])

    const handleFormChange = (e) => {
        const { name, value } = e.target
        setFormValues(prev => ({ ...prev, [name]: value }))
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        onSubmit(formValues)
        onClose()
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent as="form" onSubmit={handleFormSubmit} bg={bgColor} color={textColor}>
                <ModalHeader>Edit Person</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <FormLabel htmlFor="first_name">First Name</FormLabel>
                        <Input
                            id="first_name"
                            name="first_name"
                            value={formValues.first_name || ''}
                            onChange={handleFormChange}
                        />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel htmlFor="last_name">Last Name</FormLabel>
                        <Input
                            id="last_name"
                            name="last_name"
                            value={formValues.last_name || ''}
                            onChange={handleFormChange}
                        />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <Input
                            id="email"
                            name="email"
                            value={formValues.email || ''}
                            onChange={handleFormChange}
                        />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel htmlFor="gender">Gender</FormLabel>
                        <Select
                            id="gender"
                            name="gender"
                            value={formValues.gender || ''}
                            onChange={handleFormChange}
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Bigender">Bigender</option>
                            <option value="Bigender">Bigender</option>
                            <option value="Non-binary	">Non-binary</option>
                        </Select>
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel htmlFor="dob">Date of Birth</FormLabel>
                        <Input
                            id="dob"
                            name="dob"
                            type="date"
                            value={DateTime.fromISO(formValues.dob).toISODate() || ''}
                            onChange={handleFormChange}
                        />
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} type="submit">
                        Save Changes
                    </Button>
                    <Button variant="ghost" onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}