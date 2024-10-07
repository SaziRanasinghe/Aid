import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function GalleryUpload({ isOpen, onClose }) {
    const [formData, setFormData] = useState({
        event_name: '',
        description: '',
        photo: null
    });

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
        data.append('photo', formData.photo);

        try {
            const response = await axios.post('http://localhost:5000/api/admin/upload', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            console.log('Upload successful:', response.data);
            toast.success('Image uploaded successfully!');
            onClose();
            // Reset form after successful upload
            setFormData({
                event_name: '',
                description: '',
                photo: null
            });
        } catch (error) {
            console.error('Error uploading image:', error);
            toast.error('Error uploading image. Please try again.');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-10 flex items-center justify-center mt-2 overflow-auto bg-black bg-opacity-50" onClick={onClose}>
            <div className="bg-white shadow-2xl m-4 sm:m-8 p-4" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center border-b pb-2 text-xl">
                    <h6 className="text-xl text-black font-bold">Add Photos</h6>
                    <button type="button" className="text-black" onClick={onClose}>✖</button>
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
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    onChange={handleInputChange}
                                    value={formData.description}
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
                                    onChange={handlePhotoUpload}
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
                                onClick={onClose}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default GalleryUpload;