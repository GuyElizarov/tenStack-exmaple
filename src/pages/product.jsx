

import {
  Table, Thead, Tbody, Tr, Th, Td, TableContainer, VStack, ButtonGroup, Button, Box, Input, Spinner, IconButton,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody,
  ModalFooter, FormControl, FormLabel, Select, useColorModeValue, Icon, useToast,
} from '@chakra-ui/react'
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import { AddIcon, DeleteIcon, EditIcon, UpDownIcon } from '@chakra-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsLoadingProduct, selectProducts } from '../store/product/productSelectors'
import { addProduct, loadProducts, removeProduct, updateProduct } from '../store/product/productActions'
import { addToCart } from '../store/cart/cartActions';
import { productService } from '../services/productService'

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
         <IconButton
        aria-label="Add to Cart"
        icon={<AddIcon />}
        onClick={() => {
          info.table.options.meta.dispatch(addToCart(info.row.original));
          info.table.options.meta.toast({
            title: 'Added to Cart',
            description: `${info.row.original.title} added to the cart.`,
            status: 'success',
            duration: 3000,
            isClosable: true,
          })
        }}
      />
      </ButtonGroup>
    ),
  },
  {
    header: 'Title',
    accessorKey: 'title',
  },
  {
    header: 'Price',
    accessorKey: 'price',
    cell: info => {
      const value = info.getValue();
      const number = Number(value)
      return isNaN(number) ? value : `$${number.toFixed(2)}`;
    },
  },

  {
    header: 'Category',
    accessorKey: 'category',
  },
  {
    header: 'Image',
    accessorKey: 'image',
    cell: info => <img src={info.getValue()} alt="Product" style={{ width: '50px', height: 'auto' }} />,
  },
  {
    header: 'Rating',
    id: 'rating',
    cell: info => {
      const rating = info.row.original.rating;
      return `${rating.rate} (${rating.count} reviews)`;
    },
  },
  {
    header: 'Description',
    accessorKey: 'description',
    cell: info => (
      <Box noOfLines={2} title={info.getValue()}>
        {info.getValue()}
      </Box>
    ),
  },
];


export const Product = () => {
  const dispatch = useDispatch()
  const products = useSelector(selectProducts)
  const uniqueCategories = [...new Set(products.map(product => product.category))];
  
  const isLoadingProduct = useSelector(selectIsLoadingProduct)
  const [data, setData] = useState(products)
  const [sorting, setSorting] = useState([])
  const [filtering, setFiltering] = useState('')
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [columnFilters, setColumnFilters] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  
  const toast = useToast()
  const bgColor = useColorModeValue('white', 'gray.800')
  const textColor = useColorModeValue('gray.800', 'white')

  useEffect(() => {
    dispatch(loadProducts())
  }, [dispatch])

  useEffect(() => {
    setData(products)
  }, [products])

  useEffect(() => {
    if (selectedCategory) {
      setColumnFilters([{ id: 'category', value: selectedCategory }]);
    } else {
      setColumnFilters([]);
    }
  }, [selectedCategory])

  // Function to handle category button click
  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
  };

  const handleAdd = () => {
    const newProduct = productService.getEmptyProduct()
    handleEdit(newProduct)
  }

  const handleDelete = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(removeProduct(productId))
    }
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setIsEditModalOpen(true)
  }

  const handleSubmitEdit = (product) => {
    setIsEditModalOpen(false)
    if (product.id) {
      dispatch(updateProduct(product))
    } else {
      dispatch(addProduct(product))
    }
    setEditingProduct(null)
  }

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      sorting: sorting,
      globalFilter: filtering
    },
    meta: {
      handleDelete,
      handleEdit,
      dispatch,
      toast 
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
    getFilteredRowModel: getFilteredRowModel(),
    columnResizeMode: "onChange"
  })

  if (isLoadingProduct) return <Spinner />
  return <VStack w={'full'} p='35'>
    <Button leftIcon={<AddIcon />} colorScheme='teal' onClick={handleAdd}>
      Add Product
    </Button>
    <Input maxWidth={'50%'} type='text' placeholder='filter'
      value={filtering} onChange={ev => setFiltering(ev.target.value)} />
        <ButtonGroup>
      {uniqueCategories.map((category) => (
        <Button key={category} onClick={() => handleCategoryFilter(category)}>
          {category}
        </Button>
      ))}
      <Button onClick={() => setSelectedCategory('')}>
        Clear Filter
      </Button>
    </ButtonGroup>
    <TableContainer>
      <Table variant='simple' size={'lg'} >
        <Thead>
          {table.getHeaderGroups().map(headerGroup =>
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map(header =>
                <Th key={header.id} w={header.getSize()} position={'relative'}>
                  {header.column.getCanSort() && <UpDownIcon onClick={header.column.getToggleSortingHandler()} position={'relative'} left={-1} top={'-2px'} />}
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

    <ButtonGroup size={'sm'} isAttached bg={bgColor} color={textColor}>
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
      <EditProductModal
        product={editingProduct}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleSubmitEdit}
      />
    )}
  </VStack>

}


const EditProductModal = ({ product, isOpen, onClose, onSubmit }) => {
  const [formValues, setFormValues] = useState(product)
  const bgColor = useColorModeValue('white', 'gray.800')
  const textColor = useColorModeValue('gray.800', 'white')

  useEffect(() => {
    if (product) {
      setFormValues(product)
    }
  }, [product, isOpen])

  const handleFormChange = (e) => {
    const { name, value } = e.target
    // For nested objects like 'rating', we need to handle changes differently
    if (name.includes('.')) {
      const [key, subkey] = name.split('.');
      setFormValues(prev => ({
        ...prev,
        [key]: {
          ...prev[key],
          [subkey]: value
        }
      }));
    } else {
      setFormValues(prev => ({ ...prev, [name]: value }))
    }
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
        <ModalHeader>Edit Product</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel htmlFor="title">Title</FormLabel>
            <Input
              id="title"
              name="title"
              value={formValues.title || ''}
              onChange={handleFormChange}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel htmlFor="price">Price</FormLabel>
            <Input
              id="price"
              name="price"
              type="number"
              value={formValues.price || ''}
              onChange={handleFormChange}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel htmlFor="description">Description</FormLabel>
            <Input
              id="description"
              name="description"
              value={formValues.description || ''}
              onChange={handleFormChange}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel htmlFor="category">Category</FormLabel>
            <Input
              id="category"
              name="category"
              value={formValues.category || ''}
              onChange={handleFormChange}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel htmlFor="rating.rate">Rating</FormLabel>
            <Input
              id="rating.rate"
              name="rating.rate"
              type="number"
              step="0.1"
              value={formValues.rating?.rate || ''}
              onChange={handleFormChange}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel htmlFor="rating.count">Rating Count</FormLabel>
            <Input
              id="rating.count"
              name="rating.count"
              type="number"
              value={formValues.rating?.count || ''}
              onChange={handleFormChange}
            />
          </FormControl>
          
          <FormControl mt={4}>
            <FormLabel htmlFor="image">Image URL</FormLabel>
            <Input
              id="image"
              name="image"
              value={formValues.image || ''}
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


