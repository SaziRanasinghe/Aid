import React, { useState } from 'react';

const FormComponent = () => {
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
    <>
      <button
        onClick={toggleDialog}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Open Form
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
    </>
  );
};

export default FormComponent;
