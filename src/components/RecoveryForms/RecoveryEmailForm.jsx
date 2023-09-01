import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import '../../styles/PasswordRecoveryPage/RecoveryEmailForm.css'; 
import logo from '../../images/logo.png';
import arrow from '../../images/arrow.png'
import ModalMessage from '../ModalMessage';

function RecoveryEmailForm() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [showModal, setShowModal] = useState(false);
  const emailValue = watch('email');  

  const onSubmit = (data) => {
    console.log(data);
    setShowModal(true);
  };

  return (
    <div className='recovery-email-form-wrapper'>
        <Link to="/" className='back-button'>
            <img src={arrow} alt="Back to login" className='arrow-icon'/>
        </Link>
        <form onSubmit={handleSubmit(onSubmit)} className='recovery-email-form'>
        <img src={logo} alt="" className='logo-image'/>
        <h2 className='recovery-title'>Восстановление пароля</h2>
        <input
            {...register('email', {
              required: "Введите электронную почту",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Неверная электронная почта"
              }
            })}
            type="email"
            placeholder="Электронная почта"
            className='email-input-field'
        />
        {errors.email && <p className='error-message'>{errors.email.message}</p>}
        
        <button type="submit" className='form-button' disabled={!emailValue}>Далее</button>

        </form>
        {showModal && <ModalMessage email={emailValue} onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default RecoveryEmailForm;
