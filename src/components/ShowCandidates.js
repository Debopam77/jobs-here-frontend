import React from 'react'
import '../style/index.scss'
//import '../style/job.scss'
import Axios from 'axios'
import {useState, useEffect} from 'react'
import { Navigate } from 'react-router-dom'
import JobCard from './JobCard'
import EmployeeCard from './EmployeeCard'

function ShowCandidates() {

    const [jobs, setJobs] = useState([])
    const [user, setUser] = useState()
    const [employees, setEmployees] = useState([])

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
        //Get all employees
        const getEmployees = async () => {
            try {
                const url = environment+'/employee'
                const employeeData = await Axios.get(url);
                setEmployees(employeeData.data)
            }catch(e) {
                console.log(e)
                alert('Some error occured')
            }
        }
        //Triggring the API
        getEmployees()
    },[])
    //To check if two arrays have some common element or not
    const findCommonSkills = (arr1, arr2) => {
        return arr1.some(item => arr2.includes(item))
    }
    
    return (<>
        <div><h2>Paired Selections</h2></div>
        <div className='employees'>{
        
        employees.map((employee, index) => {
            return (jobs.map((job) => {  
                if (job.companyName === user.companyName) {
                    const haveCommonSkills = findCommonSkills(job.skills, employee.skills)
                    //Checking if employee has both experience and skill to match position, the return employee card
                    if (parseInt(employee.experience) >= parseInt(job.experience) && haveCommonSkills) {
                        const haveCommonLocation = employee.preferredLocations.includes(job.location)
                        return (<div className='oneLine'><EmployeeCard employee={employee}/><JobCard commonLocation={haveCommonLocation} job={job}/></div>)
                    }
                }
            }))
        })
    }</div>
    </>)
}

export default ShowCandidates