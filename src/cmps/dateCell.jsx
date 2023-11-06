import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { CalendarIcon } from "../assets/img/icons/CalendarIcon"
import { Box, Center, Icon } from "@chakra-ui/react"
import React, { forwardRef } from 'react';

const CustomInput = forwardRef(({ value, onClick, clearDate }, ref) =>
    <Center className="custom-input" onClick={onClick} cursor='pointer' ref={ref} flexGrow={"1"} >
        {value ? <>
            {value}
            <Box right='3' color={'red.300'} fontSize={'md'} position={'absolute'}
                onClick={(ev) => {
                    ev.stopPropagation()
                    clearDate()
                }}>
                &times;
            </Box>
        </> : <Icon as={CalendarIcon} fontSize='xl'></Icon>}
    </Center>)


export const DateCell = ({ getValue, row, column, table }) => {
    const { updateData } = table.options.meta;
    const date = getValue()

    const clearDate = () => {
        updateData(row.index, column.id, null)
    }

    const changeDate = (date) => {
        updateData(row.index, column.id, date)
    }
    return (
        <DatePicker
            selected={date}
            onChange={(date) => changeDate(date)}
            customInput={<CustomInput clearDate={clearDate} />}
            dateFormat="MMM d"

        />
    )
}



