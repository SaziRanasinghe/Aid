import React, { useState, useEffect } from 'react';
import payments from '../assets/main-images/payment.png';

const Payments = () => {
  const [paymentData, setPaymentData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const queryParams = new URLSearchParams({
      // Add any query parameters here if needed in the future
    }).toString();

    fetch(`http://localhost:5000/api/payments-information${queryParams ? `?${queryParams}` : ''}`)
        .then(response => response.json())
        .then(data => {
          setPaymentData(data);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error fetching payment data:', error);
          setIsLoading(false);
        });
  }, []);

  const renderTableContent = () => {
    if (isLoading) {
      return (
          <tr>
            <td colSpan="3" className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
              Loading...
            </td>
          </tr>
      );
    }

    if (paymentData.length === 0) {
      return (
          <tr>
            <td colSpan="3" className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
              <p className="text-gray-900 text-xl">Oops! No transactions found.</p>
            </td>
          </tr>
      );
    }

    return paymentData.map((item) => (
        <tr key={item.donation_id}>
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <div className="flex">
              <div className="ml-3">
                <p className="text-gray-900 whitespace-no-wrap">{item.donor_name}</p>
                <p className="text-gray-600 whitespace-no-wrap">{item.transaction_id.slice(0, 4)}</p>
              </div>
            </div>
          </td>
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <p className="text-gray-900 whitespace-no-wrap">${item.donation_amount.toFixed(2)}</p>
          </td>
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <p className="text-gray-900 whitespace-no-wrap">
              {new Date(item.donation_date).toLocaleDateString()}
            </p>
          </td>
        </tr>
    ));
  };

  return (
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <h1 className="text-orange-500 text-4xl text-center mt-4 mb-8">Payment Details</h1>
          <div className="flex flex-col md:flex-row items-start justify-between">
            <img className="md:w-1/2 lg:w-1/3 mb-4 md:mb-0" src={payments} alt="Payment" />
            <div className="w-full md:w-1/2 lg:w-2/3">
              <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                  <table className="min-w-full leading-normal">
                    <thead>
                    <tr>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Donor
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Date
                      </th>
                    </tr>
                    </thead>
                    <tbody>
                    {renderTableContent()}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Payments;
