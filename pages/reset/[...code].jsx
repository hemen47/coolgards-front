import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { AlertContext, UserContext } from '../_app';
import { useRouter } from 'next/router';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ax } from '../../utils/axios';
import Head from 'next/head';

export default function Reset({ data, error }) {
  const router = useRouter();
  const { setError, setMessage } = useContext(AlertContext);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [sent, setSend] = useState(false);
  const [errorMode, setErrorMode] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  useEffect(() => {
    if (error) {
      setError(error);
      setErrorMode(true);
    }
  }, [error]);

  const handlePasswordChange = e => {
    const value = e.target.value;
    setPassword(value);

    if (value.length > 0 && value.length < 7) {
      setPasswordError('Password must be at least 7 characters long');
    } else {
      setPasswordError('');
    }

    if (confirmPassword && value !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
    } else if (confirmPassword) {
      setConfirmPasswordError('');
    }
  };

  const handleConfirmPasswordChange = e => {
    const value = e.target.value;
    setConfirmPassword(value);

    if (value !== password) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
    }
  };

  const validatePasswords = () => {
    let isValid = true;

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 7) {
      setPasswordError('Password must be at least 7 characters long');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (!confirmPassword) {
      setConfirmPasswordError('Please confirm your password');
      isValid = false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    } else {
      setConfirmPasswordError('');
    }

    return isValid;
  };

  const handleResetPassword = () => {
    if (validatePasswords()) {
      const model = {
        password,
        id: data.data.id,
        code: data.data.code,
      };
      ax.post('/api/reset', model)
        .then(res => {
          setMessage(res.data.message);
          setSend(true);
        })
        .catch(e => {
          setError(e.response?.data?.message || e.message);
          localStorage.removeItem('authenticated');
        });
    }
  };

  const handleRedirectToLogin = () => {
    router.push('/login');
  };

  const renderComponent = () => {
    if (errorMode) {
      return (
        <div className="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto h-16 w-16 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h2 className="mt-4 text-2xl font-bold text-gray-800">Your reset link has expired</h2>
          <p className="mt-2 text-gray-600">
            The password reset link you used is no longer valid. Please request a new link.
          </p>
          <div className="mt-6">
            <button
              onClick={handleRedirectToLogin}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Get Back to Login page
            </button>
          </div>
        </div>
      );
    }

    if (sent) {
      return (
        <div className="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto h-16 w-16 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <h2 className="mt-4 text-2xl font-bold text-gray-800">Password Changed Successfully</h2>
          <p className="mt-2 text-gray-600">
            Your password has been updated. You can now log in with your new password.
          </p>
          <div className="mt-6">
            <button
              onClick={handleRedirectToLogin}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Login Now
            </button>
          </div>
        </div>
      );
    }

    return (
      <div>
        <h2 className="text-center text-2xl font-bold text-gray-800">Create New Password</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Please enter your new password below
        </p>
        <div className="mt-6">
          <div className="mb-4">
            <TextField
              required
              value={password}
              label="New password"
              name="password"
              type="password"
              onChange={handlePasswordChange}
              fullWidth
              variant="outlined"
              placeholder="Enter your new password"
              error={!!passwordError}
              helperText={passwordError}
            />
          </div>
          <div className="mb-4">
            <TextField
              required
              value={confirmPassword}
              label="Confirm password"
              name="confirmPassword"
              type="password"
              onChange={handleConfirmPasswordChange}
              fullWidth
              variant="outlined"
              placeholder="Confirm your new password"
              error={!!confirmPasswordError}
              helperText={confirmPasswordError}
            />
          </div>
          <Button
            onClick={handleResetPassword}
            variant="contained"
            fullWidth
            disabled={!!passwordError || !!confirmPasswordError || !password || !confirmPassword}
            sx={{
              padding: '12px 0',
              backgroundColor: '#4F46E5',
              '&:hover': {
                backgroundColor: '#4338CA',
              },
              '&.Mui-disabled': {
                backgroundColor: '#9CA3AF',
                color: '#F3F4F6',
              },
            }}
          >
            Change Password
          </Button>
          <div className="mt-4 text-center">
            <a
              href="#"
              onClick={handleRedirectToLogin}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Back to login
            </a>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>Reset Password | Coolgards</title>
        <meta name="description" content="Create a new password for your account" />
        <meta name="keywords" content="password reset, new password, account recovery" />
        <meta property="og:title" content="Reset Your Password" />
        <meta
          property="og:description"
          content="Create a new password and regain access to your account"
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Reset Your Password" />
        <meta
          name="twitter:description"
          content="Create a new password and regain access to your account"
        />
      </Head>

      <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 py-6">
            <div className="flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
          </div>

          <div className="p-8">{renderComponent()}</div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const res = await fetch(
      `${process.env.BASE_URL}/reset/${context.params.code[0]}/${context.params.code[1]}`
    );
    if (!res.ok) {
      return { props: { error: res.statusText } };
    } else {
      const data = await res.json();
      return { props: { data } };
    }
  } catch (err) {
    return { props: { error: err.response?.data?.message || err.message } };
  }
}
