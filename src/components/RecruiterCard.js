import React from 'react'
import '../style/index.scss'
import '../style/recruiterCard.scss'

function RecruiterCard({recruiter, propsOnClick}) {
    const companyName = recruiter.companyName
    const headquarter = recruiter.headquarter
    const email = recruiter.email
    const phone = recruiter.phone
    const locations = recruiter.locations

    const output = (
        <>
        <div className='RecruiterCard'>
            <div className='In-line'><div className='Values'>Company Name :</div><div className='Values'>{`${companyName}`}</div></div>
            <div className='In-line'><div className='Values'>Headquarters :</div><div className='Values'>{headquarter}</div></div>
            <div className='In-line'><div className='Values'>Locations :</div><div className='Values'>{locations}</div></div>
            <div className='In-line'><div className='Values'>Phone :</div><div className='Values'>{phone}</div></div>
            <div className='In-line'><div className='Values'>Email :</div><div className='Values'>{email}</div></div>
        </div>
        </>
    )

    return (output)

}

export default RecruiterCard