import React, { useState, useEffect } from "react"
import axios from "axios"
import SearchBar from "./SearchBar"

export default function AllStudents() {
    
    const [users, setUsers] = useState([])
    const [inputText, setInputText] = useState("")
    const storedToken = localStorage.getItem('authToken')
    
    const getAllStudents = () => {
        axios.get('/api/students', { headers: { Authorization: `Bearer ${storedToken}` } })
             .then(response => {
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
                <SearchBar setInputText={setInputText}/>
                <table className="allUsersTable">
                    <thead>
                        <tr>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Discipline</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    {users.filter((user) => {return user.discipline.toLowerCase().includes(inputText) })
                          .map((user) => (
                            user.role === 'student' ? 
                    <tbody>
                        <tr key={user._id}>
                            <td><img style={{width: '50px'}} src={user.imageUrl} alt='User'></img></td>
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

