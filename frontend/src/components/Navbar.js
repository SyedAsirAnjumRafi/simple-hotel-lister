import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const email = localStorage.getItem('email');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    navigate('/');
  };

  const handleHotelsClick = () => {
    if (window.resetHotelFilters) {
      window.resetHotelFilters(); 
    }
    navigate('/'); 
  };

  return (
    <nav className="bg-blue-700 p-4 text-white flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <button
          onClick={handleHotelsClick}
          className="hover:underline text-white font-semibold"
        >
          Hotels
        </button>
        <Link to="/bookmarks" className="hover:underline text-white font-semibold">
          View Bookmarks
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        {token ? (
          <>
            <span className="text-sm font-medium">{email}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-white text-blue-700 px-3 py-1 rounded hover:bg-gray-100"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-white text-blue-700 px-3 py-1 rounded hover:bg-gray-100"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
