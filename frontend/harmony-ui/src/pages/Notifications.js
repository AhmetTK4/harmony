import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const data = await apiService.getNotifications();
      setNotifications(data);
    } catch (err) {
      setError('Failed to fetch notifications');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading notifications...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Notifications
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Stay updated with your latest notifications
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {notifications.map((notification) => (
            <div key={notification.id} className={`bg-white shadow overflow-hidden sm:rounded-lg ${
              !notification.read ? 'border-l-4 border-indigo-500' : ''
            }`}>
              <div className="px-4 py-5 sm:px-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {notification.title}
                  </h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    notification.read ? 'bg-gray-100 text-gray-800' : 'bg-indigo-100 text-indigo-800'
                  }`}>
                    {notification.read ? 'Read' : 'Unread'}
                  </span>
                </div>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  {notification.message}
                </p>
              </div>
              <div className="border-t border-gray-200">
                <dl>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Type</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {notification.type}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Created At</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {new Date(notification.createdAt).toLocaleString()}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          ))}
        </div>

        {notifications.length === 0 && (
          <div className="text-center mt-12">
            <p className="text-gray-500">No notifications available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications; 