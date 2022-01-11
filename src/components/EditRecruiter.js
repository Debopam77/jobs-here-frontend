import React,{useState, useEffect} from 'react';
import '../style/index.scss';
import {Routes, Route} from 'react-router-dom';
import blankUserImage from '../resources/user.png'
import loaderElement from '../utils/loaderElement'
import axios from 'axios';

function AddRecruiter({recruiter}) {
    //Is the request sent then start load animation
    const [sent, setSent] = useState(false)
    //State to figure out when to redirect page back to user detail page after edit or create
    const[redirectState, setRedirectState] = useState(false)

    useEffect(()=>{},[sent]);

    //Values that cannot be changed
    const excludedAttributes = ['phone']
    let defaultValue = Object.keys(recruiter)
        .filter((key) => !excludedAttributes.includes(key))
        .reduce((obj, key) => {
            return {
                ...obj,
                [key] : recruiter[key]
            }
        }, {})
    
    //State to store the created or updated user string
    const [newValue, setNewValue] = useState(defaultValue)

    //onChange triggered function to update 
    const getValue = (event)=> {
        
        const elementName = event.target.name;
        let elementValue = event.target.value;
        
        //Setting the value of the state using the changed input fields
        setNewValue(()=> {
            
            let result = newValue;

            if(elementName.includes('.')) {
                //Handle object based attributes
                const part = elementName.split('.');
                result[part[0]][part[1]] = elementValue;

            }else
                //Handle normal attributes
                result[elementName] = elementValue; 
            return result;
        });
    }

    //Submit button is clicked
    const submitData = async (event)=> {
        event.preventDefault();
        let payload = newValue;
        const url = (process.env.REACT_APP_SSL)+(process.env.REACT_APP_URL)+'/recruiter/'

        //Call the edit user api
        try {

            //Request is sent
            setSent(true);

            //Making the request with the PAYLOAD and the Configurations
            const res = await axios.patch(url, payload);

            localStorage.setItem('loggedInUser', JSON.stringify({
                ...res.data,
                type : 'recruiter'
            }))

            //Tell the component to redirect back to the details page
            setRedirectState(true);
        }catch(e){
            alert(e.message);
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

            <h2>Add or edit details</h2>

            <form onSubmit={submitData}>

                <div className='description'>Profile picture</div>
                <img src={blankUserImage} className='avatar' name='avatar' alt='User'></img>

                <div className='descriptionInput'><div className='description'>Phone Number</div>
                <div className='highlight'>{recruiter.phone}</div></div>
                
                <div className='descriptionInput'><div className='description'>Email-ID</div>
                <input type="text" name={'email'} defaultValue={recruiter.email} onChange={getValue}></input></div>

                <div className='descriptionInput'><div className='description'>First Name</div>
                <input type="text" name={'name.firstName'} defaultValue={recruiter.companyName} onChange={getValue}></input></div>

                <div className='descriptionInput'><div className='description'>Date of Establishment</div></div>

                <div className='descriptionInput'><div className='description'>Headquarter</div>
                <input type="text" name={'headquarter'} defaultValue={recruiter.headquarter} onChange={getValue}></input></div>

                <div className='descriptionInput'><div className='description'>Office Locations</div>
                <input type="text" name={'locations'} defaultValue={recruiter.locations} onChange={getValue}></input></div>

                <button>Submit</button>
            </form>
        </div>
    );

    return (sent) ? loaderElement : output ;
}

export default AddRecruiter