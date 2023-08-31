import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import '../styles/LoginPage/LoginPage.css';
import logo from '../images/logo.png';

function LoginForm() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const watchedEmail = watch('email', '');
  const watchedPassword = watch('password', '');

  const onSubmit = (data) => {
    console.log(data);
  };

  const isDisabled = !watchedEmail || !watchedPassword || errors.email || errors.password;

  return (
    <div className='login-form-wrapper'>
        <form onSubmit={handleSubmit(onSubmit)} className='login-form'>
            <img src={logo} alt="" className='logo-image'/>
        <input
            {...register('email', { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i })}
            type="email"
            placeholder="Электронная почта"
            className='login-input-field'
        />
        <input
            {...register('password', { required: true })}
            type="password"
            placeholder="Пароль"
            className='login-input-field'
        />
        {errors.email && errors.password && <p>Поля не должны быть пустыми</p>}
        <Link to="/password-recovery" className='recovery-password-link'>Забыли пароль?</Link>
        <button type="submit" className='form-button' disabled={isDisabled}>Войти</button>
        <Link to="/signup" className='signup-link'>Начать пользоваться</Link>
        </form>
    </div>
  );
}

export default LoginForm;
