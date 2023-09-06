import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ConfirmationPage from './pages/ConfirmationPage';
import ProfilePage from './pages/ProfilePage';


const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/login" element={ <LoginPage/>} />
          <Route path="/signup" element={<SignupPage/>} />
          <Route path="/confirmation" element={<ConfirmationPage/>} />
          <Route path="/profile" element={<ProfilePage/>} />
        </Routes>
    </BrowserRouter>
  );
};

export default App;
