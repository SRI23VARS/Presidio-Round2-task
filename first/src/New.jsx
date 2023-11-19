import React, { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";


function New () {
    const [EmpId, setId] = useState()
    const [FullName, setName] = useState()
    const [Age, setAge] = useState()
    const [DOB, setDob] = useState()
    const [Salary, setSalary] = useState()
    const [Department, setDept] = useState()
    const navigate = useNavigate()

    const Submit = (e) => {
        e.preventDefault();
        axios.post("http://127.0.0.1:3001/New",{EmpId,FullName,Age,DOB,Salary,Department})
        .then(result => {
            console.log(result)
            navigate('/')
        })
        .catch(err => console.log(err))

    }
    return (
       
      <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-4'>
         <form onSubmit={Submit}>
            <h2>Add User</h2>
            <div className='mb-2'>
                <label htmlFor="empId">EmpId</label>
                <input type="text"  id="empId" className='form-control' onChange={(e) => setId(e.target.value)}/>
            </div>
            <div className='mb-2'>
                <label htmlFor="fullname">FullName</label>
                <input type="text" id="fullname" className='form-control' onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className='mb-2'>
                <label htmlFor="age">Age</label>
                <input type="text" id="age" className='form-control' onChange={(e) => setAge(e.target.value)}/>
            </div>
            <div className='mb-2'>
                <label htmlFor="dob">DOB</label>
                <input type="text" id="dob" className='form-control' onChange={(e) => setDob(e.target.value)}/>
            </div>
            <div className='mb-2'>
                <label htmlFor="salary">Salary</label>
                <input type="text" id="salary" className='form-control' onChange={(e) => setSalary(e.target.value)}/>
            </div>
            <div className='mb-2'>
                <label htmlFor="dept">Department</label>
                <input type="text" id="dept" className='form-control' onChange={(e) => setDept(e.target.value)}/>
            </div>
            <button className='btn btn-success'>SUBMIT</button>
         </form>
        </div>
      </div>
      
    )
}

export default New;
