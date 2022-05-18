import icon from './images/Vector.png';
import logo from './images/DIGITUTOR.png';
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import Home from './pages/Home';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import React, {useContext} from 'react';
import Login from './pages/Login';
import AllTutors from './components/AllTutors';
import { AuthContext } from './context/auth';
import AllStudents from './components/AllStudents';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const { isLoggedIn, logoutUser } = useContext(AuthContext)
  
  return (
    <div className="App">
        <header className="App-header">
          <nav className="navLogo">
            <Link to='/'> 
              <img className="icon" src={icon} alt="Icon" />
              <img className="logo" src={logo} alt="Digitutor" />
            </Link> 
            { isLoggedIn && ( 
              <>
                <button className='logoutButton' onClick={logoutUser}>Log out</button>
              </>
              )}
            { !isLoggedIn && (
              <>
                <Link to='/login'>
                  <button className='authButton'>Login</button>
                </Link>
              </>
              )}
          </nav>
        </header>

        <Routes>
          <Route path='/' element={<Home />} />
          {/* <Route path='/profile' element={
            <ProtectedRoute redirectTo='/login'>
                <Profile />
            </ProtectedRoute>
          }
          /> */}
          <Route path='/tutors' element={
            <ProtectedRoute redirectTo='/login'>
                <AllTutors />
            </ProtectedRoute>
          }
          />
          <Route path='/students' element={
            <ProtectedRoute redirectTo='/login'>
                <AllStudents />
            </ProtectedRoute>
          }
          />
          <Route path='/signup' element={<Signup />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/login' element={<Login />} />
          <Route path='/tutors' element={<AllTutors />} />
          <Route path='/students' element={<AllStudents />} />
        </Routes>

    </div>
  );
}

export default App;

