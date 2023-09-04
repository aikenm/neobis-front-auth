import React, { useState} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import SignupPersonalInfo from './components/SignupForms/SignupPersonalInfoForm';

const App = () => {
  const [showSignupSuccess, setShowSignupSuccess] = useState(false);

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={ <LoginPage/>} />
          <Route path="/signup" element={<SignupPage/>} />
          <Route path="/signup-personal-info" element={<SignupPersonalInfo/>} />
        </Routes>
    </BrowserRouter>
  );
};

export default App;
