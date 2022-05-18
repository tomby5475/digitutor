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
        // console.log("The file to be uploaded is: ", e.target.files[0]);
     
        const uploadData = new FormData();
     
        // imageUrl => this name has to be the same as in the model since we pass
        // req.body to .create() method when creating a new movie in '/api/movies' POST route
        uploadData.append("imageUrl", e.target.files[0]);
     
        service
          .uploadImage(uploadData)
          .then(response => {
            console.log("response is: ", response);
            // response carries "secure_url" which we can use to update the state
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
        <div className='signupForm'>
            <h2>Signup</h2>
            <div>
                <form onSubmit={handleSubmit}>

                    <label htmlFor='imageUrl'>Photo upload</label>
                    <input onChange={(e) => handleFileUpload(e)} type="file" name="imageUrl" />

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
                    <option>Shoose discipline</option>
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

