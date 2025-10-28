'use client';

import React, { useState } from 'react';
import { Calendar, Mail, MapPin, CheckCircle, DollarSign, TrendingUp, FileText, Users, Clock, Shield, Award } from 'lucide-react';

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

  const services = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Bookkeeping & Accounting",
      description: "Recording transactions, managing accounts payable/receivable, and maintaining accurate books."
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Financial Reporting",
      description: "Preparing balance sheets, income statements, and cash flow reports for better business insight."
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Budgeting & Forecasting",
      description: "Helping businesses plan for growth and manage cash flow effectively."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Payroll Processing",
      description: "Ensuring timely, compliant payroll and tax deductions."
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Tax Preparation & Support",
      description: "Assisting with business tax organization and documentation (non-attestation)."
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Financial Analysis & Advisory",
      description: "Offering insights into profitability, performance, and financial strategy."
    }
  ];

  const whyChooseUs = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Licensed & Compliant",
      description: "Fully compliant with state and federal regulations"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Experienced Team",
      description: "Years of experience in credit analysis, finance, and accounting"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Personalized Service",
      description: "Tailored financial solutions for every client"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Modern Technology",
      description: "Secure, efficient bookkeeping with latest tools"
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setBookingForm({
      ...bookingForm,
      [e.target.name]: e.target.value
    });
  };

  const handleBookingSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Add validation
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

  const Navigation = () => (
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

  const Hero = () => (
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
          onClick={() => setActiveSection('booking')}
          className="bg-white text-blue-600 px-12 py-5 rounded-xl text-xl font-bold hover:bg-blue-50 transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-110 transform cursor-pointer"
        >
          Book a Free Consultation
        </button>
      </div>
    </div>
  );

  const About = () => (
    <div className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-16 text-gray-900">About Us</h2>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-3xl font-bold mb-6 text-blue-600">Our Mission</h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              To deliver reliable, accurate, and personalized financial services that help clients 
              understand their numbers, strengthen their financial health, and achieve long-term success.
            </p>
          </div>
          
          <div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-3xl font-bold mb-6 text-blue-600">Our Vision</h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              To become a trusted financial partner for small and medium-sized businesses by providing 
              modern, tech-driven solutions that make bookkeeping and financial management simple, 
              efficient, and stress-free.
            </p>
          </div>
        </div>

        <div className="bg-white p-10 rounded-2xl shadow-lg">
          <p className="text-gray-700 leading-relaxed text-lg">
            With a strong foundation in accounting, finance, and risk management, our goal is to 
            simplify financial processes, ensure transparency, and empower business owners to focus 
            on what they do best—running their business.
          </p>
        </div>
      </div>
    </div>
  );

  const Services = () => (
    <div className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-6 text-gray-900">Our Services</h2>
        <p className="text-center text-gray-600 text-lg mb-16 max-w-2xl mx-auto">
          Comprehensive financial solutions tailored to your business needs
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4 border-blue-600 hover:transform hover:scale-105"
            >
              <div className="text-blue-600 mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <h3 className="text-4xl font-bold text-center mb-12 text-gray-900">Why Choose Us?</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all text-center border border-blue-100">
                <div className="text-blue-600 flex justify-center mb-4">{item.icon}</div>
                <h4 className="font-bold text-lg mb-3 text-gray-900">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const Booking = () => (
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

  const Contact = () => (
    <div className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-16 text-gray-900">Contact Us</h2>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center border-2 border-blue-100">
            <Mail className="w-16 h-16 text-blue-600 mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Email</h3>
            <a href="mailto:info@nsfinancialservice.com" className="text-blue-600 hover:underline text-lg font-medium cursor-pointer">
              info@nsfinancialservice.com
            </a>
          </div>
          
          <div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center border-2 border-blue-100">
            <Clock className="w-16 h-16 text-blue-600 mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Business Hours</h3>
            <p className="text-gray-700 text-lg">Monday - Friday</p>
            <p className="text-gray-700 text-lg font-semibold">9:00 AM - 5:00 PM</p>
          </div>
          
          <div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center border-2 border-blue-100">
            <MapPin className="w-16 h-16 text-blue-600 mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Location</h3>
            <p className="text-gray-700 text-lg">1500 N. Grant St. Ste R</p>
            <p className="text-gray-700 text-lg">Denver, CO 80203</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-12 rounded-2xl text-center shadow-lg border-2 border-blue-200">
          <h3 className="text-3xl font-bold mb-4 text-gray-900">Nationwide Services</h3>
          <p className="text-gray-700 text-xl leading-relaxed max-w-3xl mx-auto">
            We proudly serve clients nationwide, offering both in-person and virtual bookkeeping 
            services to fit your business needs.
          </p>
        </div>
      </div>
    </div>
  );

  const Footer = () => (
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

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-20">
        <div className={activeSection === 'home' ? '' : 'hidden'}>
          <Hero />
          <About />
          <Services />
        </div>
        <div className={activeSection === 'about' ? '' : 'hidden'}>
          <About />
        </div>
        <div className={activeSection === 'services' ? '' : 'hidden'}>
          <Services />
        </div>
        <div className={activeSection === 'booking' ? '' : 'hidden'}>
          <Booking />
        </div>
        <div className={activeSection === 'contact' ? '' : 'hidden'}>
          <Contact />
        </div>
      </div>
      <Footer />
    </div>
  );
}
