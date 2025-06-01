import React, { useEffect, useState } from 'react';

function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const res = await fetch('http://127.0.0.1:5000/api/bookmarks', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (data.bookmarked_hotels) {
          setBookmarks(data.bookmarked_hotels);
        } else {
          console.warn("No bookmarks returned:", data);
          setBookmarks([]);
        }
      } catch (err) {
        console.error('Error fetching bookmarks:', err);
        setBookmarks([]);
      }
    };

    if (token) {
      fetchBookmarks();
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">📌 Your Bookmarked Hotels</h1>
      {bookmarks.length === 0 ? (
        <p className="text-gray-600">You have no bookmarks yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookmarks.map((hotel) => (
            <div key={hotel.id} className="bg-white p-4 shadow rounded">
              <h2 className="text-xl font-semibold">{hotel.name}</h2>
              <p className="text-gray-700">{hotel.description}</p>
              <p className="text-sm">
                ⭐ {hotel.star_rating} Star | 🏊 Pool: {hotel.pool_available ? 'Yes' : 'No'}
              </p>
              <p className="text-green-700 font-bold">৳{hotel.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Bookmarks;
