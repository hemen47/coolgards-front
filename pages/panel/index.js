// Panel.jsx
import React, { useContext, useEffect, useState } from 'react';
import { ax } from '../../utils/axios';
import { AlertContext } from '../_app';
import Link from 'next/link';
import { Divider, Paper } from '@mui/material';
import {
  PeopleAlt,
  Inventory,
  Article,
  Message,
  ShoppingCart,
  Dashboard as DashboardIcon,
} from '@mui/icons-material';
import GoogleAnalytics from './GoogleAnalytics';

export default function Panel() {
  const { setError } = useContext(AlertContext);
  const [data, setData] = useState({
    newUsersCount: '',
    totalUsersCount: '',
    newNewsCount: '',
    totalNewsCount: '',
    newProductsCount: '',
    totalProductsCount: '',
    newMessagesCount: '',
    totalMessagesCount: '',
    newOrdersCount: '',
    totalOrdersCount: '',
  });

  const getData = () => {
    ax({
      url: '/api/panel/general/dashboard',
    })
      .then(res => {
        setData(res.data);
      })
      .catch(e => {
        setError(e.response?.data?.message || e.message);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const cards = [
    {
      title: 'Users',
      icon: <PeopleAlt className="text-blue-500" />,
      newCount: data.newUsersCount,
      totalCount: data.totalUsersCount,
      href: '/panel/users',
      color: 'bg-blue-50 border-blue-500',
      hoverColor: 'hover:bg-blue-100',
    },
    {
      title: 'Products',
      icon: <Inventory className="text-green-500" />,
      newCount: data.newProductsCount,
      totalCount: data.totalProductsCount,
      href: '/panel/products',
      color: 'bg-green-50 border-green-500',
      hoverColor: 'hover:bg-green-100',
    },
    {
      title: 'News',
      icon: <Article className="text-amber-500" />,
      newCount: data.newNewsCount,
      totalCount: data.totalNewsCount,
      href: '/panel/news',
      color: 'bg-amber-50 border-amber-500',
      hoverColor: 'hover:bg-amber-100',
    },
    {
      title: 'Messages',
      icon: <Message className="text-purple-500" />,
      newCount: data.newMessagesCount,
      totalCount: data.totalMessagesCount,
      href: '/panel/messages',
      color: 'bg-purple-50 border-purple-500',
      hoverColor: 'hover:bg-purple-100',
    },
    {
      title: 'Orders',
      icon: <ShoppingCart className="text-rose-500" />,
      newCount: data.newOrdersCount,
      totalCount: data.totalOrdersCount,
      href: '/panel/orders',
      color: 'bg-rose-50 border-rose-500',
      hoverColor: 'hover:bg-rose-100',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto ml-[4rem] lg:ml-[15rem]">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3">
            <DashboardIcon fontSize="large" className="text-gray-700" />
            <h1 className="text-3xl font-extralight text-gray-700">Admin Dashboard</h1>
          </div>
          <p className="text-gray-500 mt-2">Welcome to your control center</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {cards.map((card, index) => (
            <Link href={card.href} key={index}>
              <div
                className={`rounded-xl shadow-sm border-l-4 ${card.color} p-5 transition-all duration-300 transform hover:scale-105 hover:shadow-md ${card.hoverColor} cursor-pointer`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-medium text-gray-800">{card.title}</h2>
                  {card.icon}
                </div>
                <Divider className="mb-3" />
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center">
                    <span className="text-2xl font-bold text-gray-800">{card.newCount}</span>
                    <span className="ml-2 text-xs text-gray-500">last 24h</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-lg font-semibold text-gray-700">{card.totalCount}</span>
                    <span className="ml-2 text-xs text-gray-500">total</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Google Analytics Component */}
        <GoogleAnalytics />
      </div>
    </div>
  );
}
