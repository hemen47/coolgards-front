import * as React from 'react';
import { useContext } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from 'next/link';
import { ax } from '../../utils/axios';
import { AlertContext, UserContext } from '../_app';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Login() {
  const router = useRouter();
  const { setError, setMessage } = useContext(AlertContext);
  const { setUser } = useContext(UserContext);

  const handleSubmit = e => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const model = {
      email: data.get('email'),
      password: data.get('password'),
    };
    ax.post('/api/users/login', model)
      .then(res => {
        setUser(res.data.data);
        setMessage('welcome back ;)');
        localStorage.setItem('authenticated', true);
        if (router.query.hasOwnProperty('redirect')) {
          router.push(router.query.redirect);
        } else {
          router.push('/');
        }
      })
      .catch(e => {
        setError(e.response?.data?.message || e.message);
      });
  };

  return (
    <>
      <Head>
        <title>Sign In | Your Store Name</title>
        <meta
          name="description"
          content="Sign in to your account to access your profile and orders"
        />
        <meta name="keywords" content="login, sign in, account access" />
        <meta property="og:title" content="Sign In to Your Account" />
        <meta
          property="og:description"
          content="Access your profile, orders, and more by signing in to your account"
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Sign In to Your Account" />
        <meta
          name="twitter:description"
          content="Access your profile, orders, and more by signing in to your account"
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
                  d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                />
              </svg>
            </div>
          </div>

          <div className="p-8">
            <h2 className="text-center text-2xl font-bold text-gray-800">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Enter your credentials to access your account
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
              <div>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
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
                  autoComplete="current-password"
                  variant="outlined"
                />
              </div>

              <div>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    padding: '12px 0',
                    backgroundColor: '#4F46E5',
                    '&:hover': {
                      backgroundColor: '#4338CA',
                    },
                  }}
                >
                  Sign In
                </Button>
              </div>

              <div className="flex items-center justify-between mt-4">
                <Link
                  href="/forgot"
                  className="text-sm font-medium text-blue-600 hover:text-blue-500"
                >
                  Forgot your password?
                </Link>
                <Link
                  href="/signup"
                  className="text-sm font-medium text-blue-600 hover:text-blue-500"
                >
                  Create an account
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
