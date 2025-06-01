import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HotelList from './components/HotelList';
import Register from './pages/Register';
import Login from './pages/Login';
import Bookmarks from './pages/Bookmarks';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsLoggedIn(!!localStorage.getItem('token'));
    }, 500); 
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('👋 You have been logged out!');
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  const handleHotelsClick = () => {
    window.location.href = '/';
    setTimeout(() => {
      if (window.resetHotelFilters) {
        window.resetHotelFilters();
      }
    }, 500); 
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
        <nav className="bg-blue-600 dark:bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <Link to="/" className="font-bold text-xl">🏨 Hotel Lister</Link>
            <button onClick={handleHotelsClick} className="hover:underline">Hotels</button>
            <Link to="/bookmarks" className="hover:underline">Bookmarks</Link>
            {!isLoggedIn && (
              <>
                <Link to="/login" className="hover:underline">Login</Link>
                <Link to="/register" className="hover:underline">Register</Link>
              </>
            )}
            {isLoggedIn && (
              <button onClick={handleLogout} className="hover:underline">Logout</button>
            )}
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-white dark:bg-gray-600 text-blue-600 dark:text-white px-3 py-1 rounded"
          >
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </nav>

        <Routes>
          <Route path="/" element={<HotelList />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
