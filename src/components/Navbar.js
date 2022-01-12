import React, { useState, useEffect } from 'react'
import '../style/index.scss'
import '../style/navbar.scss'
import blankUserImage from '../resources/user.png'

function Navbar({loggedIn}) {

    //Storing the user data
    const [user, setUser] = useState()

    //Load user details in state at Navbar load
    useEffect(()=>{
        setUser(JSON.parse(localStorage.getItem('loggedInUser')));
    }, [loggedIn])
    
    let myAvatarElement

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

    //Things to change once an user logs in
    if(loggedIn){
        //Add logout link
        navBarItems[4] = {
            title : 'Logout',
            url: '/logout',
            class: 'nav-links'
        }
        //Employee specific changes
        if (user && user.type === 'employee'){
            navBarItems[3] = {
                title : 'My-Job-Matches',
                url: '/showMatches',
                class: 'nav-links'
            }
        }
        //Recruiter specific changes
        if (user && user.type === 'recruiter') {
            navBarItems[3] = {
                title : 'Potential-Candidates',
                url: '/showCandidates',
                class: 'nav-links'
            }
            navBarItems[2] = {
                title : 'Add-Listing',
                url: '/createJobListing',
                class: 'nav-links'
            }
            navBarItems[1] = {
                title : 'My-Listings',
                url: '/myJobListings',
                class: 'nav-links'
            }
        }
        //Remove the login link
        //navBarItems.splice(3, 1);

        //Add an image of the user an point it to the user profile
        myAvatarElement = (loggedIn) ? <a href={'/'}><img src={blankUserImage} className='avatar' alt='avatar'></img></a> : undefined;
    }
    


    return (
        
        <div className = 'navbar'>
            <div className='logoName'><a href='/'>{(user)? 'Welcome '+ ((user.type === 'employee') ? user.name.firstName : user.companyName) : 'Jobs-Here-365'}</a></div>
            <div className = 'navchunk'>
                <div className = 'links' id=''>
                    {navBarItems.map((item, index)=> {
                        return (
                            <a key={'navLink'+index} className={item.class} href={item.url}>{item.title}</a>
                        )
                    })}
                </div>
                <div>{(user) ? myAvatarElement : undefined}</div>
            </div>
        </div>
    )
}

export default Navbar
