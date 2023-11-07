
import {
    Table, Thead, Tbody, Tfoot, Tr, Th,
    Td, TableContainer, VStack, ButtonGroup, Button, Box, Input, Spinner, IconButton,
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody,
    ModalFooter, FormControl, FormLabel, Select,
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
        footer: 'ID',
    },

    // regular name display by showing two columns separately:

    // {
    //     header: 'First name',
    //     accessorKey: 'first_name',
    //     footer: 'First name',
    // },
    // {
    //     header: 'Last name',
    //     accessorKey: 'last_name',
    //     footer: 'Last name',
    // },

    // combining tow filed from the data to one column:

    {

        header: 'Full name',
        accessorFn: row => `${row.first_name} ${row.last_name}`,
        footer: 'Full name',
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
    //             footer: 'First name',
    //         },
    //         {
    //             header: 'Last ',
    //             accessorKey: 'last_name',
    //             footer: 'Last name',
    //         },
    //     ]
    // },
    {
        header: 'Email',
        accessorKey: 'email',
        footer: 'Email',
    },
    {
        header: 'Gender',
        accessorKey: 'gender',
        footer: 'Gender',
    },
    {
        header: 'Date of birth',
        accessorKey: 'dob',
        footer: 'Date of birth',
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
    const dispatch = useDispatch()



    useEffect(() => {
        dispatch(loadPersons())
    }, [dispatch])

    useEffect(() => {
        setData(persons)
    }, [persons])

    const [editingPerson, setEditingPerson] = useState(null)

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
    })

    if (isLoadingPerson) return <Spinner />
    return <VStack mt='100' w={'full'} p='35'>
        <Button leftIcon={<AddIcon />} colorScheme='teal' onClick={handleAdd}>
            Add Person
        </Button>
        <Input w={'30%'} type='text' placeholder='filter'
            value={filtering} onChange={ev => setFiltering(ev.target.value)} />
        <TableContainer>
            <Table variant='simple' size={'lg'}>
                <Thead>
                    {table.getHeaderGroups().map(headerGroup =>
                        <Tr key={headerGroup.id}>
                            {headerGroup.headers.map(header =>
                                // implement on the header itself (state needed): 

                                <Th key={header.id} w={header.getSize()} onClick={header.column.getToggleSortingHandler()} >

                                    {header.isPlaceholder
                                        ? null
                                        : <> {flexRender(header.column.columnDef.header, header.getContext)}
                                            {{ asc: " 🔼", desc: " 🔽", }[header.column.getIsSorted()]}</>}
                                </Th>
                                // implement on the icon itself (no state needed): 


                                // <Th key={header.id} w={header.getSize()}>
                                //     {header.column.getCanSort() && <UpDownIcon onClick={header.column.getToggleSortingHandler()} mr='2' />}
                                //     {header.isPlaceholder
                                //         ? null
                                //         : flexRender(header.column.columnDef.header, header.getContext)}
                                //          {{ asc: " 🔼", desc: " 🔽", }[header.column.getIsSorted()]}
                                // </Th>
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
                {/* <Tfoot>
                    {table.getFooterGroups().map(footerGroup =>
                        <Tr key={footerGroup.id}>
                            {footerGroup.headers.map(header =>
                                <Th key={header.id} w={header.getSize()}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(header.column.columnDef.header, header.getContext)}
                                </Th>
                            )}
                        </Tr>)}
                </Tfoot> */}
            </Table>
        </TableContainer>

        <ButtonGroup size={'sm'} isAttached>
            <Button color={'white'}
                onClick={() => table.setPageIndex(0)} isDisabled={!table.getCanPreviousPage()}>
                {"First Page"}
            </Button>
            <Button color={'white'}
                onClick={() => table.previousPage()} isDisabled={!table.getCanPreviousPage()}>
                {"<"}
            </Button>

            <Button color={'white'}
                onClick={() => table.nextPage()} isDisabled={!table.getCanNextPage()}>
                {">"}
            </Button>
            <Button color={'white'}
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

    useEffect(() => {
        if (person) {
            setFormValues(person) // Initialize form with person data when the modal opens
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
            <ModalContent as="form" onSubmit={handleFormSubmit}>
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