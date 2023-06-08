import React from 'react'
import { Link as RouteLink } from 'react-router-dom'
import { Flex, Link, UnorderedList, ListItem, Center, Image, Menu, MenuButton, MenuList, MenuItem, Hide, Show } from '@chakra-ui/react'

import Auth from '../../utils/auth'
import { FaHamburger } from 'react-icons/fa'

const Header = () => {
    const logout = (event) => {
        event.preventDefault()
        Auth.logout()
    }

    return (
        <header>
            <Flex flexDirection='row' border='1px' borderColor='gray.200' boxShadow={'md'} bgColor={'white'} h={'15vh'} justifyContent={'space-around'}>


                <Flex my='auto'>
                    <Show above='md'>
                        <Link as={RouteLink} to='/' mt='-3' mr={{ md: '25px', lg: '100', xl: '200' }}>
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
                            <MenuButton><FaHamburger fontSize={50} /></MenuButton>
                            <MenuList>
                                <MenuItem mr={{ md: '5', lg: '10' }}>
                                    <Link as={RouteLink} to='/'>Home</Link>
                                </MenuItem>
                                <MenuItem mr={{ md: '5', lg: '10' }}>
                                    <Link as={RouteLink} to='/about'>About</Link>
                                </MenuItem>
                                <MenuItem mr={{ md: '5', lg: '10' }}>
                                    <Link as={RouteLink} to='/store'>Store</Link>
                                </MenuItem>
                                <MenuItem mr={{ md: '5', lg: '10' }}>
                                    <Link as={RouteLink} to='/campaigns'>Campaign</Link>
                                </MenuItem>
                                <MenuItem mr={{ md: '5', lg: '10' }}>
                                    <Link as={RouteLink} to='/news'>News</Link>
                                </MenuItem>
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