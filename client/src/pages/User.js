import React, { useState, useEffect } from 'react';
import axios from 'axios';

const User = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    telephone_number: '',
    user_address: ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`http://localhost:5000/api/user/profile/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setMessage('Error fetching user profile');
      }
    };

    fetchUserProfile();
  }, []);

  const handleProfileChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem('userId');
      await axios.put(`http://localhost:5000/api/user/profile/${userId}`, user);
      setMessage('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Error updating profile');
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage('New passwords do not match');
      return;
    }
    try {
      const userId = localStorage.getItem('userId');
      await axios.put(`http://localhost:5000/api/user/change-password/${userId}`, {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      setMessage('Password changed successfully');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      console.error('Error changing password:', error);
      setMessage('Error changing password');
    }
  };

  return (
      <section className="py-8 px-8">
        {message && <div className="mb-4 text-center text-green-500">{message}</div>}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-6">
          {/* Edit Profile Card */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <header className="border-b pb-4 mb-4">
              <p className="flex items-center text-lg text-black font-semibold">
              <span className="mr-2">
                <i className="mdi mdi-account-circle"></i>
              </span>
                Edit Profile
              </p>
            </header>
            <div className="card-content">
              <form onSubmit={handleProfileSubmit}>
                <div className="mb-4">
                  <label className="label text-black">Name</label>
                  <input
                      type="text"
                      name="name"
                      value={user.name}
                      onChange={handleProfileChange}
                      className="input w-full border border-gray-300 rounded p-2 text-gray-500"
                      required
                  />
                  <p className="text-sm text-gray-500">Required. Your name</p>
                </div>
                <div className="mb-4">
                  <label className="label text-black">E-mail</label>
                  <input
                      type="email"
                      name="email"
                      value={user.email}
                      onChange={handleProfileChange}
                      className="input w-full border border-gray-300 rounded p-2 text-black"
                      required
                  />
                  <p className="text-sm text-gray-500">Required. Your e-mail</p>
                </div>
                <div className="mb-4">
                  <label className="label text-black">Telephone Number</label>
                  <input
                      type="text"
                      name="telephone_number"
                      value={user.telephone_number}
                      onChange={handleProfileChange}
                      className="input w-full border border-gray-300 rounded p-2 text-black"
                  />
                </div>
                <div className="mb-4">
                  <label className="label text-black">Address</label>
                  <input
                      type="text"
                      name="user_address"
                      value={user.user_address}
                      onChange={handleProfileChange}
                      className="input w-full border border-gray-300 rounded p-2 text-black"
                  />
                </div>
                <hr />
                <div className="mb-4">
                  <button type="submit" className="button bg-green-500 text-white p-2 rounded">
                    Update Profile
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Profile Card */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <header className="border-b pb-4 mb-4">
              <p className="flex items-center text-lg text-black font-semibold">
              <span className="mr-2">
                <i className="mdi mdi-account"></i>
              </span>
                Profile
              </p>
            </header>
            <div className="card-content">
              <div className="w-48 h-48 mx-auto mb-4">
                <img
                    src={`https://avatars.dicebear.com/v2/initials/${user.name}.svg`}
                    alt={user.name}
                    className="rounded-full"
                />
              </div>
              <hr />
              <div className="mb-4">
                <label className="label text-black">Name</label>
                <input
                    type="text"
                    readOnly
                    value={user.name}
                    className="input text-gray-500 w-full border border-gray-300 rounded p-2 bg-gray-100"
                />
              </div>
              <hr />
              <div className="mb-4">
                <label className="label text-black">E-mail</label>
                <input
                    type="text"
                    readOnly
                    value={user.email}
                    className="input w-full border text-gray-500 border-gray-300 rounded p-2 bg-gray-100"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Change Password Card */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <header className="border-b pb-4 mb-4">
            <p className="flex text-black items-center text-lg font-semibold">
            <span className="mr-2">
              <i className="mdi mdi-lock"></i>
            </span>
              Change Password
            </p>
          </header>
          <div className="card-content">
            <form onSubmit={handlePasswordSubmit}>
              <div className="mb-4">
                <label className="label text-black">Current password</label>
                <input
                    type="password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    className="input w-full border border-gray-300 rounded p-2 text-black"
                    required
                />
                <p className="text-sm text-gray-500">Required. Your current password</p>
              </div>
              <hr />
              <div className="mb-4">
                <label className="label text-black">New password</label>
                <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="input w-full border border-gray-300 rounded p-2 text-black"
                    required
                />
                <p className="text-sm text-gray-500">Required. New password</p>
              </div>
              <div className="mb-4">
                <label className="label text-black">Confirm password</label>
                <input
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    className="input w-full border border-gray-300 rounded p-2 text-black"
                    required
                />
                <p className="text-sm text-gray-500">Required. New password one more time</p>
              </div>
              <hr />
              <div className="mb-4">
                <button type="submit" className="button bg-green-500 text-white p-2 rounded">
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
  );
};

export default User;