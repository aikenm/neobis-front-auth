import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SignupEmailForm from '../components/SignupForms/SignupEmailForm';
import SignupPersonalInfoForm from '../components/SignupForms/SignupPersonalInfoForm';
import SignupPasswordForm from '../components/SignupForms/SignupPasswordForm'; 

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function SignupPage() {
    const query = useQuery();
    const token = query.get('token');
    
    // const [step, setStep] = useState(token ? 'personalInfo' : 'email');

    const [step, setStep] = useState('personalInfo');

    useEffect(() => {
        // Verify token with the server, if needed. 
        // If it's invalid, redirect the user or set the state back to 'email'
    }, [token]);

    return (
        <div>
            {step === 'email' && <SignupEmailForm />}
            {step === 'personalInfo' && <SignupPersonalInfoForm onNext={() => setStep('password')} />}
            {step === 'password' && <SignupPasswordForm />}
        </div>
    );
}

export default SignupPage;
