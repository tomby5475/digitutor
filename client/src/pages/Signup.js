import React, {useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../context/auth';
import service from '../api/service';

function Signup() {
    const [role, setRole] = useState('');
    const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
    const [discipline, setDiscipline] = useState('');
    const [phone, setPhone] = useState('');
    const [addinfo, setAddinfo] = useState('');
    const [errorMessage, setErrorMessage] = useState(undefined);
    const [imageUrl, setImageUrl] = useState('')
    const { storeToken, verifyStoredToken } = useContext(AuthContext)

    const navigate = useNavigate()
    const handleFileUpload = e => {
        const uploadData = new FormData();
        uploadData.append("imageUrl", e.target.files[0]);
     
        service
          .uploadImage(uploadData)
          .then(response => {
            console.log("response is: ", response);
            setImageUrl(response.fileUrl);
          })
          .catch(err => console.log("Error while uploading the file: ", err));
      };

    const handleSubmit = e => {
        e.preventDefault()
        const requestBody = { role, username, email, password, discipline, phone, addinfo, imageUrl}
        axios.post('/api/auth/signup', requestBody)
        .then(response => {
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

    const handleRole = e => setRole(e.target.value)
	const handleUsername = e => setUsername(e.target.value)
    const handleEmail = e => setEmail(e.target.value)
	const handlePassword = e => setPassword(e.target.value)
	const handleDiscipline = e => setDiscipline(e.target.value)
	const handlePhone = e => setPhone(e.target.value)
    const handleAddinfo = e => setAddinfo(e.target.value)
    
    return (
        <div className='signupDiv'>
            <h2>Sign up</h2>
                <div>
                    <form className='signupDivForm' onSubmit={handleSubmit}>
                        <select name="role" id="role" value={role} onChange={handleRole}>
                            <option>Role</option>
                            <option value="student">Student</option>
                            <option value="tutor">Tutor</option>
                        </select>
                        <input placeholder="User name" type="text" name="username" value={username} onChange={handleUsername}/>
                        <input placeholder="Email" type='email' name='email' value={email} onChange={handleEmail}/>
                        <input placeholder="Password" type='password' name='password' value={password} onChange={handlePassword}/>
                        <select name="discipline" id="discipline" value={discipline} onChange={handleDiscipline}>
                            <option>Shoose discipline</option>
                            <option value="mathematics">Mathematics</option>
                            <option value="history">History</option>
                            <option value="chemistry">Chemistry</option>
                            <option value="physics">Physics</option>
			                <option value="biology">Biology</option>
		                    <option value="geography">Geography</option>
                        </select>
                        <input placeholder="Phone number" type="tel" name="phone" value={phone} onChange={handlePhone}/>
                        <input placeholder="Additional info" type="text" name="'addInfo" value={addinfo} onChange={handleAddinfo}/>
                        <input placeholder="Upload photo" onChange={(e) => handleFileUpload(e)} type="file" name="imageUrl" />

                        <button className="authButton" type="submit">Sign up</button>
                    </form>
                    {errorMessage && <h5>{errorMessage}</h5>}
                </div>
        </div>
    )
}

export default Signup;

