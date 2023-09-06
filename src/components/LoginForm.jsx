import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import '../styles/image_block.css';
import '../styles/forms.css';
import '../styles/core.css';
import logo from '../images/logo.jpg';
import eyeOpen from '../images/eye-open.png';
import eyeClosed from '../images/eye-closed.png';

function LoginForm() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [passwordVisible, setPasswordVisible] = useState(true);
    const [buttonText, setButtonText] = useState("Войти");
    const [showTooltip, setShowTooltip] = useState(false);
    const [loginFailed, setLoginFailed] = useState(false);
    
    const watchedLogin = watch('login', ''); 
    const watchedPassword = watch('password', '');

    const togglePasswordVisibility = () => {
        setPasswordVisible(prevVisible => !prevVisible);
    };

    const handleLoginFailure = () => {
        setLoginFailed(true);
        setShowTooltip(true);
    
        setTimeout(() => {
            const tooltipElem = document.querySelector('.tooltip');
            if (tooltipElem) {
                tooltipElem.classList.remove('show');
                setTimeout(() => {
                    setShowTooltip(false);
                }, 300); 
            }
        }, 5000); 

        setButtonText("Повторите через 10");
        let seconds = 10;

        const interval = setInterval(() => {
            seconds--;
            setButtonText(`Повторите через ${seconds}`);

            if (seconds <= 0) {
                clearInterval(interval);
                setLoginFailed(false);
                setButtonText("Войти");
            }
        }, 1000); 
    };

    const onSubmit = (data) => {
        console.log(data);
        // TODO: Check login credentials here
        // Simulating a failed login for now
        handleLoginFailure();
    };

    const isFormInvalid = !watchedLogin || !watchedPassword || errors.login || errors.password;

    return (
      <div className='main'>
      <div className='image-block-wrapper'>
          <img src={logo} alt="" className='logo-image' />
          <h1 className='image-block-title'>Lordby</h1>
          <h3 className='image-block-subtitle'>Твой личный репетитор</h3>
      </div>
      <div className='login-form-wrapper'>
          <form onSubmit={handleSubmit(onSubmit)} className='login-form'>
              <h3 className='form-title'>Вэлком бэк!</h3>
              <input
                  {...register('login', { required: true })} 
                  type="text" 
                  placeholder="Введи туда-сюда логин"
                  className='input-field'
              />
              <div className="password-input-wrapper">
                  <input
                      {...register('password', { required: true })}
                      type={passwordVisible ? "text" : "password"}
                      placeholder="Пароль (тоже введи)"
                      className='password-input-field'
                  />
                  <img
                      onClick={togglePasswordVisibility}
                      src={passwordVisible ? eyeOpen : eyeClosed}
                      alt="Toggle Password"
                      className="toggle-password-visibility"
                  />
              </div>
                  {errors.login && errors.password && <p>Поля не должны быть пустыми</p>}
                  {showTooltip && <div className="tooltip show">Неверный логин или пароль</div>}
                  <button 
                      type="submit" 
                      className='login-form-button form-button' 
                      disabled={isFormInvalid || loginFailed}
                  >
                    {buttonText}
                  </button>
                <Link to="/signup" className='signup-link'>У меня еще нет аккаунта</Link>
              </form>
          </div>
      </div>
    );
}

export default LoginForm;
