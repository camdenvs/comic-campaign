import React from 'react'

import { Flex, Link, } from '@chakra-ui/react'
import { FaTwitter, FaYoutube } from 'react-icons/fa'

const Footer = () => {
    return (
        <footer>
            <Flex border={'1px'} borderColor={'gray.200'} bgColor={'white'} w={'100%'} justifyContent={'space-around'}>
                <Link href='https://twitter.com/EthanVanSciver' fontSize='75'><FaTwitter /></Link>
                <Link href='https://www.youtube.com/@ComicArtistProSecrets' fontSize='75'><FaYoutube /></Link>
            </Flex>
        </footer>
    )
}

export default Footer