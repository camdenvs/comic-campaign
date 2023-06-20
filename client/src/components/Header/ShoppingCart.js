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
} from '@chakra-ui/react'
import React from 'react'
import { FaShoppingCart } from 'react-icons/fa'

const ShoppingCart = ({ cart }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()

    return (
        <>
            <Button _hover='none' fontSize={'48'} bg='none' _focus={{ 'bg': 'none' }} onClick={onOpen} ref={btnRef}><FaShoppingCart></FaShoppingCart></Button>
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
                    {cart ? (
                        <>
                            <DrawerBody>
                            </DrawerBody>
                            <DrawerFooter>
                                <Button variant='outline' mr={3} onClick={onClose}>
                                    Close
                                </Button>
                                <Button colorScheme='red'>Clear</Button>
                            </DrawerFooter>
                        </>) : (
                        <DrawerBody>You have to be signed in to use the shopping cart.</DrawerBody>
                    )}


                </DrawerContent>
            </Drawer>
        </>
    )
}

export default ShoppingCart