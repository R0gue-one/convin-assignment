import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('name'));
    if (storedUser) {
      setUsername(storedUser); // Assuming 'User' stores just the username string
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - removed max-w-7xl */}
      <header className="w-full bg-white shadow-sm">
        <div className="w-full px-8 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-indigo-600">ExpenseTracker</h1>
          <button 
            className="px-4 py-2 text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors" onClick={() => navigate('/login')} 
          >
            Login
          </button>
        </div>
      </header>

      {/* Main Content - removed max-w-7xl */}
      <main className="w-full px-8">
        <div className="text-center mt-32">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">
            Hello, {username}
          </h2>
          <button 
            onClick={() => navigate('/expense')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg text-lg transition-colors"
          >
            Create Expense
          </button>
        </div>
      </main>
    </div>
  );
}
