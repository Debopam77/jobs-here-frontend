import React, {useState, useEffect} from 'react'
import '../style/index.scss'
import '../style/loginRegister.scss'
import Axios from 'axios'
import loaderElement from '../utils/loaderElement'

function ChangePassword({isRecruiter}) {

    const [sent, setSent] = useState(undefined);
    const [passwordMatches, setPasswordMatches] = useState('placeholder');
    //UseEffect to check weather the sent state has been changed or not
    useEffect(()=>{},[sent]);

    const [inputValues, setInputValues] = useState()

    //To intimate the redirect component
    const [redirectState, setRedirectState] = useState(false)

    //Passing the values to the login api
    const change = async (event)=> {
        //form submit doesn't refresh page
        event.preventDefault()
        
        if(inputValues.password !== passwordMatches) {
            alert('Please enter the passwords correctly');
            return;
        }
        console.log(inputValues)
        const employeeOrRecruiter = (isRecruiter) ? 'recruiter' : 'employee'
        //call axios api
        const url = (process.env.REACT_APP_SSL)+(process.env.REACT_APP_URL)+'/'+employeeOrRecruiter+'/forgotPassword'

        try {
            //Change the sent state to true
            setSent(true)
            console.log(url)
            const res = await Axios.patch(url, inputValues)
            //Prep for redirect to home
            if(res)
                setRedirectState(true)
        }catch(e){
            console.log(e)
            alert(e.response.data.error)
        }
    }

    const getValue = (event) => {
        const elementName = event.target.name
        const elementValue = event.target.value
        if(elementName === 'password'){
            setPasswordMatches(elementValue)   
        }               
        setInputValues((inputValues)=> {
            return {
                ...inputValues,
                [event.target.name] : event.target.value
            }
        })
      
    }

    //Redirect to home once logged in
    if(redirectState) {
        return (
            <div>Test</div>   
        )
    }

    const output = (
        <div className='loginRegister'>
            <h2>Enter your login details</h2>
            <form className='centerElements' onSubmit={change}>
                <div className='descriptionInputLogin'><div className='description'>Enter the OTP : </div><input onChange={getValue} name='otp'></input></div>

                <div className='descriptionInputLogin'><div className='description'>Password :</div>
                <input type='password' onChange={getValue} required name='password'></input></div>

                <div className='descriptionInputLogin'><div className='description'>Confirm Password :</div>
                <input onChange={getValue} required name='confirmPassword' className={(!passwordMatches)? 'passwordMatches' : ''}></input></div>
                <button>Get OTP</button>
            </form>
        </div>
    )
    return (sent) ? loaderElement : output;
}

export default ChangePassword