import React from 'react'
import '../style/index.scss'
import '../style/recruiter.scss'
import Axios from 'axios'
import {useState, useEffect} from 'react'
import RecruiterCard from './RecruiterCard'

function Recruiters() {

    const [recruiters, setRecruiters] = useState([])

    useEffect(() => {
        //Get environment details
        const environment = process.env.REACT_APP_SSL + process.env.REACT_APP_URL

        const getRecruiters = async () => {
            try {
                const url = environment+'/recruiter'
                const recruiterData = await Axios.get(url);
                setRecruiters(recruiterData.data)
                console.log(recruiterData.data)
            }catch(e) {
                console.log(e)
                alert('Some error occured')
            }
        }
        //Triggring the API
        getRecruiters()
    },[])

    return (<div className='Recruiters'>{
        recruiters.map((recruiter, index) => {
            return <RecruiterCard key={'recruiter'+index} recruiter={recruiter}/>
        })
    }</div>)
}

export default Recruiters