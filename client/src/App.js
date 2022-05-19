import icon from './images/Vector.png';
import logo from './images/DIGITUTOR.png';
import './App.css';
import { Routes, Route, Link, useLocation } from "react-router-dom";
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
  const location = useLocation()

  return (
    <div className="App">
      <header className="App-header">
        <nav className="navLogo">
          <Link to='/'> 
            <img className="icon" src={icon} alt="Icon" />
            <img className="logo" src={logo} alt="Digitutor" />
          </Link> 
          <div>
            { isLoggedIn && location.pathname !=="/profile" && location.pathname !=="/signup" &&
              <Link to='/profile'><button className='authButton'>Profile</button></Link>
            }
            { isLoggedIn && ( 
              <Link to='/'>
                <button className='logoutButton' onClick={logoutUser}>Log out</button>
              </Link>
            )}
            { !isLoggedIn && (
                <Link to='/login'>
                  <button className='authButton'>Log in</button>
                </Link>
            )}
          </div>
        </nav>
      </header>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/tutors' element={
          <ProtectedRoute redirectTo='/login'>
            <AllTutors />
          </ProtectedRoute>
        }/>
        <Route path='/students' element={
          <ProtectedRoute redirectTo='/login'>
            <AllStudents />
          </ProtectedRoute>
        }/>
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

