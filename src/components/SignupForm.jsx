import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {
    setPasswordVisibility,
    setCriteria,
    togglePasswordRepeatFocused,
    resetUserState
} from '../store/userSlice';  
import '../styles/image_block.css';
import '../styles/forms.css';
import '../styles/core.css';
import logo from '../images/logo.svg';
import arrow from '../images/arrow.svg';
import eyeOpen from '../images/eye-open.png';
import eyeClosed from '../images/eye-closed.png';

function SignupForm() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();
    
    const password = watch("password", "");
    const repeatPassword = watch("password_repeat", "");
    
    const {
        criteria,
        passwordVisible,
        passwordRepeatFocused
    } = useSelector(state => state.user);
    const dispatch = useDispatch();
    
    const allCriteriaMet = Object.values(criteria).every(value => value === true);

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('https://neobis-project.up.railway.app/api/auth/register', {
                login: data.login,
                email: data.email,
                password: data.password
            });

            if (response.status === 200) {
                console.log(response);
                const conToken = response.data.token;  
                console.log(response.data.token);
                localStorage.setItem('conToken', conToken);
                localStorage.setItem('userEmail', data.email);
                
                navigate('/confirmation');
            }
        } catch (error) {
            console.error("Error registering user:", error);
        }
    };

    useEffect(() => {
        dispatch(setCriteria({
            length: password.length >= 8 && password.length <= 15,
            hasUppercase: /[A-Z]/.test(password),
            hasNumber: /[0-9]/.test(password),
            hasSpecialChar: /[!@#$%^&*()_+={}};`~':"\\/[|,.<>?-]+/.test(password)
        }));
    }, [password, dispatch]);
    
    useEffect(() => {
        return () => {
            dispatch(resetUserState());
        };
    }, [dispatch]);

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
                            required: "Введите email", 
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: "Неправильный email" 
                            }
                        })}
                        type="text"
                        placeholder="Введите адрес почты"
                        className='input-field'
                    />
                    {errors.email && <p className='error-message'>{errors.email.message}</p>}
                    <input 
                        {...register('login', { required: true })}
                        type="text"
                        placeholder="Придумайте логин"
                        className='input-field'
                    />
                    {errors.login && <p className='error-message'>Введите логин</p>}
                    <div className="password-input-wrapper">
                        <input {...register('password', { 
                                minLength: {
                                    value: 8,
                                },
                                maxLength: {
                                    value: 15,
                                }
                            })} 
                            type={passwordVisible ? "text" : "password"} 
                            style={{
                                color: (!allCriteriaMet && (passwordRepeatFocused || repeatPassword)) ? '#EC0000' : 'black',
                            }}
                            placeholder="Придумайте пароль" 
                            className='password-input-field'
                        />
                        <img 
                            onClick={() => dispatch(setPasswordVisibility(!passwordVisible))} 
                            src={passwordVisible ? eyeOpen : eyeClosed} 
                            alt="Toggle Password" 
                            className="toggle-password-visibility"
                        />
                    </div>
                    <div className="password-criteria">
                        <p className={criteria.length ? 'valid-text' : (!allCriteriaMet && (passwordRepeatFocused || repeatPassword)) ? 'invalid-text' : ''}><span className='point'>•</span>От 8 до 15 символов</p>
                        <p className={criteria.hasUppercase ? 'valid-text' : (!allCriteriaMet && (passwordRepeatFocused || repeatPassword)) ? 'invalid-text' : ''}><span className='point'>•</span>Строчные и прописные буквы</p>
                        <p className={criteria.hasNumber ? 'valid-text' : (!allCriteriaMet && (passwordRepeatFocused || repeatPassword)) ? 'invalid-text' : ''}><span className='point'>•</span>Минимум 1 цифра</p>
                        <p className={criteria.hasSpecialChar ? 'valid-text' : (!allCriteriaMet && (passwordRepeatFocused || repeatPassword)) ? 'invalid-text' : ''}><span className='point'>•</span>Минимум 1 спецсимвол (!, ", #, $...)</p>
                    </div>
                    <div className="password-input-wrapper">
                        <input 
                            {...register('password_repeat', {
                                required: "Повторите пароль",
                                validate: value => 
                                    value === password || "Пароли не совпадают"
                            })} 
                            type={passwordVisible ? "text" : "password"}
                            placeholder="Повторите пароль" 
                            className='password-input-field'
                            onFocus={() => dispatch(togglePasswordRepeatFocused(true))}
                            onBlur={() => dispatch(togglePasswordRepeatFocused(false))}
                            style={{
                                color: errors.password_repeat ? '#EC0000' : 'black',
                            }}
                        />
                        <img 
                            onClick={() => dispatch(setPasswordVisibility(!passwordVisible))} 
                            src={passwordVisible ? eyeOpen : eyeClosed} 
                            alt="Toggle Password" 
                            className="toggle-password-visibility"
                        />
                    </div>
                    {errors.password_repeat && <p className='error-message'>{errors.password_repeat.message}</p>}
                    <button type="submit" className='signup-form-button form-button' disabled={!allCriteriaMet}>Далее</button>
                </form>
            </div>
        </div>
    );    
}

export default SignupForm;
