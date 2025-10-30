'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Calendar, Mail, MapPin, CheckCircle, DollarSign, TrendingUp, FileText, Users, Clock, Shield, Award, ArrowRight, ChevronDown, BarChart3, Calculator, PieChart, Building2 } from 'lucide-react';

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
    }, isDeleting ? 50 : 100);

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
    <div className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-4 text-[#114040]" style={{ fontFamily: 'Georgia, serif' }}>
          Let's Work Together
        </h2>
        <p className="text-center text-gray-600 text-lg mb-12">
          Schedule a consultation to discuss how we can help your business thrive
        </p>

        {bookingSubmitted ? (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-500 rounded-2xl p-12 text-center shadow-xl animate-fadeIn">
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
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
                  Name (required)
                </label>
                <input
                  type="text"
                  name="name"
                  value={bookingForm.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#018880] focus:border-transparent transition-all placeholder:text-gray-400 text-gray-700"
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
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#018880] focus:border-transparent transition-all placeholder:text-gray-400 text-gray-700"
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
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#018880] focus:border-transparent transition-all placeholder:text-gray-400 text-gray-700"
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
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#018880] focus:border-transparent transition-all text-gray-700"
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
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#018880] focus:border-transparent transition-all text-gray-700"
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
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#018880] focus:border-transparent transition-all text-gray-700"
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      {/* Main navigation - Always white background */}
      <div className="transition-all duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => setActiveSection('home')}>
              <div className="bg-white p-2 rounded-lg shadow-lg">
                <Image
                  src="/logo_100x100.png"
                  alt="NS Financial Logo"
                  width={50}
                  height={50}
                  className="object-contain"
                />
              </div>
              <span className="text-base font-semibold transition-colors duration-300 tracking-wide text-[#114040]" style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}>
                Financial Services
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-2">
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
                  className={`capitalize text-sm font-medium px-4 py-2.5 rounded-lg transition-all duration-300 cursor-pointer tracking-wide ${
                    activeSection === item.id
                      ? 'bg-gradient-to-r from-[#018880] to-[#002830] text-white shadow-lg font-semibold'
                      : 'text-[#114040] hover:bg-gray-100 hover:text-[#018880]'
                  }`}
                  style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}
                >
                  {item.label}
                </button>
              ))}
              <a
                href="tel:1-800-555-6933"
                className="flex items-center space-x-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 cursor-pointer shadow-md bg-gradient-to-r from-[#018880] to-[#002830] text-white hover:shadow-lg"
                style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}
              >
                <span>📞</span>
                <span>1-800-555-6933</span>
              </a>
              <button
                onClick={() => setActiveSection('contact')}
                className="px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 cursor-pointer shadow-md border-2 bg-white text-[#018880] border-[#018880] hover:bg-[#018880] hover:text-white"
                style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}
              >
                Contact us
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );

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
          <div className="relative order-2 md:order-1 animate-fadeInLeft">
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
          <div className="order-1 md:order-2 animate-fadeInRight">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-[#114040]">
              Noura Salman (NS) Financial<br />
              and Bookkeeping Services LLC
            </h1>

            <AnimatedText />

            <button
              onClick={() => setActiveSection('booking')}
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
        icon: "IMG_3606.png"
      },
      {
        title: "Honest, Reliable, and Easy to Work With",
        description: "You can count on clear communication, accurate work, and real support whenever you need it. We believe trust and transparency are the foundation of every strong partnership.",
        color: "from-[#002830] to-[#114040]",
        icon: "IMG_3603.png"
      },
      {
        title: "Helping You Stress Less and Grow More",
        description: "Managing your books shouldn't feel overwhelming. We keep things organized and simple, so you can focus on running your business while we take care of the rest.",
        color: "from-[#114040] to-[#018880]",
        icon: "Helping_You_.png"
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
            <p className="text-gray-700 leading-relaxed text-lg text-center">
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

  const Contact = React.memo(() => (
    <div className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-16 text-[#114040] animate-fadeIn">
          Contact Us
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-8 bg-white rounded-2xl hover:shadow-xl transition-all duration-300 border border-gray-100 animate-slideUp">
            <div className="w-16 h-16 bg-gradient-to-br from-[#018880] to-[#002830] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-[#114040]">Email</h3>
            <a href="mailto:info@nsfinancialservice.com" className="text-[#018880] hover:text-[#002830] font-medium hover:underline transition-colors cursor-pointer">
              info@nsfinancialservice.com
            </a>
          </div>
          
          <div className="text-center p-8 bg-white rounded-2xl hover:shadow-xl transition-all duration-300 border border-gray-100 animate-slideUp" style={{ animationDelay: '100ms' }}>
            <div className="w-16 h-16 bg-gradient-to-br from-[#018880] to-[#002830] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-[#114040]">Business Hours</h3>
            <p className="text-gray-700">Monday - Friday</p>
            <p className="text-gray-700 font-semibold">9:00 AM - 5:00 PM</p>
          </div>
          
          <div className="text-center p-8 bg-white rounded-2xl hover:shadow-xl transition-all duration-300 border border-gray-100 animate-slideUp" style={{ animationDelay: '200ms' }}>
            <div className="w-16 h-16 bg-gradient-to-br from-[#018880] to-[#002830] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-[#114040]">Location</h3>
            <p className="text-gray-700">1500 N. Grant St. Ste R</p>
            <p className="text-gray-700">Denver, CO 80203</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#E6E6E0] to-white p-10 rounded-2xl text-center shadow-lg border border-gray-200 animate-fadeIn">
          <h3 className="text-2xl font-bold mb-3 text-[#114040]">Nationwide Services</h3>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto">
            We proudly serve clients nationwide, offering both in-person and virtual bookkeeping 
            services to fit your business needs.
          </p>
        </div>
      </div>
    </div>
  ));

  const Testimonials = React.memo(() => {
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
      <div ref={sectionRef} className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-5xl font-bold text-center mb-4 text-[#114040] transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            What Our Clients Say
          </h2>
          <p className={`text-center text-gray-600 text-base mb-16 transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Real feedback from businesses we've helped succeed
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                name: "Sarah Johnson", 
                role: "Small Business Owner", 
                feedback: "NS Financial transformed how I manage my business finances. Professional, reliable, and always available when I need support!",
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
              },
              { 
                name: "Michael Chen", 
                role: "Startup Founder", 
                feedback: "The team's expertise in bookkeeping and financial reporting has been invaluable. They truly understand the challenges of growing a business.",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"
              },
              { 
                name: "Jennifer Martinez", 
                role: "Restaurant Owner", 
                feedback: "Outstanding service! They handle all my payroll and tax prep seamlessly. I can finally focus on running my restaurant without financial stress.",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop"
              },
              { 
                name: "David Thompson", 
                role: "E-commerce Business", 
                feedback: "Their attention to detail and proactive approach has saved us thousands. Best financial decision we made for our online business.",
                avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop"
              },
              { 
                name: "Emily Rodriguez", 
                role: "Consulting Firm", 
                feedback: "Working with NS Financial feels like having a trusted partner. They're not just bookkeepers, they're strategic advisors.",
                avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop"
              },
              { 
                name: "James Wilson", 
                role: "Tech Startup CEO", 
                feedback: "Fast, accurate, and incredibly responsive. They've streamlined our financial operations and helped us prepare for investor meetings.",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop"
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className={`bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 transform hover:-translate-y-2 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ 
                  transitionDelay: `${isVisible ? index * 100 : 0}ms`,
                  animationDelay: `${index * 100}ms`
                }}
              >
                <div className="flex items-center mb-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden mr-4 ring-2 ring-[#018880]/20 group-hover:ring-[#018880] transition-all">
                    <Image
                      src={item.avatar}
                      alt={item.name}
                      width={56}
                      height={56}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#114040]">{item.name}</h4>
                    <p className="text-sm text-gray-600">{item.role}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 italic leading-relaxed">
                  "{item.feedback}"
                </p>
              </div>
            ))}
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
              <div className="bg-white p-2 rounded-lg mr-3 shadow-lg">
                <Image
                  src="/logo_300x100.png"
                  alt="NS Financial Logo"
                  width={120}
                  height={40}
                  className="object-contain"
                />
              </div>
            </div>
            <p className="text-gray-300 text-sm mt-4" style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}>
              Noura Salman (NS) Financial and Bookkeeping Services LLC
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-lg" style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}>Contact</h4>
            <p className="text-gray-300 text-sm mb-2" style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}>Email: info@nsfinancialservice.com</p>
            <p className="text-gray-300 text-sm" style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}>Address: 1500 N. Grant St. Ste R, Denver, CO 80203</p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-lg" style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}>Business Hours</h4>
            <p className="text-gray-300 text-sm" style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}>Monday - Friday</p>
            <p className="text-gray-300 text-sm" style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}>9:00 AM - 5:00 PM</p>
          </div>
        </div>
        
        <div className="border-t border-[#018880]/30 pt-8 text-center">
          <p className="text-gray-300 text-sm" style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}>
            © 2025 NS Financial and Bookkeeping Services LLC. All rights reserved.
          </p>
        </div>
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
            <Services />
            <WhyChooseUs />
            <Testimonials />
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