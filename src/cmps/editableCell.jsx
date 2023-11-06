import { Input } from "@chakra-ui/react"
import { useState, useEffect } from "react"

export const EditableCell = ({ getValue, row, column, table }) => {
    const { updateData } = table.options.meta
    const initialValue = getValue()
    const [value, setValue] = useState(initialValue)

    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    const handleChange = (ev) => setValue(ev.target.value)
    const onBlur = () => { updateData(row.index, column.id, value) }
    return <Input variant="filled" size="sm" w="85%" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap"
        value={value}
        onChange={handleChange}
        onBlur={onBlur}
    ></Input>
}