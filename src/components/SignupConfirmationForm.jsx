import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/image_block.css';
import '../styles/forms.css';
import '../styles/core.css';
import logo from '../images/logo.jpg';
import arrow from "../images/arrow.jpg";

function SignupConfirmationForm() {
    return (
        <div className='main'>
            <div className='image-block-wrapper'>
                <Link to="/signup" className='back-button'>
                    <img src={arrow} alt="back" className='arrow-icon'/>
                    <span className='arrow-text'>Назад</span>
                </Link>
                <img src={logo} alt="" className='logo-image' />
                <h1 className='image-block-title'>Lordby</h1>
                <h3 className='image-block-subtitle'>Твой личный репетитор</h3>
            </div>
            <div className='confirmation-form-wrapper'>
                <h3 className='confirmation-block-title'>Выслали письмо со ссылкой для<br /> завершения регистрации на <br />example@gmail.com</h3>
                <h3 className='confirmation-block-subtitle'>Если письмо не пришло, не<br /> спеши ждать совиную почту - <br />лучше <span className='colored-text'>проверь ящик “Спам” <br /><br />(´｡• ω •｡`)</span></h3>
                <Link to="/signup" className='signup-link'>Письмо не пришло</Link>
            </div>
        </div>
    );
}

export default SignupConfirmationForm;
