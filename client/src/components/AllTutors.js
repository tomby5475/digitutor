import React, { useState, useEffect } from "react"
import axios from "axios"
import SearchBar from "./SearchBar"

export default function AllTutors() {
    
    const [users, setUsers] = useState([])
    const [inputText, setInputText] = useState("")
    const storedToken = localStorage.getItem('authToken')
    
    const getAllTutors = () => {
        axios.get('/api/tutors', { headers: { Authorization: `Bearer ${storedToken}` } })
             .then(response => {
            setUsers(response.data)
            })
            .catch(err => console.log(err))
    }
    
    useEffect(() => {
        getAllTutors()
    }, [])
       
    return (
        <div className="allUsers">
            <h2>All Tutors</h2>
            <SearchBar setInputText={setInputText}/>
            <table className="allUsersTable">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Discipline</th>
                        <th>Email</th>
                    </tr>
                </thead>
                {users.filter((user) => {return user.discipline.toLowerCase().includes(inputText) })
                      .map((user) => (
                        user.role === 'tutor' ? 
                        <tbody>
                            <tr key={user._id}>
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

