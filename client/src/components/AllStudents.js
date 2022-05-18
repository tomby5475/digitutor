
import React, { useState, useEffect } from "react"
import axios from "axios"

export default function AllStudents() {
    
    const [users, setUsers] = useState([])
    
    const storedToken = localStorage.getItem('authToken')
    
        const getAllStudents = () => {
            axios.get('/api/students', { headers: { Authorization: `Bearer ${storedToken}` } })
                .then(response => {
                    //console.log(response)
                    setUsers(response.data)
                })
                .catch(err => console.log(err))
        }
    
        useEffect(() => {
            getAllStudents()
        }, [])
        return (
            <div className="allUsers">
                <h2>All Students</h2>
                <table className="allUsersTable">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Discipline</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        {users.map((user) => (
                        user.role === 'student' ? 
                        <tbody>
                            <tr  key={user._id}>
                                <td>{user.username}</td>
                                <td>{user.discipline}</td>
                                <td>{user.email}</td>
                            </tr>
                        </tbody>
                        : 
                        user === false
                    ))}
                </table> 
                
            </div>
        )
    }

