import React,{useState, useEffect} from 'react';
import '../style/index.scss';
import {Routes, Route} from 'react-router-dom';
import blankUserImage from '../resources/user.png'
import loaderElement from '../utils/loaderElement'
import axios from 'axios';

function EditEmployee({employee}) {
    //Is the request sent then start load animation
    const [sent, setSent] = useState(false)
    //State to figure out when to redirect page back to user detail page after edit or create
    const[redirectState, setRedirectState] = useState(false)

    useEffect(()=>{},[sent]);

    //Values that cannot be changed
    const excludedAttributes = ['phone']
    let defaultValue = Object.keys(employee)
        .filter((key) => !excludedAttributes.includes(key))
        .reduce((obj, key) => {
            return {
                ...obj,
                [key] : employee[key]
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
        const url = (process.env.REACT_APP_SSL)+(process.env.REACT_APP_URL)+'/employee/'

        //Call the edit user api
        try {

            //Request is sent
            setSent(true);

            //Making the request with the PAYLOAD and the Configurations
            const res = await axios.patch(url, payload);

            localStorage.setItem('loggedInUser', JSON.stringify({
                ...res.data,
                type : 'employee'
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
                <div className='highlight'>{employee.phone}</div></div>
                
                <div className='descriptionInput'><div className='description'>Email-ID</div>
                <input type="text" name={'email'} defaultValue={employee.email} onChange={getValue}></input></div>

                <div className='descriptionInput'><div className='description'>First Name</div>
                <input type="text" name={'name.firstName'} defaultValue={employee.name.firstName} onChange={getValue}></input></div>
                
                <div className='descriptionInput'><div className='description'>Middle Name</div>
                <input type="text" name={'name.middleName'} defaultValue={employee.name.middleName} onChange={getValue}></input></div>

                <div className='descriptionInput'><div className='description'>Last Name</div>
                <input type="text" name={'name.lastName'} defaultValue={employee.name.lastName} onChange={getValue}></input></div>

                <div className='descriptionInput'><div className='description'>Date of Birth</div></div>

                <div className='descriptionInput'><div className='description'>Something about you</div>
                <input type="text" name={'aboutMe'} defaultValue={employee.aboutMe} onChange={getValue}></input></div>

                <div className='descriptionInput'><div className='description'>Bio</div>
                <input type="text" name={'bio'} defaultValue={employee.bio} onChange={getValue}></input></div>

                <div className='descriptionInput'><div className='description'>Experience in Years</div>
                <input type="text" name={'experience'} defaultValue={employee.experience} onChange={getValue}></input></div>

                <div className='descriptionInput'><div className='description'>Skills and Technologies</div>
                <input type="text" name={'skills'} defaultValue={employee.skills} onChange={getValue}></input></div>

                <div className='descriptionInput'><div className='description'>Preferred Work Location(s)</div>
                <input type="text" name={'preferredLocations'} defaultValue={employee.preferredLocations} onChange={getValue}></input></div>

                <div className='descriptionInput'><div className='description'>Certificates</div>
                <input type="text" name={'certificates'} defaultValue={employee.certificates} onChange={getValue}></input></div>

                <button>Submit</button>
            </form>
        </div>
    );

    return (sent) ? loaderElement : output ;
}

export default EditEmployee