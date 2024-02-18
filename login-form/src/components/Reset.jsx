import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link, useLocation } from 'react-router-dom';

function Reset() {
  const navigate = useNavigate();
  const location=useLocation()
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const {email}=location.state || ''


  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'newPassword') {
      setNewPassword(value);
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    // Additional validation logic can be added here (e.g., minimum password length)
    
    try {
      const response=await axios.post('http://localhost:3000/reset',{email:email,password:newPassword})
      if (response.status === 200) {
        navigate('/Login');
      } else {
        setError('Error resetting password. Please try again.');
      }
    } catch (error) {
      console.error('Error resetting password:', error.response);
      setError('Error resetting password. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md w-full px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
        <div className="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl dark:text-white">
          Reset Your Password
        </div>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className="flex flex-col mb-6">
            <div className="flex relative">
              <span className="rounded-l-md inline-flex items-center px-3 border-t bg-white border-l border-b border-gray-300 text-gray-500 shadow-sm text-sm">
                <svg
                  width="15"
                  height="15"
                  fill="currentColor"
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z"></path>
                </svg>
              </span>
              <input
                type="password"
                id="new-password"
                className="rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                name="newPassword"
                value={newPassword}
                onChange={handleChange}
                placeholder="New Password"
              />
            </div>
            <div className="flex relative mt-2">
              <span className="rounded-l-md inline-flex items-center px-3 border-t bg-white border-l border-b border-gray-300 text-gray-500 shadow-sm text-sm"></span>
              <input
                type="password"
                id="confirm-password"
                className="rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
              />
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
          <div className="flex w-full">
            <button
              type="submit"
              className="py-2 px-4 bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
            >
              Submit
            </button>
          </div>
        </form>
        <div className="flex items-center justify-center mt-6">
      
        </div>
      </div>
    </div>
  );
}

export default Reset;
