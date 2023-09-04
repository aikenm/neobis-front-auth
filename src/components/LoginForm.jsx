import React, { useState} from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import '../styles/LoginPage/LoginPage.css';
import logo from '../images/logo.png';
import eyeOpen from '../images/eye-open.png';
import eyeClosed from '../images/eye-closed.png';

function LoginForm() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const watchedEmail = watch('email', '');
  const watchedPassword = watch('password', '');

  const [passwordVisible, setPasswordVisible] = useState(true);

  const togglePasswordVisibility = () => {
    setPasswordVisible(prevVisible => !prevVisible);
  };

  const onSubmit = (data) => {
    console.log(data);

    // TODO
  };

  const isDisabled = !watchedEmail || !watchedPassword || errors.email || errors.password;

  return (
    <div className='main'>
      <div className='image-block-wrapper'>
        <img src={logo} alt="" className='logo-image'/>
        <h1 className='image-block-title'>Lordby</h1>
        <h3 className='image-block-subtitle'>Твой личный репетитор</h3>
      </div>
      <div className='login-form-wrapper'>
          <form onSubmit={handleSubmit(onSubmit)} className='login-form'>
          <h3 className='form-title'>Вэлком бэк!</h3>
          <input
              {...register('email', { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i })}
              type="email"
              placeholder="Электронная почта"
              className='login-input-field'
          />
          <div className="password-input-wrapper">
            <input
                {...register('password', { required: true })}
                type={passwordVisible ? "text" : "password"}
                placeholder="Пароль"
                className='password-input-field'
            />
            <img 
                    onClick={togglePasswordVisibility} 
                    src={passwordVisible ? eyeOpen : eyeClosed} 
                    alt="Toggle Password" 
                    className="toggle-password-visibility"
            />
          </div>
          {errors.email && errors.password && <p>Поля не должны быть пустыми</p>}
          <button type="submit" className='form-button' disabled={isDisabled}>Войти</button>
          <Link to="/signup" className='signup-link'>Начать пользоваться</Link>
          </form>
      </div>
    </div>
  );
}

export default LoginForm;
