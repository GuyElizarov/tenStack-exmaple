import React, { useState } from 'react';
import {
  Box,
  VStack,
  List,
  ListItem,
  ListIcon,
  Text,
  Button,
  Image,
  Heading,
  Stack,
  Divider,
  useColorModeValue,
  Center,
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { MdShoppingCart, MdRemoveShoppingCart } from 'react-icons/md';
import { removeFromCart } from '../store/cart/cartActions';
import { selectCarts } from '../store/cart/cartSelectors';

export const Cart = () => {
  const carts = useSelector(selectCarts);
  const dispatch = useDispatch();
  const [checkout, setCheckout] = useState(false);
  const bgColor = useColorModeValue('gray.100', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.200');

  const handleRemove = (cartId) => {
    dispatch(removeFromCart(cartId));
  };

  const handleCheckout = () => {
    carts.forEach(cart => {
      dispatch(removeFromCart(cart.id));
    });
    setCheckout(true);
  };

  if (checkout) {
    return (
      <Center py={10} w='full'>
        <VStack>
          <Heading>Thank You!</Heading>
          <Text>Thank you for your purchase!</Text>
        </VStack>
      </Center>
    );
  }

  return (
    <VStack 
      spacing={4} 
      align="stretch" 
      bg={bgColor} 
      p={5} 
      borderRadius="md" 
      shadow="md"
      w='full'
    >
      <Heading size="md" my={4}>
        Shopping Cart
      </Heading>
      {carts.length === 0 ? (
        <Text>Your cart is empty.</Text>
      ) : (
        <>
          <List spacing={3}>
            {carts.map((cart) => (
              <ListItem key={cart.id}>
                <Stack 
                  direction={{ base: 'column', md: 'row' }} 
                  justifyContent="space-between" 
                  alignItems="center" 
                  bg={bgColor} 
                  p={3} 
                  borderRadius="md"
                >
                  <ListIcon as={MdShoppingCart} color="green.500" />
                  <Image boxSize="75px" objectFit="cover" src={cart.image} alt={cart.title} />
                  <Box>
                    <Text fontWeight="bold" color={textColor}>
                      {cart.title}
                    </Text>
                    <Text fontSize="sm" color={textColor}>
                      Qty: {cart.quantity}
                    </Text>
                  </Box>
                  <Text fontWeight="bold" color={textColor}>
                    ${cart.price.toFixed(2)}
                  </Text>
                  <Button 
                    size="sm" 
                    colorScheme="red" 
                    leftIcon={<MdRemoveShoppingCart />} 
                    onClick={() => handleRemove(cart.id)}
                  >
                    Remove
                  </Button>
                </Stack>
                <Divider my={2} />
              </ListItem>
            ))}
          </List>
          <Button
            colorScheme="green"
            onClick={handleCheckout}
            mt={4}
            w="200px"
            alignSelf={'center'}
          >
            Checkout
          </Button>
        </>
      )}
    </VStack>
  );
};
