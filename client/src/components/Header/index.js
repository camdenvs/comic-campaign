import React from 'react'
import { Link as RouteLink } from 'react-router-dom'
import { Flex, Link, UnorderedList, ListItem, Image, Menu, MenuButton, MenuList, MenuItem, Hide, Show, Box } from '@chakra-ui/react'
import { FaBars } from 'react-icons/fa'
import Auth from '../../utils/auth'
import ShoppingCart from './ShoppingCart'

import { useQuery } from '@apollo/client'
import { QUERY_CART } from '../../utils/queries'

const Header = () => {
    const logout = (event) => {
        event.preventDefault()
        Auth.logout()
    }

    const userId = Auth.loggedIn() ? Auth.getProfile().data._id : undefined
    const { loading, data } = useQuery(QUERY_CART, { variables: { userId: userId } })
    const cart = data?.cart || {}

    return (
        <header>
            <Flex flexDirection='row' border='1px' borderColor='gray.200' boxShadow={'md'} bgColor={'white'} h={'15vh'} justifyContent={'space-around'}>
                <Box pos='absolute' top='15px' right={'0.2%'} color={'#212C42'}>
                    {Auth.loggedIn() ? (
                        <ShoppingCart cart={cart} loading={loading} />
                    ) : (
                        <ShoppingCart />
                    )}
                </Box>

                <Flex my='auto'>
                    <Show above='md'>
                        <Link as={RouteLink} to='/' mt='-3' mr={{ md: '10px', lg: '50px', xl: '100px' }}>
                            <Image
                                src='/assets/images/Logo_AllCAPScomics_Circle.webp'
                                alt='all caps logo'
                                w={75}
                            />
                        </Link>
                    </Show>
                    <Show above='md'>
                        <UnorderedList styleType='none' display='flex' h='50' fontSize={32} flexDir={'row'} >
                            {/* <ListItem mr={{ md: '5', lg: '10' }}>
                                <Link as={RouteLink} to='/about'>About</Link>
                            </ListItem> */}
                            <ListItem mr={{ md: '5', lg: '10' }}>
                                <Menu>
                                    <MenuButton as={Link}>Store</MenuButton>
                                    <MenuList zIndex={999}>
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
                                <Link as={RouteLink} to='/campaigns'>Campaigns</Link>
                            </ListItem>
                            <ListItem mr={{ md: '5', lg: '10' }}>
                                <Link as={RouteLink} to='/news'>News</Link>
                            </ListItem>
                            {Auth.loggedIn() ? (
                                <>
                                    <ListItem>
                                        <Link onClick={logout} textDecoration={'none'}>Logout</Link>
                                    </ListItem>
                                </>
                            ) : (
                                <ListItem>
                                    <Link as={RouteLink} to='/login'>Login</Link>
                                </ListItem>
                            )}

                        </UnorderedList>
                    </Show>
                    <Hide above='md'>
                        <Menu pos='fixed' top='10px' left={'15px'} color={'#212C42'}>
                            <MenuButton pos='fixed' top='5vh' left={'15px'} color={'#212C42'}>
                                <FaBars size={'20px'}/>
                            </MenuButton>
                            <MenuList zIndex={999}>
                                <MenuItem as={RouteLink} to='/' mr={{ md: '5', lg: '10' }}>Home</MenuItem>
                                {/* <MenuItem as={RouteLink} to='/about' mr={{ md: '5', lg: '10' }}>About</MenuItem> */}
                                <MenuItem as={RouteLink} to='/store' mr={{ md: '5', lg: '10' }}>Store</MenuItem>
                                <MenuItem as={RouteLink} to='/campaigns' mr={{ md: '5', lg: '10' }}>Campaigns</MenuItem>
                                <MenuItem as={RouteLink} to='/news' mr={{ md: '5', lg: '10' }}>News</MenuItem>
                                {Auth.loggedIn() ? (
                                    <>
                                        <MenuItem onClick={logout} textDecoration={'none'} mr={{ md: 'none', xl: '190px' }}>Logout</MenuItem>
                                    </>
                                ) : (
                                    <MenuItem mr={{ md: 'none', xl: '190px' }} as={RouteLink} to='/login'>Login</MenuItem>
                                )}
                            </MenuList>
                        </Menu>
                        <Box>
                            <Image
                            src='/assets/images/Logo_AllCAPScomics_Circle.webp'
                            alt='all caps logo'
                            w={'75px'}
                        />
                        </Box>
                    </Hide>
                </Flex>
            </Flex>
        </header>
    )
}

export default Header