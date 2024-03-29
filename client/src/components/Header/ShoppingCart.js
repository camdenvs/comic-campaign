import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    useDisclosure,
    Text,
    CardHeader,
    Card,
    CardBody,
    useToast
} from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { FaShoppingCart, FaTrash } from 'react-icons/fa'
import { REMOVE_FROM_CART, CLEAR_CART } from '../../utils/mutations'
import { CHECKOUT } from '../../utils/queries'
import { useMutation, useLazyQuery } from '@apollo/client'
import Auth from '../../utils/auth'
import { loadStripe } from "@stripe/stripe-js"


const ShoppingCart = ({ cart, loading }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const toast = useToast()
    const [removeItem] = useMutation(REMOVE_FROM_CART)
    const [clearCart] = useMutation(CLEAR_CART)
    const [checkout, { data }] = useLazyQuery(CHECKOUT)

    const stripePromise = loadStripe(
        "pk_test_51Mlkl2B4isP22xRkEuqoS88b0ddSQDJQrMPSoD0DWxh8EVIFNj7Zhwqu8g19n4OYucrw1Ld6yrtwURsJNXqHcQAR009eCt8weO"
    );

    useEffect(() => {
        if (data) {
            localStorage.setItem('sessionId', data.checkout.session)
            stripePromise.then((res) => {
                res.redirectToCheckout({ sessionId: data.checkout.session });
            });
        }
    }, [data, stripePromise]);

    const handleRemoveItem = async (event) => {
        const itemId = await event.target.value
        const userId = await Auth.getProfile().data._id
        try {
        await removeItem({
            variables: {
                itemId: itemId,
                userId: userId
            }
        })
        window.location.reload()
        }
        catch {
            toast({
                title: `There was an error removing that item.`,
                description: `Reload and try again`,
                status: 'error',
                duration: 3000,
                isClosable: true
            })
        }
    }

    const handleClearCart = async () => {
        await clearCart({
            variables: {
                userId: Auth.getProfile().data._id
            }
        })
        window.location.reload()
    }

    const handleCheckout = async (event) => {
        event.preventDefault()
        try {
            checkout({
                variables: {
                    cartId: cart._id
                }
            })
        } catch (err) {
            console.log("Error:", err)
        }
        
    }

    if (!Auth.loggedIn()) {
        return (
            <>
                <Button _hover='none' fontSize={'36'} bg='none' _focus={{ 'bg': 'none' }} onClick={onOpen} ref={btnRef}><FaShoppingCart></FaShoppingCart></Button>
                <Drawer
                    isOpen={isOpen}
                    placement='right'
                    onClose={onClose}
                    finalFocusRef={btnRef}
                >
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader>Shopping Cart</DrawerHeader>
                        <DrawerBody>You need to be logged in to use the shopping cart.</DrawerBody>
                    </DrawerContent>
                </Drawer>
            </>
        )
    }

    return (
        <>
            <Button _hover='none' fontSize={'36'} bg='none' _focus={{ 'bg': 'none' }} onClick={onOpen} ref={btnRef}><FaShoppingCart></FaShoppingCart></Button>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Shopping Cart</DrawerHeader>
                    {!loading && cart.items && cart.items.length > 0 ? (
                        <>
                            <DrawerBody>
                                {cart.items &&
                                    cart.items.map((item) => (
                                        <Card key={item._id} m='3'>
                                            <CardHeader pb='1' fontSize={'20px'} fontWeight={600} display={'flex'} justifyContent={'space-between'}>
                                                <Text>{item.name} x {item.quantity}</Text>
                                                <Button fontSize={'12px'} colorScheme='red' value={item._id} onClick={handleRemoveItem}><FaTrash /></Button>
                                            </CardHeader>
                                            <CardBody pt='1'>
                                                {item.size ? (
                                                    <Text fontWeight={300}>{item.size}</Text>
                                                ) : (
                                                    <></>
                                                )}
                                                <Text fontWeight={300}>${item.price}</Text>
                                            </CardBody>
                                        </Card>
                                    ))
                                }
                                Subtotal: ${cart.total}
                            </DrawerBody>
                            <DrawerFooter>
                                <Button variant='outline' mr={3} onClick={onClose}>
                                    Close
                                </Button>
                                <Button colorScheme='blue' mr={3} onClick={handleCheckout}>
                                    Checkout
                                </Button>
                                <Button colorScheme='red' onClick={handleClearCart}>Clear</Button>
                            </DrawerFooter>
                        </>
                    ) : (
                        <DrawerBody>Your cart is empty. Head to the store!</DrawerBody>
                    )}


                </DrawerContent>
            </Drawer>
        </>
    )
}

export default ShoppingCart
