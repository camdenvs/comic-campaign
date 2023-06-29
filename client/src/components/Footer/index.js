import React from 'react'

import { Flex, Link, Text, } from '@chakra-ui/react'
import { FaTwitter, FaYoutube } from 'react-icons/fa'

const Footer = () => {
    return (
        <footer>
            <Flex border={'1px'} bgColor={'#212C42'} w={'100%'} justifyContent={'space-around'} h={'13vh'} flexDirection={{base: 'column', sm: 'row'}} position='relative' zIndex={3}>
                <Text color='white' my='auto' px={{sm: '3'}} mx={'auto'}>© AllCapsComics. All Rights Reserved</Text>
                <Flex justifyContent={{base: 'space-around', sm: 'space-between'}}>
                <Link href='https://twitter.com/EthanVanSciver' fontSize={{ base: '48px', md: '75' }} color={'white'} my='auto' mr={{sm: '10px', md: '25px'}}><FaTwitter /></Link>
                <Link href='https://www.youtube.com/@ComicArtistProSecrets' fontSize={{ base: '48px', md: '75' }} color={'white'} my='auto' ml={{sm: '10px', md: '25px'}}><FaYoutube /></Link>
                </Flex>
                <Text color='white' my='auto' px={{sm: '5'}} mx={{base: 'auto', sm: 'none'}}>Website Created By <Link href='https://farmfreshyeets.github.io/react-portfolio/' textDecoration={'underline'}>Camden Van Sciver</Link></Text>
            </Flex>
        </footer>
    )
}

export default Footer