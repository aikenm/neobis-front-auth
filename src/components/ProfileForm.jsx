import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/image_block.css';
import '../styles/forms.css';
import '../styles/core.css';
import logo from '../images/logo.pdf';
import ModalSignOutMessage from './ModalSignOutMessage';
import { useDispatch, useSelector } from 'react-redux';
import { showLogoutModal, hideLogoutModal, logout } from '../store/userSlice';

function ProfileForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const showLogoutModalState = useSelector(state => state.user.showLogoutModal);

    const handleLogoutConfirm = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <div className='profile-block-wrapper'>
            <h2 className='profile-block-title'>Добро пожаловать!</h2>
            <h3 className='profile-block-subtitle'>Lordby - Твой личный репетитор</h3>
            <img src={logo} alt="" className='logo-image' />
            <button 
                className='log-out-button' 
                onClick={() => dispatch(showLogoutModal())}
            >
                Выйти
            </button>

            <ModalSignOutMessage 
                show={showLogoutModalState}
                onConfirm={handleLogoutConfirm}
                onCancel={() => dispatch(hideLogoutModal())}
            />
        </div>
    );
}

export default ProfileForm;
