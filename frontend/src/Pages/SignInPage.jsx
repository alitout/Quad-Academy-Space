import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../Components/SignInPage/LoginForm';
import Loading from '../Components/loading';
import { VERIFY_TOKEN } from '../externalApi/ExternalUrls';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';

function SignInPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const auth = useAuth();

  useEffect(() => {
    const verifyToken = async () => {
      // No token → show login form
      if (!auth.bearerToken) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.post(
          VERIFY_TOKEN,
          { token: auth.bearerToken },
          { headers: { 'Content-Type': 'application/json' } }
        );

        const data = res.data;

        if (data.valid) {
          // Valid token → go to dashboard
          navigate('/dashboard/profile');
        } else {
          // Invalid/expired token → clear it via context
          auth.logout();
        }
      } catch (err) {
        console.error('Error verifying token:', err);
        auth.logout();
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [auth, navigate]);

  // Show loader while checking token
  if (loading) {
    return <Loading />;
  }

  // Show login form when not authenticated
  return (
    <div className="SignInPage d-flex justify-content-center align-items-center">
      <LoginForm />
    </div>
  );
}

export default SignInPage;
