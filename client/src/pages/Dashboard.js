import React, { useEffect, useState } from 'react';
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale } from "chart.js";
import DashboardCard from "./DashBoardCards";
import axios from 'axios';
import {useNavigate} from "react-router-dom";

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale);

function App() {
  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    fundBalance: 0,
    donors: 0,
    volunteers: 0
  });

  const navigate = useNavigate();
  const [monthlyDonations, setMonthlyDonations] = useState([]);
  const [isDialog1Open, setDialog1Open] = useState(false);
  const [isDialog2Open, setDialog2Open] = useState(false);


  const [formData, setFormData] = useState({
    event_name: '',
    event_description: '',
    event_datetime: '',
    active: 'yes'
  });

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');

    navigate('/');
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, balanceRes, donorsRes, volunteersRes, donationsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/total-users'),
          axios.get('http://localhost:5000/api/fund-balance'),
          axios.get('http://localhost:5000/api/donors'),
          axios.get('http://localhost:5000/api/volunteers'),
          axios.get('http://localhost:5000/api/monthly-donations')
        ]);

        setMetrics({
          totalUsers: usersRes.data[0].count,
          fundBalance: balanceRes.data[0].balance,
          donors: donorsRes.data[0].count,
          volunteers: volunteersRes.data[0].count
        });

        setMonthlyDonations(donationsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: monthlyDonations.map(item => item.month),
    datasets: [
      {
        label: "Monthly Donations",
        data: monthlyDonations.map(item => item.total_amount),
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
      title: {
        display: true,
        text: "Monthly Donation Trends"
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Donation Amount ($)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Month'
        }
      }
    },
  };

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
    setDialog1Open(false); // Close dialog after submission
  };

  const toggleDialog1 = () => setDialog1Open(!isDialog1Open);
  const toggleDialog2 = () => setDialog2Open(!isDialog2Open);
  

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];  
    setFormData({
      ...formData,
      photo: file,  
    });
  };
  

  return (
      <div className="flex min-h-screen bg-gray-100 mb-5">
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
                <a href="#event" onClick={toggleDialog1} className="flex items-center p-3 rounded-lg hover:bg-gray-700">
                  <i className="fas fa-calendar-plus text-lg"></i>
                  <span className="ml-3">Event Form</span>
                </a>
              </li>
              <li>
                <a href="#event" onClick={toggleDialog2} className="flex items-center p-3 rounded-lg hover:bg-gray-700">
                  <i className="fas fa-images text-lg"></i>
                  <span className="ml-3">Update Gallery</span>
                </a>
              </li>
              <li>
                <a href="/notification" className="flex items-center p-3 rounded-lg hover:bg-gray-700">
                  <i className="fas fa-bell text-lg"></i>
                  <span className="ml-3">Notifications</span>
                </a>
              </li>
              <li>
                <a href="/charts" className="flex items-center p-3 rounded-lg hover:bg-gray-700">
                  <i className="fas fa-chart-line text-lg"></i>
                  <span className="ml-3">Trend Analyzer</span>
                </a>
              </li>
              <li>
                <a href="#" onClick={handleLogout} className="flex items-center p-3 rounded-lg hover:bg-gray-700">
                  <i className="fas fa-sign-out-alt text-lg"></i>
                  <span className="ml-3">Logout</span>
                </a>
              </li>
            </ul>
          </nav>
        </aside>


        {isDialog1Open && (
            <div
                className="fixed inset-0 z-10 flex items-center justify-center mt-2 overflow-auto bg-black bg-opacity-50"
                onClick={toggleDialog1}
            >
              <div
                  className="bg-white shadow-2xl m-4 sm:m-8 p-4"
                  onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center border-b pb-2 text-xl">
                  <h6 className="text-xl text-black font-bold">Add Event Information</h6>
                  <button type="button" className="text-black" onClick={toggleDialog1}>
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
                          onClick={toggleDialog1}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
        )}

        {/* dialog2 */}
        {isDialog2Open && (
            <div
                className="fixed inset-0 z-10 flex items-center justify-center mt-2 overflow-auto bg-black bg-opacity-50"
                onClick={toggleDialog2}
            >
              <div
                  className="bg-white shadow-2xl m-4 sm:m-8 p-4"
                  onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center border-b pb-2 text-xl">
                  <h6 className="text-xl text-black font-bold">Add Photos</h6>
                  <button type="button" className="text-black" onClick={toggleDialog2}>
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
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="photo">
                          Upload Photo
                        </label>
                        <input
                            type="file"
                            id="photo"
                            name="photo"
                            accept="image/*"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            onChange={handlePhotoUpload} // New handler for file input change
                            required
                        />
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
                          onClick={toggleDialog2}
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
            <h1 className="text-4xl font-bold text-blue-900">Dashboard of <span
                className="text-orange-600">Administrators</span></h1>
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
              <DashboardCard
                  title="Total Users"
                  value={metrics.totalUsers}
                  gradient="from-blue-400 to-indigo-600"
              />
              <DashboardCard
                  title="Fund Balance"
                  value={`$ ${metrics.fundBalance}`}
                  gradient="from-green-500 to-teal-500"
              />
              <DashboardCard
                  title="Donors"
                  value={metrics.donors}
                  gradient="from-yellow-500 to-orange-500"
              />
              <DashboardCard
                  title="Volunteers"
                  value={metrics.volunteers}
                  gradient="from-red-500 to-pink-500"
              />

            </div>

            {/* Chart Section */}
            <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4 text-black">Monthly Donation Trends</h2>
              <div className="chart-area">
                <div className="h-full">
                  <Line data={chartData} options={options}/>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
  );
}

export default App;
  
