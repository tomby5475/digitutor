
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
            <>
                <h2>All Students</h2>
                {users.map((user) => (
                    user.role === 'student' ? 
                    <div key={user._id}>
                    <h3>{user.username}</h3>
                    <p>{user.discipline}</p>
                    <p>{user.email}</p>
                    </div> : 
                    user === false
                ))}
            </>
        )
    }

