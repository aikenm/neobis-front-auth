import React from 'react';
//import { useLocation } from 'react-router-dom';
import SignupEmailForm from '../components/SignupForms/SignupEmailForm';
import SignupPersonalInfoForm from '../components/SignupForms/SignupPersonalInfoForm';

// function useQuery() {
//     return new URLSearchParams(useLocation().search);
// }

function SignupPage() {
    //const query = useQuery();
    // const step = query.get("step");
    const step = "personalInfo";

    return (
        <div>
            {step === 'personalInfo' ? <SignupPersonalInfoForm /> : <SignupEmailForm />}
        </div>
    );
}

export default SignupPage;
