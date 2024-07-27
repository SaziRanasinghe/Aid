// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
 
// function Administrator() {
//   const [data, setData] = useState([]);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     event_name: '',
//     event_description: '',
//     event_datetime: '',
//     active: 'yes'
//   });
 

//   useEffect(() => {
//     axios.get('http://localhost:5000/api/user')
//       .then(response => {
//         setData(response.data);
//       })
//       .catch(error => {
//         console.error('There was an error fetching the data!', error);
//       });
//   }, []);

   
//   const toggleDialog = () => {
//     setIsDialogOpen(!isDialogOpen);
//   };
 
//   const handleFormSubmit = (event) => {
//     event.preventDefault();
//     axios.post('http://localhost:5000/api/events', formData)
//       .then(response => {
//         console.log(response.data);
//         toggleDialog();
//         // Optionally, you can refresh the data to show the new event in the table
//       })
//       .catch(error => {
//         console.error('There was an error submitting the form!', error);
//       });
//   };

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   return (
//     <div className="max-w-screen-2xl mx-auto px-4 pb-16 lg:pb-24 mt-8 relative">
//       <h1 className='text-5xl text-center mb-4 font-bold'> Dashboard of <span className='text-orange-600'>Administrators</span></h1>
//       <div className="flex-1 p-6 bg-gray-100">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           <div className="bg-white p-4 rounded-lg shadow-md">
//             <h3 className="text-lg font-semibold mb-2 text-blue-700">2800</h3>
//             <p className="text-gray-600">Total Donars</p>
//           </div>
//           <div className="bg-white p-4 rounded-lg shadow-md">
//             <h3 className="text-lg text-blue-700 font-semibold mb-2">18000</h3>
//             <p className="text-gray-600">Total Reciepients</p>
//           </div>
//           <div className="bg-white p-4 rounded-lg shadow-md">
//             <h3 className="text-lg text-blue-700 font-semibold mb-2">780</h3>
//             <p className="text-gray-600">Destributors</p>
//           </div>
//         </div>
//       </div>

//       <div className='text-black'>
//         <table className="table-auto">
//           <thead>
//             <tr>
//               <th className="px-4 py-2">Id</th>
//               <th className="px-4 py-2">Username</th>
//               <th className="px-4 py-2">Email</th>
//               <th className="px-4 py-2">Password</th>
//               <th className="px-4 py-2">Registration Date</th>
//               <th className="px-4 py-2">Last Login</th>
//               <th className="px-4 py-2">Active</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((d, i) => (
//               <tr key={i}>
//                 <td className="border px-4 py-2">{d.id}</td>
//                 <td className="border px-4 py-2">{d.username}</td>
//                 <td className="border px-4 py-2">{d.email}</td>
//                 <td className="border px-4 py-2">{d.password}</td>
//                 <td className="border px-4 py-2">{d.registration_date}</td>
//                 <td className="border px-4 py-2">{d.last_login}</td>
//                 <td className="border px-4 py-2">{d.is_active}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <button className='bg-gradient-to-r from-orange-600 to-orange-400 border-2 border-orange-600 rounded-full px-4 py-2 text-white hover:scale-105 duration-200'onClick={toggleDialog}>
//       Add Event
//       </button>
//       {isDialogOpen && (
//         <div
//           className="fixed inset-0 z-10 flex items-center justify-center mt-2 overflow-auto bg-black bg-opacity-50"
//           onClick={toggleDialog}
//         >
//           <div
//             className="bg-white shadow-2xl m-4 sm:m-8 p-4"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="flex justify-between items-center border-b pb-2 text-xl">
//               <h6 className="text-xl text-black font-bold">Add Event Information </h6>
//               <button type="button" className="text-black" onClick={toggleDialog}>
//                 ✖
//               </button>
//             </div>
//             <div className="p-2">
//               <form onSubmit={handleFormSubmit}>
//               <div className="mb-4 flex space-x-4">
//     <div className="flex-1">
//       <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="id">
//         Event Id 
//       </label>
//       <input
//         type="text"
//         id="id"
//         name="id"
//         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//         onChange={handleInputChange}
//         required
//       />
//     </div>
//     </div>
//     <div className="mb-4">
//       <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
//         Event Name
//       </label>
//       <input
//         type="text"
//         id="name"
//         name="name"
//         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//         onChange={handleInputChange}
//         required
//       />
//     </div>
    
//     <div className="flex-1">
//                   <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="desc">
//                     Event Description
//                   </label>
//                   <input
//                     type="text"
//                     id="desc"
//                     name="desc"
//                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                     onChange={handleInputChange}
//                     required
//                   />
//                   </div>

//                   <div className="flex-1">
//                   <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="event_datetime">
//                     Event date & time
//                   </label>
//                   <input
//                     type="text"
//                     id="event_datetime"
//                     name="event_datetime"
//                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                     onChange={handleInputChange}
//                     required
//                   />
//                     <div className="mb-4">
//                   <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="active">
//                     Is event active? 
//                   </label>
//                   <select
//                     id="active"
//                     name="active"
//                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                     onChange={handleInputChange}
//                     required
//                   >
//       <option value="yes">yes</option>
//       <option value="no">no</option>
      
//     </select>
//   </div>
//                   </div><br/>
//                   <div className="flex items-center justify-between">
//                   <button
//                     type="submit"
//                     className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                   >
//                     Submit
//                   </button>
//                   <button
//                     type="button"
//                     className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                     onClick={toggleDialog}
//                   >
//                     Cancel
//                   </button>
//                 </div>
 
//   </form>
//   </div>
//   </div>
//     </div>
//      )}
//     </div>
  
//   );
// }
 
//  export default Administrator




// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Administrator = () => {
  const [data, setData] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
   const [formData, setFormData] = useState({
     event_name: '',
     event_description: '',
     event_datetime: '',
     active: 'yes'
   });
  const toggleDialog = () => {
        setIsDialogOpen(!isDialogOpen);
   };
  const handleFormSubmit = (event) => {
     event.preventDefault();
     axios.post('http://localhost:5000/api/events', formData)
       .then(response => {
         console.log(response.data);
         toggleDialog();
         // Optionally, you can refresh the data to show the new event in the table
       })
     .catch(error => {
         console.error('There was an error submitting the form!', error);
       });
   };

   const handleInputChange = (event) => {
     const { name, value } = event.target;
     setFormData({ ...formData, [name]: value });
   };
  const clients = [
    { name: "Sunil Perera", role: "Driver", amount: "4", status: "Active", date: "2/8/2024" },
    { name: "Nimal Perera", role: "No job", amount: "11", status: "Offline", date: "11/8/2024" },
    { name: "Sunil Perera", role: "Driver", amount: "4", status: "Active", date: "2/8/2024" },
    { name: "Nimal Perera", role: "No job", amount: "11", status: "Offline", date: "11/8/2024" },
    { name: "Sunil Perera", role: "Driver", amount: "4", status: "Active", date: "2/8/2024" },
    { name: "Nimal Perera", role: "No job", amount: "11", status: "Offline", date: "11/8/2024" },
    
  ];
 



  return (
      <div className="min-h-screen bg-blue-300 flex">
        <aside className="w-64 bg-blue-900 p-4">
          <div className="text-3xl py-4 text-orange-500 font-bold mb-4">Admin Pages</div>
          <nav>
            <a href="#" className="block py-3.5 px-4 rounded hover:bg-orange-500 hover:text-black">Dashboard</a>
            <a href="#" className="block py-3.5 px-4 rounded hover:bg-orange-500 hover:text-black">Payments</a>
            <a href="#" className="block py-3.5 px-4 rounded hover:bg-orange-500 hover:text-black">Update Gallery</a>
            <a href="#" className="block py-3.5 px-4 rounded hover:bg-orange-500 hover:text-black"> Event Form</a>
            <a href="#" className="block py-3.5 px-4 rounded hover:bg-orange-500 hover:text-black">User Details</a>
            <a href="#" className="block py-3.5 px-4 rounded hover:bg-orange-500 hover:text-black">Event Details</a>
            <a href="#" className="block py-3.5 px-4 rounded hover:bg-orange-500 hover:text-black">Tables & Graphs</a>
            <a href="#" className="block py-3.5 px-4 rounded hover:bg-orange-500 hover:text-black">Contact
              Notifications</a>
          </nav>
        </aside>
        <main className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className='text-5xl text-center mb-4 font-bold'> Dashboard of <span
                className='text-blue-900'>Administrators</span></h1>
            <button className="bg-blue-600 text-white py-2 px-4 rounded">Change User Details</button>
          </div>
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-orange-500 p-4 rounded shadow">
              <h2 className="text-sm font-bold">Total Users</h2>
              <p className="text-2xl">6389</p>
            </div>
            <div className="bg-orange-500 p-4 rounded shadow">
              <h2 className="text-sm font-bold">Fund balance</h2>
              <p className="text-2xl">Rs. 46,760.89</p>
            </div>
            <div className="bg-orange-500 p-4 rounded shadow">
              <h2 className="text-sm font-bold">Donors</h2>
              <p className="text-2xl">376</p>
            </div>
            <div className="bg-orange-500 p-4 rounded shadow">
              <h2 className="text-sm font-bold">Volunteers</h2>
              <p className="text-2xl">35</p>
            </div>
          </div>
          <table className="min-w-full bg-white">
            <thead>
            <tr>
              <th className="py-2 px-4 text-black  border-b">Recievers</th>
              <th className="py-2 px-4 text-black border-b">Number of Recieves</th>
              <th className="py-2 px-4 text-black border-b">Status</th>
              <th className="py-2 px-4 text-black border-b">Last Recieve Date</th>
            </tr>
            </thead>
            <tbody>
            {clients.map((client, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">
                    <div className="flex items-center">
                      <img src={`https://i.pravatar.cc/40?img=${index + 1}`} alt={client.name}
                           className="rounded-full w-10 h-10 mr-3"/>
                      <div>
                        <div className="text-sm text-black font-bold">{client.name}</div>
                        <div className="text-sm  text-gray-500">{client.role}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-2 px-4 text-black border-b">{client.amount}</td>
                  <td className="py-2 px-4 border-b">
                    <span
                        className={`px-2 py-1 text-black rounded text-sm ${client.status === "Active" ? "bg-green-600 text-white" : client.status === "Offline" ? "bg-red-500 text-white" : "bg-green-500 text-white"}`}>{client.status}</span>
                  </td>
                  <td className="py-2 px-4 text-black border-b">{client.date}</td>
                </tr>
            ))}
            </tbody>
          </table>
          <button
              className='bg-gradient-to-r from-orange-600 to-orange-400 border-2 border-orange-600 rounded-full px-4 py-2 text-white hover:scale-105 duration-200'
              onClick={toggleDialog}>
            Add Event
          </button>
        </main>

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
 