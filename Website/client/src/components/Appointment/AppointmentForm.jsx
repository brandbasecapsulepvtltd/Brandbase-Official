import DatePicker from "react-datepicker";
import {
  format,
  isBefore,
  isSameDay,
  addDays,
  startOfDay,
} from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

export default function AppointmentForm({
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  formData,
  handleChange,
  handleSubmit,
  isFormValid,
  timeSlots,
  loading,
  isDateDisabled,
}) {
  return (
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
      {/* Date & Time Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-orange-100">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center font-sans">Select Date & Time</h2>

        <div className="flex justify-center">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => {
              if (!isDateDisabled(date)) setSelectedDate(date);
            }}
            filterDate={isDateDisabled}
            inline
            minDate={new Date()}
            dayClassName={(date) =>
              isDateDisabled(date)
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "hover:bg-orange-50 hover:text-[#FF6600] cursor-pointer"
            }
            calendarClassName="!text-sm !rounded-xl !shadow-md !border !border-orange-200"
          />
        </div>

        {selectedDate && (
          <div className="mt-8">
            <h3 className="font-medium text-center text-gray-900 mb-4 font-semibold">
              Available Time Slots for {format(selectedDate, "MMMM d, yyyy")}
            </h3>
            {timeSlots.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setSelectedTime(slot)}
                    className={`p-3 border rounded-lg text-sm font-medium transition-all duration-200 ${
                      selectedTime === slot
                        ? "bg-[#FF6600] text-white border-[#FF6600] shadow-lg"
                        : "bg-white hover:bg-orange-50 hover:text-[#FF6600] hover:border-[#FF6600] border-gray-300"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-500">No time slots available for this date.</p>
                <p className="text-sm text-gray-400 mt-1">Please select another date.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Contact Form Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-orange-100">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 font-sans">Contact Information</h2>

        <div className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b border-orange-100 pb-2">Personal Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                <input 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6600] focus:border-transparent transition-all duration-300"
                  value={formData.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                <input 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6600] focus:border-transparent transition-all duration-300"
                  value={formData.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
              <input 
                type="email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6600] focus:border-transparent transition-all duration-300"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Organization *</label>
              <input 
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6600] focus:border-transparent transition-all duration-300"
                value={formData.organization}
                onChange={(e) => handleChange("organization", e.target.value)}
                disabled={loading}
              />
            </div>
          </div>

          {/* Location Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b border-orange-100 pb-2">Location Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Region *</label>
                <select 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6600] focus:border-transparent transition-all duration-300"
                  value={formData.region}
                  onChange={(e) => handleChange("region", e.target.value)}
                  disabled={loading}
                >
                  <option value="">Select Region</option>
                  <option value="asia">Asia</option>
                  <option value="europe">Europe</option>
                  <option value="america">America</option>
                  <option value="africa">Africa</option>
                  <option value="oceania">Oceania</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
                <input 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6600] focus:border-transparent transition-all duration-300"
                  value={formData.country}
                  onChange={(e) => handleChange("country", e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State / Province *</label>
                <input 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6600] focus:border-transparent transition-all duration-300"
                  value={formData.state}
                  onChange={(e) => handleChange("state", e.target.value)}
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                <input 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6600] focus:border-transparent transition-all duration-300"
                  value={formData.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>
          </div>

          {/* Business Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b border-orange-100 pb-2">Business Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Industry *</label>
                <select 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6600] focus:border-transparent transition-all duration-300"
                  value={formData.industry}
                  onChange={(e) => handleChange("industry", e.target.value)}
                  disabled={loading}
                >
                  <option value="">Select Industry</option>
                  <option value="technology">Technology</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="finance">Finance</option>
                  <option value="education">Education</option>
                  <option value="retail">Retail</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Service Category *</label>
                <select 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6600] focus:border-transparent transition-all duration-300"
                  value={formData.category}
                  onChange={(e) => handleChange("category", e.target.value)}
                  disabled={loading}
                >
                  <option value="">Select Category</option>
                  <option value="custom-stall-design">Custom Stall Design</option>
                  <option value="modular-stalls">Modular Stalls</option>
                  <option value="3d-visualization">3D Visualization</option>
                  <option value="fabrication">Fabrication & Production</option>
                  <option value="installation">Installation & Setup</option>
                  <option value="lighting">Lighting Solutions</option>
                  <option value="graphics">Graphics & Branding</option>
                  <option value="event-management">Event Management</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Conditional Other Inputs */}
            {formData.industry === "other" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Specify Your Industry *</label>
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6600] focus:border-transparent transition-all duration-300"
                  value={formData.otherIndustry}
                  onChange={(e) => handleChange("otherIndustry", e.target.value)}
                  disabled={loading}
                />
              </div>
            )}

            {formData.category === "other" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Specify Your Category *</label>
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6600] focus:border-transparent transition-all duration-300"
                  value={formData.otherCategory}
                  onChange={(e) => handleChange("otherCategory", e.target.value)}
                  disabled={loading}
                />
              </div>
            )}
          </div>

          {/* Project Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b border-orange-100 pb-2">Project Details</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">How can we help you? *</label>
              <textarea 
                className="w-full p-3 border border-gray-300 rounded-lg min-h-[120px] resize-none focus:outline-none focus:ring-2 focus:ring-[#FF6600] focus:border-transparent transition-all duration-300"
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
                maxLength={1500}
                disabled={loading}
              />
              <p className="text-xs text-gray-500 mt-1">{formData.message.length}/1500 characters</p>
            </div>
          </div>

          {/* Consent Section */}
          <div className="space-y-4 pt-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b border-orange-100 pb-2">Consent & Preferences</h3>
            <div className="space-y-3">
              <label className="flex items-start gap-3">
                <input 
                  type="checkbox"
                  className="mt-1 text-[#FF6600] focus:ring-[#FF6600]"
                  checked={formData.consent}
                  onChange={(e) => handleChange("consent", e.target.checked)}
                  disabled={loading}
                />
                <span className="text-sm text-gray-700">I consent to data processing and agree to the terms *</span>
              </label>
              <label className="flex items-start gap-3">
                <input 
                  type="checkbox"
                  className="mt-1 text-[#FF6600] focus:ring-[#FF6600]"
                  checked={formData.marketing}
                  onChange={(e) => handleChange("marketing", e.target.checked)}
                  disabled={loading}
                />
                <span className="text-sm text-gray-700">I want to receive updates about exhibition design trends</span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={!isFormValid() || loading}
            className={`w-full py-4 mt-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center ${
              isFormValid() && !loading
                ? "bg-[#FF6600] text-white hover:bg-orange-600 hover:shadow-lg transform hover:scale-105" 
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Booking Appointment...
              </>
            ) : (
              "Book Appointment"
            )}
          </button>

          <p className="text-xs text-gray-500 text-center mt-4">
            By booking this appointment, you agree to our{" "}
            <a href="/privacy-policy" className="text-[#FF6600] hover:text-orange-600 underline">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
