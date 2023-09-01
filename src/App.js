import React, { useState} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import PasswordRecoveryPage from './pages/PasswordRecoveryPage';
import SignupPage from './pages/SignupPage';

const App = () => {
  const [showSignupSuccess, setShowSignupSuccess] = useState(false);

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignupPage/>} />
          <Route path="/password-recovery" element={<PasswordRecoveryPage/>} />
          <Route path="/" element={ <LoginPage/>} />
        </Routes>
    </BrowserRouter>
  );
};

export default App;
