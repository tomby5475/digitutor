
import React, { useState, useEffect } from "react"
import axios from "axios"

export default function AllTutors() {
    
    const [users, setUsers] = useState([])

    
    const storedToken = localStorage.getItem('authToken')
    
        const getAllTutors = () => {
            axios.get('/api/tutors', { headers: { Authorization: `Bearer ${storedToken}` } })
                .then(response => {
                    //console.log(response)
                    setUsers(response.data)
                })
                .catch(err => console.log(err))
        }
    
        useEffect(() => {
            getAllTutors()
        }, [])
        //console.log(users[0]);
        return (
            <>
                <h2>All Tutors</h2>
                {users.map((user) => (
                    user.role === 'tutor' ? 
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

