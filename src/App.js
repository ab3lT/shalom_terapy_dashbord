import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashbord from './pages/Dashbord/index.js';
import Header from './components/Header/index.js';
import Sidbar from './components/Sidbar/index.js';
import { createContext, useEffect, useState } from 'react';
import Login from './pages/Login/index.js';
import SignUp from './pages/SignUp/index.js';
import Products from './pages/Products/index.js';
import ProductDetails from './pages/ProductDetails/index.js';
import Messenger from './pages/Messenger/index.js';
import CustomerList from './pages/Customer/index.js';
import CustomerDetails from './pages/CustomerDetails/index.js';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Unauthorized from './pages/Unauthorized';
import EmployeeDashboard from './pages/EmployeeDashboard';

const MyContext = createContext();

// Admin Dashboard Component
const AdminDashboard = () => (
  <ProtectedRoute requiredRole="ADMIN">
    <Dashbord />
  </ProtectedRoute>
);

// Employee Dashboard Component
const EmployeeDashboardRoute = () => (
  <ProtectedRoute requiredRole="EMPLOYEE">
    <EmployeeDashboard />
  </ProtectedRoute>
);

// Home Component with role-based redirection
const Home = () => {
  const { isAuthenticated, hasRole } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (hasRole('ADMIN')) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  if (hasRole('EMPLOYEE')) {
    return <Navigate to="/employee/dashboard" replace />;
  }

  return <Navigate to="/login" replace />;
};

function App() {
  const [isToggleSidebar, setIsToggleSidebar] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isHideSidebarAndHeader, setIsHideSidebarAndHeader] = useState(false);
  const [themeMode, setThemeMode] = useState(true);
  const [isMessenger, setIsMessenger] = useState(false);

  useEffect(() => {
    if(themeMode){
      document.body.classList.remove('dark');
      document.body.classList.add('light');
      localStorage.setItem('themeMode', 'light');
    }
    else{
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
        <BrowserRouter className='layout'>
          {
            isHideSidebarAndHeader !== true &&  <Header />
          }
          
          <div className='main d-flex'>
            {
              isHideSidebarAndHeader !== true && 
              <div className={`sidebarWrapper ${isToggleSidebar===true ? 'toggle' : ''}`}>
                <Sidbar />
              </div>
            }

            {
              isMessenger !== false &&
              <div className={`MessengerWrapper' ${isToggleSidebar===true ? 'toggle' : ''}`}>
                <Messenger />
              </div>
            }

            <div className={`content ${isHideSidebarAndHeader===true && 'full'} ${isToggleSidebar===true ? 'toggle' : ''}`}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/employee/dashboard" element={<EmployeeDashboardRoute />} />
                <Route path="/dashbord" exact={true} element={<Dashbord />} />
                <Route path="/signup" exact={true} element={<SignUp />} />
                <Route path="/product/list" exact={true} element={<Products />} />
                <Route path="/product/details" exact={true} element={<ProductDetails />} />
                <Route path="customer/list" exact={true} element={<CustomerList />} />
                <Route path="/customer/details/1" exact={true} element={<CustomerDetails />} />
                <Route path="/customer/details/2" exact={true} element={<CustomerDetails />} />
                <Route path="/customer/details/3" exact={true} element={<CustomerDetails />} />
                <Route path="/customer/details/4" exact={true} element={<CustomerDetails />} />
                <Route path="/customer/details/5" exact={true} element={<CustomerDetails />} />
                <Route path="/customer/details/6" exact={true} element={<CustomerDetails />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </MyContext.Provider>
    </AuthProvider>
  );
}

export default App;
export {MyContext};