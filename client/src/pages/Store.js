import React from "react"
import { Box, Button, Center, Checkbox, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'

import { useQuery } from "@apollo/client"
import { useParams } from "react-router-dom"
import { QUERY_ME, QUERY_PRODUCTS } from "../utils/queries"

import ProductCard from "../components/ProductCard"

const Store = () => {
    const { category } = useParams() || {}

    const userData = useQuery(QUERY_ME)
    const userIsAdmin = userData.data?.me.isAdmin

    const { data } = useQuery(QUERY_PRODUCTS, {
        variables: { category: category }
    })

    const products = data?.products
    const btnRef = React.useRef(null)
    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleFormSubmit = () => {

    }

    return (
        <Box>
            {userIsAdmin ? (
                <>
                <Center><Button ref={btnRef} onClick={onOpen} border={'0'} w='55%' boxShadow={'lg'} mt='5' bgColor={'green.300'} color={'white'} textShadow={'1px 1px black'} _hover={{ bgColor: 'green.400' }}>Add New Product</Button></Center>
                <Modal
                    onClose={onClose}
                    finalFocusRef={btnRef}
                    isOpen={isOpen}
                    scrollBehavior={"inside"}
                    size={'lg'}
                >
                    <ModalOverlay />
                    <ModalContent >
                        <ModalHeader><Center>Add New Product</Center></ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <form>
                                <FormControl mb={2}>
                                    <FormLabel>Product Image</FormLabel>
                                    <input type='file' id='image' />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Product Name</FormLabel>
                                    <Input id='name' />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Description</FormLabel>
                                    <Input id='description' />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Price</FormLabel>
                                    <Input id='price' />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Multiple Sizes? If no, leave blank.</FormLabel>
                                    <Input id='sizes' />
                                </FormControl>
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={handleFormSubmit} mr='3' bgColor={'green.300'} color={'white'} _hover={{ bgColor: 'green.400' }}>Submit</Button>
                            <Button onClick={onClose}>Close</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>
        ) :
            <></>
        }
            <Flex flexDir={'row'} flexWrap={'wrap'} justifyContent={"space-around"} mt='5' mx='auto' w={{ "sm": "95%", "md": "760px", "xl": '1200px'}}>
                {products &&
                    products.length > 0 ?
                    (products.map((product) => (
                        <ProductCard key={product._id} product={product}/>
                    ))) : (
                        <>
                            <Text>Nothing Here Yet...</Text>
                        </>
                    )  
                }
            </Flex>
        </Box>
    )
}

export default Store