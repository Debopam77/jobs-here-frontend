import {useState} from 'react'
import {Routes, Route} from 'react-router-dom'


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
            <Routes>
                <Route path='/addEmployee' />
            </Routes>      
        )
    }else if(redirectTo === 'recruiter') {
        console.log('Here')
        return (
            <Routes>
                <Route path='/addRecruiter'/>
            </Routes>
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