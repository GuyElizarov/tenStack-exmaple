import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useColorModeValue } from "@chakra-ui/react"
import { DateTime } from "luxon"
import { useEffect, useState } from "react"

export const EditProductModal = ({ product, isOpen, onClose, onSubmit }) => {
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
                <ModalHeader>Edit Product</ModalHeader>
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
                            <option value="Non-binary">Non-binary</option>
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