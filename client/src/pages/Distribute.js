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
    <div className="my-4 mx-auto max-w-screen-lg px-4 md:px-8">
      <div className="grid gap-8 sm:grid-cols-2">
        {/* Content - start */}
        <div className="flex flex-col items-center justify-center sm:items-start md:py-12 lg:py-16">
        <h1 className='text-5xl font-bold'> Free Transport with <span className='text-orange-600'>AidNexus</span></h1><br/>
          <p className="text-gray-txt mb-5">
            Take advantage of free transportation when you donate through AidNexus. Your generosity is made easier with our hassle-free service, ensuring your donations reach those in need without any extra cost to you. Join us in making a difference today!
          </p>
           
           
        </div> 

        {/* Image - start */}
        <div className="relative h-80 overflow-hidden md:h-auto mt-8">
          <img src={distribute} alt="Distribute" className="w-full h-auto" />
        </div>
        {/* Image - end */}
      </div>
 
      <div className="relative px-4 min-h-screen md:flex md:items-center md:justify-center">
  {/* Available Requests Header */}
  <h1 className="text-4xl font-bold text-orange-500 text-center mt-12 md:absolute md:top-4 md:left-0 md:right-0 md:mx-auto md:z-50">
    Available Requests
  </h1>

  {/* Dark overlay */}
  <div className="bg-black opacity-25 w-full h-full absolute z-10 inset-0"></div>

  {/* Cards Section */}
  <div className="md:max-w-2xl md:mx-auto md:relative md:flex md:flex-wrap md:justify-center">
    {/* First Row */}
    <div className="bg-white rounded-lg p-4 mb-4 mx-4 md:w-72">
      <div className="md:flex items-center">
        <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
          <p className="font-bold text-blue-800">Request Delivery</p>
          <p className="text-sm text-gray-700 mt-1">
            Location - Kottawa <br/>
            Item - Furniture
          </p>
        </div>
      </div>
      <div className="text-center md:text-right mt-4 md:flex md:justify-end">
        <button className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 text-red-700 rounded-lg font-semibold text-sm md:ml-2">
          Get Pickup
        </button>
      </div>
    </div>

    <div className="bg-white rounded-lg p-4 mb-4 mx-4 md:w-72">
      <div className="md:flex items-center">
        <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
          <p className="font-bold text-blue-800">Request Delivery</p>
          <p className="text-sm text-gray-700 mt-1">
            Location - Kottawa <br/>
            Item - Furniture
          </p>
        </div>
      </div>
      <div className="text-center md:text-right mt-4 md:flex md:justify-end">
        <button className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 text-red-700 rounded-lg font-semibold text-sm md:ml-2">
          Get Pickup
        </button>
      </div>
    </div>

    {/* Second Row */}
    <div className="bg-white rounded-lg p-4 mb-4 mx-4 md:w-72">
      <div className="md:flex items-center">
        <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
          <p className="font-bold text-blue-800">Request Delivery</p>
          <p className="text-sm text-gray-700 mt-1">
            Location - Kottawa <br/>
            Item - Furniture
          </p>
        </div>
      </div>
      <div className="text-center md:text-right mt-4 md:flex md:justify-end">
        <button className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 text-red-700 rounded-lg font-semibold text-sm md:ml-2">
          Get Pickup
        </button>
      </div>
    </div>

    <div className="bg-white rounded-lg p-4 mb-4 mx-4 md:w-72">
      <div className="md:flex items-center">
        <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
          <p className="font-bold text-blue-800">Request Delivery</p>
          <p className="text-sm text-gray-700 mt-1">
            Location - Kottawa <br/>
            Item - Furniture
          </p>
        </div>
      </div>
      <div className="text-center md:text-right mt-4 md:flex md:justify-end">
        <button className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 text-red-700 rounded-lg font-semibold text-sm md:ml-2">
          Get Pickup
        </button>
      </div>
    </div>
  </div>
</div>

   
      
    </div>
    
  );
}

export default Distribute;
