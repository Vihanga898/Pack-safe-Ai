import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './login';
import Register from './Register';
import App from './App';
import { initializeApp, getApps } from 'firebase/app'; // Import the initializeApp and getApps functions
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Import specific functions from 'firebase/auth'

// Initialize Firebase
const firebaseConfig = {
  // Your Firebase config
};

// Check if Firebase app is already initialized
if (!getApps().length) {
  initializeApp(firebaseConfig);
}

const Root = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Listen for Firebase authentication state changes
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      setUser(user);
    });

    // Clean up the subscription
    return () => unsubscribe();
  }, []);

  const handleLogin = async (email, password) => {
    try {
      // Sign in the user with email and password
      await getAuth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error('Error signing in:', error.message);
    }
  };

  return (
    <Router>
      <Routes>
        {/* Route to the login page */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        {/* Route to the registration page */}
        <Route path="/register" element={<Register />} />
        {/* Conditional route to the App or Login page */}
        <Route
          path="/"
          element={user ? <App /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </Router>
  );
};

const root = createRoot(document.getElementById('root'));
root.render(<Root />);
