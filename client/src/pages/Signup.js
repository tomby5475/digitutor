import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Signup() {
    const [role, setRole] = useState('');
    const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
    const [discipline, setDiscipline] = useState('');
    const [phone, setPhone] = useState('');
    const [addinfo, setAddinfo] = useState('');
    const [errorMessage, setErrorMessage] = useState(undefined);

    const navigate = useNavigate()

    const handleSubmit = e => {
		e.preventDefault()
		const requestBody = { role, username, email, password, discipline, phone, addinfo, }
		axios.post('/api/auth/signup', requestBody)
			.then(response => {
				navigate('/profile')
			})
			.catch(err => {
			const errorDescription = err.response.data.message
			setErrorMessage(errorDescription)
                 //console.log(errorDescription);
			 })
	}

    const handleRole = e => setRole(e.target.value)
	const handleUsername = e => setUsername(e.target.value)
    const handleEmail = e => setEmail(e.target.value)
	const handlePassword = e => setPassword(e.target.value)
	const handleDiscipline = e => setDiscipline(e.target.value)
	const handlePhone = e => setPhone(e.target.value)
    const handleAddinfo = e => setAddinfo(e.target.value)

    return (
        <div className='signupForm'>
            <h2>Signup</h2>
            <div>
                <form onSubmit={handleSubmit}>

                    <label htmlFor='role'>Your role</label>
                    <select name="role" id="role" value={role} onChange={handleRole}>
                    <option>Role</option>
                    <option value="student">Student</option>
                    <option value="tutor">Tutor</option>
                    </select>

                    <label htmlFor="username">Name</label>
                    <input type="text" name="username" value={username} onChange={handleUsername}/>

                    <label htmlFor="email">Email</label>
                    <input type='email' name='email' value={email} onChange={handleEmail}/>

                    <label htmlFor="password">Password</label>
                    <input type='password' name='password' value={password} onChange={handlePassword}/>

                    <label htmlFor="discipline">Discipline</label>
                    <select name="discipline" id="discipline" value={discipline} onChange={handleDiscipline}>
                    <option value="mathematics">Mathematics</option>
                    <option value="history">History</option>
                    <option value="chemistry">Chemistry</option>
                    <option value="physics">Physics</option>
			        <option value="biology">Biology</option>
		            <option value="geography">Geography</option>
                    </select>

                    <label htmlFor="phone">Phone number</label>
                    <input type="tel" name="phone" value={phone} onChange={handlePhone}/>

                    <label htmlFor="addInfo">Additional info</label>
                    <input type="text" name="'addInfo" value={addinfo} onChange={handleAddinfo}/>

                    <button className="authButton" type="submit">Sign up</button>
        
                </form>
                {errorMessage && <h5>{errorMessage}</h5>}
            </div>
        </div>
    )
}

export default Signup;

