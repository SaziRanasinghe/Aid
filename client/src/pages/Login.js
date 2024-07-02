import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import donate from '../assets/login-image/don.webp';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Perform login logic here
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    
    if (response.ok) {
      // On successful login, navigate to the desired route
      navigate('/donate');
    } else {
      // Handle login failure (e.g., display error message)
      alert(data.msg);
    }
  };

  return (
    <div className="relative py-20 2xl:py-10 overflow-hidden">
      <div className="relative container px-4 mx-auto">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center -mx-4">
            <div className="w-full lg:w-1/2 px-4 mb-16 lg:mb-0">
              <div className="max-w-md -ml-32">
                <h2 className="-mt-60 mb-0 text-5xl font-bold font-heading text-white">Start your journey by creating an account.</h2>
                <p className="text-lg text-gray-200">
                  "Log in to donate and
                  <span className="text-orange-400"> make a difference today! "</span>
                </p>
                <img className='-mt-15 -mb-60 animate-pulse' src={donate} alt=''/>
              </div>
            </div>
            <div className="w-full lg:w-1/2 px-4">
              <div className="px-4 lg:px-10 py-12 lg:py-15 text-center bg-gray-500 rounded-lg">
                <h1 className="text-blue-700 text-5xl font-bold">Log In</h1>
                <h2 className="text-white text-2xl font-extralight mb-2 mx-10">Welcome to your <span className='text-orange-400 font-bold'>AidNexus!</span></h2>
                <form className="flex flex-col" onSubmit={handleSubmit}>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border py-3 px-3 mx-10 my-6 rounded-sm text-black placeholder:text-sm placeholder:text-slate-500 focus:outline-none focus:border-orange-700 duration-300"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border py-3 px-3 mx-10 my-3 rounded-sm text-black placeholder:text-sm placeholder:text-slate-500 focus:outline-none focus:border-blue-700 duration-300"
                  />
                  <Link to='/donate'>
        <button type="button" class="mx-10 my-5 py-3 px-3 bg-blue-800 text-slate-50 rounded-sm text-sm font-normal hover:bg-blue-600 hover:bg-opacity-90 duration-200">
          Sign in
        </button></Link>
                </form>
                <p className="text-sm text-blue-300 font-extralight">Or sign-in with</p>
                <div className="flex space-x-4 justify-center mx-10 my-5 border-b pb-8">
                  <div className="p-2 bg-red-600 text-white rounded-full hover:scale-110 duration-200 cursor-pointer shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-google" viewBox="0 0 16 16">
                      <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
                    </svg>
                  </div>
                   
                </div>
                <div className="mb-2">
                  <span className="text-blue-300 text-xs mb-2">No account?
                    <Link to='/signup'>
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
