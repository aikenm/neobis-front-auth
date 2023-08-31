import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import '../styles/LoginPage/LoginPage.css';
import logo from '../images/logo.png';


function LoginForm() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    
    console.log(data);
  };

  return (
    <div className='login-form-wrapper'>
        <form onSubmit={handleSubmit(onSubmit)} className='login-form'>
            <img src={logo} alt="" className='logo-image'/>
        <input
            {...register('email')}
            type="email"
            placeholder="Электронная почта"
            className='input-field'
        />
        <input
            {...register('password')}
            type="password"
            placeholder="Пароль"
            className='input-field'
        />
        <Link to="/password-recovery" className='recovery-password-link'>Забыли пароль?</Link>
        <button type="submit" className='form-button'>Войти</button>
        <Link to="/signup" className='signup-link'>Начать пользоваться</Link>
        </form>
    </div>
  );
}

export default LoginForm;
