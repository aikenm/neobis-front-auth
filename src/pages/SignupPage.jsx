import React, { useState } from 'react';
import SignupEmailForm from '../components/SignupForms/SignupEmailForm';
import SignupPersonalInfoForm from '../components/SignupForms/SignupPersonalInfoForm';
import SignupPasswordForm from '../components/SignupForms/SignupPasswordForm'; 

function SignupPage() {
    const [step, setStep] = useState('password');

    return (
        <div>
            {step === 'email' && <SignupEmailForm onNext={() => setStep('personalInfo')} />}
            {step === 'personalInfo' && <SignupPersonalInfoForm onNext={() => setStep('password')} />}
            {step === 'password' && <SignupPasswordForm />}
        </div>
    );
}

export default SignupPage;
