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
  import { selectIsLoadingUser, selectUser } from '../store/user/usertSelectors.js'
  import { addUser, loadUsers, removeUser, updateUser } from '../store/user/userActions'
  import { userService } from '../services/userService'
  
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
    {
        header: 'Full Name',
        accessorFn: row => `${row.name.firstname} ${row.name.lastname}`,
    },
    {
        header: 'Username',
        accessorKey: 'username',
    },
    {
        header: 'Email',
        accessorKey: 'email',
    },
    {
        header: 'Phone',
        accessorKey: 'phone',
    },
    {
        header: 'Address',
        accessorFn: row => `${row.address.number} ${row.address.street}, ${row.address.city}, ${row.address.zipcode}`,
    },
  ]
  
  
  export const User = () => {
    const user = useSelector(selectUser)
    const isLoadingUser = useSelector(selectIsLoadingUser)
    const [data, setData] = useState(user)
    const [sorting, setSorting] = useState([])
    const [filtering, setFiltering] = useState('')
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [editingUser, setEditingUser] = useState(null)
    const dispatch = useDispatch()
    const bgColor = useColorModeValue('white', 'gray.800')
    const textColor = useColorModeValue('gray.800', 'white')
  
    useEffect(() => {
        dispatch(loadUsers())
    }, [dispatch])
  
    useEffect(() => {
        setData(user)
    }, [user])
  
  
    const handleAdd = () => {
        const newUser = userService.getEmptyUser()
        handleEdit(newUser)
    }
  
    const handleDelete = (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            dispatch(removeUser(userId))
        }
    }
  
    const handleEdit = (user) => {
        setEditingUser(user)
        setIsEditModalOpen(true)
    }
  
    const handleSubmitEdit = (user) => {
        setIsEditModalOpen(false)
        if (user.id) {
            dispatch(updateUser(user))
        } else {
            dispatch(addUser(user))
        }
        setEditingUser(null)
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
  
    if (isLoadingUser) return <Spinner />
    return <VStack w={'full'} p='35'>
        <Button leftIcon={<AddIcon />} colorScheme='teal' onClick={handleAdd}>
            Add User
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
            <EditUserModal
                user={editingUser}
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSubmit={handleSubmitEdit}
            />
        )}
    </VStack>
  
  }
  
  const EditUserModal = ({ user, isOpen, onClose, onSubmit }) => {
    const [formValues, setFormValues] = useState(user)
    const bgColor = useColorModeValue('white', 'gray.800')
    const textColor = useColorModeValue('gray.800', 'white')

    useEffect(() => {
        if (user) {
            setFormValues(user)
        }
    }, [user, isOpen])

    const handleNestedChange = (e, field, nestedField) => {
        const { value } = e.target;
        setFormValues(prev => ({
            ...prev,
            [field]: {
                ...prev[field],
                [nestedField]: value,
            },
        }));
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const keys = name.split('.');
            handleNestedChange(e, keys[0], keys[1]);
        } else {
            setFormValues(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        onSubmit(formValues);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent as="form" onSubmit={handleFormSubmit} bg={bgColor} color={textColor}>
                <ModalHeader>Edit User</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {/* Name fields */}
                    <FormControl>
                        <FormLabel htmlFor="name.firstname">First Name</FormLabel>
                        <Input
                            id="name.firstname"
                            name="name.firstname"
                            value={formValues.name?.firstname || ''}
                            onChange={handleFormChange}
                        />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel htmlFor="name.lastname">Last Name</FormLabel>
                        <Input
                            id="name.lastname"
                            name="name.lastname"
                            value={formValues.name?.lastname || ''}
                            onChange={handleFormChange}
                        />
                    </FormControl>

                    {/* Email field */}
                    <FormControl mt={4}>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <Input
                            id="email"
                            name="email"
                            value={formValues.email || ''}
                            onChange={handleFormChange}
                        />
                    </FormControl>

                    {/* Username field */}
                    <FormControl mt={4}>
                        <FormLabel htmlFor="username">Username</FormLabel>
                        <Input
                            id="username"
                            name="username"
                            value={formValues.username || ''}
                            onChange={handleFormChange}
                        />
                    </FormControl>

                    {/* Phone field */}
                    <FormControl mt={4}>
                        <FormLabel htmlFor="phone">Phone</FormLabel>
                        <Input
                            id="phone"
                            name="phone"
                            value={formValues.phone || ''}
                            onChange={handleFormChange}
                        />
                    </FormControl>

                    {/* Address fields */}
                    <FormControl mt={4}>
                        <FormLabel htmlFor="address.city">City</FormLabel>
                        <Input
                            id="address.city"
                            name="address.city"
                            value={formValues.address?.city || ''}
                            onChange={handleFormChange}
                        />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel htmlFor="address.street">Street</FormLabel>
                        <Input
                            id="address.street"
                            name="address.street"
                            value={formValues.address?.street || ''}
                            onChange={handleFormChange}
                        />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel htmlFor="address.number">Number</FormLabel>
                        <Input
                            id="address.number"
                            name="address.number"
                            value={formValues.address?.number || ''}
                            onChange={handleFormChange}
                        />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel htmlFor="address.zipcode">Zipcode</FormLabel>
                        <Input
                            id="address.zipcode"
                            name="address.zipcode"
                            value={formValues.address?.zipcode || ''}
                            onChange={handleFormChange}
                        />
                    </FormControl>

                    {/* Remove Gender and Date of Birth fields as they are not present in the new user object */}
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} type="submit">
                        Save Changes
                    </Button>
                    <Button variant="ghost" onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

  
  
