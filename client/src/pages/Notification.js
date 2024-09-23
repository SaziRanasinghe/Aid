// NotificationPage.js
import React, { useState } from 'react';
import contactus from '../assets/main-images/contactus.webp';

const Notification = () => {
  const [notifications] = useState([
    { id: 1, message: '0771234567', timestamp: '2 minutes ago' },
    { id: 2, message: '0719876543', timestamp: '10 minutes ago' },
    { id: 3, message: '0777726789', timestamp: '1 hour ago' },
  ]);

  return (
    <div className="bg-blue-950 min-h-screen p-6">
        <h1 className="text-orange-500 text-4xl text-center mt-10 mb-8">Contributer's Contacts</h1>
        <div className="flex flex-col md:flex-row items-start justify-between">
          <img className="md:w-1/2 lg:w-1/3 mb-4 md:mb-0" src={contactus} alt="Payment" />
          <div className="w-full md:w-1/2 lg:w-2/3">
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
      
          <h2 className="text-xl font-semibold text-orange-300 mb-4">Notifications</h2>
          <ul>
            {notifications.map((notification) => (
              <li
                key={notification.id}
                className="flex items-center justify-between p-4 mb-2 bg-gray-50 rounded-lg shadow hover:bg-gray-100 transition duration-300"
              >
                <div>
                  <p className="text-gray-700">{notification.message}</p>
                  <small className="text-gray-500">{notification.timestamp}</small>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default Notification;
