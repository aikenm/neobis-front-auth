import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { showEmailResendModal, hideEmailResendModal } from '../store/userSlice';
import '../styles/image_block.css';
import '../styles/forms.css';
import '../styles/core.css';
import ModalEmailMessage from './ModalEmailMessage';
import logo from '../images/logo.svg';
import arrow from '../images/arrow.svg';

function ConfirmationForm() {
    const showModal = useSelector(state => state.user.showModal);
    const dispatch = useDispatch();
    const userEmail = localStorage.getItem('userEmail');
    const navigate = useNavigate();

    const resendConfirmation = async (userEmail) => {
        try {
            const response = await axios.post('http://neobis-project.up.railway.app/api/auth/resend-confirmation', {
                email: userEmail
            }, {
                headers: {
                    'accept': '*/*',
                    'Content-Type': 'application/json'
                }
            });
    
            if (response.status === 200) {
                dispatch(showEmailResendModal()); 
            }
        } catch (error) {
            console.error("Error resending confirmation:", error);
        }
    };

    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const userName = localStorage.getItem('userName');
                const url = `http://neobis-project.up.railway.app/api/auth/enabled?username=${userName}`; 
                const response = await axios.get(url);
    
                console.log(response);
                if (response.status === 200 && response.data === 1) { 
                    clearInterval(interval);
                    console.log(response);
                    navigate('/');
                }
            } catch (error) {
                console.error("Error checking email confirmation:", error);
            }
        }, 3000);  
    
        return () => clearInterval(interval); 
    }, [navigate, dispatch]);
    

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
                <h3 className='confirmation-block-title'>
                    Выслали письмо со ссылкой для<br /> завершения регистрации на <br /><span className='user-email'>{userEmail}</span>
                </h3>
                <h3 className='confirmation-block-subtitle'>
                    Если письмо не пришло, не<br /> спешите ждать совиную почту - <br />лучше 
                    <span className='colored-text'> проверьте ящик "Спам" <br /><br />(´｡• ω •｡`)</span>
                </h3>
                <button onClick={() => resendConfirmation(userEmail)} className='confirmation-button'>Письмо не пришло</button>
            </div>
            <ModalEmailMessage show={showModal} onClose={() => dispatch(hideEmailResendModal())} />
        </div>
    );
}

export default ConfirmationForm;
