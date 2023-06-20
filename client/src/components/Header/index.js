import React from 'react'
import { Link as RouteLink } from 'react-router-dom'
import { Flex, Link, UnorderedList, ListItem, Image, Menu, MenuButton, MenuList, MenuItem, Hide, Show, Box } from '@chakra-ui/react'

import Auth from '../../utils/auth'
import ShoppingCart from './ShoppingCart'

import { useQuery } from '@apollo/client'
import { QUERY_ME } from '../../utils/queries'

const Header = () => {
    const logout = (event) => {
        event.preventDefault()
        Auth.logout()
    }

    const { data } = useQuery(QUERY_ME)
    const cart = data?.me.cart || {}

    return (
        <header>
            <Flex flexDirection='row' border='1px' borderColor='gray.200' boxShadow={'md'} bgColor={'white'} h={'15vh'} justifyContent={'space-around'}>
                <Box pos='absolute' top='15px' right={{ 'sm': '50px', 'md': '-5px', 'lg': '25px', 'xl': '100px' }} color={'#212C42'}>
                {Auth.loggedIn() ? (
                    <ShoppingCart cart={cart} />
                ) : (
                    <ShoppingCart />
                )}
                </Box>

                <Flex my='auto'>
                    <Show above='md'>
                        <Link as={RouteLink} to='/' mt='-3' mr={{ md: '10px', lg: '50px', xl: '200' }}>
                            <Image
                                src='/assets/images/Logo_AllCAPScomics_Circle.webp'
                                alt='all caps logo'
                                w={75}
                            />
                        </Link>
                    </Show>
                    <Show above='md'>
                        <UnorderedList styleType='none' display='flex' h='50' fontSize={32} flexDir={'row'} >
                            <ListItem mr={{ md: '5', lg: '10' }}>
                                <Link as={RouteLink} to='/about'>About</Link>
                            </ListItem>
                            <ListItem mr={{ md: '5', lg: '10' }}>
                                <Menu>
                                    <MenuButton as={Link}>Store</MenuButton>
                                    <MenuList>
                                        <MenuItem as={RouteLink} to='/store' fontSize={24}>Shop All</MenuItem>
                                        <MenuItem as={RouteLink} to='/store/apparel' fontSize={24}>Apparel</MenuItem>
                                        <MenuItem as={RouteLink} to='/store/action-figures' fontSize={24}>Action Figures</MenuItem>
                                        <MenuItem as={RouteLink} to='/store/trading-cards' fontSize={24}>Trading Cards</MenuItem>
                                        <MenuItem as={RouteLink} to='/store/art' fontSize={24}>Art</MenuItem>
                                        <MenuItem as={RouteLink} to='/store/other' fontSize={24}>Other</MenuItem>
                                    </MenuList>
                                </Menu>
                            </ListItem>
                            <ListItem mr={{ md: '5', lg: '10' }}>
                                <Link as={RouteLink} to='/campaigns'>Campaign</Link>
                            </ListItem>
                            <ListItem mr={{ md: '5', lg: '10' }}>
                                <Link as={RouteLink} to='/news'>News</Link>
                            </ListItem>
                            {Auth.loggedIn() ? (
                                <>
                                    <ListItem>
                                        <Link onClick={logout} textDecoration={'none'} mr={{ md: 'none', xl: '190px' }}>Logout</Link>
                                    </ListItem>
                                </>
                            ) : (
                                <ListItem mr={{ md: 'none', xl: '190px' }}>
                                    <Link as={RouteLink} to='/login'>Login</Link>
                                </ListItem>
                            )}

                        </UnorderedList>
                    </Show>
                    <Hide above='md'>
                        <Menu>
                            <MenuButton>
                                <Image
                                    src='/assets/images/Logo_AllCAPScomics_Circle.webp'
                                    alt='all caps logo'
                                    w={75}
                                />
                            </MenuButton>
                            <MenuList>
                                <MenuItem as={RouteLink} to='/' mr={{ md: '5', lg: '10' }}>Home</MenuItem>
                                <MenuItem as={RouteLink} to='/about' mr={{ md: '5', lg: '10' }}>About</MenuItem>
                                <MenuItem as={RouteLink} to='/store' mr={{ md: '5', lg: '10' }}>Store</MenuItem>
                                <MenuItem as={RouteLink} to='/campaigns' mr={{ md: '5', lg: '10' }}>Campaigns</MenuItem>
                                <MenuItem as={RouteLink} to='/news' mr={{ md: '5', lg: '10' }}>News</MenuItem>
                                {Auth.loggedIn() ? (
                                    <>
                                        <MenuItem>
                                            <Link onClick={logout} textDecoration={'none'} mr={{ md: 'none', xl: '190px' }}>Logout</Link>
                                        </MenuItem>
                                    </>
                                ) : (
                                    <MenuItem mr={{ md: 'none', xl: '190px' }}>
                                        <Link as={RouteLink} to='/login'>Login</Link>
                                    </MenuItem>
                                )}
                            </MenuList>
                        </Menu>
                    </Hide>
                </Flex>
            </Flex>
        </header>
    )
}

export default Header