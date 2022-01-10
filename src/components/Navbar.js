import React, { useState, useEffect } from 'react'
import '../style/index.scss'
import '../style/navbar.scss'

function Navbar() {
    // const [showNavMenu, setShowNavMenu] = useState(false)
    // const navMenuElement = <div className='navMenuIcon' onClick={() => {setShowNavMenu(!showNavMenu)}}></div>
    let navBarItems = [
        {
            title : 'Home',
            url : '/home',
            class : 'nav-links'
        },
        {
            title : 'Search',
            url : '/search',
            class : 'nav-links'
        },
        {
            title : 'Employees',
            url : '/employee',
            class : 'nav-links'
        },
        {
            title : 'Recruiters',
            url : '/recruiter',
            class : 'nav-links'
        },
        {
            title : 'Jobs',
            url : '/jobListings',
            class : 'nav-links'
        },
        {
            title : 'Login',
            url : '/login',
            class : 'nav-links'
        },
        {
            title : 'About Us',
            url : '/aboutUs',
            class : 'nav-links'
        },
    ]

    return (
        <div className = 'navbar'>
            <div className = 'navchunk'>
                <div className = 'links' id=''>
                    {navBarItems.map((item, index)=> {
                        return (
                            <a key={'navLink'+index} className={item.class} href={item.url}>{item.title}</a>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Navbar
