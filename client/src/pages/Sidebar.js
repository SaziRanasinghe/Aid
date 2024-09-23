 
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ toggleDialog }) => {
  return (
    <div className="flex min-h-screen"> 
    <aside className="w-64 bg-blue-950 text-gray-100 flex flex-col">
      <div className="py-8 px-6 text-2xl font-bold text-orange-400">Admin Page</div>
      <nav className="flex-1 px-4 py-2">
        <ul>
          <li>
            <Link to="/dashboard" className="flex items-center p-2 rounded-lg hover:bg-gray-700">
              <span className="ml-3">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/payments" className="flex items-center p-3 rounded-lg hover:bg-gray-700">
              <span className="ml-3">Payments</span>
            </Link>
          </li>
          <li>
            <Link to="/profile" className="flex items-center p-3 rounded-lg hover:bg-gray-700">
              <span className="ml-3">Profile</span>
            </Link>
          </li>
          <li>
            <button onClick={toggleDialog} className="flex items-center p-3 rounded-lg hover:bg-gray-700">
              <span className="ml-3">Event Form</span>
            </button>
          </li>
          <li>
            <Link to="/notification" className="flex items-center p-3 rounded-lg hover:bg-gray-700">
              <span className="ml-3">Notifications</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside></div>
  );
};

export default Sidebar;
