import React from "react"

import { Box } from '@chakra-ui/react'

const Home = () => {
    return (
        <main>
            <Box
                position={'fixed'}
                left='0'
                right={'0'}
                zIndex={1}
                bgImage={"url('/assets/images/bckgrnd-banner1.jpg')"}
                bgPosition="top"
                bgSize="cover"
                bgRepeat="no-repeat"
                minH='72vh'
                filter={'auto'}
                brightness={'50%'}
                saturate={'0.7'}
            />
        </main>
    )
}

export default Home