import React, { useState, useEffect } from 'react';
import contactus from '../assets/main-images/contactus.webp';

const Notification = () => {
  const [donors, setDonors] = useState([]);
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [donorsRes, volunteersRes] = await Promise.all([
          fetch('http://localhost:5000/api/donors-information'),
          fetch('http://localhost:5000/api/volunteer-information'),
        ]);

        const donorsData = await donorsRes.json();
        const volunteersData = await volunteersRes.json();

        setDonors(donorsData);
        setVolunteers(volunteersData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
      <div className="bg-blue-950 min-h-screen p-6">
        <h1 className="text-orange-500 text-4xl text-center mt-10 mb-8">Contributor's Contacts</h1>
        <div className="flex flex-col md:flex-row items-start justify-between">
          <img className="md:w-1/2 lg:w-1/3 mb-4 md:mb-0" src={contactus} alt="Contact Us" />
          <div className="w-full md:w-1/2 lg:w-2/3">
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                <h2 className="text-xl font-semibold text-orange-300 mb-4">Donors</h2>
                <ul>
                  {donors.map((donor) => (
                      <li
                          key={donor.id}
                          className="flex items-center justify-between p-4 mb-2 bg-gray-50 rounded-lg shadow hover:bg-gray-100 transition duration-300"
                      >
                        <div>
                          <p className="text-gray-700">{donor.name} - {donor.telephone_number}</p>
                          <small className="text-gray-500">{donor.email}</small>
                        </div>
                      </li>
                  ))}
                </ul>

                <h2 className="text-xl font-semibold text-orange-300 mb-4 mt-8">Volunteers</h2>
                <ul>
                  {volunteers.map((volunteer) => (
                      <li
                          key={volunteer.id}
                          className="flex items-center justify-between p-4 mb-2 bg-gray-50 rounded-lg shadow hover:bg-gray-100 transition duration-300"
                      >
                        <div>
                          <p className="text-gray-700">{volunteer.name} - {volunteer.telephone_number}</p>
                          <small className="text-gray-500">{volunteer.email}</small>
                          <p className="text-gray-600">Vehicle: {volunteer.vehicle_type} - {volunteer.vehicle_number}</p>
                        </div>
                      </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Notification;