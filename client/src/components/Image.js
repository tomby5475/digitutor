import React from 'react';
import mainImage from '../images/casual-life-3d-reading 2.png'
import biologyImg from '../images/biology.png'
import physicsImg from '../images/physics.png'
import socialImg from '../images/social studies.png'
import geographyImg from '../images/geography.png'
import historyImg from '../images/history.png'
import mathImg from '../images/math.png'

function Image() {
    return (
        <div className='mainPageImage'>
            <img className="mainPageStudent" src={mainImage} alt="Student" />
            <img className="descipline biology" src={biologyImg} alt="biology" />
            <img className="descipline physics" src={physicsImg} alt="physics" />
            <img className="descipline social" src={socialImg} alt="social studies" />
            <img className="descipline geography" src={geographyImg} alt="geography" />
            <img className="descipline history" src={historyImg} alt="history" />
            <img className="descipline math" src={mathImg} alt="math" />
        </div>
    )
}

export default Image;