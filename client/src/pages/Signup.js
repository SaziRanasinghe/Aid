import React, { useState } from 'react';
import Img1 from '../assets/main-images/up.png'

function Signup() {
  const [selectedOption, setSelectedOption] = useState('donor');

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  // State to manage whether to show each dialog
  const [showDonorForm, setShowDonorForm] = useState(false);
  const [showRecipientForm, setShowRecipientForm] = useState(false);
  const [showDistributorForm, setShowDistributorForm] = useState(false);
  const [showAdminForm, setShowAdminForm] = useState(false);

  const openDialog = (option) => {
    switch (option) {
      case 'donor':
        setShowDonorForm(true);
        break;
      case 'recipient':
        setShowRecipientForm(true);
        break;
      case 'distributor':
        setShowDistributorForm(true);
        break;
      case 'admin':
        setShowAdminForm(true);
        break;
      default:
        break;
    }
  };

  const closeDialogs = () => {
    setShowDonorForm(false);
    setShowRecipientForm(false);
    setShowDistributorForm(false);
    setShowAdminForm(false);
  };

  const handleSaveDonorForm = () => {
    // Add logic to save donor form data
    console.log('Saving donor form data');
    // Example: You can fetch or send form data to an API here
    closeDialogs(); // Close the dialog after saving
  };

  const handleSaveRecipientForm = () => {
    // Add logic to save recipient form data
    console.log('Saving recipient form data');
    // Example: You can fetch or send form data to an API here
    closeDialogs(); // Close the dialog after saving
  };

  const handleSaveDistributorForm = () => {
    // Add logic to save distributor form data
    console.log('Saving distributor form data');
    // Example: You can fetch or send form data to an API here
    closeDialogs(); // Close the dialog after saving
  };

  const handleSaveAdminForm = () => {
    // Add logic to save admin form data
    console.log('Saving admin form data');
    // Example: You can fetch or send form data to an API here
    closeDialogs(); // Close the dialog after saving
  };

  return (
    <div>
        <div className="flex flex-col mx-8 md:flex-row justify-between mt-16 font-sans mb-16">
        <div className="w-full pt-8 md:w-1/2 ml-16 -mr-32 lg:px-10 bg-gray-500 rounded-lg">
           <h2 className="text-blue-700 text-5xl text-center font-bold capitalize">sign up</h2>
           <h2 class="text-white text-2xl font-extralight mb-2 text-center">Welcome to your <span className='text-orange-400 font-bold'>AidNexus!</span>
      </h2>
             <form action="" class="flex flex-col gap-y-5 pt-5">

                <label className="block">
                    <span className="after:ml-0.5 after:text-white block text-sm font-medium text-orange-700">Name
                    </span>  
                    <input type="text" name="text" className="text-black placeholder:text-base mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md focus:ring-1" placeholder="Name" required/>
                </label>

                <label className="block">
                    <span className="capitalize after:ml-0.5 after:text-white block text-sm font-medium text-orange-700">username
                    </span>  
                    <input type="text" name="text" className="text-black placeholder:text-base mt-1 px-3 py-2   bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md focus:ring-1" placeholder="Username" required/>
                </label>
      
                <label className="block">
                   <span className="  after:ml-0.5 after:text-white block text-sm font-medium text-orange-700">
                   Email
                  </span>  
                <input type="email" name="email" className="text-black placeholder:text-base mt-1 px-3 py-2   bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md focus:ring-1" placeholder="Email" required/>
                </label>
       
                <label className="block">
                    <span className="capitalize after:ml-0.5 after:text-white block text-sm font-medium text-orange-700">
                        password
                    </span>  
                <input type="password" name="password" className="text-black placeholder:text-base mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md focus:ring-1" placeholder="Password" required/>
                </label>

               <label className="block">
                    <span className="capitalize after:ml-0.5 after:text-white block text-sm font-medium text-orange-700">
                        confirm password
                    </span>  
                    <input type="password" name="password" className="text-black placeholder:text-base mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Confirm Password" required/>
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
          onClick={() => openDialog('donor')}
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

        <input
          type="radio"
          id="admin"
          value="admin"
          checked={selectedOption === 'admin'}
          onChange={handleOptionChange}
          onClick={() => openDialog('admin')}
        />
        <label htmlFor="admin">Admin</label>
      </div>

      {/* Dialog boxes */}
      {showDonorForm && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
          <div className="bg-white p-8 rounded shadow-md z-50">
            <h2 className="text-lg font-bold text-black mb-4">Donor Form</h2>
            
  <label className="block">
  <span className="after:ml-0.5 after:text-white block text-sm font-medium text-black">Your Address:</span>  
  <input type="text" name="address" className="text-black w-full mt-1 px-3 py-2 border-b-2 border-slate-300 focus:outline-none focus:border-sky-500"required />
<span className="after:ml-0.5 after:text-white block text-sm font-medium text-black "> Telephone No:</span>  
<input type="text" name="text" className="text-black  mt-1 px-24 py-2 border-b-2 border-slate-300 focus:outline-none" required/>
    
   </label>

<button className="text-sm text-red-700 hover:text-gray-700" onClick={closeDialogs}>
                Close
              </button>
              <button className="text-sm text-blue-700 hover:text-gray-700 ml-2" onClick={handleSaveDonorForm}>
                Save
              </button>
            {/* Your Donor Form JSX */}
            <form className="mt-4">
              {/* Form fields for donor */}
            </form>
          </div>
        </div>
      )}

      {showRecipientForm && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
          <div className="bg-white p-8 rounded shadow-md z-50">
            <h2 className="text-lg font-bold mb-4 text-black">Recipient Form</h2>
            <label className="block">

            <label className="block mt-4">
  <span className="after:ml-0.5 after:text-white block text-sm font-medium text-black">Your Address:</span>  
  <input type="text" name="address" className="text-black w-full mt-1 px-3 py-2 border-b-2 border-slate-300 focus:outline-none focus:border-sky-500"required />
</label>
<span className="after:ml-0.5 after:text-white block text-sm font-medium text-black "> Telephone No:</span>  
<input type="text" name="text" className="text-black  mt-1 px-24 py-2 border-b-2 border-slate-300 focus:outline-none" required/>
    <span className="after:ml-0.5 after:text-white block text-sm font-medium text-black "> Employment Status:</span>  
    <input type="text" name="address" className="text-black w-full mt-1 px-3 py-2 border-b-2 border-slate-300 focus:outline-none focus:border-sky-500"required />   
     <span className="after:ml-0.5 after:text-white block text-sm font-medium text-black "> Monthly Income:</span>  
    <input type="text" name="address" className="text-black w-full mt-1 px-3 py-2 border-b-2 border-slate-300 focus:outline-none focus:border-sky-500"required />
      <span className="after:ml-0.5 after:text-white block text-sm font-medium text-black "> Monthly Expenses:</span>  
      <input type="text" name="address" className="text-black w-full mt-1 px-3 py-2 border-b-2 border-slate-300 focus:outline-none focus:border-sky-500"required />
    <span className="after:ml-0.5 after:text-white block text-sm font-medium text-black "> Home Ownership/Rental Status:</span>  
    <input type="text" name="address" className="text-black w-full mt-1 px-3 py-2 border-b-2 border-slate-300 focus:outline-none focus:border-sky-500"required />
    <span className="after:ml-0.5 after:text-white block text-sm font-medium text-black "> Is there any additional information: </span>  
    <input type="text" name="address" className="text-black w-full mt-1 px-3 py-2 border-b-2 border-slate-300 focus:outline-none focus:border-sky-500"required />
  </label>
            <button className="text-sm text-red-600 hover:text-gray-700" onClick={closeDialogs}>
                Close
              </button> 
              <button className="text-sm text-blue-800 hover:text-gray-700 ml-2" onClick={handleSaveRecipientForm}>
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
  <span className="after:ml-0.5 after:text-white block text-sm font-medium text-black "> Telephone No:</span>  
<input type="text" name="text" className="text-black  mt-1 px-24 py-2 border-b-2 border-slate-300 focus:outline-none" required/>
    <span className="after:ml-0.5 after:text-white block text-sm font-medium text-black "> Employment Status:</span>  
    <input type="text" name="address" className="text-black w-full mt-1 px-3 py-2 border-b-2 border-slate-300 focus:outline-none focus:border-sky-500"required /> 
  <span className="after:ml-0.5 after:text-white block text-sm font-medium text-black">Vehicle Type:</span>  
  <input type="text" name="address" className="text-black w-full mt-1 px-3 py-2 border-b-2 border-slate-300 focus:outline-none focus:border-sky-500"required />
  <span className="after:ml-0.5 after:text-white block text-sm font-medium text-black">Vehicle No:</span>  
  <input type="text" name="address" className="text-black w-full mt-1 px-3 py-2 border-b-2 border-slate-300 focus:outline-none focus:border-sky-500"required />
  <span className="after:ml-0.5 after:text-white block text-sm font-medium text-black">Your Address:</span>  
  <input type="text" name="address" className="text-black w-full mt-1 px-3 py-2 border-b-2 border-slate-300 focus:outline-none focus:border-sky-500"required />
   </label>
            <button className="text-sm text-red-700 hover:text-gray-700" onClick={closeDialogs}>
                Close
              </button>
              <button className="text-sm text-blue-700 hover:text-gray-700 ml-2" onClick={handleSaveDistributorForm}>
                Save
              </button>
            {/* Your Distributor Form JSX */}
            <form className="mt-4">
              {/* Form fields for distributor */}
            </form>
          </div>
        </div>
      )}

      {showAdminForm && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
          <div className="bg-white p-8 rounded shadow-md z-50">
            <h2 className="text-lg font-bold mb-4 text-black">Admin Form</h2>

            <label className="block">
  <span className="after:ml-0.5 after:text-white block text-sm font-medium text-black "> Telephone No:</span>  
<input type="text" name="text" className="text-black  mt-1 px-24 py-2 border-b-2 border-slate-300 focus:outline-none" required/>
    <span className="after:ml-0.5 after:text-white block text-sm font-medium text-black "> Your employee Status :</span>  
    <input type="text" name="address" className="text-black w-full mt-1 px-3 py-2 border-b-2 border-slate-300 focus:outline-none focus:border-sky-500"required /> 
    <span className="after:ml-0.5 after:text-white block text-sm font-medium text-black "> Say about you :</span>  
    <input type="text" name="address" className="text-black w-full mt-1 px-3 py-2 border-b-2 border-slate-300 focus:outline-none focus:border-sky-500"required />

    </label>
  

            <button className="text-sm text-red-700 hover:text-gray-700 " onClick={closeDialogs}>
                Close
              </button>
              <button className="text-sm text-blue-700 hover:text-gray-700 ml-2" onClick={handleSaveAdminForm}>
                Save
              </button>
            {/* Your Admin Form JSX */}
            <form className="mt-4">
              {/* Form fields for admin */}
            </form>
          </div>
        </div>
      )}
    </div>

      <input type="submit" className="tracking-wide capitalize bg-orange-400 hover:bg-orange-600 text-gray-500 bg-four p-3 rounded-md shadow-sm cursor-pointer transition-all ease-in-out delay-150 duration-300 hover:bg-main hover:text-white" value="create account"/>
      
      <div className="d-flex items-center text-center">
        <span className="w-full relative inline-block px-10 font-bold text-sm text-white tracking-wide after:content-[''] after:flex after:relative  after:-mt-2.5 after:w-2/5 after:h-0.5 after:bg-white after:left-0 before:content-[''] before:flex before:relative before:top-[13px] before:w-2/5 before:h-0.5 before:bg-white before:mt-2.5 before:left-[60%]">or</span>
      </div>

      <div className="flex flex-col gap-y-2">

         <button className="flex justify-around text-black items-center text-center w-full my-0 mx-auto py-2 px-2 font-medium shadow-lg rounded bg-white hover:bg-four ">
        <img src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png" className="relative w-10 h-10 ml-0 mr-2" alt="google logo"/> <span className="w-5/6">Sign up with Google</span>
      </button>

       
      </div>
    </form>
</div>
<div class="ml-44 mt-64 text-center">
<h2 class="-mt-60 mb-0 text-5xl font-bold font-heading text-white">Start your journey by<br/> creating an account.</h2>
			  <p class="text-lg text-gray-200 mt-4">
			  "Sign Up to donate and  
				<span class="text-orange-400"> make a difference today! "</span>
			  </p>
<img className='animate-bounce inline-block py-32 px-8' src={Img1} alt='' />  
 </div>
</div>
    </div>
  )
}

export default Signup