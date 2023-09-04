import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SignupForm from '../components/SignupForm';
import SignupConfirmationForm from '../components/SignupConfirmationForm';
import ProfileForm from '../components/ProfileForm'; 

function SignupPage() {
    const [step, setStep] = useState('signup');

    return (
        <div>
            {step === 'signup' && <SignupForm />}
            {step === 'confirmation' && <SignupConfirmationForm onNext={() => setStep('profile')} />}
            {step === 'profile' && <ProfileForm />}
        </div>
    );
}

export default SignupPage;
