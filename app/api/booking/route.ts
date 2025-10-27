import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, service, date, time, message } = body;

    // Log to verify environment variables are loaded
    console.log('EMAIL_USER:', process.env.EMAIL_USER);
    console.log('EMAIL_PASSWORD exists:', !!process.env.EMAIL_PASSWORD);

    // Validate required fields
    if (!name || !email || !phone || !service || !date || !time) {
      return NextResponse.json(
        { error: 'All required fields must be filled' },
        { status: 400 }
      );
    }

    // Check if environment variables exist
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.error('Missing email credentials');
      return NextResponse.json(
        { error: 'Email configuration missing' },
        { status: 500 }
      );
    }

    // Create email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Email to business owner
    const ownerMailOptions = {
      from: process.env.EMAIL_USER,
      to: 'karimamdou7@gmail.com', // Send to yourself for testing
      subject: `New Consultation Booking - ${name}`,
      html: `
        <h2>New Consultation Booking Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Preferred Date:</strong> ${date}</p>
        <p><strong>Preferred Time:</strong> ${time}</p>
        <p><strong>Additional Information:</strong></p>
        <p>${message || 'No additional information provided'}</p>
      `,
    };

    // Confirmation email to client
    const clientMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Consultation Booking Confirmation - NS Financial Services',
      html: `
        <h2>Thank You for Your Booking Request!</h2>
        <p>Dear ${name},</p>
        <p>We have received your consultation booking request for <strong>${service}</strong>.</p>
        <p><strong>Requested Date:</strong> ${date}</p>
        <p><strong>Requested Time:</strong> ${time}</p>
        <p>Our team will review your request and contact you within 24 hours to confirm your appointment.</p>
        <br>
        <p>Best regards,</p>
        <p><strong>NS Financial and Bookkeeping Services LLC</strong></p>
        <p>Email: info@nsfinancialservice.com</p>
        <p>Address: 1500 N. Grant St. Ste R, Denver, CO 80203</p>
      `,
    };

    // Send emails
    console.log('Sending email to owner...');
    await transporter.sendMail(ownerMailOptions);
    console.log('Owner email sent!');

    console.log('Sending confirmation to client...');
    await transporter.sendMail(clientMailOptions);
    console.log('Client email sent!');

    return NextResponse.json(
      { 
        success: true, 
        message: 'Booking request submitted successfully' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json(
      { error: 'Failed to process booking request: ' + (error as Error).message },
      { status: 500 }
    );
  }
}