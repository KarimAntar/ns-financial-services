'use client';

import React, { useState } from 'react';
import Booking from './components/Booking';
import { DollarSign } from 'lucide-react';

function Navigation({ setActiveSection, activeSection }: { setActiveSection: (s: string) => void, activeSection: string }) {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50 border-b-2 border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg shadow-md">
              <DollarSign className="w-8 h-8 text-white" />
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

function Hero({ onBook }: { onBook: () => void }) {
  return (
    <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-28 px-4 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 80%, white 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      <div className="relative max-w-7xl mx-auto text-center z-10">
        <div className="mx-auto mb-8 flex items-center justify-center">
          <div className="bg-blue-600 p-6 rounded-2xl shadow-2xl">
            <DollarSign className="w-20 h-20 text-white" />
          </div>
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight">
          <span className="block drop-shadow-2xl">Noura Salman (NS) Financial</span>
          <span className="block drop-shadow-2xl">and Bookkeeping Services LLC</span>
        </h1>
        <p className="text-2xl md:text-4xl font-bold mb-6 text-blue-100 drop-shadow-lg">
          Simplify Your Finances. Focus on Your Business.
        </p>
        <p className="text-lg md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed text-blue-50 drop-shadow-md">
          Licensed financial and bookkeeping firm dedicated to helping individuals, entrepreneurs, 
          and small businesses manage their finances with accuracy, clarity, and confidence.
        </p>
        <button
          onClick={onBook}
          className="bg-white text-blue-600 px-12 py-5 rounded-xl text-xl font-bold hover:bg-blue-50 transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-110 transform cursor-pointer"
        >
          Book a Free Consultation
        </button>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-blue-600 p-3 rounded-lg mr-3">
            <DollarSign className="w-10 h-10 text-white" />
          </div>
          <span className="text-2xl font-bold">NS Financial Services</span>
        </div>
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
        <div className={activeSection === 'home' ? '' : 'hidden'}>
          <Hero onBook={() => setActiveSection('booking')} />
        </div>
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
