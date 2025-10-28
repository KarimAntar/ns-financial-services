'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Mail, MapPin, CheckCircle, DollarSign, TrendingUp, FileText, Users, Clock, Shield, Award, ArrowRight, ChevronDown } from 'lucide-react';

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
  const [visibleCards, setVisibleCards] = useState(new Set<string>());

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Bookkeeping & Accounting",
      description: "Recording transactions, managing accounts payable/receivable, and maintaining accurate books.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Financial Reporting",
      description: "Preparing balance sheets, income statements, and cash flow reports for better business insight.",
      color: "from-indigo-500 to-indigo-600"
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Budgeting & Forecasting",
      description: "Helping businesses plan for growth and manage cash flow effectively.",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Payroll Processing",
      description: "Ensuring timely, compliant payroll and tax deductions.",
      color: "from-pink-500 to-pink-600"
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Tax Preparation & Support",
      description: "Assisting with business tax organization and documentation (non-attestation).",
      color: "from-rose-500 to-rose-600"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Financial Analysis & Advisory",
      description: "Offering insights into profitability, performance, and financial strategy.",
      color: "from-orange-500 to-orange-600"
    }
  ];

  const whyChooseUs = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Licensed & Compliant",
      description: "Fully compliant with state and federal regulations",
      color: "bg-blue-500"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Experienced Team",
      description: "Years of experience in credit analysis, finance, and accounting",
      color: "bg-indigo-500"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Personalized Service",
      description: "Tailored financial solutions for every client",
      color: "bg-purple-500"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Modern Technology",
      description: "Secure, efficient bookkeeping with latest tools",
      color: "bg-pink-500"
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
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => setActiveSection('home')}>
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-2 rounded-xl shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
              <DollarSign className="w-8 h-8 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-gray-900 tracking-tight">NS Financial</span>
              <span className="text-xs font-medium text-gray-600 tracking-wide">Bookkeeping Services</span>
            </div>
          </div>
          <div className="hidden md:flex space-x-2">
            {['home', 'about', 'services', 'booking', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`capitalize text-base font-semibold px-5 py-2.5 rounded-xl transition-all duration-300 ${
                  activeSection === section
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg scale-105'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:scale-105'
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

  const Hero = () => {
    const [currentWord, setCurrentWord] = useState(0);
    const words = ['Simplify', 'Transform', 'Optimize', 'Manage'];
    
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentWord((prev) => (prev + 1) % words.length);
      }, 3000);
      return () => clearInterval(interval);
    }, []);

    return (
      <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-blue-400 rounded-full blur-3xl opacity-20 -top-48 -left-48 animate-pulse"></div>
          <div className="absolute w-96 h-96 bg-indigo-400 rounded-full blur-3xl opacity-20 -bottom-48 -right-48 animate-pulse"></div>
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 80%, white 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto text-center z-10">
          <div className="mx-auto mb-8 flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-white rounded-2xl blur-xl opacity-50 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-white to-blue-100 p-6 rounded-2xl shadow-2xl hover:scale-110 transition-transform duration-300">
                <DollarSign className="w-20 h-20 text-blue-600" />
              </div>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight">
            <span className="block drop-shadow-2xl">Noura Salman (NS) Financial</span>
            <span className="block drop-shadow-2xl">and Bookkeeping Services LLC</span>
          </h1>

          <div className="text-2xl md:text-4xl font-bold mb-6 text-blue-100 drop-shadow-lg h-16 flex items-center justify-center">
            <span className="inline-block transition-all duration-500" key={currentWord}>
              {words[currentWord]}
            </span>
            <span className="ml-3">Your Finances. Focus on Your Business.</span>
          </div>

          <p className="text-lg md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed text-blue-50 drop-shadow-md">
            Licensed financial and bookkeeping firm dedicated to helping individuals, entrepreneurs, 
            and small businesses manage their finances with accuracy, clarity, and confidence.
          </p>

          <button
            onClick={() => setActiveSection('booking')}
            className="group relative bg-white text-blue-600 px-12 py-5 rounded-xl text-xl font-bold hover:bg-blue-50 transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-110 transform inline-flex items-center"
          >
            Book a Free Consultation
            <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
          </button>

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-8 h-8 text-white opacity-50" />
          </div>
        </div>
      </div>
    );
  };

  const About = () => (
    <div className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-16 text-gray-900">
          About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Us</span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="group bg-white p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border-t-4 border-blue-500 hover:-translate-y-2">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-blue-600">Our Mission</h3>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              To deliver reliable, accurate, and personalized financial services that help clients 
              understand their numbers, strengthen their financial health, and achieve long-term success.
            </p>
          </div>
          
          <div className="group bg-white p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border-t-4 border-indigo-500 hover:-translate-y-2">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-indigo-600">Our Vision</h3>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              To become a trusted financial partner for small and medium-sized businesses by providing 
              modern, tech-driven solutions that make bookkeeping and financial management simple, 
              efficient, and stress-free.
            </p>
          </div>
        </div>

        <div className="relative group bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
          <p className="relative text-gray-700 leading-relaxed text-lg">
            With a strong foundation in accounting, finance, and risk management, our goal is to 
            simplify financial processes, ensure transparency, and empower business owners to focus 
            on what they do best—running their business.
          </p>
        </div>
      </div>
    </div>
  );

  const Services = () => {
    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Fix: Cast to HTMLElement to access dataset
              const index = (entry.target as HTMLElement).dataset.index;
              if (index) {
                setVisibleCards((prev) => new Set([...prev, index]));
              }
            }
          });
        },
        { threshold: 0.1 }
      );

      document.querySelectorAll('.service-card').forEach((card) => {
        observer.observe(card);
      });

      return () => observer.disconnect();
    }, []);

    return (
      <div className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-6 text-gray-900">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Services</span>
          </h2>
          <p className="text-center text-gray-600 text-lg mb-16 max-w-2xl mx-auto">
            Comprehensive financial solutions tailored to your business needs
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {services.map((service, index) => (
              <div
                key={index}
                data-index={index}
                className={`service-card group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:-translate-y-2 overflow-hidden ${
                  visibleCards.has(String(index)) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${service.color} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
                
                <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                  <div className="text-white">{service.icon}</div>
                </div>
                
                <h3 className="text-xl font-bold mb-4 text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <h3 className="text-4xl font-bold text-center mb-12 text-gray-900">
              Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Us?</span>
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyChooseUs.map((item, index) => (
                <div 
                  key={index} 
                  className="group relative bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 text-center border border-gray-100 hover:-translate-y-2"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500"></div>
                  
                  <div className={`relative w-16 h-16 ${item.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                    <div className="text-white">{item.icon}</div>
                  </div>
                  
                  <h4 className="relative font-bold text-lg mb-3 text-gray-900">{item.title}</h4>
                  <p className="relative text-sm text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const BookingSection = React.memo(() => (
    <div className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-6 text-gray-900">
          Book a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Consultation</span>
        </h2>
        <p className="text-center text-gray-600 text-lg mb-12">
          Schedule a free consultation to discuss your financial needs
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
                <label className="block text-gray-700 font-semibold mb-2 text-sm group-hover:text-blue-600 transition-colors">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={bookingForm.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all placeholder:text-gray-400 text-gray-700 hover:border-blue-400"
                  placeholder="John Doe"
                />
              </div>
              
              <div className="group">
                <label className="block text-gray-700 font-semibold mb-2 text-sm group-hover:text-blue-600 transition-colors">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={bookingForm.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all placeholder:text-gray-400 text-gray-700 hover:border-blue-400"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="group">
                <label className="block text-gray-700 font-semibold mb-2 text-sm group-hover:text-blue-600 transition-colors">
                  Phone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={bookingForm.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all placeholder:text-gray-400 text-gray-700 hover:border-blue-400"
                  placeholder="(555) 123-4567"
                />
              </div>
              
              <div className="group">
                <label className="block text-gray-700 font-semibold mb-2 text-sm group-hover:text-blue-600 transition-colors">
                  Service Needed *
                </label>
                <select
                  name="service"
                  value={bookingForm.service}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all text-gray-700 hover:border-blue-400"
                >
                  <option value="">Select a service</option>
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
                <label className="block text-gray-700 font-semibold mb-2 text-sm group-hover:text-blue-600 transition-colors">
                  Preferred Date *
                </label>
                <input
                  type="date"
                  name="date"
                  value={bookingForm.date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all text-gray-700 hover:border-blue-400"
                />
              </div>
              
              <div className="group">
                <label className="block text-gray-700 font-semibold mb-2 text-sm group-hover:text-blue-600 transition-colors">
                  Preferred Time *
                </label>
                <select
                  name="time"
                  value={bookingForm.time}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all text-gray-700 hover:border-blue-400"
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
              <label className="block text-gray-700 font-semibold mb-2 text-sm group-hover:text-blue-600 transition-colors">
                Additional Information
              </label>
              <textarea
                name="message"
                value={bookingForm.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all resize-none placeholder:text-gray-400 text-gray-700 hover:border-blue-400"
                placeholder="Tell us about your business and financial needs..."
              ></textarea>
            </div>

            <button
              onClick={handleBookingSubmit}
              disabled={isSubmitting}
              className={`group w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-lg text-lg font-bold transition-all shadow-lg flex items-center justify-center ${
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
  ));

  const Contact = () => (
    <div className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-16 text-gray-900">
          Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Us</span>
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="group bg-white p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 text-center border border-gray-100 hover:-translate-y-2">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
              <Mail className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Email</h3>
            <a href="mailto:info@nsfinancialservice.com" className="text-blue-600 hover:text-blue-700 text-lg font-medium hover:underline transition-colors">
              info@nsfinancialservice.com
            </a>
          </div>
          
          <div className="group bg-white p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 text-center border border-gray-100 hover:-translate-y-2">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
              <Clock className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Business Hours</h3>
            <p className="text-gray-700 text-lg">Monday - Friday</p>
            <p className="text-gray-700 text-lg font-semibold">9:00 AM - 5:00 PM</p>
          </div>
          
          <div className="group bg-white p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 text-center border border-gray-100 hover:-translate-y-2">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
              <MapPin className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Location</h3>
            <p className="text-gray-700 text-lg">1500 N. Grant St. Ste R</p>
            <p className="text-gray-700 text-lg">Denver, CO 80203</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-12 rounded-2xl text-center shadow-lg border-2 border-blue-200 hover:shadow-2xl transition-shadow duration-500">
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
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-lg mr-3 shadow-lg">
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
        {activeSection === 'home' && (
          <>
            <Hero />
            <About />
            <Services />
          </>
        )}
        {activeSection === 'about' && <About />}
        {activeSection === 'services' && <Services />}
        {activeSection === 'booking' && <BookingSection />}
        {activeSection === 'contact' && <Contact />}
      </div>
      <Footer />
    </div>
  );
}