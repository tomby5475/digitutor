import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/auth';


function Profile(){

    const { user } = useContext(AuthContext)

    return (
        <div className='profileDiv'>
            {user && <h3>Hello {user.username}</h3>}
            {user && <img className='profileImage' src={user.imageUrl} alt='User'></img> }
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
                    <button className='authButton allUsersButton'>All Students</button>
                </Link>
            ) : (
                <Link to = '/tutors'>
                    <button className='authButton allUsersButton'>All Tutors</button>
                </Link>
            )
            }
        </div>
    )
}

export default Profile;

