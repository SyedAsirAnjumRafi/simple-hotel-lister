// src/components/HotelList.js
import React, { useEffect, useState, useCallback } from 'react';

function HotelCard({ hotel }) {
  const handleViewDetails = () => {
    alert(`🏨 ${hotel.name}\n\n${hotel.description}`);
  };

  const handleBookmark = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('⚠️ Please log in to bookmark hotels.');
      return;
    }

    try {
      const res = await fetch('http://127.0.0.1:5000/api/bookmark', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ hotel_id: hotel.id })
      });

      const data = await res.json();
      alert(data.message || 'Hotel bookmarked!');
    } catch (error) {
      console.error('Error bookmarking hotel:', error);
      alert('❌ Failed to bookmark hotel. Please try again.');
    }
  };

  const handleBookHotel = () => {
    alert(`✅"${hotel.name}" successfully booked!`);
  };

  return (
    <div className="bg-white dark:bg-gray-800 dark:text-white shadow-md rounded-lg p-6 mb-4">
      <h2 className="text-xl font-bold text-blue-700 dark:text-blue-300">{hotel.name}</h2>
      <p className="text-gray-700 dark:text-gray-200">{hotel.description}</p>
      <p className="text-sm mt-2">
        ⭐ {hotel.star_rating} star hotel | 💰 ৳{hotel.price}
      </p>
      <p className="text-sm">
        📍 Location: {hotel.location} | 🏊 Pool: {hotel.pool_available ? 'Yes' : 'No'}
      </p>

      <div className="mt-4 flex gap-4 flex-wrap">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          onClick={handleViewDetails}
        >
          View Details
        </button>
        <button
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
          onClick={handleBookmark}
        >
          Bookmark
        </button>
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded"
          onClick={handleBookHotel}
        >
          Book Hotel
        </button>
      </div>
    </div>
  );
}

function HotelList() {
  const [hotels, setHotels] = useState([]);
  const [location, setLocation] = useState('');
  const [starRating, setStarRating] = useState('');
  const [poolAvailable, setPoolAvailable] = useState('');

  const fetchHotels = useCallback(() => {
    let url = 'http://127.0.0.1:5000/api/hotels?';

    if (location) url += `location=${location}&`;
    if (starRating) url += `star_rating=${starRating}&`;
    if (poolAvailable) url += `pool_available=${poolAvailable}`;

    fetch(url)
      .then(res => res.json())
      .then(data => setHotels(data.hotels))
      .catch(err => console.error("Error fetching hotels:", err));
  }, [location, starRating, poolAvailable]);

  useEffect(() => {
    fetchHotels();
  }, [fetchHotels]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchHotels();
  };

  const resetHotels = () => {
    setLocation('');
    setStarRating('');
    setPoolAvailable('');
    setTimeout(() => fetchHotels(), 0); 
  };

  // 🔁 Register window function for navbar reset
  window.resetHotelFilters = resetHotels;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white p-6">
      <h1 className="text-3xl font-bold text-center text-blue-700 dark:text-blue-300 mb-6">
        Simple Hotel Lister
      </h1>

      {/* 🔍 Search and Filter */}
      <form onSubmit={handleSearch} className="max-w-3xl mx-auto mb-6 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Enter location (e.g. Dhaka)"
          className="flex-1 p-2 border rounded text-black"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <select
          className="p-2 border rounded text-black"
          value={starRating}
          onChange={(e) => setStarRating(e.target.value)}
        >
          <option value="">All Stars</option>
          <option value="3">3 Star</option>
          <option value="4">4 Star</option>
          <option value="5">5 Star</option>
        </select>
        <select
          className="p-2 border rounded text-black"
          value={poolAvailable}
          onChange={(e) => setPoolAvailable(e.target.value)}
        >
          <option value="">Pool?</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Search
        </button>
      </form>

      {/* 🏨 Hotel List */}
      <div className="max-w-3xl mx-auto">
        {hotels.length === 0 ? (
          <p className="text-gray-400 text-center">No hotels found.</p>
        ) : (
          hotels.map(hotel => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))
        )}
      </div>
    </div>
  );
}

export default HotelList;
