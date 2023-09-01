import React, { useState} from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import '../../styles/SignupPage/SignupPage.css'; 
import logo from '../../images/logo.png';
import arrow from "../../images/arrow.png"
import ModalMessage from '../ModalMessage';

function SignupEmailForm() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [showModal, setShowModal] = useState(false);
  const emailValue = watch('email');  

  const onSubmit = (data) => {
    console.log(data);
    localStorage.setItem('signupEmail', data.email);
    setShowModal(true);
  };

  return (
    <div className='signup-email-form-wrapper'>
        <Link to="/" className='back-button'>
            <img src={arrow} alt="Back to login" className='arrow-icon'/>
        </Link>
        <form onSubmit={handleSubmit(onSubmit)} className='signup-email-form'>
        <img src={logo} alt="" className='logo-image'/>
        <h2 className='signup-title'>Регистрация</h2>
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

export default SignupEmailForm;
