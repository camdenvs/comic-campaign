import React from 'react'
import { Link as RouteLink } from 'react-router-dom'
import { Flex, Box, Link, UnorderedList, ListItem, Center, Image } from '@chakra-ui/react'

import Auth from '../../utils/auth'

const Header = () => {
    const logout = (event) => {
        event.preventDefault()
        Auth.logout()
    }

    return (
        <header>
            <Flex flexDirection='column' justifyContent='space-around'>
                {Auth.loggedIn() ? (
                    <>
                        <button onClick={logout}>Logout</button>
                    </>
                ) : (
                    <>
                        <UnorderedList styleType='none' display='flex' mb={2} justifyContent='flex-end' fontSize={20}>
                            <ListItem mx={2}>
                                <Link as={RouteLink} to='/login'>Login</Link>
                            </ListItem>
                            <div>/</div>
                            <ListItem mx={2}>
                                <Link as={RouteLink} to='/signup'>Sign Up</Link>
                            </ListItem>
                        </UnorderedList>
                    </>
                )}

                <Center>
                    <UnorderedList styleType='none' display='flex' justifyContent='flex-end' h='50' fontSize={32}>
                        <ListItem mr='200' mt='-5'>
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
                        <ListItem mr='200'>
                            <Link as={RouteLink} to='/news'>News</Link>
                        </ListItem>
                    </UnorderedList>
                </Center>
            </Flex>
        </header>
    )
}

export default Header