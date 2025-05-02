import React from 'react';
import { useAuth } from '../context/AuthContext';

const EmployeeDashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold text-gray-900">
                Employee Dashboard
              </h1>
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">Welcome, {user?.sub}</span>
                <button
                  onClick={logout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                >
                  Logout
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Employee-specific features */}
              <div className="bg-blue-50 p-6 rounded-lg">
                <h2 className="text-lg font-medium text-blue-900 mb-4">
                  Today's Bookings
                </h2>
                <p className="text-blue-700">
                  View and manage today's appointments
                </p>
              </div>

              <div className="bg-green-50 p-6 rounded-lg">
                <h2 className="text-lg font-medium text-green-900 mb-4">
                  Customer Management
                </h2>
                <p className="text-green-700">
                  View customer details and history
                </p>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg">
                <h2 className="text-lg font-medium text-purple-900 mb-4">
                  Service Management
                </h2>
                <p className="text-purple-700">
                  View available services and schedules
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard; 