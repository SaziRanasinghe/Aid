import React, { useState } from 'react';
import distribute from '../assets/main-images/distri.webp';
import { Link } from 'react-router-dom';

function Distribute() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted');
    toggleDialog();
  };

  return (
    <div className="my-8 mx-auto max-w-screen-lg px-4 md:px-8">
      <div className="grid gap-8 sm:grid-cols-2">
        {/* Content - start */}
        <div className="flex flex-col items-center justify-center sm:items-start md:py-24 lg:py-32">
          <h1 className="text-4xl font-bold text-orange-600 mb-5">Give Now</h1>
          <p className="text-gray-txt mb-5">
            Take advantage of free transportation when you donate through AidNexus. Your generosity is made easier with our hassle-free service, ensuring your donations reach those in need without any extra cost to you. Join us in making a difference today!
          </p>
          <Link to="#">
            <button
              type="button"
              className="p-4 text-white bg-orange-600 hover:bg-orange-400 focus:ring-4 focus:outline-none focus:ring-[orange]/0 font-medium rounded-lg text-m px-8 py-1.5 text-center inline-flex items-center me-2 mb-2"onClick={toggleDialog}
            >
              Free PickUp
            </button>
          </Link>
           
        </div>
        {/* Content - end */}

        {/* Image - start */}
        <div className="relative h-80 overflow-hidden md:h-auto">
          <img src={distribute} alt="Distribute" className="w-full h-auto" />
        </div>
        {/* Image - end */}
      </div>

      {/* Modal */}
      {isDialogOpen && (
        <div
          className="fixed inset-0 z-10 flex items-center justify-center mt-2 overflow-auto bg-black bg-opacity-50"
          onClick={toggleDialog}
        >
          <div
            className="bg-white shadow-2xl m-4 sm:m-8 p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center border-b pb-2 text-xl">
              <h6 className="text-xl text-black font-bold">Add Donation Information</h6>
              <button type="button" className="text-black" onClick={toggleDialog}>
                ✖
              </button>
            </div>
            <div className="p-2">
              <form onSubmit={handleFormSubmit}>
              <div className="mb-4 flex space-x-4">
    <div className="flex-1">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fname">
        First Name
      </label>
      <input
        type="text"
        id="fname"
        name="fname"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        required
      />
    </div>
    <div className="flex-1">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lname">
        Last Name
      </label>
      <input
        type="text"
        id="lname"
        name="lname"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        required
      />
    </div>
  </div>
  <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address1">
                    Address Line 1
                  </label>
                  <input
                    type="text"
                    id="address1"
                    name="address1"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address2">
                    Address Line 2
                  </label>
                  <input
                    type="text"
                    id="address2"
                    name="address2"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-4 flex space-x-4">
    <div className="flex-1">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                  </div>
                  
                  <div className="flex-1">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="zip">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    id="zip"
                    name="zip"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                  </div>
                  </div>
                  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
      Category of Goods
    </label>
    <select
      id="category"
      name="category"
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      required
    >
      <option value="">Select a category</option>
      <option value="electronics">Electronics</option>
      <option value="furniture">Furniture</option>
      <option value="clothing">Clothing</option>
      <option value="books">Books</option>
      <option value="other">Other</option>
    </select>
  </div>
                  <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={toggleDialog}
                  >
                    Cancel
                  </button>
                </div>
                <p className="mb-4 text-black">By providing your phone number, you are consenting to receive calls and SMS/MMS msgs, including autodialed<br/> and prerecorded calls and texts, to that number regarding your donation and future opportunities to donate.</p>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Distribute;
