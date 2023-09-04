import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/image_block.css';
import '../styles/forms.css';
import '../styles/core.css';
import logo from '../images/logo.jpg';

function ProfileForm() {

    return (
        <div className='profile-block-wrapper'>
            <h1 className='image-block-title'>С возвращением!</h1>
            <h3 className='image-block-subtitle'>Lordby - Твой личный репетитор</h3>
            <img src={logo} alt="" className='logo-image' />
            <Link to="/" className='log-out-link'>Выйти</Link>
        </div>
    );
}

export default ProfileForm;
