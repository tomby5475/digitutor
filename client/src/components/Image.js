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
            <img src={mainImage} alt="Student" />
            <img src={biologyImg} alt="biology" />
            <img src={physicsImg} alt="physics" />
            <img src={socialImg} alt="social studies" />
            <img src={geographyImg} alt="geography" />
            <img src={historyImg} alt="history" />
            <img src={mathImg} alt="math" />
        </div>
    )
}

export default Image;