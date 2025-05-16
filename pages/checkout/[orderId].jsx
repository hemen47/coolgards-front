import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { AlertContext } from '../_app';
import { PayPalScriptProvider, PayPalButtons, FUNDING } from '@paypal/react-paypal-js';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import Button from '@mui/material/Button';
import Link from 'next/link';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Head from 'next/head';

export default function Checkout({ localOrderId, error }) {
  const { setError } = useContext(AlertContext);
  const [transactionComplete, setTransactionComplete] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState('pending'); // pending, success, error

  useEffect(() => {
    if (error) {
      setError(error);
      setPaymentStatus('error');
    }
  }, [error, setError]);

  const FUNDING_SOURCES = [FUNDING.PAYPAL, FUNDING.PAYLATER, FUNDING.VENMO, FUNDING.CARD];

  const initialOptions = {
    'client-id': process.env.NEXT_PUBLIC_CLIENT_ID,
    'enable-funding': 'paylater,venmo',
    currency: 'EUR',
  };

  return (
    <>
      <Head>
        <title>Checkout | Complete Your Purchase</title>
        <meta
          name="description"
          content="Complete your purchase securely with our payment options"
        />
      </Head>

      <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 py-6 px-8">
            <h1 className="text-2xl font-bold text-white text-center">Complete Your Purchase</h1>
          </div>

          <div className="p-6 sm:p-8">
            {paymentStatus === 'success' && (
              <div className="flex flex-col items-center justify-center p-6 bg-green-50 rounded-lg border border-green-200">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-100 mb-4">
                  <CheckCircleOutlineIcon sx={{ fontSize: '2.5rem', color: '#10B981' }} />
                </div>
                <h2 className="text-xl font-bold text-green-700 mb-2">Payment Successful!</h2>
                <p className="text-gray-700 text-center mb-4">
                  Thank you for your purchase. Your order has been processed successfully.
                </p>
                <p className="text-gray-500 text-center mb-6 text-sm">
                  PayPal Transaction ID: <span className="font-mono">{transactionComplete}</span>
                </p>
                <Link href="/">
                  <Button
                    variant="contained"
                    sx={{
                      padding: '0.75rem 1.5rem',
                      borderRadius: '0.5rem',
                      textTransform: 'none',
                      fontSize: '1rem',
                      backgroundColor: '#4F46E5',
                      '&:hover': { backgroundColor: '#4338CA' },
                    }}
                    startIcon={<ReplyOutlinedIcon />}
                  >
                    Return to Home
                  </Button>
                </Link>
              </div>
            )}

            {paymentStatus === 'error' && (
              <div className="flex flex-col items-center justify-center p-6 bg-red-50 rounded-lg border border-red-200">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-red-100 mb-4">
                  <ErrorOutlineIcon sx={{ fontSize: '2.5rem', color: '#EF4444' }} />
                </div>
                <h2 className="text-xl font-bold text-red-700 mb-2">Payment Failed</h2>
                <p className="text-gray-700 text-center mb-6">
                  {error || 'There was an issue processing your payment. Please try again.'}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    variant="contained"
                    onClick={() => setPaymentStatus('pending')}
                    sx={{
                      padding: '0.75rem 1.5rem',
                      borderRadius: '0.5rem',
                      textTransform: 'none',
                      fontSize: '1rem',
                      backgroundColor: '#4F46E5',
                      '&:hover': { backgroundColor: '#4338CA' },
                    }}
                  >
                    Try Again
                  </Button>
                  <Link href="/">
                    <Button
                      variant="outlined"
                      sx={{
                        padding: '0.75rem 1.5rem',
                        borderRadius: '0.5rem',
                        textTransform: 'none',
                        fontSize: '1rem',
                        borderColor: '#4F46E5',
                        color: '#4F46E5',
                        '&:hover': {
                          borderColor: '#4338CA',
                          backgroundColor: 'rgba(79, 70, 229, 0.04)',
                        },
                      }}
                      startIcon={<ReplyOutlinedIcon />}
                    >
                      Return to Home
                    </Button>
                  </Link>
                </div>
              </div>
            )}

            {paymentStatus === 'pending' && (
              <div id="paypal-button-container">
                <div className="bg-blue-50 p-5 rounded-lg border border-blue-100 mb-6">
                  <div className="flex items-center mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-600 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <h2 className="text-lg font-semibold text-blue-800">Order Summary</h2>
                  </div>
                  <p className="text-gray-600 mb-1 text-sm flex items-center">
                    <span className="font-medium mr-2">Order ID:</span>
                    <span className="font-mono">{localOrderId}</span>
                  </p>
                  <p className="text-gray-600 text-sm">
                    Please complete your payment to finish your purchase.
                  </p>
                </div>

                <div className="relative mb-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-white px-4 text-sm font-medium text-gray-500">
                      SELECT PAYMENT METHOD
                    </span>
                  </div>
                </div>

                <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                  <PayPalScriptProvider options={initialOptions}>
                    {FUNDING_SOURCES.map(fundingSource => {
                      return (
                        <div key={fundingSource} className="mb-4 last:mb-0">
                          <PayPalButtons
                            fundingSource={fundingSource}
                            style={{
                              layout: 'vertical',
                              shape: 'rect',
                              color: fundingSource === FUNDING.PAYPAL ? 'gold' : 'black',
                            }}
                            createOrder={async (data, actions) => {
                              try {
                                const response = await fetch('/api/create-order', {
                                  headers: {
                                    'Content-Type': 'application/json',
                                  },
                                  method: 'POST',
                                  body: JSON.stringify({ localOrderId: localOrderId }),
                                });

                                const details = await response.json();
                                return details.id;
                              } catch (error) {
                                console.error(error);
                                setError('Failed to create order. Please try again.');
                                setPaymentStatus('error');
                              }
                            }}
                            onApprove={async (data, actions) => {
                              try {
                                const response = await fetch(`/api/capture-order/${data.orderID}`, {
                                  method: 'POST',
                                });

                                const details = await response.json();
                                const errorDetail =
                                  Array.isArray(details.details) && details.details[0];

                                if (errorDetail && errorDetail.issue === 'INSTRUMENT_DECLINED') {
                                  return actions.restart();
                                }

                                if (errorDetail) {
                                  let msg = 'Sorry, your transaction could not be processed.';
                                  msg += errorDetail.description
                                    ? ' ' + errorDetail.description
                                    : '';
                                  msg += details.debug_id ? ' (' + details.debug_id + ')' : '';
                                  setError(msg);
                                  setPaymentStatus('error');
                                  return;
                                }

                                // Successful capture
                                const transaction = details.purchase_units[0].payments.captures[0];

                                setTransactionComplete(transaction.id);
                                setPaymentStatus('success');
                                localStorage.removeItem('cart');
                              } catch (error) {
                                console.error(error);
                                setError('Failed to process payment. Please try again.');
                                setPaymentStatus('error');
                              }
                            }}
                          />
                        </div>
                      );
                    })}
                  </PayPalScriptProvider>
                </div>

                <div className="mt-8 text-center">
                  <Link href="/">
                    <Button
                      variant="text"
                      sx={{
                        color: '#6B7280',
                        textTransform: 'none',
                        fontSize: '0.875rem',
                        '&:hover': { backgroundColor: 'rgba(107, 114, 128, 0.04)' },
                      }}
                      startIcon={<ReplyOutlinedIcon />}
                    >
                      Cancel and return to shopping
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className="px-8 py-4 bg-gray-50 border-t border-gray-200 flex justify-center">
            <div className="flex items-center space-x-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-500"
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
              <span className="text-xs text-gray-500">Secure Payment</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    return { props: { localOrderId: context.params.orderId } };
  } catch (err) {
    return { props: { error: err.response?.data?.message || err.message } };
  }
}
