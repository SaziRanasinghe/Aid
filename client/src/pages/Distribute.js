import React, { useState, useEffect } from 'react';
import axios from 'axios';
import distribute from '../assets/main-images/distri.webp';

function Distribute() {
  const [availableItems, setAvailableItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAvailableItems();
  }, []);

  const fetchAvailableItems = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:5000/api/distribution/available-items');
      setAvailableItems(response.data);
      setIsLoading(false);
    } catch (err) {
      console.error('Error fetching available items:', err);
      setError('Failed to load available items. Please try again later.');
      setIsLoading(false);
    }
  };

  const handleGetPickup = async (itemId) => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('You must be logged in to pick up an item.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/distribution/assign', {
        itemId: itemId,
        userId: userId
      });
      alert(response.data.message);
      fetchAvailableItems(); // Refresh the list of available items
    } catch (error) {
      console.error('Error assigning item:', error);
      if (error.response && error.response.data && error.response.data.error) {
        alert(`Failed to assign item: ${error.response.data.error}`);
      } else {
        alert('Failed to assign item. Please try again.');
      }
    }
  };

  return (
      <div className="my-4 mx-auto max-w-screen-lg px-4 md:px-8">
        <div className="grid gap-8 sm:grid-cols-2 mb-12">
          {/* Content - start */}
          <div className="flex flex-col items-center justify-center sm:items-start md:py-12 lg:py-16">
            <h1 className='text-5xl font-bold'> Free Transport with <span className='text-orange-600'>AidNexus</span></h1><br/>
            <p className="text-gray-700 mb-5">
              Take advantage of free transportation when you donate through AidNexus. Your generosity is made easier with our hassle-free service, ensuring your donations reach those in need without any extra cost to you. Join us in making a difference today!
            </p>
          </div>

          {/* Image - start */}
          <div className="relative h-80 overflow-hidden md:h-auto mt-8">
            <img src={distribute} alt="Distribute" className="w-full h-auto" />
          </div>
          {/* Image - end */}
        </div>

        <div className="relative px-4 min-h-screen">
          <h1 className="text-4xl font-bold text-orange-500 text-center mb-8">
            Available Requests
          </h1>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
                <p className="col-span-full text-center">Loading available items...</p>
            ) : error ? (
                <p className="col-span-full text-center text-red-500">{error}</p>
            ) : availableItems.length === 0 ? (
                <p className="col-span-full text-center">No items available for pickup at the moment.</p>
            ) : (
                availableItems.map(item => (
                    <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
                      <div className="mb-4">
                        <p className="font-bold text-blue-800 text-lg">{item.title}</p>
                        <p className="text-sm text-gray-700 mt-2">
                          Location: {item.location} <br/>
                          Item: {item.category_name}
                        </p>
                      </div>
                      <button
                          onClick={() => handleGetPickup(item.id)}
                          className="w-full px-4 py-2 bg-red-500 text-white rounded-lg font-semibold text-sm hover:bg-red-600 transition duration-300"
                      >
                        Get Pickup
                      </button>
                    </div>
                ))
            )}
          </div>
        </div>
      </div>
  );
}

export default Distribute;