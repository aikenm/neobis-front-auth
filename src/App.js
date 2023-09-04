import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import SignupConfirmationForm from './components/SignupConfirmationForm';

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={ <LoginPage/>} />
          <Route path="/signup" element={<SignupPage/>} />
          <Route path="/confirmation" element={<SignupConfirmationForm/>} />
          <Route path="/profile" element={<ProfilePage/>} />
        </Routes>
    </BrowserRouter>
  );
};

export default App;
