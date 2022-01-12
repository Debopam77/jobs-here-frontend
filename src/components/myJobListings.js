import React from 'react'
import '../style/index.scss'
import Axios from 'axios'
import {useState, useEffect} from 'react'
import { Navigate } from 'react-router-dom'
import JobCard from './JobCard'

function MyJobListings() {

    const [jobs, setJobs] = useState([])
    const [user, setUser] = useState()

    useEffect(() => {
        //Get environment details
        const environment = process.env.REACT_APP_SSL + process.env.REACT_APP_URL

        setUser(JSON.parse(localStorage.getItem('loggedInUser')))

        if (user && user.type !== 'recruiter') {
            alert('You must be an recruiter to see matched candidates')
            return (<Navigate to='/'/>)
        }

        const getJobs = async () => {
            try {
                const url = environment+'/listing'
                const jobData = await Axios.get(url)
                setJobs(jobData.data)
            }catch(e) {
                console.log(e)
                alert('Some error occured')
            }
        }
        //Triggring the API
        getJobs()
    },[])

    return (<>
        <div><h2>My Listed Jobs</h2></div>
        <div className='employees'>{

        jobs.map((job) => {  
            if (job.companyName === user.companyName) {
                return (<JobCard job={job}/>)
            }
        })
    }</div>
    </>)
}

export default MyJobListings