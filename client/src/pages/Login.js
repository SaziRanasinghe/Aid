import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import donate from '../assets/login-image/don.webp';

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleLoginSuccess = (token, role, id) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userRole', role);
    localStorage.setItem('userId', id);

    switch(role) {
      case 'donor':
        navigate('/donate');
        break;
      case 'distributor':
        navigate('/distribute');
        break;
      case 'recipient':
        navigate('/products');
        break;
      case 'admin':
        navigate('/dashboard');
        break;
      default:
        navigate('/mainpage');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Check for admin credentials
      if (values.email === 'admin@example.com' && values.password === 'admin123') {
        const dummyAdminToken = 'admin-dummy-token-' + Date.now();
        localStorage.setItem('isAdmin', 'true');
        handleLoginSuccess(dummyAdminToken, 'admin', '0');
        return;
      }

      const res = await axios.post('http://localhost:5000/api/login', values);
      if (res.data.token && res.data.role && res.data.userId) {
        localStorage.removeItem('isAdmin');
        handleLoginSuccess(res.data.token, res.data.role, res.data.userId);
        console.log('User ID:', res.data.userId);
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 401) {
        setError('Invalid username or password');
      } else {
        setError('An error occurred during login. Please try again later.');
      }
    }
  };

  return (
      <div className="relative py-20 2xl:py-10 overflow-hidden">
        <div className="relative container px-4 mx-auto">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap items-center -mx-4">
              <div className="w-full lg:w-1/2 px-4 mb-16 lg:mb-0">
                <div className="max-w-md -ml-32">
                  <h2 className="-mt-60 mb-0 text-5xl font-bold font-heading text-white">
                    Start your journey by creating an account.
                  </h2>
                  <p className="text-lg text-gray-200">
                    "Log in to donate and
                    <span className="text-orange-400"> make a difference today! "</span>
                  </p>
                  <img className="-mt-15 -mb-60 animate-pulse" src={donate} alt="" />
                </div>
              </div>
              <div className="w-full lg:w-1/2 px-4">
                <div className="px-4 lg:px-10 py-12 lg:py-15 text-center bg-gray-500 rounded-lg">
                  <h1 className="text-blue-700 text-5xl font-bold">Log In</h1>
                  <h2 className="text-white text-2xl font-extralight mb-2 mx-10">
                    Welcome to your <span className="text-orange-400 font-bold">AidNexus!</span>
                  </h2>
                  <form className="flex flex-col" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={values.email}
                        onChange={handleInput}
                        className="border py-3 px-3 mx-10 my-6 rounded-sm text-black placeholder:text-sm placeholder:text-slate-500 focus:outline-none focus:border-orange-700 duration-300"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={values.password}
                        onChange={handleInput}
                        className="border py-3 px-3 mx-10 my-3 rounded-sm text-black placeholder:text-sm placeholder:text-slate-500 focus:outline-none focus:border-blue-700 duration-300"
                    />
                    {error && <div className="text-red-500 my-3">{error}</div>}
                    <button
                        type="submit"
                        className="mx-10 my-5 py-3 px-3 bg-blue-800 text-slate-50 rounded-sm text-sm font-normal hover:bg-blue-600 hover:bg-opacity-90 duration-200"
                    >
                      Sign in
                    </button>
                  </form>
                  <p className="text-sm text-blue-300 font-extralight">Or sign-in with</p>
                  <div className="flex space-x-4 justify-center mx-10 my-5 border-b pb-8">
                    <div className="p-2 bg-red-600 text-white rounded-full hover:scale-110 duration-200 cursor-pointer shadow-sm">
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="currentColor"
                          className="bi bi-google"
                          viewBox="0 0 16 16"
                      >
                        <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
                      </svg>
                    </div>
                  </div>
                  <div className="mb-2">
                  <span className="text-blue-300 text-xs mb-2">
                    No account?
                    <Link to="/signup">
                      <span className="text-blue-500 cursor-pointer"> Register</span>
                    </Link>
                  </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Login;