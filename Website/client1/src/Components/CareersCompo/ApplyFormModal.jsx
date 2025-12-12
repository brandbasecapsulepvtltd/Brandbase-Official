'use client';

import React, { useState, useEffect } from 'react';
import axios from '../../sections/utils/axios';

const ApplyFormModal = ({ job, onClose, user }) => {
  const [answers, setAnswers] = useState([]);
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState(null);
  const [otherDocs, setOtherDocs] = useState([]);
  const [links, setLinks] = useState({
    linkedIn: '',
    github: '',
    portfolio: '',
    email: '',
  });
  const [uploading, setUploading] = useState(false);

  // Initialize links from user data
  useEffect(() => {
    if (user) {
      setLinks({
        linkedIn: user.linkedin || '',
        github: user.github || '',
        portfolio: user.portfolio || '',
        email: user.email || '',
      });
    }
  }, [user]);

  const handleAnswerChange = (i, value) => {
    const newAnswers = [...answers];
    newAnswers[i] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resume) return alert('Resume is required');

    try {
      setUploading(true);

      const formData = new FormData();
      // Append files
      formData.append('resume', resume);
      if (coverLetter) formData.append('coverLetter', coverLetter);
      otherDocs.forEach((file) => formData.append('otherDocs', file));

      // Append text fields
      formData.append('answers', JSON.stringify(answers));
      formData.append('linkedIn', links.linkedIn);
      formData.append('github', links.github);
      formData.append('portfolio', links.portfolio);
      formData.append('email', links.email);

      // ✅ Submit to backend
      const res = await axios.post(`/api/jobs/${job._id}/apply`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('✅ Application submitted successfully!');
      console.log('Response:', res.data);

      onClose();
    } catch (err) {
      console.error('❌ Error:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Error submitting application.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      id="modal-overlay"
      onClick={(e) => e.target.id === 'modal-overlay' && onClose()}
      className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-start pt-20"
    >
      <div className="bg-white max-w-2xl w-full rounded-lg shadow-lg p-6 overflow-y-auto max-h-[80vh]">
        <h2 className="text-2xl font-bold text-orange-600 mb-4">
          Apply for: {job.title}
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Job Questions */}
          {job.questions?.map((q, i) => (
            <div key={i}>
              <label className="block font-medium text-gray-700 mb-1">{q}</label>
              <textarea
                required
                className="w-full p-2 border rounded resize-none"
                rows="3"
                value={answers[i] || ''}
                onChange={(e) => handleAnswerChange(i, e.target.value)}
              />
            </div>
          ))}

          {/* File Uploads */}
          <div className="space-y-3">
            <div>
              <label className="font-medium">Resume *</label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                required
                onChange={(e) => setResume(e.target.files[0])}
              />
            </div>
            <div>
              <label className="font-medium">Cover Letter (Optional)</label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setCoverLetter(e.target.files[0])}
              />
            </div>
            <div>
              <label className="font-medium">Other Documents (Optional)</label>
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx"
                onChange={(e) => setOtherDocs([...e.target.files])}
              />
            </div>
          </div>

          {/* Links */}
          <div className="space-y-2 pt-4">
            {['linkedIn', 'github', 'portfolio', 'email'].map((field) => (
              <input
                key={field}
                type={field === 'email' ? 'email' : 'url'}
                placeholder={`${field.charAt(0).toUpperCase() + field.slice(1)} (optional)`}
                className="w-full p-2 border rounded"
                value={links[field]}
                onChange={(e) => setLinks({ ...links, [field]: e.target.value })}
                {...(field === 'email' ? { readOnly: true } : {})}
              />
            ))}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploading}
              className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-black"
            >
              {uploading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyFormModal;
