import React, { useEffect, useState } from 'react';
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale } from "chart.js";
import DashboardCard from "./DashBoardCards";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import GalleryUpload from "./GalleryUpload";
import {ToastContainer,toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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
  const [isGalleryUploadOpen, setIsGalleryUploadOpen] = useState(false);



  const [formData, setFormData] = useState({
    event_name: '',
    description: '',
    event_date: '',
    event_time: '',
    photo: null,
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
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handlePhotoUpload = (e) => {
    setFormData(prevState => ({
      ...prevState,
      photo: e.target.files[0]
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('event_name', formData.event_name);
    data.append('description', formData.description);
    data.append('event_date', formData.event_date);
    data.append('event_time', formData.event_time);
    data.append('photo', formData.photo);
    data.append('active', formData.active);

    try {
      const response = await axios.post('http://localhost:5000/api/admin/create-event', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log('Event created successfully:', response.data);
      toast.success('Event created successfully!');
      toggleDialog1(); // Close the dialog
      // Reset form data
      setFormData({
        event_name: '',
        description: '',
        event_date: '',
        event_time: '',
        photo: null,
        active: 'yes'
      });
    } catch (error) {
      console.error('Error creating event:', error);
      toast.error('Error creating event. Please try again.');
    }
  };


  const toggleDialog1 = () => setDialog1Open(!isDialog1Open);
  const toggleGalleryUpload = () => setIsGalleryUploadOpen(!isGalleryUploadOpen);
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
                <a href="#event" onClick={toggleGalleryUpload} className="flex items-center p-3 rounded-lg hover:bg-gray-700">
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
                className="fixed inset-0 z-10 flex items-center justify-center overflow-auto bg-black bg-opacity-50"
                onClick={toggleDialog1}
            >
              <div
                  className="bg-white shadow-2xl m-4 sm:m-8 p-6 rounded-lg max-w-md w-full"
                  onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center border-b pb-4 mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">Add Event Information</h2>
                  <button type="button" className="text-gray-600 hover:text-gray-800" onClick={toggleDialog1}>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
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

                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                      Event Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
                        onChange={handleInputChange}
                        value={formData.description}
                        required
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="event_date">
                      Event Date
                    </label>
                    <input
                        type="date"
                        id="event_date"
                        name="event_date"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={handleInputChange}
                        value={formData.event_date}
                        required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="event_time">
                      Event Time
                    </label>
                    <input
                        type="time"
                        id="event_time"
                        name="event_time"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={handleInputChange}
                        value={formData.event_time}
                        required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="photo">
                      Event Photo
                    </label>
                    <input
                        type="file"
                        id="photo"
                        name="photo"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={handlePhotoUpload}
                        accept="image/*"
                    />
                  </div>

                  <div>
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

                  <div className="flex items-center justify-between pt-4">
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
        )}

        <GalleryUpload isOpen={isGalleryUploadOpen} onClose={toggleGalleryUpload} />

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
          <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </div>
      </div>
  );
}

export default App;
  
