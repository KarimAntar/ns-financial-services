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

    // Dynamically construct logo URL based on request origin
    const logoUrl = `${request.nextUrl.origin}/logo.png`;

    // Email to business owner
    const ownerMailOptions = {
      from: 'info@nsfinancialservice.com',
      to: 'karimamdou7@gmail.com', // Send to yourself for testing
      subject: `New Consultation Booking - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; padding: 24px; background: #fafbfc;">
          <div style="text-align:center;">
            <img src="${logoUrl}" alt="NS Financial Logo" style="height: 150px;">
          </div>
          <h2 style="color: #1a237e;">New Consultation Booking Request</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 6px 0;"><strong>Name:</strong></td><td>${name}</td></tr>
            <tr><td style="padding: 6px 0;"><strong>Email:</strong></td><td>${email}</td></tr>
            <tr><td style="padding: 6px 0;"><strong>Phone:</strong></td><td>${phone}</td></tr>
            <tr><td style="padding: 6px 0;"><strong>Service:</strong></td><td>${service}</td></tr>
            <tr><td style="padding: 6px 0;"><strong>Preferred Date:</strong></td><td>${date}</td></tr>
            <tr><td style="padding: 6px 0;"><strong>Preferred Time:</strong></td><td>${time}</td></tr>
          </table>
          <div style="margin-top: 16px;">
            <strong>Additional Information:</strong>
            <div style="margin-top: 4px; color: #333;">${message || 'No additional information provided'}</div>
          </div>
          <hr style="margin: 24px 0;">
          <div style="font-size: 13px; color: #888;">
            NS Financial and Bookkeeping Services LLC<br>
            Email: info@nsfinancialservice.com<br>
            Address: 1500 N. Grant St. Ste R, Denver, CO 80203
          </div>
        </div>
      `,
    };

    // Confirmation email to client
    const clientMailOptions = {
      from: "info@nsfinancialservice.com",
      to: email,
      subject: 'Consultation Booking Confirmation - NS Financial Services',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; padding: 24px; background: #fafbfc;">
          <div style="text-align:center;">
            <img src="${logoUrl}" alt="NS Financial Logo" style="height: 150px;">
          </div>
          <h2 style="color: #1a237e;">Thank You for Your Booking Request!</h2>
          <p>Dear ${name},</p>
          <p>We have received your consultation booking request for <strong>${service}</strong>.</p>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 6px 0;"><strong>Requested Date:</strong></td><td>${date}</td></tr>
            <tr><td style="padding: 6px 0;"><strong>Requested Time:</strong></td><td>${time}</td></tr>
          </table>
          <p style="margin-top: 16px;">Our team will review your request and contact you within 24 hours to confirm your appointment.</p>
          <p style="margin-top: 24px;">Best regards,<br>
          <strong>NS Financial and Bookkeeping Services LLC</strong></p>
          <div style="font-size: 13px; color: #888;">
            Email: info@nsfinancialservice.com<br>
            Address: 1500 N. Grant St. Ste R, Denver, CO 80203
          </div>
        </div>
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
