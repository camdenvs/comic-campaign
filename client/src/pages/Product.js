import React, { useState } from "react"
import { useParams } from 'react-router-dom'
import { useQuery, useMutation } from "@apollo/client"
import { Box, Button, Flex, Heading, Image, Input, Select, Text } from "@chakra-ui/react"
import { QUERY_SINGLE_PRODUCT } from "../utils/queries"
import { ADD_TO_CART } from '../utils/mutations'
import Auth from '../utils/auth'

const Product = () => {
    const { productId } = useParams()
    const { loading, error, data } = useQuery(QUERY_SINGLE_PRODUCT, {
        variables: { productId: productId }
    })
    const [addToCart] = useMutation(ADD_TO_CART)
    const product = data?.product || {}

    const sizes = product.sizes?.split(',') || []
    const [itemState, setItemState] = useState({ productId: productId, quantity: 1, size: sizes[0] || '' })

    const handleChange = (event) => {
        const { name, value } = event.target;
        setItemState({
            ...itemState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        await addToCart({
            variables: {
                userId: Auth.getProfile().data._id,
                productId: itemState.productId,
                quantity: Number(itemState.quantity),
                size: itemState.size
            }
        })
    }

    return (
        <div>
            {loading || error ? (
                <div>Loading...</div>
            ) : (
                <Box mx={{ sm: '50px', md: '150' }} mt='50' mb='5'>
                    <Flex flexDir={{ sm: 'column', md: 'row' }}>
                        <Image
                            src={product.image}
                            alt={'Product Image'}
                            p='5'
                            border='1px'
                            borderColor={'blackAlpha.400'}
                            w={{ sm: '100%', md: '50%' }}
                        />
                        <Box mt={5} ml='75' width={{ sm: '75%', md: '100%' }}>
                            <form>
                                <Heading fontSize={'48px'}>{product.name}</Heading>
                                <Text fontSize={'36px'} fontWeight={600}>${product.price}</Text>
                                {product.sizes !== '' ? (
                                    <Flex>
                                        <Text fontSize={'20px'} w={'200px'}>Select a size:</Text>
                                        <Select w={{ sm: '30%' }} value={itemState.size} name="size" onChange={handleChange}>
                                            {sizes.map((size) => (
                                                <option key={size} value={size}>{size}</option>
                                            ))}
                                        </Select>
                                    </Flex>
                                ) : (
                                    <></>
                                )}
                                <Flex>
                                    <Input type='number' width={'50px'} value={itemState.quantity} step={'1'} name='quantity' onChange={handleChange} />
                                    <Button ml={3} onClick={handleFormSubmit}>Place Order</Button>
                                </Flex>
                                <Heading mt='5'>Description</Heading>
                                <Text>{product.description}</Text>
                            </form>
                        </Box>
                    </Flex>
                </Box>
            )}
        </div>
    )
}

export default Product