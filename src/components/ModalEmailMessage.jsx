import React from 'react';
import '../styles/modal_message.css';

function ModalEmailMessage({ show, onClose }) {
    const userEmail = localStorage.getItem('userEmail');

    if (!show) return null;

    return (
        <div className='modal-overlay'>
            <div className='modal-email-content'>
                <h3 className='modal-email-title'>
                    Мы выслали еще одно письмо
                    <br />
                    на указанную вами почту
                    <br />
                    <span className='user-email'>{userEmail}</span>
                </h3>
                <h4 className='modal-email-subtitle'>
                    Не забудьте проверить
                    <br />
                    ящик "Спам"
                </h4>
                <button className="form-button close" onClick={onClose}>
                    Понятно
                </button>
            </div>
        </div>
    );
}

export default ModalEmailMessage;
