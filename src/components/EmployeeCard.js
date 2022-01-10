import React from 'react'
import '../style/index.scss'

function EmployeeCard({employee, propsOnClick}) {
    const name = employee.name
    const experience = employee.experience
    const skills = employee.skills
    const email = employee.email
    const phone = employee.phone
    const certificates = employee.certificates
    const output = (
        <>
        <div className='EmployeeCardBackground'>
            <div className='EmployeeCard'>Name :</div><div className='EmployeeCard'>{`${name.firstName} ${name.lastName}`}</div>
            <div className='EmployeeCard'>Experience :</div><div className='EmployeeCard'>{experience}</div>
            <div className='EmployeeCard'>Skills :</div><div className='EmployeeCard'>{skills}</div>
            <div className='EmployeeCard'>Phone :</div><div className='EmployeeCard'>{phone}</div>
            <div className='EmployeeCard'>Email :</div><div className='EmployeeCard'>{email}</div>
        </div>
        </>
    )

    return output;
}

export default EmployeeCard