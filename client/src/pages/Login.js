
import React, {useState, useContext} from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import { AuthContext } from '../context/auth';


function Login() {
    const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(undefined);
    const navigate = useNavigate()

    const { storeToken, verifyStoredToken } = useContext(AuthContext)

    const handleSubmit = e => {
        e.preventDefault()
        const reqBody = {email, password}
        axios.post('/api/auth/login', reqBody)
        .then(response => {
            console.log('login works');
            const token = response.data.authToken 
            storeToken(token)
            verifyStoredToken()
                .then(() => {
                    navigate('/profile')
                })
        })
        .catch(err => {
            const errorDescription = err.response.data.message
			setErrorMessage(errorDescription)
        })
    }
    const handleEmail = e => setEmail(e.target.value)
	const handlePassword = e => setPassword(e.target.value)

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>

            <label htmlFor="email">Email</label>
            <input type='email' name='email' value={email} onChange={handleEmail} />

            <label htmlFor="password">Password</label>
            <input type='password' name='password' value={password} onChange={handlePassword}/>

            <button type="submit">Log In</button>

            </form>
            
            {errorMessage && <h5>{errorMessage}</h5>}
            <h3>Don't have an account?</h3>
			<Link to='/signup'>Signup</Link>
        </>
    )
}

export default Login;