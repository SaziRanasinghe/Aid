import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Administrator() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/user')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

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
    </div>
  );
}
 
 export default Administrator