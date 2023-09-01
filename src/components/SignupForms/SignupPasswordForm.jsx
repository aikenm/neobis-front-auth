import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import '../../styles/SignupPage/SignupPasswordForm.css';
import logo from '../../images/logo.png';
import arrow from "../../images/arrow.png"


function SignupPasswordForm() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const password = watch("password", "");
  const passwordRepeat = watch("password_repeat", "");

  const [criteria, setCriteria] = useState({
    hasUppercase: false,
    hasNumber: false,
    hasSpecialChar: false,
    passwordMatch: false
  });

  const allCriteriaMet = Object.values(criteria).every(value => value === true);

  useEffect(() => {
    setCriteria({
      hasUppercase: /[A-Z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[^A-Za-z0-9\s]/.test(password),
      passwordMatch: password && passwordRepeat && password === passwordRepeat
    });
}, [password, passwordRepeat]);




  const onSubmit = (data) => {
    const userInfo = JSON.parse(localStorage.getItem("signupInfo"));
    const payload = { ...userInfo, password: data.password };
    console.log(payload);
  };

  return (
    <div className='password-form-wrapper'>
        <Link to="/" className='back-button'>
            <img src={arrow} alt="Back to personal info" className='arrow-icon'/>
        </Link>
        <form onSubmit={handleSubmit(onSubmit)} className='password-form'>
            <img src={logo} alt="" className='logo-image'/>
            
            <h2 className='password-title'>Регистрация</h2>

            <input {...register('password', { 
                    required: true,
                    minLength: {
                        value: 8,
                        message: "Пароль должен содержать не менее 8 символов"
                    },
                    maxLength: {
                        value: 15,
                        message: "Пароль должен содержать не более 15 символов"
                    }
                })} 
                type="password" 
                placeholder="Придумайте пароль" 
                className='password-input-field'
            />
{errors.password && <p className='password-error-message'>{errors.password.message}</p>}

            <input {...register('password_repeat', {
                required: true,
                validate: value => value === password || "Пароли не совпадают"
                })} type="password" 
                placeholder="Повторите пароль" 
                className='password-input-field'/>
            {errors.password_repeat && <p className='password-error-message'>{errors.password_repeat.message}</p>}

            <div className="password-criteria">
                <p className={criteria.hasUppercase ? 'valid-text' : ''}><b className='point'>●</b>Заглавная буква</p>
                <p className={criteria.hasNumber ? 'valid-text' : ''}><b className='point'>●</b>Цифры</p>
                <p className={criteria.hasSpecialChar ? 'valid-text' : ''}><b className='point'>●</b>Специальные символы</p>
                <p className={criteria.passwordMatch ? 'valid-text' : ''}><b className='point'>●</b>Совпадение пароля</p>
            </div>

            <button type="submit" className='form-button' disabled={!allCriteriaMet}>Регистрация</button>
        </form>
    </div>
  );
}

export default SignupPasswordForm;
