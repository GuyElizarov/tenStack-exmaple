
import {
    Table, Thead, Tbody, Tfoot, Tr, Th,
    Td, TableContainer, VStack, ButtonGroup, Button, Box, Input,
} from '@chakra-ui/react'
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import { useState } from 'react'
import mData from '../MOCK_DATA.json'
import { DateTime } from 'luxon'
import { UpDownIcon } from '@chakra-ui/icons'


const columns = [
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

    // {

    //     header: 'Full name',
    //     accessorFn: row => `${row.first_name} ${row.last_name}`,
    //     footer: 'Full name',
    // },

    // creates another header above the tow column
    // note that if used like this you should use header.isPlaceholder
    // for conditional rendering : 

    {
        header: 'Full name',
        columns: [
            {
                header: 'First ',
                accessorKey: 'first_name',
                footer: 'First name',
            },
            {
                header: 'Last ',
                accessorKey: 'last_name',
                footer: 'Last name',
            },
        ]
    },
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
    const [data, setData] = useState(mData)
    const [sorting, setSorting] = useState([])
    const [filtering, setFiltering] = useState('')

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting: sorting,
            globalFilter: filtering
        },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering,
        getFilteredRowModel: getFilteredRowModel(),
    })

    return <VStack mt='100' w={'full'} p='35'>
        <Input w={'30%'}  type='text' placeholder='filter' 
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
                onClick={() => table.setPageIndex(table.getPageCount() - 1)} isDisabled={!table.getCanPreviousPage()}>
                {"Last Page"}
            </Button>
        </ButtonGroup>
    </VStack>

}