import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { createContext, useEffect, useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/Login/index.js';
import Unauthorized from './pages/Unauthorized';
import ProtectedRoute from './components/ProtectedRoute';

import Header from './components/Header/index.js';
import Sidbar from './components/Sidbar/index.js';

import SignUp from './pages/SignUp/index.js';
import Dashbord from './pages/Dashbord/index.js';
import Products from './pages/Products/index.js';
import ProductDetails from './pages/ProductDetails/index.js';
import CustomerList from './pages/Customer/index.js';
import CustomerDetails from './pages/CustomerDetails/index.js';
import Messenger from './pages/Messenger/index.js';
import EmployeeDashboard from './pages/EmployeeDashboard';

// Create context for app-wide state
export const AppContext = createContext();

// Admin Layout Component
const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout">
      {/* Add your admin layout components here */}
      {children}
    </div>
  );
};

// Employee Layout Component
const EmployeeLayout = ({ children }) => {
  return (
    <div className="employee-layout">
      {/* Add your employee layout components here */}
      {children}
    </div>
  );
};

// Admin Dashboard Component
const AdminDashboard = () => (
  <ProtectedRoute requiredRole="ADMIN">
    <AdminLayout>
      <div>Admin Dashboard Content</div>
    </AdminLayout>
  </ProtectedRoute>
);

// Employee Dashboard Component
const EmployeeDashboardRoute = () => <EmployeeDashboard />;

// Home Component with role-based redirection
const Home = () => {
  const { isAuthenticated, hasRole } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (hasRole('ADMIN')) {
    return <Navigate to="/admin" replace />;
  }

  if (hasRole('EMPLOYEE')) {
    return <Navigate to="/employee" replace />;
  }

  return <Navigate to="/login" replace />;
};

function App() {
  const [isToggleSidebar, setIsToggleSidebar] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isHideSidebarAndHeader, setIsHideSidebarAndHeader] = useState(false);
  const [themeMode, setThemeMode] = useState(true);
  const [isMessenger, setIsMessenger] = useState(false);
  const [appState, setAppState] = useState({
    isHideSidebarAndHeader: false,
    // Add other app-wide state here
  });

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
      <AppContext.Provider value={{ ...appState, setAppState }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            
            {/* Protected routes */}
            <Route path="/admin/*" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<Products />} />
              <Route path="customers" element={<CustomerList />} />
              <Route path="customers/:id" element={<CustomerDetails />} />
              <Route path="employees" element={<EmployeeDashboardRoute />} />
            </Route>

            <Route path="/employee/*" element={<EmployeeLayout />}>
              <Route index element={<EmployeeDashboardRoute />} />
              <Route path="customers" element={<CustomerList />} />
              <Route path="customers/:id" element={<CustomerDetails />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppContext.Provider>
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
