import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../Components/SignInPage/LoginForm';
import Loading from '../Components/loading';
import { VERIFY_TOKEN } from '../externalApi/ExternalUrls';
import axios from 'axios';

function SignInPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [bearerToken, setBearerToken] = useState(localStorage.getItem('bearerToken') || null);

  // Function to handle successful login
  const handleLoginSuccess = (token) => {
    localStorage.setItem('bearerToken', token);
    setBearerToken(token);
    navigate('/dashboard/profile');
  };

  useEffect(() => {
    const verifyToken = async () => {
      // No token → show login form
      if (!bearerToken) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.post(
          VERIFY_TOKEN,
          { token: bearerToken },
          { headers: { 'Content-Type': 'application/json' } }
        );


        const data = res.data;

        if (data.valid) {
          // Valid token → go to dashboard
          navigate('/dashboard/profile');
        } else {
          // Invalid/expired token → clear it
          localStorage.removeItem('bearerToken');
          setBearerToken(null);
        }
      } catch (err) {
        console.error('Error verifying token:', err);
        localStorage.removeItem('bearerToken');
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [bearerToken, navigate]);

  // Show loader while checking token
  if (loading) {
    return <Loading />;
  }

  // Show login form when not authenticated
  return (
    <div className="SignInPage d-flex justify-content-center align-items-center">
      <LoginForm onLoginSuccess={handleLoginSuccess} />
    </div>
  );
}

export default SignInPage;
