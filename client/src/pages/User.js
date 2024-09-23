import React from 'react';


const User = () => {
  return (
    <section className="py-8 px-8">
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
            <form>
              <div className="mb-4">
                <label className="label text-black">Avatar</label>
                <div className="flex items-center">
                  <label className="upload control">
                  <button type="submit" className="button bg-blue-500 text-white p-1">
                  Submit
                </button>
                    <input type="file" className="hidden" />
                  </label>
                </div>
              </div>
              <hr />
              <div className="mb-4">
                <label className="label text-black">Name</label>
                <input
                  type="text"
                  name="name"
                  defaultValue="John Doe"
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
                  defaultValue="user@example.com"
                  className="input w-full border border-gray-300 rounded p-2 text-black"
                  required
                />
                <p className="text-sm text-gray-500">Required. Your e-mail</p>
              </div>
              <hr />
              <div className="mb-4">
                <button type="submit" className="button bg-green-500 text-white p-2 rounded">
                  Submit
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
                src="https://avatars.dicebear.com/v2/initials/john-doe.svg"
                alt="John Doe"
                className="rounded-full"
              />
            </div>
            <hr />
            <div className="mb-4">
              <label className="label text-black">Name</label>
              <input
                type="text"
                readOnly
                defaultValue="John Doe"
                className="input text-gray-500 w-full border border-gray-300 rounded p-2 bg-gray-100 "
              />
            </div>
            <hr />
            <div className="mb-4">
              <label className="label text-black">E-mail</label>
              <input
                type="text"
                readOnly
                defaultValue="user@example.com"
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
          <form>
            <div className="mb-4">
              <label className="label text-black">Current password</label>
              <input
                type="password"
                name="password_current"
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
                name="password"
                className="input w-full border border-gray-300 rounded p-2 text-black"
                required
              />
              <p className="text-sm text-gray-500">Required. New password</p>
            </div>
            <div className="mb-4">
              <label className="label text-black">Confirm password</label>
              <input
                type="password"
                name="password_confirmation"
                className="input w-full border border-gray-300 rounded p-2 text-black"
                required
              />
              <p className="text-sm text-gray-500">Required. New password one more time</p>
            </div>
            <hr />
            <div className="mb-4">
              <button type="submit" className="button bg-green-500 text-white p-2 rounded">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default User;
