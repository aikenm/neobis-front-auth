import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideLogoutModal } from '../store/userSlice';  
import '../styles/modal_message.css';

function ModalSignOutMessage({ onConfirm }) {
    const dispatch = useDispatch();
    const show = useSelector(state => state.user.showLogoutModal);  

    const handleClose = () => {
        dispatch(hideLogoutModal());  
    };

    if (!show) return null;

    return (
        <div className='modal-overlay'>
            <div className='modal-log-out-content'>
                <h4 className='modal-log-out-title'>Выйти?</h4>
                <h5 className='modal-log-out-subtitle'>Точно выйти?</h5>
                <div className='modal-log-out-buttons'>
                    <button className='form-button confirm' onClick={() => {
                        onConfirm();
                        handleClose();
                    }}>Да, точно</button>
                    <button className='form-button cancel' onClick={handleClose}>Нет, остаться</button>
                </div>
            </div>
        </div>
    );
}

export default ModalSignOutMessage;
