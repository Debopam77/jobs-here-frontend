import React from 'react'
import '../style/index.scss'
import EmployeeCard from './EmployeeCard'
import Axios from 'axios'
import {useState, useEffect} from 'react'
 
function Employees() {
    const [employees, setEmployees] = useState([])

    useEffect(() => {
        //Get environment details
        const environment = process.env.REACT_APP_SSL + process.env.REACT_APP_URL

        const getEmployees = async () => {
            try {
                const url = environment+'/employee'
                const employeeData = await Axios.get(url);
                setEmployees(employeeData.data)
                console.log(employeeData.data)
            }catch(e) {
                console.log(e)
                alert('Some error occured')
            }
        }
        //Triggring the API
        getEmployees()
    },[])

    return (<div className='employee'>{
        employees.map((employee, index) => {
            return (
            <>
                <EmployeeCard key={'employee'+index} employee={employee}/>
            </>
            )
        })
    }</div>)
}

export default Employees