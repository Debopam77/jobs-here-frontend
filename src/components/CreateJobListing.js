import React,{useState, useEffect} from 'react';
import loaderElement from '../utils/loaderElement';
import '../style/index.scss';
import axios from 'axios';
import {Navigate} from 'react-router-dom';

function CreateJobListing() {

    const [sent, setSent] = useState(false);
    //UseEffect to check weather the sent state has been changed or not
    useEffect(()=>{},[sent])

    const [redirectToHome, setRedirectToHome] = useState(false);
    const [newJob, setNewJob] = useState()

    useEffect(()=> {
        const user = JSON.parse(localStorage.getItem('loggedInUser'))
        //
        if (user.type !== 'recruiter') {
            console.log('Inside danger')
            alert('You must be a recruiter to create a job listing')
            return (<Navigate to='/' />)
        }      
        setNewJob({
            'companyName' : user.companyName,
            'title' : '',
            'email' : user.email,
            'phone' : user.phone,
            'experience' : '',
            'skills' : [],
            'location' : ''
        })

    },[])

    const submit = async (event)=> {
        event.preventDefault();
        //Check if both password and confirm password strings are same or not

        const url = (process.env.REACT_APP_SSL)+(process.env.REACT_APP_URL)+'/listing'

        //Trigger api to create new user
        try{
            //change sent state to true
            console.log(newJob)
            setSent(true);
            const response = await axios.post(url, newJob);

            
            if (response)
            //Prep to redirect to home
                setRedirectToHome(true);
        }catch(e){
            alert(e)
        }
    }

    const getValue = (event) => {
        
        const elementName = event.target.name;
        let elementValue = event.target.value;
        //set the newJob state creating a new object
        setNewJob(()=> {
            let result = newJob;

            if(elementName !== 'title' && elementValue.includes(','))
                elementValue = elementValue.split(',')   
            result[elementName] = elementValue
        
            return result;
        });
    }

    if(redirectToHome){
        return (
            <Navigate to='/'/>
        )
    }

    const output = (
        <div className='loginRegister'>
            <form className='centerElements' onSubmit={submit}>
                <h2>Enter Position details</h2>

                <div className='descriptionInputLogin'><div className='description'>Position title/description :</div>
                <input onChange={getValue} required name='title'></input></div>

                <div className='descriptionInputLogin'><div className='description'>Experience :</div>
                <input onChange={getValue} required name='experience'></input></div>

                <div className='descriptionInputLogin'><div className='description'>Location :</div>
                <input onChange={getValue} required name='location'></input></div>

                <div className='descriptionInputLogin'><div className='preferredLocations'>Preferred Skills :</div>
                <input onChange={getValue} required name='skills'></input></div>

                <button name='register'>Add</button>
            </form>
        </div>
    );

    return (sent) ? loaderElement : output ;
}

export default CreateJobListing