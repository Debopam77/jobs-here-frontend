import React,{useState, useEffect} from 'react'
import '../style/index.scss'
import '../style/jobCard.scss'
import Axios from 'axios'
import JobCard from './JobCard'



function Search() {
    const [jobs, setJobs] = useState([])
    const [searchValue, setSearchValue] = useState([])
    useEffect(() => {
        //Get environment details
        const environment = process.env.REACT_APP_SSL + process.env.REACT_APP_URL

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

    const getValue = (event) =>{
        const value = event.target.value
        setSearchValue(value.toLowerCase())
    }

    const hasCommonSkills = (arr, str) => {
        let flag = false
        arr.forEach((element) => {
            if(element.toLowerCase().includes(str)) {
                flag = true
                return;
            }
        })

        return flag
    }

    return (
    <>
        <div><h2>Browse Jobs</h2></div>
        <div className='home'><input className='searchInput' onChange={getValue}></input></div>
        <div className='searchHolder'>{
        jobs.filter((job) => {
            //Check if search term is present either in the title or in the skills part of the object
            if (job.title.toLowerCase().includes(searchValue) || hasCommonSkills(job.skills, searchValue))
                return true
        }).map((job, index) => {
            return (<JobCard key={'job'+index} job={job}/>)
        })}</div>
    </>)
}

export default Search