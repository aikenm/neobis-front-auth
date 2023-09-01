import React, { useEffect } from 'react';
import LoginForm from '../components/LoginForm';

function LoginPage({ showSignupSuccess, setShowSignupSuccess }) {

  useEffect(() => {
    if (showSignupSuccess) {
        const timer = setTimeout(() => {
            setShowSignupSuccess(false);
        }, 5000);
        return () => clearTimeout(timer);
    }
}, [showSignupSuccess, setShowSignupSuccess]);


    return (
        <div>
            {showSignupSuccess && <p>You signed up, now login.</p>}
            <LoginForm />
        </div>
    );
}

export default LoginPage;
