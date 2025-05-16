import * as React from 'react';
import { useContext } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from 'next/link';
import { ax } from '../../utils/axios';
import { AlertContext, UserContext } from '../_app';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Signup() {
  const router = useRouter();
  const { setError, setMessage } = useContext(AlertContext);
  const { setUser } = useContext(UserContext);

  const handleSubmit = e => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const model = {
      fullName: data.get('fullName'),
      email: data.get('email'),
      password: data.get('password'),
    };
    ax.post('/api/users/', model)
      .then(res => {
        setUser(res.data.data);
        setMessage('welcome to coolgards ;)');
        localStorage.setItem('authenticated', true);
        router.push('/');
      })
      .catch(e => {
        setError(e.response?.data?.message || e.message);
      });
  };

  return (
    <>
      <Head>
        <title>Create Account | Your Store Name</title>
        <meta
          name="description"
          content="Sign up for an account to access exclusive features and benefits"
        />
        <meta name="keywords" content="sign up, register, create account, join" />
        <meta property="og:title" content="Create Your Account" />
        <meta
          property="og:description"
          content="Join our community and enjoy exclusive benefits by creating your account"
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Create Your Account" />
        <meta
          name="twitter:description"
          content="Join our community and enjoy exclusive benefits by creating your account"
        />
      </Head>

      <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 py-6">
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
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </div>
          </div>

          <div className="p-8">
            <h2 className="text-center text-2xl font-bold text-gray-800">Create your account</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Join our community and enjoy exclusive benefits
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Full Name"
                  name="fullName"
                  autoComplete="name"
                  autoFocus
                  variant="outlined"
                />
              </div>

              <div>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  variant="outlined"
                />
              </div>

              <div>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  variant="outlined"
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    padding: '12px 0',
                    backgroundColor: '#6D28D9', // Purple color to differentiate from login
                    '&:hover': {
                      backgroundColor: '#5B21B6',
                    },
                  }}
                >
                  Create Account
                </Button>
              </div>

              <div className="flex items-center justify-between mt-4">
                <Link
                  href="/login"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Already have an account?
                </Link>
                <Link
                  href="/forgot"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </Link>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                By signing up, you agree to our
                <Link href="/privacy-policy" className="text-indigo-600 hover:text-indigo-500">
                  {' '}
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
