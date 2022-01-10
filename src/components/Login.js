import React, {useState, useEffect} from 'react'
import '../style/index.scss'
import {Routes, Route} from 'react-router-dom'
import Axios from 'axios'
import loaderElement from '../utils/loaderElement'

function Login({setLoggedIn}) {

    const [sent, setSent] = useState(false);
    //UseEffect to check weather the sent state has been changed or not
    useEffect(()=>{},[sent]);
    
    //If logging in user is a recruiter
    const [isRecruiter, setIsRecruiter] = useState(false)

    const [inputValues, setInputValues] = useState({
        phone : '',
        password : ''
    })

    //To intimate the redirect component
    const [redirectState, setRedirectState] = useState(false)

    //Passing the values to the login api
    const login = async (event)=> {
        //form submit doesn't refresh page
        event.preventDefault()
        
        const employeeOrRecruiter = (isRecruiter) ? 'recruiter' : 'employee'
        console.log(employeeOrRecruiter)
        //call axios api
        const url = (process.env.REACT_APP_SSL)+(process.env.REACT_APP_URL)+'/'+employeeOrRecruiter+'/login'
        console.log(url)

        try {
            console.log(inputValues)
            //Change the sent state to true
            setSent(true)
            //const response = await 
            const res = await Axios.post(url, inputValues)
            //Store login data in the browser local storage
            localStorage.setItem('loggedInUser', JSON.stringify({
                ...res.data,
                type : employeeOrRecruiter
            }))
            setLoggedIn(true)
            //Prep for redirect to home
            setRedirectState(true)
        }catch(e){
            console.log(e)
            alert(e.response.data.error)
        }
    }

    const getValue = (event) => {
        
        if (event.target.checked) { 
            console.log('Yes')
            setIsRecruiter(true)
        }
        else {
            console.log('No')
            setIsRecruiter(false)
        }
               
        if (event.target.name !== 'isRecruiter') {
            setInputValues((inputValues)=> {
                return {
                    ...inputValues,
                    [event.target.name] : event.target.value
                }
            })
        }          
    }

    //Redirect to home once logged in
    if(redirectState) {
        return (
            <Routes>
                <Route path='/' />
            </Routes>      
        )
    }

    const output = (
        <div className='loginRegister'>
            <h2>Enter your login details</h2>
            <form className='centerElements' onSubmit={login}>
            <input type='checkbox' name={'isRecruiter'} className='checkBox' onChange={getValue} defaultChecked={false}/>
                <div className='descriptionInputLogin'><div className='description'>Phone : </div><input onChange={getValue} name='phone'></input></div>
                <div className='descriptionInputLogin'><div className='description'>Password : </div><input onChange={getValue} name='password' type='password'></input></div>
                <div className='descriptionInputLogin'><div><a href='/forgotPassword'>Forgot your password?</a></div></div>
                <div className='descriptionInputLogin'><div><a href='/registerUser'>New user? Register here.</a></div></div>
                <button>Login</button>
            </form>
        </div>
    )
    return (sent) ? loaderElement : output;
}

export default Login