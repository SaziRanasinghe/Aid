 // src/App.js
 import React, { useState } from 'react';
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale } from "chart.js";
import { FaEye, FaTrash, FaUsers, FaBuffer } from 'react-icons/fa';

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale);

function App() {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Sales",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    event_name: '',
    event_description: '',
    event_datetime: '',
    active: 'yes'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form Data Submitted:', formData);
    setIsDialogOpen(false); // Close dialog after submission
  };

  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };
  return (
    <div className="flex min-h-screen bg-gray-100">
    {/* Sidebar */}
    <aside className="w-64 bg-blue-950 text-gray-100 flex flex-col">
      <div className="py-8 px-6 text-2xl font-bold text-orange-400">Admin Page</div>
      <nav className="flex-1 px-4 py-2">
        <ul>
          <li>
            <a href="#dashboard" className="flex items-center p-2 rounded-lg hover:bg-gray-700">
              <i className="fas fa-tachometer-alt text-lg"></i>
              <span className="ml-3">Dashboard</span>
            </a>
          </li>
          <li>
            <a href="/payments" className="flex items-center p-3 rounded-lg hover:bg-gray-700">
              <i className="fas fa-cogs text-lg"></i>
              <span className="ml-3">Payments</span>
            </a>
          </li>
          <li>
            <a href="/user" className="flex items-center p-3 rounded-lg hover:bg-gray-700">
              <i className="fas fa-user text-lg"></i>
              <span className="ml-3">Profile</span>
            </a>
          </li>
          <li>
            <a href="#event" onClick={toggleDialog} className="flex items-center p-3 rounded-lg hover:bg-gray-700">
              <i className="fas fa-user text-lg"></i>
              <span className="ml-3">Event Form</span>
            </a>
          </li>
          <li></li>
          <li>
            
            <a href="/notification" className="flex items-center p-3 rounded-lg hover:bg-gray-700">
              <i className="fas fa-sign-out-alt text-lg"></i>
              <span className="ml-3">Notifications</span>
            </a>
          </li>
        </ul>
      </nav>
    </aside>
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
              <h6 className="text-xl text-black font-bold">Add Event Information</h6>
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
                      Event Date & Time
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
                      Is Event Active?
                    </label>
                    <select
                      id="active"
                      name="active"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      onChange={handleInputChange}
                      value={formData.active}
                      required
                    >
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
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

    {/* Main Content */}
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <h1 className="text-4xl font-bold text-blue-900">Dashboard of <span className="text-orange-600">Administrators</span></h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button className="text-gray-500 focus:outline-none">
              <i className="fas fa-search"></i>
            </button>
          </div>
          <div className="relative">
            <button className="text-gray-500 focus:outline-none">
              <i className="fas fa-bell"></i>
            </button>
          </div>
          <div className="relative">
            <button className="text-gray-500 focus:outline-none">
              <i className="fas fa-user-circle text-2xl"></i>
            </button>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-gray-200 py-2 px-6 text-sm">
        <p className="text-gray-600">
          Dashboard / <span className="text-blue-600">Home</span>
        </p>
      </div>

      {/* Dashboard Cards */}
      <main className="flex-1 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="bg-gradient-to-r from-blue-400 to-indigo-600 text-white p-6 rounded-lg shadow-md">
            <h2 className="text-sm font-semibold">Total Users</h2>
            <p className="text-3xl font-bold mt-2">1,024</p>
             
          </div>
          <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-6 rounded-lg shadow-md">
            <h2 className="text-sm font-semibold">Fund Balance</h2>
            <p className="text-3xl font-bold mt-2">Rs. 10,432</p>
            
          </div>
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-6 rounded-lg shadow-md">
            <h2 className="text-sm font-semibold">Donors</h2>
            <p className="text-3xl font-bold mt-2">232</p>
             
          </div>
          <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-6 rounded-lg shadow-md">
            <h2 className="text-sm font-semibold">Volunteers</h2>
            <p className="text-3xl font-bold mt-2">5</p>
           
          </div>
        </div>

        {/* Chart Section */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          
          <h2 className="text-2xl font-bold mb-4 text-black">Perfomance</h2>
          <div className="chart-area">
            <div className="h-full">
              <Line data={data} options={options} />
            </div>
          </div>
        </div>
      </main>

      <div className="bg-blue-100 border border-blue-300 rounded-lg p-4 mb-6">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0">
          <div className="flex items-center">
            <FaBuffer className="text-blue-600 text-lg mr-2" />
            <b className="text-blue-800">Responsive table</b>
          </div>
          <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded">
            Dismiss
          </button>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg">
        <header className="flex items-center justify-between p-4 border-b">
          <p className="flex items-center text-black text-lg font-semibold">
            <FaUsers className="mr-2" />
            Users
          </p>
          
        </header>
        <div className="p-4">
          <table className="min-w-full divide-y divide-gray-200 text-black">
            <thead className="bg-gray-50">
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Amount of Fund</th>
                <th>City</th>
                <th>Progress</th>
                <th>Created</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* Repeat this row for each client */}
              <tr>
                <td className="p-2">
                  <img src="https://avatars.dicebear.com/v2/initials/rebecca-bauch.svg" alt="Client" className="w-10 h-10 rounded-full" />
                </td>
                <td>Nimal Perera</td>
                <td>Rs.5000</td>
                <td>Colombo</td>
                <td>
                  <progress max="100" value="79" className="w-full"></progress>
                </td>
                <td>
                  <small className="text-gray-500" title="Oct 25, 2021">Oct 25, 2021</small>
                </td>
                <td className="flex space-x-2">
                  <button className="bg-blue-500 text-white px-2 py-1 rounded">
                    <FaEye />
                  </button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded">
                    <FaTrash />
                  </button>
                </td>
              </tr>
              {/* End row */}
            </tbody>
          </table>
          <div className="flex items-center text-black justify-between mt-4">
            <div className="flex space-x-2">
              <button type="button" className="bg-gray-200 px-4 py-2 rounded">1</button>
              <button type="button" className="bg-gray-200 px-4 py-2 rounded">2</button>
              <button type="button" className="bg-gray-200 px-4 py-2 rounded">3</button>
            </div>
            <small>Page 1 of 3</small>
          </div>
        </div>

      </div>
    </div>
  </div>
);
}

export default App;
  
