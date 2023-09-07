import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
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

    const navigate = useNavigate();

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

    const isFormInvalid = !watchedLogin || !watchedPassword || errors.login || errors.password;


    const onSubmit = (data) => {
      axios.post("https://neobis-project.up.railway.app/api/auth/log", {
          login: data.login,    
          password: data.password
      }, {
          headers: {
              'accept': '*/*',
              'Content-Type': 'application/json'
          }
      })
      .then(response => {
          console.log(response.data);
          navigate('/profile');
      })
      .catch(error => {
          if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                
                if (error.response.status) {
                    handleLoginFailure();
                }
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in Node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
      });
    };

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
                  {errors.login && errors.password && <p className='error-message'>Поля не должны быть пустыми</p>}
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
