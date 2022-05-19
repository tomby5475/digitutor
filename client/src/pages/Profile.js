import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/auth';
import axios from 'axios'

function Profile(){

    const { user, logoutUser } = useContext(AuthContext)
    let userId = ''
    if(user !== null) userId = user._id
    const navigate = useNavigate()

    const deleteProfile = () => {
        axios.delete(`/api/profile/${userId}`)
			.then(() => {
				navigate('/');
                logoutUser();
			})
			.catch(err => console.log(err))
	}

    return (
        <div className='profileDiv'>
            {user && <h3>Hello {user.username}</h3>}
            {user && <img className='profileImage' src={user.imageUrl} alt='User'></img> }
            { user && user.role === 'tutor' ? 
            (
                <Link to = '/students'>
                    <button className='authButton allUsersButton'>See all students</button>
                </Link>
            ) : (
                <Link to = '/tutors'>
                    <button className='authButton allUsersButton'>See all tutors</button>
                </Link>
            )
            }
            <h3>Contact information</h3>
            {user && <p>Email: {user.email}</p>}
            {user && <p>Phone: {user.phone}</p>}
            <h3>General information</h3>
            {user && <p>Role: {user.role}</p>}
            {user && <p>Discipline: {user.discipline}</p>}
            {user && <p>About: {user.addinfo}</p>}
            
            <button className='deleteButton' onClick={deleteProfile}>Delete profile 💥</button>
        </div>
    )
}

export default Profile;

