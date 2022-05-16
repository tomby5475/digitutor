import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/auth';


function Profile(){

    const { user } = useContext(AuthContext)

    console.log("user2", user)

    return (
        <>
        {user && <h1>Hello {user.username}</h1>}

        <h3>Contact information</h3>
        {user && <p>Email: {user.email}</p>}
        {user && <p>Phone: {user.phone}</p>}

        <h3>General information</h3>
        {user && <p>Role: {user.role}</p>}
        {user && <p>Discipline: {user.discipline}</p>}
        {user && <p>About: {user.addinfo}</p>}

        { user && user.role === 'tutor' ? 
        (
            <Link to = '/students'>
                <button>All Students</button>
            </Link>
        ) : (
            <Link to = '/tutors'>
                <button>All Tutors</button>
            </Link>
        )
        }
        </>
    )
}

export default Profile;

