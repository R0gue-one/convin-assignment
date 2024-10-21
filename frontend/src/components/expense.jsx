import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, DollarSign, Users, StickyNote } from 'lucide-react';

export default function CreateExpensePage() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [splitType, setSplitType] = useState('equal');
  const [note, setNote] = useState('');

  // Placeholder participants data
  const participants = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Mike Johnson" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="w-full bg-white shadow-sm">
        <div className="w-full px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => navigate('/')}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Home className="w-6 h-6 text-indigo-600" />
            </button>
            <h1 className="text-2xl font-bold text-gray-800">Add Expense</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full px-8 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm p-8">
          <form className="space-y-6">
            {/* Amount Input */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <DollarSign className="w-4 h-4 mr-2" />
                Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  placeholder="0.00"
                />
              </div>
            </div>

            {/* Split Type Dropdown */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Users className="w-4 h-4 mr-2" />
                Split Type
              </label>
              <select
                value={splitType}
                onChange={(e) => setSplitType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white transition-colors"
              >
                <option value="equal">Split Equally</option>
                <option value="percent">Split by Percentage</option>
                <option value="exact">Split by Exact Amount</option>
              </select>
            </div>

            {/* Participants Dropdown */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Users className="w-4 h-4 mr-2" />
                Participants
              </label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white transition-colors"
              >
                {participants.map(participant => (
                  <option key={participant.id} value={participant.id}>
                    {participant.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Note Input */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <StickyNote className="w-4 h-4 mr-2" />
                Note
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="What's this expense for?"
                rows={3}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              Create Expense
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
