import React, {useState} from 'react'
import '../style/index.scss'
import {Navigate} from 'react-router-dom'


function Logout({setLoggedIn}) {

    //To intimate Redirect component
    const [redirectState, setRedirectState] = useState(false)

    //When any of the buttons are clicked
    const logoutActions = async (event)=> {
        //Remove the user data from local storage
        if(event.target.id === 'yes') {
            localStorage.setItem('loggedInUser', null)
            setLoggedIn(false)
        }
            
        //prep for redirect 
        setRedirectState(true)
    }

    //Redirect to home once logged in
    if(redirectState) {
        return (
            <Navigate to='/'/>     
        )
    }

    //Show logout options    
    const output = (
        <div className='loginRegister'>
            <h2>Want to logout?</h2>
            <button onClick={logoutActions} id='yes'>Yes</button>
            <button onClick={logoutActions} id='no'>No</button>
        </div>
    )
    return output
}

export default Logout