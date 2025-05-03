// GoogleAnalytics.jsx
import React, { useContext, useState, useEffect } from 'react';
import { AlertContext } from '../_app';
import { CircularProgress, Paper, Tabs, Tab } from '@mui/material';
import { TrendingUp } from '@mui/icons-material';
import {
  FiTrendingUp,
  FiBarChart2,
  FiActivity,
  FiUsers,
  FiGlobe,
  FiAlertTriangle,
} from 'react-icons/fi';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

export default function GoogleAnalytics() {
  const { setError } = useContext(AlertContext);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [searchConsoleData, setSearchConsoleData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [realTimeUsers, setRealTimeUsers] = useState(0);

  // Fetch data on component mount
  useEffect(() => {
    fetchDashboardData();

    // Set up real-time users polling
    const interval = setInterval(() => {
      fetchRealTimeUsers();
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/panel/dashboard-data');

      if (!response.ok) {
        throw new Error('Failed to fetch analytics data');
      }

      const data = await response.json();

      setAnalyticsData(data.analyticsData);
      setSearchConsoleData(data.searchConsoleData);
      setRealTimeUsers(data.analyticsData.realTimeUsers);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError('Failed to load analytics data');
      setIsLoading(false);
    }
  };

  const fetchRealTimeUsers = async () => {
    try {
      const response = await fetch('/panel/analytics');

      if (response.ok) {
        const data = await response.json();
        setRealTimeUsers(data.realTimeUsers);
      }
    } catch (error) {
      console.error('Error fetching real-time users:', error);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <>
      {/* Real-time visitors card */}
      <div className="mb-8">
        <Paper elevation={2} className="p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FiActivity className="text-indigo-500 text-xl" />
              <h2 className="text-xl font-medium text-gray-800">Real-time Activity</h2>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="text-center p-6">
              {isLoading ? (
                <CircularProgress size={24} />
              ) : (
                <>
                  <div className="text-5xl font-bold text-indigo-600 mb-2">{realTimeUsers}</div>
                  <div className="text-gray-500">Active Users Right Now</div>
                </>
              )}
            </div>
          </div>
        </Paper>
      </div>

      {/* Analytics & Search Console Data */}
      <div className="mb-8">
        <Paper elevation={3} className="rounded-xl overflow-hidden">
          <div className="p-6 bg-white">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="text-indigo-500" />
                <h2 className="text-xl font-medium text-gray-800">Website Analytics</h2>
              </div>
            </div>

            {isLoading ? (
              <div className="flex justify-center p-8">
                <CircularProgress />
              </div>
            ) : (
              <>
                <Tabs
                  value={activeTab}
                  onChange={handleTabChange}
                  indicatorColor="primary"
                  textColor="primary"
                  centered
                  className="mb-6"
                >
                  <Tab label="Traffic Overview" icon={<FiTrendingUp />} iconPosition="start" />
                  <Tab label="User Behavior" icon={<FiUsers />} iconPosition="start" />
                  <Tab label="Search Performance" icon={<FiGlobe />} iconPosition="start" />
                </Tabs>

                {/* Traffic Overview Tab */}
                {activeTab === 0 && analyticsData && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Users Over Time Chart */}
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h3 className="text-lg font-medium text-gray-700 mb-4">
                        Users (Last 30 Days)
                      </h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={analyticsData.usersData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Area
                            type="monotone"
                            dataKey="users"
                            stroke="#8884d8"
                            fill="#8884d8"
                            fillOpacity={0.3}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Page Views Chart */}
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h3 className="text-lg font-medium text-gray-700 mb-4">
                        Page Views (Last 30 Days)
                      </h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={analyticsData.pageViewsData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="views" stroke="#82ca9d" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Traffic Sources Chart */}
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h3 className="text-lg font-medium text-gray-700 mb-4">
                        Top Traffic Sources
                      </h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={analyticsData.sourceData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="source" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="sessions" fill="#3f51b5" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Device Categories Chart */}
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h3 className="text-lg font-medium text-gray-700 mb-4">Users by Device</h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={analyticsData.deviceData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="users"
                            nameKey="device"
                            label={({ device, percent }) =>
                              `${device}: ${(percent * 100).toFixed(0)}%`
                            }
                          >
                            {analyticsData.deviceData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}

                {/* User Behavior Tab */}
                {activeTab === 1 && analyticsData && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* More charts can be added here based on user behavior data */}
                    <div className="bg-white p-4 rounded-lg shadow-sm col-span-2">
                      <h3 className="text-lg font-medium text-gray-700 mb-4">
                        User Engagement Metrics
                      </h3>
                      <p className="text-gray-500 mb-4">
                        This section will display user engagement metrics like session duration,
                        bounce rate, etc.
                      </p>
                      <div className="h-64 flex items-center justify-center border border-dashed border-gray-300 rounded-lg">
                        <p className="text-gray-400">
                          Additional user behavior charts will appear here
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Search Performance Tab */}
                {activeTab === 2 && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {searchConsoleData && searchConsoleData.isAvailable ? (
                      <>
                        {/* Search Performance Chart */}
                        <div className="bg-white p-4 rounded-lg shadow-sm col-span-2">
                          <h3 className="text-lg font-medium text-gray-700 mb-4">
                            Search Performance (Last 30 Days)
                          </h3>
                          <ResponsiveContainer width="100%" height={300}>
                            {/* ... chart component ... */}
                          </ResponsiveContainer>
                        </div>

                        {/* Top Queries Table */}
                        <div className="bg-white p-4 rounded-lg shadow-sm col-span-2">
                          {/* ... table component ... */}
                        </div>
                      </>
                    ) : (
                      <div className="bg-white p-8 rounded-lg shadow-sm col-span-2">
                        <div className="text-center">
                          <FiAlertTriangle className="mx-auto text-5xl text-amber-500 mb-4" />
                          <h3 className="text-xl font-medium text-gray-700 mb-2">
                            Search Console Data Unavailable
                          </h3>
                          <p className="text-gray-500 mb-4">
                            {searchConsoleData?.error ||
                              'To access Search Console data, you need to verify ownership of your site in Google Search Console and grant access to the service account.'}
                          </p>
                          <a
                            href="https://search.google.com/search-console"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                          >
                            Open Google Search Console
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </Paper>
      </div>
    </>
  );
}
