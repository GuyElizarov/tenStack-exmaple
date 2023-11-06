import { Box, Button, ButtonGroup, Icon, Text } from "@chakra-ui/react"
import { useReactTable, getCoreRowModel, flexRender, getFilteredRowModel, getSortedRowModel, getPaginationRowModel } from "@tanstack/react-table"
import { DATA } from "../data.js"
import { useState } from 'react'
import { EditableCell } from "./editableCell.jsx"
import { StatusCell } from "./statusCell.jsx"
import { DateCell } from "./dateCell.jsx"
import { Filters } from "./filters.jsx"
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



export const TaskTable = () => {

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

        <Box className="table" w={table.getTotalSize()}>

            {table.getHeaderGroups().map(headerGroup =>
                <Box className={'tr'} key={headerGroup.id}>
                    {headerGroup.headers.map(header =>
                        <Box className={'th'} key={header.id} w={header.getSize()}>
                            {header.column.columnDef.header}
                            {header.column.getCanSort() &&
                                <Icon as={SortIcon} ml='3' fontSize={'14'}
                                    onClick={header.column.getToggleSortingHandler()} />}
                            {{ asc: " 🔼", desc: " 🔽", }[header.column.getIsSorted()]}
                            <Box className={`resizer ${header.column.getIsResizing() ? "isResizing" : ""}`}
                                onMouseDown={header.getResizeHandler()} onTouchStart={header.getResizeHandler()}> </Box>
                        </Box>)}
                </Box>)}

            {table.getRowModel().rows.map(row =>
                <Box className="tr" key={row.id}>
                    {row.getVisibleCells().map(cell =>
                        <Box className="td" key={cell.id} w={cell.column.getSize()}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </Box>)}
                </Box>)}

        </Box>

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

    </Box>


}