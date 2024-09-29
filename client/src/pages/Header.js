import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/main-images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');
    setIsLoggedIn(!!token);
    setUserRole(role);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    setUserRole(null);
    navigate('/login');
  };

  return (
      <div className='md:static justify-between md:min-h-fit min-h-[30vh] left-0 top-[-9%] flex items-center mt-2 w-full px-5 bg-gray-700/80'>
        <img className="h-12 w-auto" src={Logo} alt="logo" />
        <div className='md:hidden ml-auto'>
          <button onClick={toggleMenu} className='text-gray-200'>
            <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} size="2x" />
          </button>
        </div>

        <ul className={`flex flex-col md:flex-row md:items-center md:gap-[4vw] gap-6 absolute md:static w-full md:w-auto top-16 md:top-0 left-0 bg-gray-700/80 md:bg-transparent transition-transform transform ${menuOpen ? 'translate-y-0' : '-translate-y-full md:translate-y-0'}`}>
          <li><a href="/#" className='p-4 text-gray-200 rounded md:hover:text-blue-700'>HOME</a></li>
          <li><a href='/gallery' className='p-4 text-gray-200 rounded md:hover:text-blue-700'>GALLERY</a></li>
          <li><a href='/contactus' className='p-4 text-gray-200 rounded md:hover:text-blue-700'>CONTACT</a></li>
          <li><a href='/events' className='p-4 text-gray-200 rounded md:hover:text-blue-700'>EVENTS</a></li>

          {isLoggedIn && (userRole === 'donor' ) && (
              <li><a href='/donate' className='p-4 text-gray-200 rounded md:hover:text-blue-700'>DONATE</a></li>
          )}

          {isLoggedIn && ( userRole === 'distributor') && (
              <li><a href='/distribute' className='p-4 text-gray-200 rounded md:hover:text-blue-700'>DISTRIBUTE</a></li>
          )}

          {isLoggedIn && userRole === 'receiver' && (
              <li><a href='/products' className='p-4 text-gray-200 rounded md:hover:text-blue-700'>RECEIVE</a></li>
          )}
          {
            isLoggedIn? (
                <li><a href='/user' className='p-4 text-gray-200 rounded md:hover:text-blue-700'>PROFILE</a></li>
            ): (
                <li><a href='/aboutus' className='p-4 text-gray-200 rounded md:hover:text-blue-700'>ABOUTUS</a></li>
            )
          }
          <li>
            {isLoggedIn ? (

                <button
                    onClick={handleLogout}
                    className="p-4 text-white bg-red-500 hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-[red]/90 font-medium rounded-lg text-m px-8 py-1.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2"
                >
                  Logout
                </button>
            ) : (
                <Link to='/login'>
                  <button type="button" className="p-4 text-white bg-orange-500 hover:bg-orange-400 focus:ring-4 focus:outline-none focus:ring-[orange]/90 font-medium rounded-lg text-m px-8 py-1.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2">
                    Login Here
                  </button>
                </Link>
            )}
          </li>
        </ul>
      </div>
  );
}
