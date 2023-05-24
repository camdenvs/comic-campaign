import React from "react"
import { Box, Flex } from '@chakra-ui/react'

import { useQuery } from "@apollo/client"
import { QUERY_PRODUCTS } from "../utils/queries"

import ProductCard from "../components/ProductCard"

const Store = () => {
    const { data } = useQuery(QUERY_PRODUCTS)

    const products = data?.products

    return (
        <Box>
            <Flex flexDir={'row'} flexWrap={'wrap'} justifyContent={"space-around"} mt='5' mx='auto' w={{ "sm": "95%", "md": "760px", "xl": '1200px'}}>
                {products &&
                    products.map((product) => (
                        <ProductCard key={product._id} product={product}/>
                    ))    
                }
            </Flex>
        </Box>
    )
}

export default Store