import { Link } from "react-router-dom";
import React from 'react';
import Image from "../components/Image";
//import { AuthContext } from '../context/auth'
//import {useContext} from 'react'

function Home() {
    //const { isLoggedIn } = useContext(AuthContext)
    return (
        <div className="mainDiv">
            <div className="homePage">
                <h1>Your Personal Digital Tutor</h1>
                <h4>connect and learn</h4>
                <Link to = '/signup'>
                    <button className='authButton'>Sign up</button>
                </Link>
            </div>
            <Image/>
        </div>
    )
}

export default Home;