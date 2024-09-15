import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './index.css';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5000/get-employees', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setEmployees(response.data);
        setFilteredEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employee data:', error);
        setMessage('Error fetching employee data');
      }
    };

    fetchEmployees();
  }, []);

  useEffect(() => {
    const filtered = employees.filter(employee =>
      employee.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredEmployees(filtered);
  }, [searchQuery, employees]);



const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/delete-employee/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setEmployees((prev) => prev.filter((employee) => employee._id !== id));
      setMessage('Employee deleted successfully!');
    } catch (error) {
      console.error('Error deleting employee:', error);
      setMessage('Error deleting employee');
    }
  };
  
  const handleEdit = (id) => {
    navigate(`/edit-employee/${id}`);
  };

  return (
    <div className="employee-list-container">
      <h2>Employee List</h2>
      <Link to='/'><button className='btn-create'>Create Employee</button></Link>
      {message && <p className="message">{message}</p>}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {filteredEmployees.length > 0 ? (
        <table className="employee-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile No</th>
              <th>Designation</th>
              <th>Gender</th>
              <th>Courses</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.mobileNo}</td>
                <td>{employee.designation}</td>
                <td>{employee.gender}</td>
                <td>{employee.courses.join(', ')}</td>
                <td>
                  <button
                    className="edit-button"
                    onClick={() => handleEdit(employee._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(employee._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No employees found</p>
      )}
    </div>
  );
};

export default EmployeeList;
