import React from 'react'
import { Link } from 'react-router-dom'

import Auth from '../../utils/auth'

const Header = () => {
    const logout = (event) => {
        event.preventDefault()
        Auth.logout()
    }

    return (
        <header>
            {Auth.loggedIn() ? (
                <>
                    <button onClick={logout}>Logout</button>
                </>
            ) : (
                <>
                    <Link to='/login'>Login/Sign Up</Link>
                </>
            )}
            <div>
                <Link to='/'>Home</Link>
                <Link to='/about'>About</Link>
                <Link to='/store'>Store</Link>
                <Link to='/campaigns'>Campaign</Link>
                <Link to='/news'>News</Link>
            </div>
        </header>
    )
}

export default Header