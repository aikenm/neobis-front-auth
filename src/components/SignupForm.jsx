import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/image_block.css';
import '../styles/forms.css';
import '../styles/core.css';
import logo from '../images/logo.jpg';
import arrow from "../images/arrow.jpg";
import eyeOpen from '../images/eye-open.png';
import eyeClosed from '../images/eye-closed.png';

function SignupPasswordForm() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const password = watch("password", "");

    const [criteria, setCriteria] = useState({
        length: false,
        hasUppercase: false,
        hasNumber: false,
        hasSpecialChar: false
    });

    const [passwordVisible, setPasswordVisible] = useState(true);

    const togglePasswordVisibility = () => {
        setPasswordVisible(prevVisible => !prevVisible);
    };

    const allCriteriaMet = Object.values(criteria).every(value => value === true);

    useEffect(() => {
        setCriteria({
            length: password.length >= 8 && password.length <= 15,
            hasUppercase: /[A-Z]/.test(password),
            hasNumber: /[0-9]/.test(password),
            hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password),
        });
    }, [password]);

    const onSubmit = (data) => {
        console.log(data);
        // TODO: Send the data to the API
        navigate('/confirmation');
    };

    return (
        <div className='main'>
            <div className='image-block-wrapper'>
                <img src={logo} alt="" className='logo-image' />
                <h1 className='image-block-title'>Lordby</h1>
                <h3 className='image-block-subtitle'>Твой личный репетитор</h3>
            </div>
            <div className='signup-form-wrapper'>
                <Link to="/" className='back-button'>
                    <img src={arrow} alt="back" className='arrow-icon'/>
                    <span className='arrow-text'>Назад</span>
                </Link>
                <form onSubmit={handleSubmit(onSubmit)} className='signup-form'>                    
                    <h2 className='form-title'>Создать аккаунт<br />Lorby</h2>
                    <input 
                        {...register('email', { 
                            required: true, 
                            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i 
                        })}
                        type="email"
                        placeholder="Email"
                        className='input-field'
                    />
                    {errors.email && <p className='email-error-message'>Неправильный email</p>}
                    <input 
                        {...register('login', { required: true })}
                        type="text"
                        placeholder="Логин"
                        className='input-field'
                    />
                    {errors.login && <p className='login-error-message'>Введите логин</p>}
                    <div className="password-input-wrapper">
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
                            type={passwordVisible ? "text" : "password"} 
                            placeholder="Придумайте пароль" 
                            className='password-input-field'
                        />
                        <img 
                            onClick={togglePasswordVisibility} 
                            src={passwordVisible ? eyeOpen : eyeClosed} 
                            alt="Toggle Password" 
                            className="toggle-password-visibility"
                        />
                    </div>
                    {errors.password && <p className='password-error-message'>{errors.password.message}</p>}
                    <div className="password-criteria">
                        <p className={criteria.length ? 'valid-text' : ''}><span className='point'>•</span>От 8 до 15 символов</p>
                        <p className={criteria.hasUppercase ? 'valid-text' : ''}><span className='point'>•</span>Строчные и прописные буквы</p>
                        <p className={criteria.hasNumber ? 'valid-text' : ''}><span className='point'>•</span>Минимум 1 цифра</p>
                        <p className={criteria.hasSpecialChar ? 'valid-text' : ''}><span className='point'>•</span>Минимум 1 спецсимвол (!, ", #, $...)</p>
                    </div>
                    <div className="password-input-wrapper">
                        <input {...register('password_repeat', {
                                required: true,
                                validate: value => value === password || "Пароли не совпадают"
                            })} 
                            type={passwordVisible ? "text" : "password"}
                            placeholder="Повторите пароль" 
                            className='password-input-field'
                        />
                        <img 
                            onClick={togglePasswordVisibility} 
                            src={passwordVisible ? eyeOpen : eyeClosed} 
                            alt="Toggle Password" 
                            className="toggle-password-visibility"
                        />
                    </div>
                    {errors.password_repeat && <p className='password-error-message'>{errors.password_repeat.message}</p>}
                    <button type="submit" className='signup-form-button form-button' disabled={!allCriteriaMet}>Далее</button>
                </form>
            </div>
        </div>
    );
}

export default SignupPasswordForm;
