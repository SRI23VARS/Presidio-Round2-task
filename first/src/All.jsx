
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function All() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  const [averageSalaryAll, setAverageSalaryAll] = useState();
  const [averageSalariesByDepartment, setAverageSalariesByDepartment] = useState({});
  const [selectedDepartment, setSelectedDepartment] = useState('');


 


  useEffect(() => {
    axios.get('http://127.0.0.1:3001')
      .then(result => setUsers(result.data))
      .catch(err => console.log(err))
      axios.get('http://127.0.0.1:3001/averageSalary')
      .then(result => {
        console.log("Average Salary Result:", result.data);
        setAverageSalaryAll(result.data.averageSalaryAll);
      })
      .catch(err => console.log("Average Salary Error:", err));

    axios.get('http://127.0.0.1:3001/averageSalaryByDepartment')
      .then(result => {
        console.log("Average Salaries By Department Result:", result.data);
        setAverageSalariesByDepartment(result.data.averageSalariesByDepartment);
      })
      .catch(err => console.log("Average Salaries By Department Error:", err));
  
}, []);

  const handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:3001/deleteUser/${id}`)
      .then(res => {
        console.log(res)
        window.location.reload()
      })
      .catch(erro => console.log(erro))
  }

  const filteredUsers = users.filter(user => {
    if (selectedFilter) {
      const userValue = user[selectedFilter];
      return userValue && userValue.toString().toLowerCase().includes(searchTerm.toLowerCase());
    } else {
      return Object.values(user).some(value =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  });

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">EMPLOYEE MANAGEMENT APPLICATION</h3>
            </div>
            <div className="card-body">
              <div className='row mb-3'>
                <div className='col-md-6'>
                  <label htmlFor="search" className="form-label">SEARCH:</label>
                  <input
                    id="search"
                    type="text"
                    className='form-control'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className='col-md-6'>
                  <label htmlFor="filter" className="form-label">FILTER BY:</label>
                  <select
                    id="filter"
                    className='form-select'
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                  >
                    <option value="">Select Field</option>
                    <option value="EmpId">EmpId</option>
                    <option value="FullName">FullName</option>
                    <option value="Age">Age</option>
                    <option value="DOB">DOB</option>
                    <option value="Salary">Salary</option>
                    <option value="Department">Department</option>
                  </select>
                </div>
              </div>


              


              <Link to="/New" className='btn btn-success mb-3'>ADD NEW EMPLOYEE +</Link>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>EmpId</th>
                    <th>FullName</th>
                    <th>Age</th>
                    <th>DOB</th>
                    <th>Salary</th>
                    <th>Department</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.EmpId}>
                      <td>{user.EmpId}</td>
                      <td>{user.FullName}</td>
                      <td>{user.Age}</td>
                      <td>{user.DOB}</td>
                      <td>{user.Salary}</td>
                      <td>{user.Department}</td>
                      <td>
                        <Link to={`/modify/${user._id}`} className='btn btn-success'>EDIT</Link>
                        <button className='btn btn-danger ms-2' onClick={() => handleDelete(user._id)}>DELETE</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="card-footer">
  <strong>Average Salary (All): ${averageSalaryAll !== undefined ? averageSalaryAll.toFixed(2) : 'N/A'}</strong>
  <br />
  <strong>Average Salaries By Department:</strong>
  <ul>
    {Object.entries(averageSalariesByDepartment).map(([department, averageSalary]) => (
      <li key={department}>
        <strong>{department}:</strong> ${averageSalary !== undefined ? averageSalary.toFixed(2) : 'N/A'}
      </li>
    ))}
  </ul>
</div>



          </div>
        </div>
      </div>
    </div>
    
  );
}

export default All;



