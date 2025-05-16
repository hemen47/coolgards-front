import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { AlertContext, UserContext } from '../_app';
import { useRouter } from 'next/router';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import { ax } from '../../utils/axios';
import Image from 'next/image';
import { format } from 'date-fns';

export default function Profile({ shipments }) {
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);
  const [modal, setModal] = useState(false);
  const { setError, setMessage } = useContext(AlertContext);
  const [editQuery, setEditQuery] = useState(user);
  const [activeTab, setActiveTab] = useState('profile');

  console.log('user', user);
  useEffect(() => {
    if (!localStorage.getItem('authenticated')) {
      router.push('/login');
    }
  }, []);

  const cancelEdit = () => {
    setModal(false);
  };

  const handleCloseModal = () => {
    setModal(false);
  };

  const handleEdit = () => {
    setEditQuery(user);
    setModal(true);
  };

  const handleChange = e => {
    setEditQuery({ ...editQuery, [e.target.name]: e.target.value });
  };

  const getCurrentUser = () => {
    ax.get('/api/users/me')
      .then(res => {
        setUser(res.data.data);
        setEditQuery(res.data.data);
      })
      .catch(e => {
        setError(e.response?.data?.message || e.message);
        localStorage.removeItem('authenticated');
      });
  };

  const submitEdit = () => {
    const { orders, roles, ...rest } = editQuery;
    ax({
      url: '/api/users/me',
      method: 'patch',
      data: rest,
    })
      .then(res => {
        cancelEdit();
        setMessage(res.data.message);
        getCurrentUser();
      })
      .catch(e => {
        setError(e.response?.data?.message || e.message);
      });
  };

  // Helper function to format order status
  const getStatusBadgeClass = status => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-32 md:h-48 relative">
          <div className="absolute -bottom-16 left-6">
            <div className="bg-white rounded-full p-1 shadow-lg">
              <Image
                src="/avatar.png"
                width={100}
                height={100}
                alt="user avatar"
                className="rounded-full"
              />
            </div>
          </div>
        </div>

        <div className="pt-20 pb-6 px-6">
          <h1 className="text-2xl font-bold text-gray-800">{user?.fullName}</h1>
          <p className="text-gray-600">{user?.email}</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('profile')}
          className={`py-3 px-6 font-medium text-sm ${
            activeTab === 'profile'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Profile Details
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`py-3 px-6 font-medium text-sm ${
            activeTab === 'orders'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Order History
        </button>
      </div>

      {/* Profile Content */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            Personal Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">Full Name</p>
              <p className="font-medium">{user?.fullName}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Email</p>
              <p className="font-medium">{user?.email}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Mobile Phone</p>
              <p className="font-medium">{user?.mobilePhone || 'Not provided'}</p>
            </div>
          </div>

          <hr className="my-6" />

          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Address Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">Country</p>
              <p className="font-medium">{user?.country || 'Not provided'}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">City</p>
              <p className="font-medium">{user?.city || 'Not provided'}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Postal Code</p>
              <p className="font-medium">{user?.postalCode || 'Not provided'}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Address</p>
              <p className="font-medium">{user?.address || 'Not provided'}</p>
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={handleEdit}
              className="w-full md:w-auto px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
              Edit Profile
            </button>
          </div>
        </div>
      )}

      {/* Orders Content */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2 text-blue-500"
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
            Order History
          </h2>

          {user?.orders && user.orders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Order ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Total
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Items
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {user?.orders.map(order => (
                    <tr key={order?._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                        #{order?._id.substring(0, 8)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order?.createdAt
                          ? format(new Date(order?.createdAt), 'MMM dd, yyyy')
                          : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                        ${order?.totalPrice?.toFixed(2) || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(
                            order?.status
                          )}`}
                        >
                          {order?.status || 'Processing'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order?.items?.length || 0} items
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {order?.status === 'CREATED' && (
                          <button
                            onClick={() => router.push(`/checkout/${order?._id}`)}
                            className="inline-flex items-center px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white text-xs font-medium rounded-lg transition-colors"
                            title="Complete payment"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 mr-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z"
                              />
                            </svg>
                            Pay Now
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-10">{/* No orders content remains the same */}</div>
          )}
        </div>
      )}

      {/* Edit Modal */}
      <Modal open={modal} onClose={handleCloseModal}>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl p-6 w-11/12 max-w-3xl max-h-[90vh] overflow-y-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Profile</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextField
              required
              value={editQuery?.email}
              label="Email"
              variant="outlined"
              name="email"
              onChange={handleChange}
              fullWidth
            />
            <TextField
              required
              value={editQuery?.fullName}
              label="Full Name"
              variant="outlined"
              name="fullName"
              onChange={handleChange}
              fullWidth
            />
            <TextField
              required
              value={editQuery?.password}
              label="Password"
              variant="outlined"
              name="password"
              type="password"
              onChange={handleChange}
              fullWidth
            />

            <Select
              variant="outlined"
              value={editQuery?.country || ''}
              label="Country"
              name="country"
              onChange={handleChange}
              fullWidth
            >
              {shipments.map(item => (
                <MenuItem key={item._id} value={item?.country}>
                  {item?.country}
                </MenuItem>
              ))}
            </Select>

            <TextField
              value={editQuery?.city || ''}
              label="City"
              variant="outlined"
              name="city"
              onChange={handleChange}
              fullWidth
            />

            <TextField
              value={editQuery?.address || ''}
              label="Address"
              variant="outlined"
              name="address"
              onChange={handleChange}
              fullWidth
            />

            <TextField
              value={editQuery?.postalCode || ''}
              label="Postal Code"
              variant="outlined"
              name="postalCode"
              onChange={handleChange}
              fullWidth
            />

            <TextField
              value={editQuery?.mobilePhone || ''}
              label="Mobile Phone"
              variant="outlined"
              name="mobilePhone"
              onChange={handleChange}
              fullWidth
            />
          </div>

          <div className="flex justify-end mt-8 space-x-4">
            <Button onClick={cancelEdit} variant="outlined" className="text-gray-700">
              Cancel
            </Button>
            <Button
              onClick={submitEdit}
              variant="contained"
              color="primary"
              startIcon={<ManageAccountsOutlinedIcon />}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </Modal>
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
