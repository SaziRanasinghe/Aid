import React, { useState } from 'react';
import Img1 from '../assets/main-images/up.png'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        telephone_number: '',
        address: '',
        user_role: '',
        unique_questions: {}
    });
  const [selectedOption, setSelectedOption] = useState('donor');
  const navigate = useNavigate();
  const [error, setError] = useState(" ");

  const handleOptionChange = (e) => {
    const role = e.target.value;
    setSelectedOption(role);
    setFormData(prevState => ({
        ...prevState,
        user_role:role
    }));
    if (role === 'recipient') {
        openDialog('recipient');
    }else if(role === 'distributor'){
        openDialog('distributor');
    }
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
        ...prevState,
        [name]: value
    }));
  };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords don't match!");
            return;
        }
        try {
            const response = await axios.post("http://localhost:5000/api/register", {
                name: formData.name,
                username: formData.username,
                email: formData.email,
                password: formData.password,
                telephone_number: formData.telephone_number,
                user_role: formData.user_role,
                address: formData.address,
                unique_questions: formData.unique_questions
            });
            toast.success(response.data.message);
            setTimeout(() => {
                navigate('/login');
            }, 2000); // Navigate after 2 seconds
        } catch (error) {
            console.error("Registration Error:", error);
            if (error.response && error.response.data) {
                toast.error(error.response.data.message || "Registration Failed. Please Try Again");
            } else {
                toast.error("An unexpected error occurred. Please try again.");
            }
        }
    };

    // State to manage whether to show each dialog
  const [showRecipientForm, setShowRecipientForm] = useState(false);
  const [showDistributorForm, setShowDistributorForm] = useState(false);
  
  const openDialog = (option) => {
    switch (option) {
      case 'recipient':
        setShowRecipientForm(true);
        break;
      case 'distributor':
        setShowDistributorForm(true);
        break;
      default:
        break;
    }
  };

  const closeDialogs = () => {
    setShowRecipientForm(false);
    setShowDistributorForm(false);
  };

  const handleSaveRecipientForm = (e) => {
    const {name,value} = e.target;
    setFormData(prevState => ({
        ...prevState,
        unique_questions: {
            employmentStatus: document.querySelector('select[name="employmentStatus"]').value,
            monthlyIncome: document.querySelector('input[name="monthlyIncome"]').value,
            monthlyExpenses: document.querySelector('input[name="monthlyExpenses"]').value,
            houseStatus: document.querySelector('select[name="houseStatus"]').value
        }
    }));
    closeDialogs();
  };

  const handleSaveDistributorForm = (e) => {
    const{name,value} = e.target;
    setFormData(prevState => ({
        ...prevState,
        unique_questions: {
            employmentStatus: document.querySelector('select[name="employmentStatus"]').value,
            vehicleType: document.querySelector('select[name="vehicle-type"]').value,
            vehicleNo: document.querySelector('input[name="vehicleNo"]').value
        }
    }));
    closeDialogs();
  };


 
 

  return (
    <div>
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        <div className="flex flex-col mx-8 md:flex-row justify-between mt-16 font-sans mb-16">
        <div className="w-full pt-8 md:w-1/2 ml-16 -mr-32 lg:px-10 bg-gray-500 rounded-lg">
           <h2 className="text-blue-700 text-5xl text-center font-bold capitalize">sign up</h2>
           <h2 className="text-white text-2xl font-extralight mb-2 text-center">Welcome to your
            <span className='text-orange-400 font-bold'>AidNexus!</span></h2>
            <form onSubmit={handleSubmit} action="" className="flex flex-col gap-y-5 pt-5">
                {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
                <label className="block">
                    <span
                        className="after:ml-0.5 after:text-white block text-sm font-medium text-orange-700">Name</span>
                    <input
                        type="text"
                        name="name"
                        className="text-black placeholder:text-base mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md focus:ring-1"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleInput}
                        required/>
                </label>

                <label className="block">
                    <span
                        className="capitalize after:ml-0.5 after:text-white block text-sm font-medium text-orange-700">Username</span>
                    <input
                        type="text"
                        name="username"
                        className="text-black placeholder:text-base mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md focus:ring-1"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleInput}
                        required
                    />
                </label>

                <label className="block">
                    <span
                        className="after:ml-0.5 after:text-white block text-sm font-medium text-orange-700">Email</span>
                    <input
                        type="email"
                        name="email"
                        className="text-black placeholder:text-base mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md focus:ring-1"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInput}
                        required
                    />
                </label>
                <label className="block">
                    <span
                        className="capitalize after:ml-0.5 after:text-white block text-sm font-medium text-orange-700">Password</span>
                    <input
                        type="password"
                        name="password"
                        className="text-black placeholder:text-base mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md focus:ring-1"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInput}
                        required
                    />
                </label>
                <label className="block">
                    <span
                        className="capitalize after:ml-0.5 after:text-white block text-sm font-medium text-orange-700">Confirm Password</span>
                    <input
                        type="password"
                        name="confirmPassword"
                        className="text-black placeholder:text-base mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleInput}
                        required
                    />
                </label>
                <label className="block">
                    <span
                        className="capitalize after:ml-0.5 after:text-white block text-sm font-medium text-orange-700">Telephone Number</span>
                    <input
                        type="tel"
                        name="telephone_number"
                        className="text-black placeholder:text-base mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md focus:ring-1"
                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                        placeholder="123-456-7890"
                        value={formData.telephone_number}
                        onChange={handleInput}
                        required
                    />
                </label>
                <label className="block">
                    <span
                        className="capitalize after:ml-0.5 after:text-white block text-sm font-medium text-orange-700">Home Address</span>
                                    <textarea name="address"
                                              className="text-black placeholder:text-base mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md focus:ring-1"
                                              value={formData.address}
                                              onChange={handleInput}
                                              placeholder="Home Address"
                                              required></textarea>
                </label>

                <span className="capitalize after:ml-0.5 after:text-white block text-sm font-medium text-orange-700">
                        Select your Role
                </span>

                <div className="p-4 space-y-4">
                    <div className="space-x-4">
                        <input
                            type="radio"
                            id="donor"
                            value="donor"
                            checked={selectedOption === 'donor'}
                            onChange={handleOptionChange}
                        />
                        <label htmlFor="donor">Donor</label>

                        <input
                            type="radio"
                            id="recipient"
                            value="recipient"
                            checked={selectedOption === 'recipient'}
                            onChange={handleOptionChange}
                            onClick={() => openDialog('recipient')}
                        />
                        <label htmlFor="recipient">Recipient</label>

                        <input
                            type="radio"
                            id="distributor"
                            value="distributor"
                            checked={selectedOption === 'distributor'}
                            onChange={handleOptionChange}
                            onClick={() => openDialog('distributor')}
                        />
                        <label htmlFor="distributor">Distributor</label>
                    </div>

                    {/* Dialog boxes */}
                    {showRecipientForm && (
                        <div className="fixed inset-0 flex items-center justify-center z-50">
                            <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
                            <div className="bg-white p-8 rounded shadow-md z-50">
                                <h2 className="text-lg font-bold mb-4 text-black">Recipient Form</h2>
                                <label className="block">
                                    <span className="block text-sm font-medium text-black">Employment Status:</span>
                                    <select name="employmentStatus"
                                            className="text-black w-full mt-1 px-3 py-2 border-b-2 border-slate-300 focus:outline-none focus:border-sky-500"
                                            required>
                                        <option value="">Select status...</option>
                                        <option value="employed">Employed</option>
                                        <option value="unemployed">Unemployed</option>
                                    </select>

                                    <span
                                        className="after:ml-0.5 after:text-white block text-sm font-medium text-black "> Monthly Income:</span>
                                    <input type="text" name="monthlyIncome"
                                           className="text-black w-full mt-1 px-3 py-2 border-b-2 border-slate-300 focus:outline-none focus:border-sky-500"
                                           required/>
                                    <span
                                        className="after:ml-0.5 after:text-white block text-sm font-medium text-black "> Monthly Expenses:</span>
                                    <input type="text" name="monthlyExpenses"
                                           className="text-black w-full mt-1 px-3 py-2 border-b-2 border-slate-300 focus:outline-none focus:border-sky-500"
                                           required/>
                                    <span
                                        className="after:ml-0.5 after:text-white block text-sm font-medium text-black "> Home Ownership/Rental Status:</span>
                                    <select name="houseStatus"
                                            className="text-black w-full mt-1 px-3 py-2 border-b-2 border-slate-300 focus:outline-none focus:border-sky-500"
                                            required>
                                        <option value="">Select status...</option>
                                        <option value="own-house">Own House</option>
                                        <option value="rental-house">Rental House</option>
                                    </select>
                                </label>
                                <button className="text-sm text-red-600 hover:text-gray-700" onClick={closeDialogs}>
                                    Close
                                </button>
                                <button className="text-sm text-blue-800 hover:text-gray-700 ml-2"
                                        onClick={handleSaveRecipientForm}>
                                    Save
                                </button>
                                {/* Your Recipient Form JSX */}
                                <form className="mt-4">
                                    {/* Form fields for recipient */}
                                </form>
                            </div>
                        </div>
                    )}

                    {showDistributorForm && (
                        <div className="fixed inset-0 flex items-center justify-center z-50">
                            <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
                            <div className="bg-white p-8 rounded shadow-md z-50">
                                <h2 className="text-lg font-bold mb-4 text-black">Distributor Form</h2>

                                <label className="block">
                                    <span
                                        className="after:ml-0.5 after:text-white block text-sm font-medium text-black "> Employment Status:</span>
                                    <select name="employmentStatus"
                                            className="text-black w-full mt-1 px-3 py-2 border-b-2 border-slate-300 focus:outline-none focus:border-sky-500"
                                            required>
                                        <option value="">Select status...</option>
                                        <option value="employed">Employed</option>
                                        <option value="unemployed">Unemployed</option>
                                    </select>
                                    <span
                                        className="after:ml-0.5 after:text-white block text-sm font-medium text-black">Vehicle Type:</span>
                                    <select name="vehicle-type"
                                            className="text-black w-full mt-1 px-3 py-2 border-b-2 border-slate-300 focus:outline-none focus:border-sky-500"
                                            required>
                                        <option value="">Select vehicle type...</option>
                                        <option value="car">Car</option>
                                        <option value="van">Van</option>
                                        <option value="bick">Bicycle</option>
                                        <option value="other">Other</option>
                                    </select>
                                    <span
                                        className="after:ml-0.5 after:text-white block text-sm font-medium text-black">Vehicle No:</span>
                                    <input type="text" name="vehicleNo"
                                           className="text-black w-full mt-1 px-3 py-2 border-b-2 border-slate-300 focus:outline-none focus:border-sky-500"
                                           required/>
                                </label>
                                <button className="text-sm text-red-700 hover:text-gray-700" onClick={closeDialogs}>
                                    Close
                                </button>
                                <button className="text-sm text-blue-700 hover:text-gray-700 ml-2"
                                        onClick={handleSaveDistributorForm}>
                                    Save
                                </button>
                                {/* Your Distributor Form JSX */}
                                <form className="mt-4">
                                    {/* Form fields for distributor */}
                                </form>
                            </div>
                        </div>
                    )}
                </div>

                <input type="submit"
                       className="tracking-wide capitalize bg-orange-400 hover:bg-orange-600 text-gray-500 bg-four p-3 rounded-md shadow-sm cursor-pointer transition-all ease-in-out delay-150 duration-300 hover:bg-main hover:text-white"
                       value="create account"
                />


                <div className="d-flex items-center text-center">
                    <span
                        className="w-full relative inline-block px-10 font-bold text-sm text-white tracking-wide after:content-[''] after:flex after:relative  after:-mt-2.5 after:w-2/5 after:h-0.5 after:bg-white after:left-0 before:content-[''] before:flex before:relative before:top-[13px] before:w-2/5 before:h-0.5 before:bg-white before:mt-2.5 before:left-[60%]">or</span>
                </div>

                <div className="flex flex-col gap-y-2">

                    <button
                        className="flex justify-around text-black items-center text-center w-full my-0 mx-auto py-2 px-2 font-medium shadow-lg rounded bg-white hover:bg-four ">
                        <img
                            src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png"
                            className="relative w-10 h-10 ml-0 mr-2" alt="google logo"/> <span className="w-5/6">Sign up with Google</span>
                    </button>


                </div>
            </form>
        </div>
            <div class="ml-44 mt-64 text-center">
                <h2 class="-mt-60 mb-0 text-5xl font-bold font-heading text-white">Start your journey by<br/> creating
                    an account.</h2>
                <p class="text-lg text-gray-200 mt-4">
                    "Sign Up to donate and
                    <span class="text-orange-400"> make a difference today! "</span>
                </p>
                <img className='animate-bounce inline-block py-32 px-8' src={Img1} alt=''/>
            </div>
        </div>
    </div>
  )
}

export default Signup