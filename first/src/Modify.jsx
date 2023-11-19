import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios'


function Modify () {
    const {id} = useParams()
    const [EmpId, setId] = useState()
    const [FullName, setName] = useState()
    const [Age, setAge] = useState()
    const [DOB, setDob] = useState()
    const [Salary, setSalary] = useState()
    const [Department, setDept] = useState()
    const navigate = useNavigate()

    useEffect(()=> {
        axios.get(`http://127.0.0.1:3001/getUser/`+id)
        .then(result => {console.log(result)
            setId(result.data.EmpId)
            setName(result.data.FullName)
            setAge(result.data.Age)
            setDob(result.data.DOB)
            setSalary(result.data.Salary)
            setDept(result.data.Department)
           
        })
        .catch(err => console.log(err))
       }, [])

       const Edit = (e) =>{
        e.preventDefault()
        axios.put("http://127.0.0.1:3001/Modify/"+id, {EmpId,FullName,Age,DOB,Salary,Department})
        .then(result => {
            console.log(result)
            navigate('/')
        })
        .catch(err => console.log(err))

       }
    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-4'>
         <form onSubmit={Edit}>
            <h2>Add User</h2>
            <div className='mb-2'>
                <label htmlFor="">EmpId</label>
                <input type="text"  className='form-control' value={EmpId} onChange={(e) => setId(e.target.value)}/>
            </div>
            <div className='mb-2'>
                <label htmlFor="">FullName</label>
                <input type="text" className='form-control' value={FullName} onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className='mb-2'>
                <label htmlFor="">Age</label>
                <input type="text"  className='form-control' value={Age} onChange={(e) => setAge(e.target.value)}/>
            </div>
            <div className='mb-2'>
                <label htmlFor="">DOB</label>
                <input type="text" className='form-control' value={DOB} onChange={(e) => setDob(e.target.value)}/>
            </div>
            <div className='mb-2'>
                <label htmlFor="">Salary</label>
                <input type="text" className='form-control' value={Salary} onChange={(e) => setSalary(e.target.value)}/>
            </div>
            <div className='mb-2'>
                <label htmlFor="">Department</label>
                <input type="text" className='form-control' value={Department} onChange={(e) => setDept(e.target.value)}/>
            </div>
            <button className='btn btn-success'>MODIFY</button>
         </form>
        </div>
      </div>
    )
}

export default Modify;
