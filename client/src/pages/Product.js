import React from "react"
import { useParams } from 'react-router-dom'
import { useQuery } from "@apollo/client" 
import { Box, Button, Flex, Heading, Image, Input, Select, Text } from "@chakra-ui/react"
import { QUERY_SINGLE_PRODUCT } from "../utils/queries"

const Product = () => {
    const { productId } = useParams()

    const { loading, error, data } = useQuery(QUERY_SINGLE_PRODUCT, {
        variables: { productId: productId }
    })

    const product = data?.product || {}

    const sizes = product.sizes?.split(',') || []

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
                        <Box mt={5} ml='75' width={{ sm: '75%', md: '100%'}}>
                            <Heading fontSize={'48px'}>{product.name}</Heading>
                            <Text fontSize={'36px'} fontWeight={600}>${product.price}</Text>
                            {product.sizes !== '' ? (
                                <Flex>
                                    <Text fontSize={'20px'} w={'200px'}>Select a size:</Text>
                                    <Select w={{ sm: '30%' }}>
                                        {sizes.map((size) => (
                                            <option>{size}</option>
                                        ))}
                                    </Select>
                                </Flex>
                            ) : (
                                <></>
                            )}
                            <Flex>
                                <Input type='number' width={'50px'} defaultValue={1} step={'1'}/>
                                <Button ml={3}>Place Order</Button>
                            </Flex>
                            <Heading mt='5'>Description</Heading>
                            <Text>{product.description}</Text>
                        </Box>
                    </Flex>
                </Box>
            )}
        </div>
    )
}

export default Product