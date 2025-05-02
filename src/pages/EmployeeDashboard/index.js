import React from 'react';
import { useAuth } from '../../context/AuthContext';

const EmployeeDashboard = () => {
    const { user, logout } = useAuth();

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold">Welcome, {user?.name || 'Employee'}</h1>
                <button
                    onClick={logout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                    Logout
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Today's Bookings</h2>
                    <p className="text-gray-600">View and manage today's appointments</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Customer Management</h2>
                    <p className="text-gray-600">Access customer information and history</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Service Management</h2>
                    <p className="text-gray-600">View and update service details</p>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDashboard; 