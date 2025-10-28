'use client';

import React, { useState } from 'react';
import Booking from './components/Booking';

function Navigation({ setActiveSection, activeSection }: { setActiveSection: (s: string) => void, activeSection: string }) {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50 border-b-2 border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg shadow-md">
              {/* Logo or icon here */}
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-gray-900 tracking-tight">NS Financial</span>
              <span className="text-xs font-medium text-gray-600 tracking-wide">Bookkeeping Services</span>
            </div>
          </div>
          <div className="hidden md:flex space-x-4">
            {['home', 'about', 'services', 'booking', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`capitalize text-base font-semibold px-5 py-2.5 rounded-lg transition-all duration-200 cursor-pointer ${
                  activeSection === section
                    ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                {section}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <span className="text-2xl font-bold">NS Financial Services</span>
        <p className="text-gray-400 mb-4 text-lg">
          Noura Salman (NS) Financial and Bookkeeping Services LLC
        </p>
        <p className="text-gray-500">
          © 2025 NS Financial and Bookkeeping Services LLC. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default function NSFinancialWebsite() {
  const [activeSection, setActiveSection] = useState('home');
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    message: ''
  });
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Navigation setActiveSection={setActiveSection} activeSection={activeSection} />
      <div className="pt-20">
        <div className={activeSection === 'booking' ? '' : 'hidden'}>
          <Booking
            bookingForm={bookingForm}
            setBookingForm={setBookingForm}
            bookingSubmitted={bookingSubmitted}
            setBookingSubmitted={setBookingSubmitted}
            isSubmitting={isSubmitting}
            setIsSubmitting={setIsSubmitting}
          />
        </div>
        {/* TODO: Modularize and render About, Services, Contact, Footer similarly */}
      </div>
      <Footer />
    </div>
  );
}
