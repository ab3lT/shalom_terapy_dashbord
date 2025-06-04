import Logo from '../../assets/image/logo.png';
// import { MyContext } from '../../App';
import { useContext, useEffect, useState } from 'react';
import patern from '../../assets/image/patern.jpeg';
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './login.css';

const Login = () => {
  const [inputIndex, setInputIndex] = useState(null);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    userName: '',
    password: ''
  });
  const [error, setError] = useState('');
  // const context = useContext(MyContext);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Hide sidebar/header and set tab title/icon
    context.setIsHideSidebarAndHeader(true);
    document.title = "Login";
    const favicon = document.querySelector("link[rel='icon']");
    if (favicon) favicon.href = Logo;

    // If already authenticated, redirect to home
    if (user) {
      const authority = user.authority;
      
      // Redirect based on authority
      if (authority === 'ADMIN') {
        navigate('/admin', { replace: true });
      } else if (authority === 'EMPLOYEE') {
        navigate('/employee', { replace: true });
      } else {
        navigate('/login', { replace: true });
      }
    }
  }, [user, context, navigate]);

  const focusInput = (index) => {
    setInputIndex(index);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await login(credentials);
      if (success) {
        // Get authority from the credentials
        const authority = credentials.authority;
        
        // Redirect based on authority
        if (authority === 'ADMIN') {
          navigate('/admin', { replace: true });
        } else if (authority === 'EMPLOYEE') {
          navigate('/employee', { replace: true });
        } else {
          setError('Invalid user role');
        }
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="login-container">
      <img src={patern} className='logoPatern' alt="Pattern" />
      <section className="loginSection">
        <div className="loginBox">
          <div className='logo text-center'>
            <img src={Logo} width="120px" alt="Logo" />
            <h5 className='font-weight-bold'>Login to Shalom Therapy</h5>
          </div>

          <div className='wrapper wrapperlogin mt-3 card1 border p-4'>
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className={`form-group mb-3 position-relative ${inputIndex === 0 && 'focus'}`}>
                <span className='icon'><MdEmail /></span>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Enter your Username'
                  name="userName"
                  value={credentials.userName}
                  onChange={handleChange}
                  onFocus={() => focusInput(0)}
                  onBlur={() => setInputIndex(null)}
                />
              </div>

              <div className={`form-group mb-3 position-relative ${inputIndex === 1 && 'focus'}`}>
                <span className='icon'><RiLockPasswordFill /></span>
                <input
                  type={isShowPassword ? 'text' : 'password'}
                  className='form-control'
                  placeholder='Enter your Password'
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  onFocus={() => focusInput(1)}
                  onBlur={() => setInputIndex(null)}
                />
                <span className='toggleShowPassword' onClick={() => setIsShowPassword(!isShowPassword)}>
                  {isShowPassword ? <IoMdEye /> : <IoMdEyeOff />}
                </span>
              </div>

              <div className='form-group'>
                <Button
                  variant="contained"
                  type="submit"
                  className="btn-blue btn-lg w-100 btn-big"
                >
                  Sign In
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
