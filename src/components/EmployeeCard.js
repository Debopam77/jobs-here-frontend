import React from 'react'
import '../style/index.scss'
import '../style/employeeCard.scss'

function EmployeeCard({employee, propsOnClick}) {
    const name = employee.name
    const experience = employee.experience
    const skills = employee.skills.map((skill) => ' '+skill)
    const email = employee.email
    const phone = employee.phone
    const preferredLocations = employee.preferredLocations.map((location) => ' '+location)
    const output = (
        <>
        <div className='EmployeeCardBackground'>
            <div className='EmployeeCard'>Name :</div><div className='EmployeeCard'>{`${name.firstName} ${name.lastName}`}</div>
            <div className='EmployeeCard'>Experience :</div><div className='EmployeeCard'>{experience}</div>
            <div className='EmployeeCard'>Skills :</div><div className='EmployeeCard'>{skills}</div>
            <div className='EmployeeCard'>Preferred Loc :</div><div className='EmployeeCard'>{preferredLocations}</div>
            <div className='EmployeeCard'>Phone :</div><div className='EmployeeCard'>{phone}</div>
            <div className='EmployeeCard'>Email :</div><div className='EmployeeCard'>{email}</div>
        </div>
        </>
    )

    return output;
}

export default EmployeeCard