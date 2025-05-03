import * as React from 'react';
import styles from './checkout.module.scss';
import { useContext, useEffect, useState } from 'react';
import { AlertContext } from '../_app';
import { PayPalScriptProvider, PayPalButtons, FUNDING } from '@paypal/react-paypal-js';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import Button from '@mui/material/Button';
import Link from 'next/link';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

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
    <div className={styles.container}>
      <div className={`${styles.checkoutContainer} p-8 rounded-lg shadow-lg bg-white`}>
        <h1 className="text-2xl font-bold text-center mb-6">Checkout</h1>

        {paymentStatus === 'success' && (
          <div className="flex flex-col items-center justify-center p-8 bg-green-50 rounded-lg border border-green-200">
            <CheckCircleOutlineIcon
              sx={{ fontSize: '4rem', color: '#10B981', marginBottom: '1rem' }}
            />
            <h2 className="text-xl font-bold text-green-600 mb-2">Payment Successful!</h2>
            <p className="text-gray-700 text-center mb-4">
              Thank you for your purchase. Your order has been processed successfully.
            </p>
            <p className="text-gray-500 text-center mb-6">
              PayPal Transaction ID: <span className="font-mono">{transactionComplete}</span>
            </p>
            <Link href="/">
              <Button
                variant="contained"
                color="primary"
                sx={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  textTransform: 'none',
                  fontSize: '1rem',
                }}
                startIcon={<ReplyOutlinedIcon />}
              >
                Return to Home
              </Button>
            </Link>
          </div>
        )}

        {paymentStatus === 'error' && (
          <div className="flex flex-col items-center justify-center p-8 bg-red-50 rounded-lg border border-red-200">
            <ErrorOutlineIcon sx={{ fontSize: '4rem', color: '#EF4444', marginBottom: '1rem' }} />
            <h2 className="text-xl font-bold text-red-600 mb-2">Payment Failed</h2>
            <p className="text-gray-700 text-center mb-6">
              {error || 'There was an issue processing your payment. Please try again.'}
            </p>
            <div className="flex gap-4">
              <Button
                variant="contained"
                color="primary"
                onClick={() => setPaymentStatus('pending')}
                sx={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  textTransform: 'none',
                  fontSize: '1rem',
                  backgroundColor: '#4F46E5',
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
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 mb-6">
              <h2 className="text-lg font-semibold text-blue-800 mb-2">Order Summary</h2>
              <p className="text-gray-600 mb-2">Order ID: {localOrderId}</p>
              <p className="text-gray-600">Please complete your payment to finish your purchase.</p>
            </div>

            <h3 className="font-bold text-gray-700 text-center mb-6">Select a Payment Method</h3>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <PayPalScriptProvider options={initialOptions}>
                {FUNDING_SOURCES.map(fundingSource => {
                  return (
                    <div key={fundingSource} className="mb-4 last:mb-0">
                      <PayPalButtons
                        fundingSource={fundingSource}
                        style={{
                          layout: 'vertical',
                          shape: 'rect',
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
                              msg += errorDetail.description ? ' ' + errorDetail.description : '';
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
                    fontSize: '1rem',
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
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    return { props: { localOrderId: context.params.orderId } };
  } catch (err) {
    return { props: { error: err.response?.data?.message || err.message } };
  }
}
