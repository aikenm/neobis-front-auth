import React from 'react';
import '../styles/modal_message.css';

function ModalEmailMessage({ show, onClose }) {
    if (!show) return null;

    return (
        <div className='modal-overlay'>
            <div className='modal-content'>
                <h3>Мы выслали еще одно письмо<br /> на указанную тобой почту <br />example@gmail.com</h3>
                <h4>Не забудь проверить <br />ящик “Спам”!!!!</h4>
                <button className="form-button" onClick={onClose}>Понятно</button>
            </div>
        </div>
    );
}

export default ModalEmailMessage;
