import { Link } from "react-router-dom";
import React, {useContext} from 'react';
import Image from "../components/Image";
import { AuthContext } from '../context/auth'

function Home() {
    const { isLoggedIn } = useContext(AuthContext)
    return (
        <div className="mainDiv">
            <div className="homePage">
                <h1>Your Personal Digital Tutor</h1>
                <Link to = '/signup'>
                    <button className='authButton'>Sign up</button>
                </Link>
                { isLoggedIn && 
                <Link to='/profile'><button className='authButton'>Profile</button></Link>
                }
            </div>
            <Image/>
        </div>
    )
}

export default Home;