import React from 'react'
import { Link as RouteLink } from 'react-router-dom'
import { Flex, Link, UnorderedList, ListItem, Center, Image, Button } from '@chakra-ui/react'

import Auth from '../../utils/auth'

const Header = () => {
    const logout = (event) => {
        event.preventDefault()
        Auth.logout()
    }

    return (
        <header>
            <Flex flexDirection='column' border='1px' borderColor='gray.200' boxShadow={'md'} bgColor={'white'} h={'15vh'} justifyContent={'space-around'}>


                <Center>
                    <UnorderedList styleType='none' display='flex' justifyContent='flex-end' h='50' fontSize={32}>
                        <ListItem mt='-3' mr='200'>
                            <Link as={RouteLink} to='/'>
                                <Image
                                    src='/assets/images/Logo_AllCAPScomics_Circle.webp'
                                    alt='all caps logo'
                                    w={75}
                                    
                                />
                            </Link>
                        </ListItem>
                        <ListItem mr='10'>
                            <Link as={RouteLink} to='/about'>About</Link>
                        </ListItem>
                        <ListItem mr='10'>
                            <Link as={RouteLink} to='/store'>Store</Link>
                        </ListItem>
                        <ListItem mr='10'>
                            <Link as={RouteLink} to='/campaigns'>Campaign</Link>
                        </ListItem>
                        <ListItem mr='10'>
                            <Link as={RouteLink} to='/news'>News</Link>
                        </ListItem>
                        {Auth.loggedIn() ? (
                            <>
                                <ListItem>
                                    <Link onClick={logout} textDecoration={'none'} mr={190}>Logout</Link>
                                </ListItem>
                            </>
                        ) : (
                            <ListItem mr={190}>
                                <Link as={RouteLink} to='/login'>Login</Link>
                            </ListItem>
                        )}
                        
                    </UnorderedList>
                </Center>
            </Flex>
        </header>
    )
}

export default Header