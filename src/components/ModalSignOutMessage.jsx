import React from 'react';
import '../styles/modal_message.css';

function ModalSignOutMessage({ show, onConfirm, onCancel }) {
    if (!show) return null;

    return (
        <div className='modal-overlay'>
            <div className='modal-log-out-content'>
                <h4 className='modal-log-out-title'>Выйти?</h4>
                <h5 className='modal-log-out-subtitle'>Точно выйти?</h5>
                <div className='modal-log-out-buttons'>
                    <button className='form-button confirm' onClick={onConfirm}>Да, точно</button>
                    <button className='form-button cancel' onClick={onCancel}>Нет, остаться</button>
                </div>
            </div>
        </div>
    );
}

export default ModalSignOutMessage;