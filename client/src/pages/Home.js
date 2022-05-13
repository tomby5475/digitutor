import { Link } from "react-router-dom";
import React from 'react';
import Image from "../components/Image";

function Home() {
    return (
        <div className="mainDiv">
            <div className="homePage">
                <h1>Your Personal Digital Tutor</h1>
                <Link to = '/signup'>
                    <button>Sign up</button>
                </Link>
            </div>
            <Image/>
        </div>
    )
}

export default Home;