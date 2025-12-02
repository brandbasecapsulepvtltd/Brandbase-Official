'use client';

import React from 'react';

export default function RedirectModal({ onClose }) {
  const handleLoginRedirect = () => {
    // Replace with actual login page URL
    window.location.href = '/login';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md mx-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Login Required</h2>
        <p className="text-gray-600 mb-6">
          You need to be logged in to apply for this job. Please login or create an account to continue.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleLoginRedirect}
            className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 font-medium"
          >
            Go to Login
          </button>
        </div>
      </div>
    </div>
  );
}