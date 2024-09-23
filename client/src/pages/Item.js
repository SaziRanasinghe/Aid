import React, { useState } from 'react';
import cloth from '../assets/category-images/cloth.png'
import { Link } from 'react-router-dom';

function Item() {
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
    <div class="antialiased">
  

     
    <div class="bg-white shadow-sm sticky top-0">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1 md:py-4">
        <div class="flex items-center justify-between md:justify-start">
          {/* <!-- Menu Trigger --> */}
          <button type="button" class="md:hidden w-10 h-10 rounded-lg -ml-2 flex justify-center items-center">
            <svg class="text-gray-500 w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          {/* <!-- ./ Menu Trigger --> */}
    
          <a href="/category" class="font-bold text-gray-700 text-2xl">Shop.</a>
    
          <div class="hidden md:flex space-x-3 flex-1 lg:ml-8">
            <a href="#" class="px-2 py-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600">Electronics</a>
            <a href="#" class="px-2 py-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600">Fashion</a>
            <a href="#" class="px-2 py-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600">Tools</a>
            <a href="#" class="px-2 py-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600">Books</a>
            <a href="#" class="px-2 py-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600">More</a>
          </div>
    
          <div class="flex items-center space-x-4">
            <div class="relative hidden md:block">
              <input type="search" class="pl-10 pr-2 h-10 py-1 rounded-lg border border-gray-200 focus:border-gray-300 focus:outline-none focus:shadow-inner leading-none" placeholder="Search"/>
              <svg class="h-6 w-6 text-gray-300 ml-2 mt-2 stroke-current absolute top-0 left-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
    
             </div>
             </div>
    
        {/* <!-- Search Mobile --> */}
        <div class="relative md:hidden">
          <input type="search" class="mt-1 w-full pl-10 pr-2 h-10 py-1 rounded-lg border border-gray-200 focus:border-gray-300 focus:outline-none focus:shadow-inner leading-none" placeholder="Search"/>
    
          <svg class="h-6 w-6 text-gray-300 ml-2 mt-3 stroke-current absolute top-0 left-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        {/* <!-- ./ Search Mobile --> */}
    
      </div>
    </div>
    
    <div class="py-6">
      {/* <!-- Breadcrumbs --> */}
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center space-x-2 text-gray-400 text-sm">
          <a href="/category" class="hover:underline hover:text-gray-600">Category</a>
          <span>
            <svg class="h-5 w-5 leading-none text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </span>
          <a href="/products" class="hover:underline hover:text-gray-600">Products</a>
          <span>
            <svg class="h-5 w-5 leading-none text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </span>
          <span>Items</span>
        </div>
      </div>
      {/* <!-- ./ Breadcrumbs --> */}
    
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div class="flex flex-col md:flex-row -mx-4">
          <div class="md:flex-1 px-4">
            <div x-data="{ image: 1 }" x-cloak>
              <div class="h-64 md:h-80 rounded-lg bg-gray-100 mb-4">
                <div x-show="image === 1" class="h-64 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center">
                <img src={cloth} alt='' className='w-[190px] ml-16 mt-8 absolute '/>
                </div>
    
                {/* <div x-show="image === 2" class="h-64 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center">
                  <span class="text-5xl">2</span>
                </div>
    
                <div x-show="image === 3" class="h-64 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center">
                  <span class="text-5xl">3</span>
                </div>
    
                <div x-show="image === 4" class="h-64 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center">
                  <span class="text-5xl">4</span>
                </div> */}
              </div>
    
              
            </div>
          </div>
          <div class="md:flex-1 px-4">
            <h2 class="mb-2 leading-tight tracking-tight font-bold text-orange-600 text-2xl md:text-3xl">T-shirt with Ice Cap </h2>
            <p class="text-gray-500 text-sm">By <a href="#" class="text-indigo-600 hover:underline">Nimal perera</a></p>
    
            <div class="flex items-center space-x-4 my-4">
               
              <div class="flex-1">
                <p class="text-orange-400 text-xl font-semibold">Free of Charge</p>
                <p class="text-gray-400 text-sm">Free Delivery</p>
              </div>
            </div>
    
            <p class="text-gray-300"> one time used. good condition and good look. red and white colors. white ice cap. location is kottawa. size is medium. imported from america and brand is crokodile.</p>
            <div class="flex py-4 space-x-4">
            <Link to="#"> 
              <button type="button" class="h-14 px-6 py-2 font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white" onClick={toggleDialog}>
                Confirm & Request Delivery
              </button></Link>
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
          </div>
        </div>
      </div>
    </div>
  
      </div>
  )
}

export default Item