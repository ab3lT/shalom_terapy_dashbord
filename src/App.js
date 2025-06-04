import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { createContext, useEffect, useState } from 'react';

import Header from './components/Header/index.js';
import Sidbar from './components/Sidbar/index.js';
import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/Login/index.js';
import SignUp from './pages/SignUp/index.js';
import Dashbord from './pages/Dashbord/index.js';
import Products from './pages/Products/index.js';
import ProductDetails from './pages/ProductDetails/index.js';
import CustomerList from './pages/Customer/index.js';
import CustomerDetails from './pages/CustomerDetails/index.js';
import Messenger from './pages/Messenger/index.js';
// import Unauthorized from './pages/Unauthorized';
import EmployeeDashboard from './pages/EmployeeDashboard';

import { AuthProvider } from './contexts/AuthContext';

// Direct routes
const AdminDashboard = () => <Dashbord />;
const EmployeeDashboardRoute = () => <EmployeeDashboard />;

// Simple Home route
const Home = () => {
  return <Navigate to="/admin/dashboard" replace />;
};

function App() {
  const [isToggleSidebar, setIsToggleSidebar] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isHideSidebarAndHeader, setIsHideSidebarAndHeader] = useState(false);
  const [themeMode, setThemeMode] = useState(true);
  const [isMessenger, setIsMessenger] = useState(false);

  useEffect(() => {
    if (themeMode) {
      document.body.classList.remove('dark');
      document.body.classList.add('light');
      localStorage.setItem('themeMode', 'light');
    } else {
      document.body.classList.remove('light');
      document.body.classList.add('dark');
      localStorage.setItem('themeMode', 'dark');
    }
  }, [themeMode]);

  const values = {
    isToggleSidebar,
    setIsToggleSidebar,
    isLogin,
    setIsLogin,
    isHideSidebarAndHeader,
    setIsHideSidebarAndHeader,
    themeMode,
    setThemeMode,
    isMessenger,
    setIsMessenger,
  };

  return (
    <AuthProvider>
      <MyContext.Provider value={values}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            
            {/* Protected routes */}
            <Route path="/admin/*" element={<AdminLayout />}>
              <Route index element={<Dashbord />} />
              <Route path="products" element={<Products />} />
              <Route path="customers" element={<CustomerList />} />
              <Route path="customers/:id" element={<CustomerDetails />} />
              <Route path="employees" element={<EmployeeDashboard />} />
            </Route>

            <Route path="/employee/*" element={<EmployeeLayout />}>
              <Route index element={<EmployeeDashboard />} />
              <Route path="customers" element={<CustomerList />} />
              <Route path="customers/:id" element={<CustomerDetails />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </MyContext.Provider>
    </AuthProvider>
  );
}

export default App;
// export { MyContext };

// Clean up old context files
const cleanupOldContext = () => {
  const oldContextPath = './context/AuthContext';
  try {
    if (require.resolve(oldContextPath)) {
      console.log('Found old context file, cleaning up...');
    }
  } catch (error) {
    console.log('No old context file found');
  }
};

cleanupOldContext();
