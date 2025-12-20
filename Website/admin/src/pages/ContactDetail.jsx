import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import adminAxios from '../utils/axios';
import emailjs from '@emailjs/browser';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  Building, 
  MapPin, 
  Briefcase, 
  Tag, 
  Calendar,
  MessageSquare,
  Send,
  Clock,
  CheckCircle,
  XCircle,
  User,
  Copy,
  AlertCircle
} from 'lucide-react';

const ContactDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [replying, setReplying] = useState(false);
  const [replyMessage, setReplyMessage] = useState('');
  const [adminName, setAdminName] = useState('Support Team');
  const [status, setStatus] = useState('pending');

  // EmailJS Credentials - Replace with yours
  const EMAILJS_CONFIG = {
    SERVICE_ID: 'service_wotevqq',
    TEMPLATE_ID: 'template_skf12gl',
    PUBLIC_KEY: 'maLQ-G7P2BQOoOVoY'
  };

  useEffect(() => {
    // Initialize EmailJS
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
    fetchContactDetails();
  }, [id]);

  const fetchContactDetails = async () => {
    try {
      setLoading(true);
      const response = await adminAxios.get(`/api/contacts/${id}`);
      if (response.data.success) {
        setContact(response.data.data);
        setStatus(response.data.data.status);
      } else {
        throw new Error('Contact not found');
      }
    } catch (error) {
      console.error("Error fetching contact details:", error);
      alert("Failed to load contact details");
      navigate('/admin/dashboard/contact-management');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    try {
      const response = await adminAxios.put(`/api/contacts/${id}/status`, { 
        status: newStatus 
      });
      if (response.data.success) {
        setStatus(newStatus);
        setContact({ ...contact, status: newStatus });
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status");
    }
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (!replyMessage.trim()) {
      alert('Please enter a reply message');
      return;
    }

    try {
      setReplying(true);
      
      // Step 1: Send email via EmailJS
      const emailResult = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        {
          to_name: `${contact.firstName} ${contact.lastName}`,
          to_email: contact.email,
          category: contact.category,
          reply_message: replyMessage,
          admin_name: adminName,
          original_message: contact.message.substring(0, 500), // Limit length
          reply_to: 'vinayakandhere4@gmail.com' // Your email for replies
        }
      );

      console.log('✅ Email sent via EmailJS:', emailResult);

      // Step 2: Save reply to database
      const dbResponse = await adminAxios.post(`/api/contacts/${id}/reply`, {
        message: replyMessage,
        adminName: adminName
      });

      // Step 3: Update status to replied
      await handleStatusUpdate('replied');

      alert('✅ Reply sent and saved successfully!');
      setReplyMessage('');
      fetchContactDetails(); // Refresh contact details

    } catch (error) {
      console.error("❌ Error sending reply:", error);
      
      // Check what type of error occurred
      if (error.text && error.text.includes('No service with id')) {
        alert('EmailJS Service ID is incorrect. Please check your EmailJS configuration.');
      } else if (error.text && error.text.includes('No template with id')) {
        alert('EmailJS Template ID is incorrect. Please check your EmailJS configuration.');
      } else if (error.text && error.text.includes('Invalid public key')) {
        alert('EmailJS Public Key is incorrect. Please check your EmailJS configuration.');
      } else {
        // Try to save to database even if email fails
        try {
          await adminAxios.post(`/api/contacts/${id}/reply`, {
            message: replyMessage,
            adminName: adminName
          });
          await handleStatusUpdate('replied');
          alert('⚠️ Reply saved to database but email failed. Please check EmailJS setup.');
        } catch (dbError) {
          alert('❌ Failed to save reply. Please try again.');
        }
      }
    } finally {
      setReplying(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6600] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading contact details...</p>
        </div>
      </div>
    );
  }

  if (!contact) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
          <h2 className="mt-4 text-xl font-semibold text-gray-900">Contact not found</h2>
          <button
            onClick={() => navigate('/admin/dashboard/contact-management')}
            className="mt-4 px-4 py-2 bg-[#FF6600] text-white rounded-lg hover:bg-orange-600"
          >
            Back to Contacts
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link
            to="/admin/dashboard/contact-management"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={20} />
            Back to Contacts
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              {contact.firstName} {contact.lastName}
            </h1>
            <p className="text-slate-500 text-sm">Contact Inquiry #{contact._id.substring(-6)}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <select
            value={status}
            onChange={(e) => handleStatusUpdate(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm"
          >
            <option value="pending">Pending</option>
            <option value="replied">Replied</option>
            <option value="resolved">Resolved</option>
            <option value="spam">Spam</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Contact Info */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <User className="text-blue-600" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium">{contact.firstName} {contact.lastName}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Mail className="text-green-600" size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Email</p>
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{contact.email}</p>
                    <button
                      onClick={() => copyToClipboard(contact.email)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Phone className="text-purple-600" size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Phone Number</p>
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{contact.contactNumber}</p>
                    <button
                      onClick={() => copyToClipboard(contact.contactNumber)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <Building className="text-amber-600" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Organization</p>
                  <p className="font-medium">{contact.organization}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <MapPin className="text-red-600" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Region</p>
                  <p className="font-medium">{contact.region}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <Briefcase className="text-indigo-600" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Industry</p>
                  <p className="font-medium">{contact.industry}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-pink-100 rounded-lg">
                  <Tag className="text-pink-600" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="font-medium">{contact.category}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Calendar className="text-gray-600" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Submitted</p>
                  <p className="font-medium">{formatDate(contact.createdAt)}</p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm text-gray-500 mb-2">Consent & Marketing</p>
                <div className="flex items-center gap-4">
                  <span className={`flex items-center gap-1 ${contact.consent ? 'text-green-600' : 'text-red-600'}`}>
                    {contact.consent ? <CheckCircle size={16} /> : <XCircle size={16} />}
                    Consent Given
                  </span>
                  <span className={`flex items-center gap-1 ${contact.marketing ? 'text-green-600' : 'text-gray-400'}`}>
                    {contact.marketing ? <CheckCircle size={16} /> : <XCircle size={16} />}
                    Marketing OK
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Message & Reply */}
        <div className="lg:col-span-2 space-y-6">
          {/* Original Message */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Original Message</h2>
              <span className="text-xs text-gray-500">{formatDate(contact.createdAt)}</span>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700 whitespace-pre-wrap">{contact.message}</p>
            </div>
          </div>

          {/* Replies History */}
          {contact.replies && contact.replies.length > 0 && (
            <div className="bg-white rounded-xl border shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Reply History</h2>
              <div className="space-y-4">
                {contact.replies.map((reply, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4 py-3 bg-blue-50 rounded-r">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium text-gray-900">Admin Response</p>
                        <p className="text-xs text-gray-500">
                          {formatDate(reply.repliedAt)}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-700 whitespace-pre-wrap">{reply.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reply Form - Updated for EmailJS */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Send Reply via EmailJS
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded ml-2">
                No App Password Needed!
              </span>
            </h2>
            
            <div className="mb-4 p-3 bg-blue-50 rounded-lg text-sm text-blue-700">
              <p className="font-medium">ℹ️ Using EmailJS:</p>
              <p>• Emails sent directly from your browser</p>
              <p>• No backend email configuration required</p>
              <p>• 200 free emails/month included</p>
              <p className="mt-1 text-xs">
                Service ID: {EMAILJS_CONFIG.SERVICE_ID.substring(0, 10)}...
              </p>
            </div>
            
            <form onSubmit={handleReplySubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name (Appears in email)
                </label>
                <input
                  type="text"
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#FF6600] outline-none"
                  placeholder="Support Team"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reply Message *
                </label>
                <textarea
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  rows={6}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#FF6600] outline-none"
                  placeholder="Type your reply here..."
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  This will send email to: <strong>{contact.email}</strong>
                </p>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  <p className="font-medium">What will happen:</p>
                  <ul className="list-disc list-inside">
                    <li>Email sent via EmailJS</li>
                    <li>Reply saved to database</li>
                    <li>Status updated to "replied"</li>
                  </ul>
                </div>
                
                <button
                  type="submit"
                  disabled={replying || !replyMessage.trim()}
                  className="flex items-center gap-2 px-6 py-2 bg-[#FF6600] text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {replying ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Reply via EmailJS
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetail;