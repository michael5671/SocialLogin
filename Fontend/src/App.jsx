import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google'
import SignInForm from '../src/pages/SignInForm/SignInForm';
import SignUpForm from '../src/pages/SignUpForm/SignUpForm';
import UserProfile from './pages/UserProfile/UserProfile';
import './App.css'

function App() {
  return (
    <GoogleOAuthProvider clientId='8636757694-1n9qbo7b0iqp12ji9c0ebgvu13p49k63.apps.googleusercontent.com'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignInForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
