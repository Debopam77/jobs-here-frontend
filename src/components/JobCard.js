import React from 'react'
import '../style/index.scss'
import '../style/jobCard.scss'

function JobCard({job, propsOnClick}) {
    const companyName = job.companyName
    const title = job.title
    const email = job.email
    const phone = job.phone
    const location = job.location
    const skills = job.skills
    const experience = job.experience

    const output = (
        <>
        <div className='JobCard'>
            <div className='In-line'><div className='Values'>Company Name :</div><div className='Values'>{`${companyName}`}</div></div>
            <div className='In-line'><div className='Values'>Minimum experience :</div><div className='Values'>{experience}</div></div>
            <div className='In-line'><div className='Values'>Base location :</div><div className='Values'>{location}</div></div>
            <div className='In-line'><div className='Values'>Preferred Skills :</div><div className='Values'>{skills}</div></div>
            <div className='In-line'><div className='Values'>Phone :</div><div className='Values'>{phone}</div></div>
            <div className='In-line'><div className='Values'>Email :</div><div className='Values'>{email}</div></div>
        </div>
        </>
    )

    return (output)

}

export default JobCard