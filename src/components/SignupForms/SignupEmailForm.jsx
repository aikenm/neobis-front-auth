import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import '../../styles/SignupPage/SignupPage.css';
import logo from '../../images/logo.png';
// Assuming you have an arrow icon for back navigation

function SignupEmailForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className='signup-email-form-wrapper'>
        <Link to="/" className='back-button'>
            <img src="" alt="Back to login" />
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
        
        <button type="submit" className='form-button' disabled={errors.email}>Далее</button>
        </form>
    </div>
  );
}

export default SignupEmailForm;
