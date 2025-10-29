'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Calendar, Mail, MapPin, CheckCircle, DollarSign, TrendingUp, FileText, Users, Clock, Shield, Award, ArrowRight, ChevronDown, BarChart3, Calculator, PieChart, Building2 } from 'lucide-react';

const BookingSection = React.memo(function BookingSection({
  bookingForm,
  handleInputChange,
  handleBookingSubmit,
  bookingSubmitted,
  isSubmitting
}: {
  bookingForm: {
    name: string;
    email: string;
    phone: string;
    service: string;
    date: string;
    time: string;
    message: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  handleBookingSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
  bookingSubmitted: boolean;
  isSubmitting: boolean;
}) {
  return (
    <div className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-4 text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
          Let's Work Together
        </h2>
        <p className="text-center text-gray-600 text-lg mb-12">
          We can add this sentence about the form, in the middle
        </p>

        {bookingSubmitted ? (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-500 rounded-2xl p-12 text-center shadow-xl">
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-green-800 mb-4">Booking Received!</h3>
            <p className="text-green-700 text-lg">
              Thank you for scheduling a consultation. We will contact you shortly to confirm your appointment.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-10 border border-gray-100">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="group">
                <label className="block text-gray-700 font-semibold mb-2 text-sm">
                  Name (required)
                </label>
                <input
                  type="text"
                  name="name"
                  value={bookingForm.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all placeholder:text-gray-400 text-gray-700"
                  placeholder="First Name"
                />
              </div>
              
              <div className="group">
                <label className="block text-gray-700 font-semibold mb-2 text-sm">
                  Email (required)
                </label>
                <input
                  type="email"
                  name="email"
                  value={bookingForm.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all placeholder:text-gray-400 text-gray-700"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="group">
                <label className="block text-gray-700 font-semibold mb-2 text-sm">
                  Phone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={bookingForm.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all placeholder:text-gray-400 text-gray-700"
                  placeholder="(555) 123-4567"
                />
              </div>
              
              <div className="group">
                <label className="block text-gray-700 font-semibold mb-2 text-sm">
                  Service Needed *
                </label>
                <select
                  name="service"
                  value={bookingForm.service}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all text-gray-700"
                >
                  <option value="">✓ Select a service</option>
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
              <div className="group">
                <label className="block text-gray-700 font-semibold mb-2 text-sm">
                  Preferred Date *
                </label>
                <input
                  type="date"
                  name="date"
                  value={bookingForm.date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all text-gray-700"
                />
              </div>
              
              <div className="group">
                <label className="block text-gray-700 font-semibold mb-2 text-sm">
                  Preferred Time *
                </label>
                <select
                  name="time"
                  value={bookingForm.time}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all text-gray-700"
                >
                  <option value="">Select a time</option>
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

            <div className="mb-8 group">
              <label className="block text-gray-700 font-semibold mb-2 text-sm">
                Additional Information
              </label>
              <textarea
                name="message"
                value={bookingForm.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all resize-none placeholder:text-gray-400 text-gray-700"
                placeholder="Tell us about your business and financial needs..."
              ></textarea>
            </div>

            <button
              onClick={handleBookingSubmit}
              disabled={isSubmitting}
              className={`group w-full bg-gradient-to-r from-teal-700 to-teal-800 text-white py-4 rounded-lg text-lg font-bold transition-all shadow-lg flex items-center justify-center cursor-pointer ${
                isSubmitting
                  ? 'opacity-60 cursor-not-allowed'
                  : 'hover:shadow-2xl hover:scale-105 transform'
              }`}
            >
              <Calendar className="w-6 h-6 mr-3" />
              {isSubmitting ? 'Sending...' : 'Schedule Consultation'}
              {!isSubmitting && <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
});

export default function NSFinancialWebsite() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    {
      icon: <BarChart3 className="w-7 h-7" />,
      title: "Financial Reporting",
      description: "Preparing balance sheets, income statements, and cash flow reports for better business insight.",
    },
    {
      icon: <Users className="w-7 h-7" />,
      title: "Payroll Processing",
      description: "Ensuring timely, compliant payroll and tax deductions.",
    },
    {
      icon: <Building2 className="w-7 h-7" />,
      title: "Tax Preparation & Support",
      description: "Assisting with business tax organization and documentation (non-attestation).",
    },
    {
      icon: <PieChart className="w-7 h-7" />,
      title: "Budgeting & Forecasting",
      description: "Helping businesses plan for growth and manage cash flow effectively.",
    },
    {
      icon: <TrendingUp className="w-7 h-7" />,
      title: "Financial Analysis & Advisory",
      description: "Offering insights into profitability, performance, and financial strategy.",
    },
    {
      icon: <Calculator className="w-7 h-7" />,
      title: "Bookkeeping & Accounting",
      description: "Recording transactions, managing accounts payable/receivable, and maintaining accurate books.",
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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'shadow-lg' : ''
    }`}>
      {/* Top bar with contact info */}
      <div className="bg-gradient-to-r from-teal-700 to-teal-800 text-white py-2.5 px-4">
        <div className="max-w-7xl mx-auto flex justify-end items-center text-xs space-x-6">
          <a href="mailto:info@nsfinancialservice.com" className="hover:text-teal-200 transition-colors flex items-center">
            <Mail className="w-3.5 h-3.5 mr-1.5" />
            info@nsfinancialservice.com
          </a>
          <span className="flex items-center">
            <MapPin className="w-3.5 h-3.5 mr-1.5" />
            1500 N. Grant St. Ste R, Denver, CO 80203
          </span>
        </div>
      </div>

      {/* Main navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2 group cursor-pointer" onClick={() => setActiveSection('home')}>
              <div className="bg-gradient-to-br from-teal-700 to-teal-800 p-1.5 rounded-lg shadow-md">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-bold text-gray-900">NS Financial Services</span>
            </div>
            <div className="hidden md:flex space-x-1">
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About' },
                { id: 'services', label: 'Services' },
                { id: 'testimonials', label: 'Testimonials' },
                { id: 'booking', label: 'Booking' },
                { id: 'contact', label: 'Contact' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`capitalize text-xs font-medium px-3 py-2 rounded-lg transition-all duration-300 cursor-pointer ${
                    activeSection === item.id
                      ? 'bg-gradient-to-r from-teal-700 to-teal-800 text-white shadow-md'
                      : 'text-gray-700 hover:bg-teal-50 hover:text-teal-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );

  const Hero = React.memo(() => {
    return (
      <div className="relative bg-white text-gray-900 py-20 px-4 overflow-hidden">
        <div className="relative max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center z-10">
          {/* Left side - Image with professional fade */}
          <div className="relative order-2 md:order-1">
            <div className="relative overflow-hidden rounded-2xl">
              {/* Gradient overlay for professional fade effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-teal-900/20 via-transparent to-teal-900/20 z-10 pointer-events-none"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 via-transparent to-transparent z-10 pointer-events-none"></div>
              
              <Image
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80"
                alt="Professional Financial Team"
                width={600}
                height={600}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </div>

          {/* Right side - Text */}
          <div className="order-1 md:order-2">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight text-gray-900">
              Noura Salman (NS) Financial<br />
              and Bookkeeping Services LLC
            </h1>

            <p className="text-xl md:text-2xl font-semibold mb-4 text-teal-700">
              Simplify Your Finances. Focus on Your Business.
            </p>

            <p className="text-base mb-8 text-gray-700 leading-relaxed">
              Licensed financial and bookkeeping firm dedicated to helping individuals, entrepreneurs, 
              and small businesses manage their finances with accuracy, clarity, and confidence.
            </p>

            <button
              onClick={() => setActiveSection('booking')}
              className="group bg-gradient-to-r from-teal-700 to-teal-800 text-white px-8 py-3 rounded-lg text-base font-bold hover:shadow-xl transition-all duration-300 inline-flex items-center cursor-pointer"
            >
              Book a Free Consultation
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    );
  });

  const Services = React.memo(() => {
    return (
      <div className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-4 text-gray-900">
            Our Services
          </h2>
          <p className="text-center text-gray-600 text-base mb-16">
            Comprehensive financial solutions tailored to your business needs
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="group flex items-start space-x-4 p-5 hover:bg-gray-50 rounded-lg transition-all duration-300"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-teal-600 to-teal-700 rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                  <div className="text-white">{service.icon}</div>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-base font-bold mb-2 text-gray-900">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  });

  const WhyChooseUs = React.memo(() => {
    const reasons = [
      {
        title: "We Treat Your Business Like Our Own",
        description: "Your goals matter to us. We take the time to understand your business, your story, and your vision — offering bookkeeping and financial support that fits you, not just the numbers.",
        color: "text-rose-600",
        icon: "IMG_3606.png"
      },
      {
        title: "Honest, Reliable, and Easy to Work With",
        description: "You can count on clear communication, accurate work, and real support whenever you need it. We believe trust and transparency are the foundation of every strong partnership.",
        color: "text-blue-600",
        icon: "IMG_3603.png"
      },
      {
        title: "Helping You Stress Less and Grow More",
        description: "Managing your books shouldn't feel overwhelming. We keep things organized and simple, so you can focus on running your business while we take care of the rest.",
        color: "text-purple-600",
        icon: "Helping_You_.png"
      }
    ];

    return (
      <div className="py-20 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16 text-gray-900">
            Why Choose Us?
          </h2>
          
          <div className="space-y-8">
            {reasons.map((reason, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 flex items-start gap-6">
                {/* Icon on the left */}
                <div className="flex-shrink-0">
                  <Image
                    src={`/${reason.icon}`}
                    alt={reason.title}
                    width={70}
                    height={70}
                    className="object-contain"
                  />
                </div>
                
                {/* Text content */}
                <div className="flex-1">
                  <h3 className={`text-xl font-bold mb-3 ${reason.color}`}>
                    {index + 1}. {reason.title}
                  </h3>
                  <p className="text-gray-700 text-base leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  });

  const About = React.memo(() => (
    <div className="py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-12 text-gray-900">
          What About Us
        </h2>
        
        <div className="bg-gradient-to-r from-teal-50 to-gray-50 p-10 rounded-2xl shadow-lg">
          <p className="text-gray-700 leading-relaxed text-lg text-center">
            <strong className="text-teal-700">NS Financial & Bookkeeping Services LLC</strong> is a woman-owned 
            business based in Colorado, committed to delivering reliable bookkeeping and financial solutions for small businesses. 
            Founded by <strong className="text-teal-700">Noora Salman</strong>, who holds a Bachelor's degree in 
            Accounting and a Master's in Finance and Risk Management, the firm brings over five years of professional experience 
            in credit analysis and financial reporting. Our goal is to empower business owners with accurate financial insights 
            to make confident, growth-driven decisions.
          </p>
        </div>
      </div>
    </div>
  ));

  const Contact = React.memo(() => (
    <div className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-16 text-gray-900">
          Contact Us
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-8 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-600 to-teal-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">Email</h3>
            <a href="mailto:info@nsfinancialservice.com" className="text-teal-700 hover:text-teal-800 font-medium hover:underline transition-colors cursor-pointer">
              info@nsfinancialservice.com
            </a>
          </div>
          
          <div className="text-center p-8 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-600 to-teal-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">Business Hours</h3>
            <p className="text-gray-700">Monday - Friday</p>
            <p className="text-gray-700 font-semibold">9:00 AM - 5:00 PM</p>
          </div>
          
          <div className="text-center p-8 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-600 to-teal-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">Location</h3>
            <p className="text-gray-700">1500 N. Grant St. Ste R</p>
            <p className="text-gray-700">Denver, CO 80203</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-teal-50 to-gray-50 p-10 rounded-xl text-center shadow-md">
          <h3 className="text-2xl font-bold mb-3 text-gray-900">Nationwide Services</h3>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto">
            We proudly serve clients nationwide, offering both in-person and virtual bookkeeping 
            services to fit your business needs.
          </p>
        </div>
      </div>
    </div>
  ));

  const Testimonials = React.memo(() => (
    <div className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-16 text-gray-900">
          Testimonials
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { name: "Sarah Johnson", role: "Small Business Owner", feedback: "NS Financial transformed how I manage my business finances. Professional, reliable, and always available when I need support!" },
            { name: "Michael Chen", role: "Startup Founder", feedback: "The team's expertise in bookkeeping and financial reporting has been invaluable. They truly understand the challenges of growing a business." },
            { name: "Jennifer Martinez", role: "Restaurant Owner", feedback: "Outstanding service! They handle all my payroll and tax prep seamlessly. I can finally focus on running my restaurant without financial stress." }
          ].map((item, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-600 to-teal-700 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{item.name}</h4>
                  <p className="text-sm text-gray-600">{item.role}</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "{item.feedback}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  ));

  const Footer = () => (
    <footer className="bg-gradient-to-br from-teal-900 to-teal-800 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="bg-white p-2 rounded-lg mr-3">
                <DollarSign className="w-8 h-8 text-teal-800" />
              </div>
              <span className="text-xl font-bold">NS Financial Services</span>
            </div>
            <p className="text-teal-100 text-sm">
              Noura Salman (NS) Financial and Bookkeeping Services LLC
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-lg">Contact</h4>
            <p className="text-teal-100 text-sm mb-2">Email: info@nsfinancialservice.com</p>
            <p className="text-teal-100 text-sm">Address: 1500 N. Grant St. Ste R, Denver, CO 80203</p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-lg">Business Hours</h4>
            <p className="text-teal-100 text-sm">Monday - Friday</p>
            <p className="text-teal-100 text-sm">9:00 AM - 5:00 PM</p>
          </div>
        </div>
        
        <div className="border-t border-teal-700 pt-8 text-center">
          <p className="text-teal-200 text-sm">
            © 2025 NS Financial and Bookkeeping Services LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-28">
        {activeSection === 'home' && (
          <>
            <Hero />
            <Services />
            <WhyChooseUs />
            <About />
          </>
        )}
        {activeSection === 'about' && <About />}
        {activeSection === 'services' && <Services />}
        {activeSection === 'testimonials' && <Testimonials />}
        {activeSection === 'booking' && (
          <BookingSection
            bookingForm={bookingForm}
            handleInputChange={handleInputChange}
            handleBookingSubmit={handleBookingSubmit}
            bookingSubmitted={bookingSubmitted}
            isSubmitting={isSubmitting}
          />
        )}
        {activeSection === 'contact' && <Contact />}
      </div>
      <Footer />
    </div>
  );
}
