import React from 'react';
import { useNavigate,useLocation } from 'react-router-dom';

function Homepage() {
  const navigate = useNavigate();
  const location=useLocation()

  const {name}=location.state || ''

  
  const handleLogout = () => {
    
    navigate('/login');
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className="max-w-md w-full px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
        <h1>hello <strong>{name}</strong> Welcome to Homepage which is only visible when you are logged in </h1>
        <button
          onClick={handleLogout} 
          type="button" 
          className="py-2 px-4 bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Homepage;
