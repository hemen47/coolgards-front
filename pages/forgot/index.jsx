import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { AlertContext, UserContext } from '../_app';
import { useRouter } from 'next/router';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ax } from '../../utils/axios';
import Head from 'next/head';

export default function Forgot({ data }) {
  const router = useRouter();
  const { setError, setMessage } = useContext(AlertContext);

  const [email, setEmail] = useState('');
  const [sent, setSend] = useState(false);

  const handleChange = e => {
    setEmail(e.target.value);
  };

  const handleResetPassword = () => {
    if (!email) {
      setMessage('Please enter a valid email');
    } else {
      ax.post('/api/forgot', { email })
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

  return (
    <>
      <Head>
        <title>Reset Password | Your Store Name</title>
        <meta name="description" content="Reset your password to regain access to your account" />
        <meta name="keywords" content="password reset, forgot password, account recovery" />
        <meta property="og:title" content="Reset Your Password" />
        <meta
          property="og:description"
          content="Securely reset your password and regain access to your account"
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Reset Your Password" />
        <meta
          name="twitter:description"
          content="Securely reset your password and regain access to your account"
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

          <div className="p-8">
            {sent ? (
              <div className="text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto h-16 w-16 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <h2 className="mt-6 text-2xl font-bold text-gray-800">Check Your Email</h2>
                <p className="mt-2 text-gray-600">
                  We've sent a password reset link to your email address. Please check your inbox
                  and follow the instructions.
                </p>
                <div className="mt-6">
                  <button
                    onClick={() => router.push('/login')}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Return to Login
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h2 className="text-center text-2xl font-bold text-gray-800">
                  Reset Your Password
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                  Enter your email address and we'll send you a link to reset your password.
                </p>
                <div className="mt-6">
                  <div className="mb-4">
                    <TextField
                      required
                      value={email}
                      label="Email address"
                      name="email"
                      type="email"
                      onChange={handleChange}
                      fullWidth
                      variant="outlined"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <Button
                    onClick={handleResetPassword}
                    variant="contained"
                    fullWidth
                    sx={{
                      padding: '12px 0',
                      backgroundColor: '#4F46E5',
                      '&:hover': {
                        backgroundColor: '#4338CA',
                      },
                    }}
                  >
                    Send Reset Link
                  </Button>
                  <div className="mt-4 text-center">
                    <a
                      href="#"
                      onClick={() => router.push('/login')}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Back to login
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const res = await fetch(`${process.env.BASE_URL}/reset-password/${context.params.slug}`);
    const data = await res.json();

    return { props: { data } };
  } catch (err) {
    return { props: { error: err.response?.data?.message || err.message } };
  }
}
