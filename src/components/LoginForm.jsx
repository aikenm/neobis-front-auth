import React, { useState } from 'react';
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

    const watchedLogin = watch('login', ''); 
    const watchedPassword = watch('password', '');

    const [passwordVisible, setPasswordVisible] = useState(true);

    const togglePasswordVisibility = () => {
        setPasswordVisible(prevVisible => !prevVisible);
    };

    const onSubmit = (data) => {
        console.log(data);
        // TODO
    };

    const isDisabled = !watchedLogin || !watchedPassword || errors.login || errors.password;

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
                    <button type="submit" className='login-form-button form-button' disabled={isDisabled}>Войти</button>
                    <Link to="/signup" className='signup-link'>У меня еще нет аккаунта</Link>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;
