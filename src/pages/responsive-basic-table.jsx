import { Box, Button, ButtonGroup, Icon, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr  } from "@chakra-ui/react"

import { useReactTable, getCoreRowModel, flexRender, getFilteredRowModel, getSortedRowModel, getPaginationRowModel } from "@tanstack/react-table"
import { DATA } from "../data.js"
import { useState } from 'react'
import { EditableCell } from "../cmps/editableCell.jsx"
import { StatusCell } from "../cmps/statusCell.jsx"
import { DateCell } from "../cmps/dateCell.jsx"
import { Filters } from "../cmps/filters.jsx"
import { SortIcon } from "../assets/img/icons/SortIcon.jsx"


const columns = [
    {
        accessorKey: "task",
        header: "Task",
        size: 225,
        cell: EditableCell,
        enableColumnFilter: true,
        filterFn: "includesString"
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: StatusCell,
        enableSorting: false,
        enableColumnFilter: true,
        filterFn: (row, columnId, filterStatuses) => {
            if (filterStatuses.length === 0) return true
            const status = row.getValue(columnId)
            return filterStatuses.includes(status?.id)
        }
    },
    {
        accessorKey: "due",
        header: "Due",
        cell: DateCell
    },
    {
        accessorKey: "notes",
        header: "Notes",
        size: 225,
        cell: EditableCell
    }
]



export const ResponsiveBasicTable = () => {

    const [data, setData] = useState(DATA)
    const [columnFilters, setColumnFilters] = useState([])

    const table = useReactTable({
        data,
        columns,
        state: { columnFilters, },
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        columnResizeMode: "onChange",
        meta: {
            updateData: (rowIndex, columnId, value) => setData(prev =>
                prev.map((row, idx) => idx === rowIndex ? { ...prev[rowIndex], [columnId]: value } : row))
        }
    })

    return <Box>
        <Filters columnFilters={columnFilters} setColumnFilters={setColumnFilters} />
        <TableContainer>
            <Table w={table.getTotalSize()} className="table">
                <Thead>
                    {table.getHeaderGroups().map(headerGroup =>
                        <Tr className={'tr'} key={headerGroup.id}>
                            {headerGroup.headers.map(header =>
                                <Th className={'th'} key={header.id} w={header.getSize()}>
                                    {header.column.columnDef.header}
                                    {header.column.getCanSort() &&
                                        <Icon as={SortIcon} ml='3' fontSize={'14'}
                                            onClick={header.column.getToggleSortingHandler()} />}
                                    {{ asc: " 🔼", desc: " 🔽", }[header.column.getIsSorted()]}
                                    <Box className={`resizer ${header.column.getIsResizing() ? "isResizing" : ""}`}
                                        onMouseDown={header.getResizeHandler()} onTouchStart={header.getResizeHandler()}> </Box>
                                </Th>)}
                        </Tr>)}
                </Thead>
                <Tbody>
                    {table.getRowModel().rows.map(row =>
                        <Tr className={'tr'} key={row.id}>
                            {row.getVisibleCells().map(cell =>
                                <Td className={'td'} key={cell.id} w={cell.column.getSize()}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </Td>)}
                        </Tr>)}
                </Tbody>
            </Table>

        </TableContainer>

        <br />
        <Text mb={2}>
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </Text>
        <ButtonGroup size={'sm'} isAttached>
            <Button color={'white'} bg={"gray.700"}
                onClick={() => table.previousPage()} isDisabled={!table.getCanPreviousPage()}>
                {"<"}
            </Button>
            <Button color={'white'} bg={"gray.700"}
                onClick={() => table.nextPage()} isDisabled={!table.getCanNextPage()}>
                {">"}
            </Button>
        </ButtonGroup>

    </Box >


}