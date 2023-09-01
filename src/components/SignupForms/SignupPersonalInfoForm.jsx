import React from 'react';
import { useForm } from 'react-hook-form';
import '../../styles/SignupPage/SignupPersonalInfoForm.css';
import logo from '../../images/logo.png';

function SignupPersonalInfo({ onNext }) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        const email = localStorage.getItem('signupEmail');
        if(!email) {
            console.error('Email not found!');
            return;
        }

        const userData = {
            email,
            ...data
        };

        localStorage.setItem('signupInfo', JSON.stringify(userData));

        if (typeof onNext === 'function') {
            onNext(data);
        }
    };

    return (
        <div className='signup-personal-form-wrapper'>
            <form onSubmit={handleSubmit(onSubmit)} className='signup-personal-form'>
                <img src={logo} alt="Logo" className='personal-logo-image' />
                <h2 className='signup-title'>Регистрация</h2>
                <input
                    {...register('name', {
                        required: "Введите ваше имя"
                    })}
                    type="text"
                    placeholder="Имя"
                    className={`personal-input-field ${errors.name ? 'error-border' : ''}`}
                />
                {errors.name && <p className='error-message'>{errors.name.message}</p>}

                <input
                    {...register('surname', {
                        required: "Введите вашу фамилию"
                    })}
                    type="text"
                    placeholder="Фамилия"
                    className={`personal-input-field ${errors.surname ? 'error-border' : ''}`}
                />
                {errors.surname && <p className='error-message'>{errors.surname.message}</p>}

                <input
                    {...register('dob', {
                        required: "Введите вашу дату рождения"
                    })}
                    type="date"
                    placeholder="Дата рождения"
                    className={`personal-input-field ${errors.dob ? 'error-border' : ''}`}
                />
                {errors.dob && <p className='error-message'>{errors.dob.message}</p>}

                <input
                    {...register('phoneNumber', {
                        required: "Введите ваш номер телефона",
                        pattern: {
                            value: /^[0-9]+$/, 
                            message: "Неверный номер телефона"
                        }
                    })}
                    type="tel"
                    placeholder="Номер телефона"
                    className={`personal-input-field ${errors.phoneNumber ? 'error-border' : ''}`}
                />
                {errors.phoneNumber && <p className='error-message'>{errors.phoneNumber.message}</p>}

                <button 
                    type="submit" 
                    className='form-button' 
                    disabled={errors.name || errors.surname || errors.dob || errors.phoneNumber}
                >
                    Далее
                </button>
            </form>
        </div>
    );
}

export default SignupPersonalInfo;
