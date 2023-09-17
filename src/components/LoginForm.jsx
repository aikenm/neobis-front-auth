import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { 
  setPasswordVisibility, 
  setButtonText, 
  setShowTooltip, 
  setLoginFailed, 
  setAuthToken 
} from '../store/userSlice';
import logo from '../images/logo.svg';
import eyeOpen from '../images/eye-open.png';
import eyeClosed from '../images/eye-closed.png';
import '../styles/image_block.css';
import '../styles/forms.css';
import '../styles/core.css';

function LoginForm() {
  const dispatch = useDispatch();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const passwordVisible = useSelector(state => state.user.passwordVisible);
  const buttonText = useSelector(state => state.user.buttonText);
  const showTooltip = useSelector(state => state.user.showTooltip);
  const loginFailed = useSelector(state => state.user.loginFailed);

  const watchedLogin = watch('login', '');
  const watchedPassword = watch('password', '');

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    dispatch(setPasswordVisibility(!passwordVisible));  
  };

  const handleLoginFailure = () => {
    dispatch(setLoginFailed(true));
    dispatch(setShowTooltip(true));

    setTimeout(() => {
        const tooltipElem = document.querySelector('.tooltip');
        if (tooltipElem) {
            tooltipElem.classList.remove('show');
            setTimeout(() => {
                dispatch(setShowTooltip(false)); 
            }, 300); 
        }
    }, 5000); 

    dispatch(setButtonText("Повторите через 10"));
    let seconds = 10;

    const interval = setInterval(() => {
        seconds--;
        dispatch(setButtonText(`Повторите через ${seconds}`)); 

        if (seconds <= 0) {
            clearInterval(interval);
            dispatch(setLoginFailed(false));
            dispatch(setButtonText("Войти")); 
        }
    }, 1000); 
};

    const isFormInvalid = !watchedLogin || !watchedPassword || errors.login || errors.password;

    const onSubmit = async (data) => {
      try {
          const response = await axios.post("https://neobis-project.up.railway.app/api/auth/log", {
              login: data.login,
              password: data.password
          }, {
              headers: {
                  'accept': '*/*',
                  'Content-Type': 'application/json'
              }
          });
  
          if (response.data && response.data.token) {
            dispatch(setAuthToken(response.data.token)); 
          }
      
          console.log(localStorage);
          navigate('/profile');
  
        } catch (error) {
          console.error("Error during login:", error.message || error);
          if (error.response && error.response.status) {
              handleLoginFailure();
          }
      }
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
                  placeholder="Введите логин"
                  className='input-field'
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
