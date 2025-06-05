import * as React from 'react';
import { useContext, useEffect, useRef, useState } from 'react';
import { AlertContext, CartContext, UserContext } from '../_app';
import Link from 'next/link';
import Image from 'next/image'; // Import the Image component [[0]](#__0)
import { ax } from '../../utils/axios';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Select } from '@mui/material';
import AddButton from '../../components/AddButton';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import TextField from '@mui/material/TextField';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import Head from 'next/head';

export default function Cart({ shipments }) {
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);
  const [mode, setMode] = useState(0);
  const [disableButton, setDisableButton] = useState(false);

  const [query, setQuery] = useState(user);

  const { setMessage, setError } = useContext(AlertContext);
  const { cart } = useContext(CartContext);
  const [refreshedCart, setRefreshedCart] = useState([]);
  const [shipmentPlan, setShipmentPlan] = useState(shipments[0]._id);

  useEffect(() => {
    if (user) {
      setQuery(user);
      const userShipmentPlan = shipments.filter(item => item?.country === user?.country);
      if (userShipmentPlan.length !== 0) {
        setShipmentPlan(userShipmentPlan[0]._id);
      }
    }
  }, [user, shipments]);

  // Update query.country whenever shipmentPlan changes
  useEffect(() => {
    if (shipmentPlan) {
      const selectedShipment = shipments.find(shipment => shipment._id === shipmentPlan);
      if (selectedShipment) {
        setQuery(prevQuery => ({
          ...prevQuery,
          country: selectedShipment.country,
        }));
      }
    }
  }, [shipmentPlan, shipments]);

  const [orderInfo, setOrderInfo] = useState({
    totalItems: '',
    totalItemsPrice: '',
    totalPrice: '',
  });
  const userFormElement = useRef();

  const handleChange = e => {
    setQuery({ ...query, [e.target.name]: e.target.value });
  };

  const refreshCart = () => {
    const model = {
      cart,
      shipmentPlan,
    };
    ax.post('/api/cart', model)
      .then(res => {
        setRefreshedCart(res.data.cart);
        setOrderInfo(res.data.orderInfo);
      })
      .catch(e => {
        setError(e.response?.data?.message || e.message);
      });
  };

  // initial cart refresh
  useEffect(() => {
    if (cart.length !== 0) {
      refreshCart();
    }
  }, []);

  // refresh cart on cart or shipment plan change
  useEffect(() => {
    refreshCart();
  }, [cart, shipmentPlan]);

  const getCurrentUser = () => {
    ax.get('/api/users/me')
      .then(res => {
        setUser(res.data.data);
        setQuery(res.data.data);
      })
      .catch(e => {
        setError(e.response?.data?.message || e.message);
        localStorage.removeItem('authenticated');
      });
  };

  useEffect(() => {
    if (mode === 1 || mode === 2) {
      userFormElement.current?.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }, [mode]);

  const submitEdit = async () => {
    const { roles, ...rest } = query;
    if (!query.fullName) {
      return setError('Please enter your full name');
    }
    if (!query.city) {
      return setError('Please enter your city name');
    }
    if (!query.address) {
      return setError('Please enter your address');
    }
    if (!query.postalCode) {
      return setError('Please enter your postal code');
    }
    ax({
      url: '/api/users/me',
      method: 'patch',
      data: rest,
    })
      .then(res => {
        setMessage(res.data.message);
        getCurrentUser();
      })
      .catch(e => {
        setError(e.response?.data?.message || e.message);
      });
  };

  const makeOrder = async () => {
    const model = {
      cart: refreshedCart,
      shipmentPlan,
      userInfo: mode === 1 ? user : query,
    };

    ax({
      url: '/api/orders',
      method: 'post',
      data: model,
    })
      .then(res => {
        setMessage(res.data.message);
        setDisableButton(true);
        router.push('/checkout/' + res.data.data._id);
      })
      .catch(e => {
        setError(e.response?.data?.message || e.message);
      });
  };

  const makeAnonymousOrder = async () => {
    if (!query.email) {
      return setError('Please enter your email address');
    }

    if (!query.fullName) {
      return setError('Please enter your full name');
    }

    if (!query.password) {
      return setError('Please enter your password');
    }
    if (query.password.length < 7) {
      return setError('Please choose a stronger password (at least seven characters)');
    }

    if (!query.city) {
      return setError('Please enter your city name');
    }
    if (!query.address) {
      return setError('Please enter your address');
    }
    if (!query.postalCode) {
      return setError('Please enter your postal code');
    }
    makeOrder();
  };

  const placeOrder = () => {
    if (user) {
      setQuery(prevQuery => ({
        ...user,
        country: shipments.find(shipment => shipment._id === shipmentPlan)?.country || user.country,
      }));
      setMode(1);
    } else {
      setMode(2);
    }
  };

  const handleSubmit = async () => {
    if (mode === 1) {
      submitEdit()
        .then(() => makeOrder())
        .catch(e => setError(e.messaage));
    }
    if (mode === 2) {
      makeAnonymousOrder();
    }
  };

  const renderUserForm = () => {
    if (mode === 0) {
      return '';
    }
    if (mode === 1 || mode === 2) {
      // Get the selected country from the shipment plan
      const selectedCountry =
        shipments.find(shipment => shipment._id === shipmentPlan)?.country || '';

      return (
        <div
          className="w-full max-w-4xl mx-auto my-8 p-6 bg-white rounded-xl shadow-lg"
          ref={userFormElement}
        >
          {mode === 2 && (
            <div className="text-center mb-6">
              <p className="font-bold text-gray-800 mb-2">
                If you already have an account please{' '}
                <Link
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                  href={{
                    pathname: '/login',
                    query: { redirect: '/cart' },
                  }}
                >
                  Log in!
                </Link>
              </p>
              <p className="text-gray-600">Otherwise please fill this form to create an account</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextField
              required
              value={query?.email}
              label="Email"
              variant="outlined"
              name="email"
              onChange={handleChange}
              fullWidth
              disabled={mode === 1}
              className="mb-4"
            />
            <TextField
              required
              value={query?.fullName}
              label="Full Name"
              variant="outlined"
              name="fullName"
              onChange={handleChange}
              fullWidth
              className="mb-4"
            />
            {mode === 2 && (
              <TextField
                required
                value={query?.password}
                label="Password"
                variant="outlined"
                type="password"
                name="password"
                onChange={handleChange}
                fullWidth
                className="mb-4"
              />
            )}

            <Select
              variant="outlined"
              value={selectedCountry}
              label="Country"
              name="country"
              disabled
              required
              fullWidth
              className="mb-4"
            >
              {shipments.map(item => (
                <MenuItem key={item._id} value={item.country}>
                  {item.country}
                </MenuItem>
              ))}
            </Select>

            <TextField
              required
              value={query?.city}
              label="City"
              variant="outlined"
              name="city"
              onChange={handleChange}
              fullWidth
              className="mb-4"
            />

            <TextField
              required
              value={query?.address}
              label="Address"
              variant="outlined"
              name="address"
              onChange={handleChange}
              fullWidth
              className="mb-4"
            />

            <TextField
              value={query?.postalCode}
              label="Postal Code"
              variant="outlined"
              name="postalCode"
              onChange={handleChange}
              fullWidth
              className="mb-4"
            />

            <TextField
              value={query?.mobilePhone}
              label="Mobile Phone"
              variant="outlined"
              name="mobilePhone"
              onChange={handleChange}
              fullWidth
              className="mb-4"
            />
          </div>

          <div className="flex justify-center mt-6">
            <Button
              onClick={handleSubmit}
              variant="contained"
              startIcon={<ShoppingCartCheckoutIcon />}
              disabled={disableButton}
              sx={{
                backgroundColor: '#4F46E5',
                '&:hover': { backgroundColor: '#4338CA' },
                padding: '10px 24px',
                fontSize: '1rem',
              }}
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="mt-10">
      <Head>
        <title>Shopping Cart | Your Store</title>
        <meta name="description" content="Review your items and complete your purchase" />
      </Head>

      <div className="container mx-auto px-4 pt-16 pb-24">
        <div className="flex flex-col lg:flex-row gap-8 justify-center">
          {/* Cart Items Section */}
          <div className="flex-grow max-w-4xl bg-white rounded-xl shadow-md overflow-hidden">
            <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h1 className="font-bold text-2xl text-gray-800">Shopping Cart</h1>
              <h2 className="font-medium text-gray-600">{orderInfo.totalItems} Items</h2>
            </div>

            {/* Cart Headers - Hidden on Mobile */}
            <div className="hidden md:flex px-6 py-4 bg-gray-50 text-gray-600">
              <div className="w-2/3">
                <span className="text-xs uppercase font-semibold">Product Details</span>
              </div>
              <div className="w-1/3 flex">
                <div className="w-1/3 text-center text-xs uppercase font-semibold">Quantity</div>
                <div className="w-1/3 text-center text-xs uppercase font-semibold">Price</div>
                <div className="w-1/3 text-center text-xs uppercase font-semibold">Total</div>
              </div>
            </div>

            {/* Cart Items */}
            <div className="divide-y divide-gray-200">
              {refreshedCart.length === 0 ? (
                <div className="p-8 text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 mx-auto text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">Your cart is empty</h3>
                  <p className="mt-1 text-gray-500">
                    Looks like you haven&#39;t added any products yet.
                  </p>
                  <div className="mt-6">
                    <Link href="/products">
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: '#4F46E5',
                          '&:hover': { backgroundColor: '#4338CA' },
                        }}
                      >
                        Start Shopping
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                refreshedCart.map(item => (
                  <div
                    key={item?._id}
                    className="flex flex-col md:flex-row p-4 md:p-6 hover:bg-gray-50 transition-colors"
                  >
                    {/* Product Info - Full Width on Mobile */}
                    <div className="flex md:w-2/3">
                      <Link className="flex items-center" href={'/products/' + item.slug}>
                        <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 relative">
                          {/* Replacing img with Next.js Image component */}
                          <Image
                            src={item?.imageUrls[0]}
                            alt={item?.title}
                            fill
                            sizes="96px"
                            style={{
                              objectFit: 'cover',
                              objectPosition: 'center',
                            }}
                            priority={false}
                            quality={80}
                          />
                        </div>
                        <div className="ml-4 flex flex-col">
                          <h3 className="text-base font-medium text-gray-900">{item?.title}</h3>
                          <p className="mt-1 text-sm text-gray-500 md:hidden">
                            €{item?.price} × {item?.quantity} = €{item.price * item.quantity}
                          </p>
                        </div>
                      </Link>
                    </div>

                    {/* Quantity, Price, Total - Row on Desktop */}
                    <div className="flex items-center justify-between md:justify-around mt-4 md:mt-0 md:w-1/3">
                      <div className="flex items-center justify-center md:w-1/3">
                        <AddButton data={item} />
                      </div>
                      <div className="hidden md:block text-center md:w-1/3">
                        <span className="text-gray-900">€{item?.price}</span>
                      </div>
                      <div className="text-center md:w-1/3">
                        <span className="font-medium text-gray-900">
                          €{item.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Continue Shopping Button */}
            {refreshedCart.length > 0 && (
              <div className="p-4 md:p-6 border-t border-gray-200">
                <Link href="/products">
                  <Button
                    variant="outlined"
                    startIcon={<ReplyOutlinedIcon />}
                    sx={{
                      borderColor: '#4F46E5',
                      color: '#4F46E5',
                      '&:hover': {
                        borderColor: '#4338CA',
                        backgroundColor: 'rgba(79, 70, 229, 0.04)',
                      },
                    }}
                  >
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Order Summary Section */}
          {refreshedCart.length > 0 && (
            <div className="w-full lg:w-80 bg-white rounded-xl shadow-md overflow-hidden h-fit">
              <div className="p-6">
                <h2 className="text-lg font-bold text-gray-900 pb-4 border-b border-gray-200">
                  Order Summary
                </h2>

                <div className="mt-6 space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-600">
                      Items ({orderInfo?.totalItems})
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      €{orderInfo.totalItemsPrice}
                    </span>
                  </div>

                  <div className="pt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Shipping Location
                    </label>
                    <Select
                      fullWidth
                      variant="outlined"
                      name="shipping"
                      value={shipmentPlan}
                      onChange={e => setShipmentPlan(e.target.value)}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: '0.5rem' } }}
                    >
                      {shipments?.map(shipment => (
                        <MenuItem key={shipment._id} value={shipment._id}>
                          {shipment?.country} - €{shipment?.shipmentPrice}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>

                  <div className="flex justify-between pt-2">
                    <span className="text-sm font-medium text-gray-600">Shipping</span>
                    <span className="text-sm font-medium text-gray-900">
                      €{orderInfo.totalShipmentPrice}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-600">
                      VAT ({shipments.filter(shipment => shipment._id === shipmentPlan)[0]?.vat}%)
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      €{orderInfo.totalVatPrice}
                    </span>
                  </div>

                  <div className="flex justify-between pt-4 border-t border-gray-200">
                    <span className="text-base font-bold text-gray-900">Total</span>
                    <span className="text-base font-bold text-gray-900">
                      €{orderInfo.totalPrice}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={placeOrder}
                  variant="contained"
                  fullWidth
                  startIcon={<EventNoteOutlinedIcon />}
                  sx={{
                    mt: 4,
                    py: 1.5,
                    backgroundColor: '#4F46E5',
                    '&:hover': { backgroundColor: '#4338CA' },
                  }}
                >
                  Place Order
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* User Form Section */}
        {renderUserForm()}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const res = await fetch(`${process.env.BASE_URL}/shipments`);
    const jsonRes = await res.json();
    return { props: { shipments: jsonRes.data } };
  } catch (err) {
    return { props: { error: err.response?.data?.message || err.message } };
  }
}
