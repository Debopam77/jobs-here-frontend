import React, {useState, useEffect} from 'react'
import '../style/index.scss'
import '../style/loginRegister.scss'
import ChangePassword from './changePassword'
import Axios from 'axios'
import loaderElement from '../utils/loaderElement'

function ForgotPassword() {

    const [sent, setSent] = useState(undefined);
    //UseEffect to check weather the sent state has been changed or not
    useEffect(()=>{},[sent]);
    
    //If logging in user is a recruiter
    const [isRecruiter, setIsRecruiter] = useState(false)

    const [inputValues, setInputValues] = useState()

    //To intimate the redirect component
    const [redirectState, setRedirectState] = useState(false)

    //Passing the values to the login api
    const getOTP = async (event)=> {
        //form submit doesn't refresh page
        event.preventDefault()
        
        const employeeOrRecruiter = (isRecruiter) ? 'recruiter' : 'employee'
        //call axios api
        const url = (process.env.REACT_APP_SSL)+(process.env.REACT_APP_URL)+'/'+employeeOrRecruiter+'/forgotPassword'

        try {
            console.log(inputValues)
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
        
        if (event.target.name === 'isRecruiter' && !event.target.checked) { 
            setIsRecruiter(false)
        }
        else if(event.target.name === 'isRecruiter' && event.target.checked) {
            setIsRecruiter(true)
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
            <ChangePassword isRecruiter={isRecruiter}/>  
        )
    }

    const output = (
        <div className='loginRegister'>
            <h2>Enter your login details</h2>
            <form className='centerElements' onSubmit={getOTP}>
                <div className='descriptionInputLogin'><div className='description'>Are you a recruiter? : </div><input type='checkbox' name={'isRecruiter'} className='checkBox' onChange={getValue} value={isRecruiter} defaultChecked={false}/></div>
                <div className='descriptionInputLogin'><div className='description'>Email : </div><input onChange={getValue} name='email'></input></div>
                <button>Get OTP</button>
            </form>
        </div>
    )
    return (sent) ? loaderElement : output;
}

export default ForgotPassword