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
} from '@chakra-ui/react'
import React from 'react'
import { FaShoppingCart, FaTrash } from 'react-icons/fa'
import { REMOVE_FROM_CART, CLEAR_CART } from '../../utils/mutations'
import { useMutation } from '@apollo/client'
import Auth from '../../utils/auth'


const ShoppingCart = ({ cart, loading }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()

    const [removeItem] = useMutation(REMOVE_FROM_CART)
    const [clearCart] = useMutation(CLEAR_CART)

    const handleRemoveItem = async (event) => {
        const itemId = await event.target.value
        const userId = await Auth.getProfile().data._id
        await removeItem({
            variables: {
                itemId: itemId,
                userId: userId
            }
        })
        window.location.reload()
    }

    const handleClearCart = async () => {
        await clearCart({
            variables: {
                userId: Auth.getProfile().data._id
            }
        })
        window.location.reload()
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
                                Total: ${cart.total}
                            </DrawerBody>
                            <DrawerFooter>
                                <Button variant='outline' mr={3} onClick={onClose}>
                                    Close
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