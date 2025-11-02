'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Calendar, Mail, MapPin, CheckCircle, DollarSign, TrendingUp, FileText, Users, Clock, Shield, Award, ArrowRight, ChevronDown, BarChart3, Calculator, PieChart, Building2, User, Phone, Home, Info, Briefcase, MessageSquare, Star } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

// Animated Text Component with typing effect
const AnimatedText = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  
  const phrases = [
    "Simplify Your Finances. Focus on Your Business.",
    "Licensed financial and bookkeeping firm dedicated to helping you succeed.",
    "Expert guidance for entrepreneurs and small businesses.",
    "Manage your finances with accuracy, clarity, and confidence."
  ];

  useEffect(() => {
    const timeout = setTimeout(() => {
      const fullText = phrases[currentIndex];
      
      if (!isDeleting && currentText === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % phrases.length);
      } else if (isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length - 1));
      } else {
        setCurrentText(fullText.substring(0, currentText.length + 1));
      }
    }, isDeleting ? 30 : 60);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentIndex]);

  return (
    <p className="text-lg md:text-xl mb-8 text-gray-700 leading-relaxed min-h-[80px]">
      {currentText}
      <span className="animate-pulse">|</span>
    </p>
  );
};

const BookingSection = React.memo(function BookingSection({
  bookingForm,
  handleInputChange,
  handleBookingSubmit,
  bookingSubmitted,
  isSubmitting,
  minDate
}: {
  bookingForm: {
    name: string;
    email: string;
    phone: string;
    service: string;
    otherService: string;
    date: string;
    time: string;
    message: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  handleBookingSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
  bookingSubmitted: boolean;
  isSubmitting: boolean;
  minDate: string;
}) {
  return (
    <div className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-4 text-[#114040]" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
          Let's Work Together
        </h2>
        <p className="text-center text-gray-600 text-lg mb-12">
          Together, we bring clarity and security to your finances.
        </p>

        {bookingSubmitted ? (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-500 rounded-2xl p-12 text-center shadow-xl animate-fadeIn">
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-green-800 mb-4">Booking Received!</h3>
            <p className="text-green-700 text-lg">
              Thank you for scheduling a consultation. We will contact you shortly to confirm your appointment.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-10 border border-gray-100 animate-slideUp">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="group">
                <label className="block text-gray-700 font-semibold mb-2 text-sm">
                  Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={bookingForm.name}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#018880] focus:border-transparent transition-all placeholder:text-gray-400 text-gray-700"
                    placeholder="First Name"
                  />
                </div>
              </div>
              
              <div className="group">
                <label className="block text-gray-700 font-semibold mb-2 text-sm">
                  Email *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={bookingForm.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#018880] focus:border-transparent transition-all placeholder:text-gray-400 text-gray-700"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="group">
                <label className="block text-gray-700 font-semibold mb-2 text-sm">
                  Phone *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={bookingForm.phone}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#018880] focus:border-transparent transition-all placeholder:text-gray-400 text-gray-700"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
              
              <div className="group">
                <label className="block text-gray-700 font-semibold mb-2 text-sm">
                  Service Needed *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FileText className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    name="service"
                    value={bookingForm.service}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-10 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#018880] focus:border-transparent transition-all text-gray-700 appearance-none bg-white"
                  >
                    <option value="">Select a service</option>
                    <option value="Bookkeeping & Accounting">Bookkeeping & Accounting</option>
                    <option value="Financial Reporting">Financial Reporting</option>
                    <option value="Budgeting & Forecasting">Budgeting & Forecasting</option>
                    <option value="Payroll Processing">Payroll Processing</option>
                    <option value="Tax Preparation">Tax Preparation</option>
                    <option value="Financial Advisory">Financial Advisory</option>
                    <option value="New Business Setup">New Business Setup</option>
                    <option value="Other">Other</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Show "Other Service" field if "Other" is selected */}
            {bookingForm.service === 'Other' && (
              <div className="mb-6 group animate-slideDown">
                <label className="block text-gray-700 font-semibold mb-2 text-sm">
                  Please specify the service you need *
                </label>
                <input
                  type="text"
                  name="otherService"
                  value={bookingForm.otherService}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#018880] focus:border-transparent transition-all placeholder:text-gray-400 text-gray-700"
                  placeholder="Describe the service you need..."
                />
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="group">
                <label className="block text-gray-700 font-semibold mb-2 text-sm">
                  Preferred Date *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    name="date"
                    value={bookingForm.date}
                    onChange={handleInputChange}
                    min={minDate}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#018880] focus:border-transparent transition-all text-gray-700 cursor-pointer hover:border-[#018880]"
                    style={{
                      colorScheme: 'light',
                    }}
                  />
                  <style jsx>{`
                    input[type="date"]::-webkit-calendar-picker-indicator {
                      opacity: 0;
                      position: absolute;
                      right: 0;
                      width: 100%;
                      height: 100%;
                      cursor: pointer;
                    }
                    input[type="date"]::-webkit-datetime-edit-fields-wrapper {
                      padding: 0;
                    }
                    input[type="date"]::-webkit-datetime-edit-text {
                      color: #018880;
                      padding: 0 2px;
                    }
                    input[type="date"]::-webkit-datetime-edit-month-field,
                    input[type="date"]::-webkit-datetime-edit-day-field,
                    input[type="date"]::-webkit-datetime-edit-year-field {
                      color: #114040;
                      font-weight: 500;
                    }
                    input[type="date"]::-webkit-inner-spin-button,
                    input[type="date"]::-webkit-clear-button {
                      display: none;
                    }
                  `}</style>
                </div>
                <p className="text-xs text-gray-500 mt-1">Select a date from today onwards</p>
              </div>
              
              <div className="group">
                <label className="block text-gray-700 font-semibold mb-2 text-sm">
                  Preferred Time *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Clock className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    name="time"
                    value={bookingForm.time}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-10 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#018880] focus:border-transparent transition-all text-gray-700 cursor-pointer hover:border-[#018880] appearance-none bg-white"
                  >
                    <option value="">Select a time</option>
                    <option value="9:00 AM">🕘 9:00 AM</option>
                    <option value="10:00 AM">🕙 10:00 AM</option>
                    <option value="11:00 AM">🕚 11:00 AM</option>
                    <option value="12:00 PM">🕛 12:00 PM</option>
                    <option value="1:00 PM">🕐 1:00 PM</option>
                    <option value="2:00 PM">🕑 2:00 PM</option>
                    <option value="3:00 PM">🕒 3:00 PM</option>
                    <option value="4:00 PM">🕓 4:00 PM</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="mb-8 group">
              <label className="block text-gray-700 font-semibold mb-2 text-sm">
                Additional Information (optional)
              </label>
              <textarea
                name="message"
                value={bookingForm.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#018880] focus:border-transparent transition-all resize-none placeholder:text-gray-400 text-gray-700"
                placeholder="Tell us about your business and financial needs..."
              ></textarea>
            </div>

            <button
              onClick={handleBookingSubmit}
              disabled={isSubmitting}
              className={`group w-full bg-gradient-to-r from-[#018880] to-[#002830] text-white py-4 rounded-lg text-lg font-bold transition-all shadow-lg flex items-center justify-center cursor-pointer ${
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
    otherService: '',
    date: '',
    time: '',
    message: ''
  });
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [minDate, setMinDate] = useState('');

  // Set minimum date to today
  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    setMinDate(`${year}-${month}-${day}`);
  }, []);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const section = event.state?.section || 'home';
      setActiveSection(section);
    };

    // Set initial state
    if (!window.history.state) {
      window.history.replaceState({ section: 'home' }, '', '#home');
    }

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update activeSection function to include history
  const navigateToSection = (section: string) => {
    setActiveSection(section);
    // Reset booking confirmation when navigating to booking section
    if (section === 'booking') {
      setBookingSubmitted(false);
    }
    window.history.pushState({ section }, '', `#${section}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

    // Validate required fields
    if (!bookingForm.name || !bookingForm.email || !bookingForm.phone || 
        !bookingForm.service || !bookingForm.date || !bookingForm.time) {
      toast.error('Please fill in all required fields', {
        duration: 4000,
        position: 'top-center',
        style: {
          background: '#FEE2E2',
          color: '#991B1B',
          fontWeight: '600',
          padding: '16px',
          borderRadius: '12px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
        },
        icon: '⚠️',
      });
      return;
    }

    // Additional validation for "Other" service
    if (bookingForm.service === 'Other' && !bookingForm.otherService.trim()) {
      toast.error('Please specify the service you need', {
        duration: 4000,
        position: 'top-center',
        style: {
          background: '#FEE2E2',
          color: '#991B1B',
          fontWeight: '600',
          padding: '16px',
          borderRadius: '12px',
        },
        icon: '📝',
      });
      return;
    }

    setIsSubmitting(true);
    
    // Show loading toast
    const loadingToast = toast.loading('Submitting your booking...', {
      position: 'top-center',
      style: {
        background: '#F3F4F6',
        color: '#1F2937',
        fontWeight: '600',
        padding: '16px',
        borderRadius: '12px',
      },
    });
    
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
        toast.dismiss(loadingToast);
        toast.success('Booking submitted successfully! We\'ll contact you soon.', {
          duration: 5000,
          position: 'top-center',
          style: {
            background: '#D1FAE5',
            color: '#065F46',
            fontWeight: '600',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
          },
          icon: '✅',
        });
        
        setBookingSubmitted(true);
        // Reset form fields but keep confirmation visible
        setBookingForm({
          name: '',
          email: '',
          phone: '',
          service: '',
          otherService: '',
          date: '',
          time: '',
          message: ''
        });
      } else {
        toast.dismiss(loadingToast);
        toast.error(`Error: ${data.error}`, {
          duration: 5000,
          position: 'top-center',
          style: {
            background: '#FEE2E2',
            color: '#991B1B',
            fontWeight: '600',
            padding: '16px',
            borderRadius: '12px',
          },
          icon: '❌',
        });
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error('Failed to submit booking. Please try again.', {
        duration: 5000,
        position: 'top-center',
        style: {
          background: '#FEE2E2',
          color: '#991B1B',
          fontWeight: '600',
          padding: '16px',
          borderRadius: '12px',
        },
        icon: '⚠️',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const Navigation = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        {/* Main navigation - Always white background */}
        <div className="transition-all duration-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center group cursor-pointer" onClick={() => navigateToSection('home')}>
                <Image
                  src="/header.png"
                  alt="NS Financial Logo"
                  width={180}
                  height={60}
                  className="object-contain"
                />
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-2">
                {[
                  { id: 'home', label: 'Home', icon: <Home className="w-4 h-4" /> },
                  { id: 'about', label: 'About', icon: <Info className="w-4 h-4" /> },
                  { id: 'services', label: 'Services', icon: <Briefcase className="w-4 h-4" /> },
                  { id: 'booking', label: 'Book Your Consultation', icon: <Calendar className="w-4 h-4" /> },
                  { id: 'contact', label: 'Contact Us', icon: <MessageSquare className="w-4 h-4" /> }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => navigateToSection(item.id)}
                    className={`capitalize text-sm font-medium px-4 py-2.5 rounded-lg transition-all duration-300 cursor-pointer tracking-wide flex items-center space-x-2 ${
                      activeSection === item.id
                        ? 'bg-gradient-to-r from-[#018880] to-[#002830] text-white shadow-lg font-semibold'
                        : 'text-[#114040] hover:bg-gray-100 hover:text-[#018880]'
                    }`}
                    style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-lg text-[#114040] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#018880]"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  {!mobileMenuOpen ? (
                    <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  ) : (
                    <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200 shadow-lg">
              {[
                { id: 'home', label: 'Home', icon: <Home className="w-5 h-5" /> },
                { id: 'about', label: 'About', icon: <Info className="w-5 h-5" /> },
                { id: 'services', label: 'Services', icon: <Briefcase className="w-5 h-5" /> },
                { id: 'booking', label: 'Book Your Consultation', icon: <Calendar className="w-5 h-5" /> },
                { id: 'contact', label: 'Contact Us', icon: <MessageSquare className="w-5 h-5" /> }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    navigateToSection(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                    activeSection === item.id
                      ? 'bg-gradient-to-r from-[#018880] to-[#002830] text-white shadow-md'
                      : 'text-[#114040] hover:bg-gray-100 hover:text-[#018880]'
                  }`}
                  style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>
    );
  };

  const Hero = React.memo(() => {
    return (
      <div className="relative text-gray-900 py-20 px-4 overflow-hidden">
        {/* Background Image with fade overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/background.jpg"
            alt="Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/70"></div>
        </div>

        <div className="relative max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center z-10">
          {/* Left side - Image with professional fade */}
          <div className="relative order-2 md:order-1">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              {/* Professional gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#114040]/20 via-transparent to-[#018880]/20 z-10 pointer-events-none"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#002830]/40 via-transparent to-transparent z-10 pointer-events-none"></div>
              
              {/* Faded border effect */}
              <div className="absolute inset-0 z-20 pointer-events-none" style={{
                boxShadow: 'inset 0 0 60px 20px rgba(255,255,255,0.3)'
              }}></div>
              
              <Image
                src="/background.jpg"
                alt="Professional Financial Team"
                width={600}
                height={600}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </div>

          {/* Right side - Text with animations */}
          <div className="order-1 md:order-2">
            <h1 className="mb-6 leading-tight text-[#114040]">
              <div className="text-4xl md:text-5xl font-bold mb-2">
                Noura Salman (NS)
              </div>
              <div className="text-xl md:text-2xl font-semibold">
                Financial and Bookkeeping Services LLC
              </div>
            </h1>

            <AnimatedText />

            <button
              onClick={() => navigateToSection('booking')}
              className="group bg-gradient-to-r from-[#018880] to-[#002830] text-white px-8 py-4 rounded-lg text-base font-bold hover:shadow-2xl transition-all duration-300 inline-flex items-center cursor-pointer animate-pulse-slow"
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
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        },
        { threshold: 0.1 }
      );

      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }

      return () => observer.disconnect();
    }, []);

    return (
      <div ref={sectionRef} className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-5xl font-bold text-center mb-4 text-[#114040] transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Our Services
          </h2>
          <p className={`text-center text-gray-600 text-base mb-16 transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Comprehensive financial solutions tailored to your business needs
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className={`group flex items-start space-x-4 p-6 hover:bg-white rounded-xl transition-all duration-500 shadow-sm hover:shadow-2xl border border-gray-100 transform hover:-translate-y-2 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ 
                  transitionDelay: `${isVisible ? index * 100 : 0}ms`
                }}
              >
                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-[#018880] to-[#002830] rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <div className="text-white">{service.icon}</div>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-base font-bold mb-2 text-[#114040] group-hover:text-[#018880] transition-colors">
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
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        },
        { threshold: 0.1 }
      );

      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }

      return () => observer.disconnect();
    }, []);

    const reasons = [
      {
        title: "We Treat Your Business Like Our Own",
        description: "Your goals matter to us. We take the time to understand your business, your story, and your vision — offering bookkeeping and financial support that fits you, not just the numbers.",
        color: "from-[#018880] to-[#002830]",
        icon: "Earn.png"
      },
      {
        title: "Honest, Reliable, and Easy to Work With",
        description: "You can count on clear communication, accurate work, and real support whenever you need it. We believe trust and transparency are the foundation of every strong partnership.",
        color: "from-[#018880] to-[#002830]",
        icon: "Helping_You.png"
      },
      {
        title: "Helping You Stress Less and Grow More",
        description: "Managing your books shouldn't feel overwhelming. We keep things organized and simple, so you can focus on running your business while we take care of the rest.",
        color: "from-[#018880] to-[#002830]",
        icon: "Growing.png"
      }
    ];

    return (
      <div ref={sectionRef} className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-5xl font-bold text-center mb-16 text-[#114040] transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Why Choose Us?
          </h2>
          
          <div className="space-y-6">
            {reasons.map((reason, index) => (
              <div 
                key={index} 
                className={`bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 flex items-start gap-6 border border-gray-100 group transform hover:-translate-y-1 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                }`}
                style={{ 
                  transitionDelay: `${isVisible ? index * 150 : 0}ms`
                }}
              >
                {/* Icon without background - just the image */}
                <div className="flex-shrink-0 w-20 h-20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Image
                    src={`/${reason.icon}`}
                    alt={reason.title}
                    width={80}
                    height={80}
                    className="object-contain w-full h-full drop-shadow-md"
                  />
                </div>
                
                {/* Text content */}
                <div className="flex-1">
                  <h3 className={`text-xl font-bold mb-3 bg-gradient-to-r ${reason.color} bg-clip-text text-transparent`}>
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

  const About = React.memo(() => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        },
        { threshold: 0.2 }
      );

      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }

      return () => observer.disconnect();
    }, []);

    return (
      <div ref={sectionRef} className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className={`text-5xl font-bold text-center mb-12 text-[#114040] transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            What About Us
          </h2>
          
          <div className={`bg-gradient-to-br from-[#E6E6E0] to-white p-10 rounded-2xl shadow-xl border border-gray-200 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'}`}>
            <p className="text-gray-700 leading-relaxed text-lg text-left">
              <strong className="text-[#018880]">NS Financial & Bookkeeping Services LLC</strong> is a woman-owned
              business based in Colorado, committed to delivering reliable bookkeeping and financial solutions for small businesses.
              Founded by <strong className="text-[#114040]">Noura Salman</strong>, who holds a Bachelor's degree in
              Accounting and a Master's in Finance and Risk Management, the firm brings over five years of professional experience
              in credit analysis and financial reporting. Our goal is to empower business owners with accurate financial insights
              to make confident, growth-driven decisions.
            </p>
          </div>
        </div>
      </div>
    );
  });

  const CTASection = React.memo(() => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        },
        { threshold: 0.2 }
      );

      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }

      return () => observer.disconnect();
    }, []);

    return (
      <div ref={sectionRef} className="py-20 px-4 bg-gradient-to-br from-[#018880] via-[#019680] to-[#114040] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className={`max-w-4xl mx-auto text-center relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
            Let's Work Together
          </h2>
          
          <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
            Join hundreds of successful business owners who trust us with their financial management
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => navigateToSection('booking')}
              className="group bg-white text-[#018880] px-8 py-4 rounded-lg text-lg font-bold hover:bg-[#E6E6E0] transition-all duration-300 shadow-2xl flex items-center cursor-pointer transform hover:scale-105"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              Schedule Free Consultation
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
            
            <button
              onClick={() => navigateToSection('contact')}
              className="group bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-white hover:text-[#018880] transition-all duration-300 shadow-xl flex items-center cursor-pointer"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              Contact Us
              <Mail className="ml-3 w-6 h-6" />
            </button>
          </div>


        </div>
      </div>
    );
  });

  const Contact = React.memo(() => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        },
        { threshold: 0.2 }
      );

      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }

      return () => observer.disconnect();
    }, []);

    return (
      <div ref={sectionRef} className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-5xl font-bold text-center mb-16 text-[#114040] transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Contact Us
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className={`text-center p-8 bg-white rounded-2xl hover:shadow-xl transition-all duration-500 border border-gray-100 transform hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${isVisible ? 0 : 0}ms` }}>
              <div className="w-16 h-16 bg-gradient-to-br from-[#018880] to-[#002830] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-[#114040]">Email</h3>
              <a href="mailto:info@nsfinancialservice.com" className="text-[#018880] hover:text-[#002830] font-medium hover:underline transition-colors cursor-pointer">
                info@nsfinancialservice.com
              </a>
            </div>
            
            <div className={`text-center p-8 bg-white rounded-2xl hover:shadow-xl transition-all duration-500 border border-gray-100 transform hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${isVisible ? 100 : 0}ms` }}>
              <div className="w-16 h-16 bg-gradient-to-br from-[#018880] to-[#002830] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-[#114040]">Business Hours</h3>
              <p className="text-gray-700">Monday - Friday</p>
              <p className="text-gray-700 font-semibold">9:00 AM - 5:00 PM</p>
            </div>
            
            <div className={`text-center p-8 bg-white rounded-2xl hover:shadow-xl transition-all duration-500 border border-gray-100 transform hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${isVisible ? 200 : 0}ms` }}>
              <div className="w-16 h-16 bg-gradient-to-br from-[#018880] to-[#002830] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-[#114040]">Location</h3>
              <p className="text-gray-700">1500 N. Grant St. Ste R</p>
              <p className="text-gray-700">Denver, CO 80203</p>
            </div>
          </div>
        </div>
      </div>
    );
  });

    const Footer = () => (
    <footer className="bg-gradient-to-br from-[#002830] to-[#114040] text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center mb-4">
              <Image
                src="/logo_300x100_white.png"
                alt="NS Financial Logo"
                width={150}
                height={50}
                className="object-contain"
              />
            </div>
            <p className="text-gray-300 text-sm mt-4" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
              Noura Salman (NS) Financial and Bookkeeping Services LLC
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-lg" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>Contact</h4>
            <p className="text-gray-300 text-sm mb-2" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>Email: info@nsfinancialservice.com</p>
            <p className="text-gray-300 text-sm" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>Address: 1500 N. Grant St. Ste R, Denver, CO 80203</p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-lg" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>Business Hours</h4>
            <p className="text-gray-300 text-sm" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>Monday - Friday</p>
            <p className="text-gray-300 text-sm" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>9:00 AM - 5:00 PM</p>
          </div>
        </div>
        
        <div className="border-t border-[#018880]/30 pt-8 text-center">
          <p className="text-gray-300 text-sm" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
            © 2025 NS Financial and Bookkeeping Services LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen bg-white">
      <Toaster />
      <Navigation />
      <div className="pt-20">
        {activeSection === 'home' && (
          <>
            <Hero />
            <Services />
            <WhyChooseUs />
            <About />
            <CTASection />
          </>
        )}
        {activeSection === 'about' && <About />}
        {activeSection === 'services' && <Services />}
        {activeSection === 'booking' && (
          <BookingSection
            bookingForm={bookingForm}
            handleInputChange={handleInputChange}
            handleBookingSubmit={handleBookingSubmit}
            bookingSubmitted={bookingSubmitted}
            isSubmitting={isSubmitting}
            minDate={minDate}
          />
        )}
        {activeSection === 'contact' && <Contact />}
      </div>
      <Footer />
    </div>
  );
}