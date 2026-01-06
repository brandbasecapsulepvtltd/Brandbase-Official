export default function SuccessMessage({ onReset }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f8f0] p-6 mt-15">
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-orange-100 text-center max-w-md w-full">
        <div className="w-16 h-16 mx-auto bg-[#FF6600] text-white rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 font-sans mb-2">Appointment Booked!</h2>
        <p className="text-gray-600 mb-4">We will contact you soon to confirm your consultation.</p>
        <button
          onClick={onReset}
          className="bg-[#FF6600] text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-all duration-300"
        >
          Book Another Appointment
        </button>
      </div>
    </div>
  );
}
