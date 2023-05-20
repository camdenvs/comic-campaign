import React from 'react'

import { Flex, Link, Text, } from '@chakra-ui/react'
import { FaTwitter, FaYoutube } from 'react-icons/fa'

const Footer = () => {
    return (
        <footer>
            <Flex border={'1px'} bgColor={'blackAlpha.700'} w={'100%'} justifyContent={'space-around'} h={'11vh'}>
                <Text color='white' my='auto'>© AllCapsComics. All Rights Reserved</Text>
                <Link href='https://twitter.com/EthanVanSciver' fontSize='75' color={'white'} my='auto'><FaTwitter /></Link>
                <Link href='https://www.youtube.com/@ComicArtistProSecrets' fontSize='75' color={'white'} my='auto'><FaYoutube /></Link>
            </Flex>
        </footer>
    )
}

export default Footer