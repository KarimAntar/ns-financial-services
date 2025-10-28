'use client';

import React from 'react';
import { Calendar, CheckCircle } from 'lucide-react';

interface BookingProps {
  bookingForm: {
    name: string;
    email: string;
    phone: string;
    service: string;
    date: string;
    time: string;
    message: string;
  };
  setBookingForm: (form: any) => void;
  bookingSubmitted: boolean;
  setBookingSubmitted: (v: boolean) => void;
  isSubmitting: boolean;
  setIsSubmitting: (v: boolean) => void;
}

const Booking: React.FC<BookingProps> = ({
  bookingForm,
  setBookingForm,
  bookingSubmitted,
  setBookingSubmitted,
  isSubmitting,
  setIsSubmitting,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setBookingForm({
      ...bookingForm,
      [e.target.name]: e.target.value
    });
  };

  const handleBookingSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!bookingForm.name || !bookingForm.email || !bookingForm.phone ||
      !bookingForm.service || !bookingForm.date || !bookingForm.time) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingForm),
      });

      const data = await response.json();

      if (response.ok) {
        setBookingSubmitted(true);
        setTimeout(() => {
          setBookingSubmitted(false);
          setBookingForm({
            name: '',
            email: '',
            phone: '',
            service: '',
            date: '',
            time: '',
            message: ''
          });
        }, 5000);
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      alert('Failed to submit booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-20 px-4 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-6 text-gray-900">Book a Consultation</h2>
        <p className="text-center text-gray-600 text-lg mb-12">
          Schedule a free consultation to discuss your financial needs
        </p>

        {bookingSubmitted ? (
          <div className="bg-green-50 border-2 border-green-500 rounded-2xl p-12 text-center shadow-xl">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
            <h3 className="text-3xl font-bold text-green-800 mb-4">Booking Received!</h3>
            <p className="text-green-700 text-lg">
              Thank you for scheduling a consultation. We'll contact you shortly to confirm your appointment.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-10">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={bookingForm.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all placeholder:text-gray-400 text-gray-700 cursor-pointer"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={bookingForm.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all placeholder:text-gray-400 text-gray-700 cursor-pointer"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm">Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={bookingForm.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all placeholder:text-gray-400 text-gray-700 cursor-pointer"
                  placeholder="(555) 123-4567"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm">Service Needed *</label>
                <select
                  name="service"
                  value={bookingForm.service}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all text-gray-700 cursor-pointer"
                >
                  <option value="" className="text-gray-400">Select a service</option>
                  <option value="Bookkeeping & Accounting">Bookkeeping & Accounting</option>
                  <option value="Financial Reporting">Financial Reporting</option>
                  <option value="Budgeting & Forecasting">Budgeting & Forecasting</option>
                  <option value="Payroll Processing">Payroll Processing</option>
                  <option value="Tax Preparation">Tax Preparation</option>
                  <option value="Financial Advisory">Financial Advisory</option>
                  <option value="New Business Setup">New Business Setup</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm">Preferred Date *</label>
                <input
                  type="date"
                  name="date"
                  value={bookingForm.date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all text-gray-700 cursor-pointer"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm">Preferred Time *</label>
                <select
                  name="time"
                  value={bookingForm.time}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all text-gray-700 cursor-pointer"
                >
                  <option value="" className="text-gray-400">Select a time</option>
                  <option value="9:00 AM">9:00 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="1:00 PM">1:00 PM</option>
                  <option value="2:00 PM">2:00 PM</option>
                  <option value="3:00 PM">3:00 PM</option>
                  <option value="4:00 PM">4:00 PM</option>
                </select>
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-gray-700 font-semibold mb-2 text-sm">Additional Information</label>
              <textarea
                name="message"
                value={bookingForm.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all resize-none placeholder:text-gray-400 text-gray-700 cursor-pointer"
                placeholder="Tell us about your business and financial needs..."
              ></textarea>
            </div>

            <button
              onClick={handleBookingSubmit}
              disabled={isSubmitting}
              className={`w-full bg-blue-600 text-white py-4 rounded-lg text-lg font-bold transition-all shadow-lg flex items-center justify-center ${
                isSubmitting
                  ? 'opacity-60 cursor-not-allowed'
                  : 'hover:bg-blue-700 hover:shadow-xl hover:scale-105 transform cursor-pointer'
              }`}
            >
              <Calendar className="w-6 h-6 mr-3" />
              {isSubmitting ? 'Sending...' : 'Schedule Consultation'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking;
