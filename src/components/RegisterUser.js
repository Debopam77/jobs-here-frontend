import {useState} from 'react'
import { Navigate} from 'react-router-dom'


function RegisterUser() {

    const [redirectTo, setRedirectTo] = useState('')

    const redirectAction = (event) => {
        if (event.target.id === 'employee')
            setRedirectTo('employee')
        
        else 
            setRedirectTo('recruiter')
    }
    if(redirectTo === 'employee') {
        console.log('Not Here')
        return (
            <Navigate to='/addEmployee' /> 
        )
    }else if(redirectTo === 'recruiter') {
        console.log('Here')
        return (
            <Navigate to='/addRecruiter' />
        )
    }
    const output = (
        <div className='loginRegister'>
            <h2>To which do you belong? </h2>
            <button onClick={redirectAction} id='employee'>Employee</button>
            <button onClick={redirectAction} id='recruiter'>Recruiter</button>
        </div>
    )
    return output
}

export default RegisterUser