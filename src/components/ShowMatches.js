import React from 'react'
import '../style/index.scss'
import '../style/jobCard.scss'
import Axios from 'axios'
import {useState, useEffect} from 'react'
import { Navigate } from 'react-router-dom'
import JobCard from './JobCard'

function ShowMatches() {

    const [jobs, setJobs] = useState([])
    const [user, setUser] = useState()

    useEffect(() => {
        //Get environment details
        const environment = process.env.REACT_APP_SSL + process.env.REACT_APP_URL

        setUser(JSON.parse(localStorage.getItem('loggedInUser')))

        if (user && user.type !== 'employee') {
            alert('You must be an employee to get matched')
            return (<Navigate to='/'/>)
        }

        const getJobs = async () => {
            try {
                const url = environment+'/listing'
                const jobData = await Axios.get(url);
                setJobs(jobData.data)
            }catch(e) {
                console.log(e)
                alert('Some error occured')
            }
        }
        //Triggring the API
        getJobs()
    },[])

    //To check if two arrays have some common element or not
    const findCommon = (arr1, arr2) => {
        let flag = false;
        arr1.forEach(element => {
            arr2.forEach(arr2Element => {
                if(arr2Element.toLowerCase() === element.toLowerCase()){
                    flag = true
                }
            })
            
        });
        return flag;
    }

    return (<>
        <div><h2>Here are the oppertunities selected just for you!</h2></div>
        <div className='jobs'>{
        jobs.map((job, index) => {
            //Let the magic happen
            const haveCommonSkills = findCommon(user.skills, job.skills)

            if( parseInt(user.experience) >= parseInt(job.experience) && haveCommonSkills) {
                const haveCommonLocation = user.preferredLocations.includes(job.location)
                return (<JobCard commonLocation={haveCommonLocation} key={'job'+index} job={job}/>)
            }
            return <></>
        })
    }</div>
    </>)
}

export default ShowMatches