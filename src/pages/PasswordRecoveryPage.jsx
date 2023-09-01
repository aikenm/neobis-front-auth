import { useLocation } from 'react-router-dom';
import React, {useState} from 'react';
import RecoveryEmailForm from '../components/RecoveryForms/RecoveryEmailForm';
import RecoveryPasswordForm from '../components/RecoveryForms/RecoveryPasswordForm';

// function useQuery() {
//     return new URLSearchParams(useLocation().search);
// }

// function PasswordRecoveryPage() {
//     const query = useQuery();
//     const token = query.get('token');

//     if (token) {
//         return <RecoveryPasswordForm />;
//     } else {
//         return <RecoveryEmailForm />;
//     }
// }

// export default PasswordRecoveryPage;


function PasswordRecoveryPage() {
    const [step, setStep] = useState('newPassword');

    return (
        <div>
            {step === 'email' && <RecoveryEmailForm onNext={() => setStep('newPassword')} />}
            {step === 'newPassword' && <RecoveryPasswordForm />} 
        </div>
    );
}

export default PasswordRecoveryPage;

