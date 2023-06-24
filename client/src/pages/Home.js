import React, { useState } from "react"

import { Box, Container, Image, Button } from '@chakra-ui/react'

const Home = () => {
    const [imageIndex, setImageIndex] = useState(0)

    const imageUrls = ['ActionFigures-SS.jpg', 'RektPlanet-SS.jpg', 'RTB-SS.jpg']

    const handleSlideshowScrollLeft = (event) => {
        event.preventDefault()
        let newIndex = imageIndex - 1
        if (newIndex < 0) newIndex = imageUrls.length - 1
        setImageIndex(newIndex)
    }

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