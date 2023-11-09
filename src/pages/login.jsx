import React, { useState } from 'react';
import { userService } from '../services/userService';
import {
    Button,
    Center,
    FormControl,
    FormLabel,
    Input,
    VStack,
    useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({
        username: 'mor_2314',
        password: '83r5^_'
    });
    const toast = useToast();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = await userService.login(credentials);
            navigate('/product')
            toast({
                title: "Login successful.",
                description: "You have successfully logged in.",
                status: "success",
                duration: 9000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "Login failed.",
                description: error.message,
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        }
    };

    return (
        <Center>

            <VStack
                as="form"
                onSubmit={handleSubmit}
                spacing={4}
                align="stretch"
                m={8}
                w={'400px'}
            >
                <FormControl id="username" isRequired>
                    <FormLabel>Username</FormLabel>
                    <Input
                        type="text"
                        name="username"
                        value={credentials.username}
                        onChange={handleChange}
                    />
                </FormControl>
                <FormControl id="password" isRequired>
                    <FormLabel>Password</FormLabel>
                    <Input
                        type="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                    />
                </FormControl>
                <Button
                    mt={4}
                    colorScheme="blue"
                    type="submit"
                    isLoading={false} // Set this to true to indicate loading state during login process
                >
                    Login
                </Button>
            </VStack>
        </Center>

    );
};
