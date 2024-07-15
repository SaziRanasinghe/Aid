import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Administrator() {
  const [data, setData] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    event_name: '',
    event_description: '',
    event_datetime: '',
    active: true
  });

  useEffect(() => {
    axios.get('http://localhost:5000/api/user')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

   
  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:5000/api/events', formData)
      .then(response => {
        console.log(response.data);
        toggleDialog();

      })
      .catch(error => {
        console.error('There was an error submitting the form!', error);
      });
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: name === 'active' ? value === 'yes' : value
    }));
  };



  return (
    <div className="max-w-screen-2xl mx-auto px-4 pb-16 lg:pb-24 mt-8 relative">
      <h1 className='text-5xl text-center mb-4 font-bold'> Dashboard of <span className='text-orange-600'>Administrators</span></h1>
      <div className="flex-1 p-6 bg-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2 text-blue-700">2800</h3>
            <p className="text-gray-600">Total Donars</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg text-blue-700 font-semibold mb-2">18000</h3>
            <p className="text-gray-600">Total Reciepients</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg text-blue-700 font-semibold mb-2">780</h3>
            <p className="text-gray-600">Destributors</p>
          </div>
        </div>
      </div>

      <div className='text-black'>
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Id</th>
              <th className="px-4 py-2">Username</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Password</th>
              <th className="px-4 py-2">Registration Date</th>
              <th className="px-4 py-2">Last Login</th>
              <th className="px-4 py-2">Active</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, i) => (
              <tr key={i}>
                <td className="border px-4 py-2">{d.id}</td>
                <td className="border px-4 py-2">{d.username}</td>
                <td className="border px-4 py-2">{d.email}</td>
                <td className="border px-4 py-2">{d.password}</td>
                <td className="border px-4 py-2">{d.registration_date}</td>
                <td className="border px-4 py-2">{d.last_login}</td>
                <td className="border px-4 py-2">{d.is_active}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className='bg-gradient-to-r from-orange-600 to-orange-400 border-2 border-orange-600 rounded-full px-4 py-2 text-white hover:scale-105 duration-200'onClick={toggleDialog}>
      Add Event
      </button>
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
              <h6 className="text-xl text-black font-bold">Add Event Information </h6>
              <button type="button" className="text-black" onClick={toggleDialog}>
                ✖
              </button>
            </div>
            <div className="p-2">
              <form onSubmit={handleFormSubmit}>
                <div className="mb-4 flex flex-col space-y-4">
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="event_name">
                      Event Name
                    </label>
                    <input
                        type="text"
                        id="event_name"
                        name="event_name"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={handleInputChange}
                        value={formData.event_name}
                        required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="event_description">
                      Event Description
                    </label>
                    <input
                        type="text"
                        id="event_description"
                        name="event_description"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={handleInputChange}
                        value={formData.event_description}
                        required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="event_datetime">
                      Event date & time
                    </label>
                    <input
                        type="datetime-local"
                        id="event_datetime"
                        name="event_datetime"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={handleInputChange}
                        value={formData.event_datetime}
                        required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="active">
                      Is event active?
                    </label>
                    <select
                        id="active"
                        name="active"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={handleInputChange}
                        value={formData.active ? 'yes' : 'no'}
                        required
                    >
                      <option value="yes">yes</option>
                      <option value="no">no</option>
                    </select>
                  </div>
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
              </form>
            </div>
          </div>
        </div>
      )}
    </div>

  );
}

export default Administrator