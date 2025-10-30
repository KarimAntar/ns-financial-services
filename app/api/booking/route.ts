import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import path from 'path';
import fs from 'fs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, service, otherService, date, time, message } = body;

    // Determine the actual service to display
    const actualService = service === 'Other' ? otherService : service;

    // Google Calendar API setup (OAuth2)
    const { google } = require('googleapis');
    const { OAuth2 } = google.auth;

    const CLIENT_ID = process.env.GOOGLE_OAUTH_CLIENT_ID!;
    const CLIENT_SECRET = process.env.GOOGLE_OAUTH_CLIENT_SECRET!;
    const REDIRECT_URI = process.env.GOOGLE_OAUTH_REDIRECT_URI!;
    const REFRESH_TOKEN = process.env.GOOGLE_OAUTH_REFRESH_TOKEN!; // Set this after OAuth2 flow

    const oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
    oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    // Debug date and time input
    console.log('Booking date:', date, 'time:', time);

    // Convert 12-hour time (e.g., "2:00 PM") to 24-hour format (e.g., "14:00")
    function to24Hour(t: string) {
      const match = t.match(/^(\d{1,2}):(\d{2})\s*([AP]M)$/i);
      if (!match) return t; // already 24-hour or invalid
      let [_, hour, min, ampm] = match;
      let h = parseInt(hour, 10);
      if (ampm.toUpperCase() === 'PM' && h !== 12) h += 12;
      if (ampm.toUpperCase() === 'AM' && h === 12) h = 0;
      return `${h.toString().padStart(2, '0')}:${min}`;
    }
    const time24 = to24Hour(time);

    // Set event start/end time in RFC3339 format
    const eventStart = new Date(`${date}T${time24}:00`);
    const eventEnd = new Date(eventStart.getTime() + 60 * 60 * 1000); // 1 hour meeting

    // Create Google Calendar event with Meet link
    let meetLink = '';
    try {
      const event = await calendar.events.insert({
        calendarId: 'info@nsfinancialservice.com',
        requestBody: {
          summary: `Consultation: ${actualService} with ${name}`,
          description: message || '',
          start: { dateTime: eventStart.toISOString() },
          end: { dateTime: eventEnd.toISOString() },
          attendees: [
            { email: email },
            { email: 'info@nsfinancialservice.com' }
          ],
          conferenceData: {
            createRequest: {
              requestId: `${Date.now()}-${Math.random()}`,
              conferenceSolutionKey: { type: 'hangoutsMeet' }
            }
          }
        },
        conferenceDataVersion: 1
      });
      meetLink = event.data.conferenceData?.entryPoints?.find((ep: any) => ep.entryPointType === 'video')?.uri || '';
    } catch (err: any) {
      console.error('Failed to create Google Meet event:', err?.response?.data || err);
      meetLink = '';
    }

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

    // Additional validation for "Other" service
    if (service === 'Other' && !otherService) {
      return NextResponse.json(
        { error: 'Please specify the service you need' },
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

    // Create email transporter using Google SMTP relay
    const transporter = nodemailer.createTransport({
      host: 'smtp-relay.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Dynamically construct logo URL based on request origin
    const logoUrl = `https://www.nsfinancialservice.com/logo.png`;

    // Email to business owner
    const ownerMailOptions = {
      from: 'info@nsfinancialservice.com',
      to: 'info@nsfinancialservice.com',
      subject: `New Consultation Booking - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; padding: 24px; background: #fafbfc;">
          <div style="text-align:center;">
            <img src="${logoUrl}" alt="NS Financial Logo" style="height: 100px;">
          </div>
          <h2 style="color: #1a237e;">New Consultation Booking Request</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 6px 0;"><strong>Name:</strong></td><td>${name}</td></tr>
            <tr><td style="padding: 6px 0;"><strong>Email:</strong></td><td>${email}</td></tr>
            <tr><td style="padding: 6px 0;"><strong>Phone:</strong></td><td>${phone}</td></tr>
            <tr><td style="padding: 6px 0;"><strong>Service:</strong></td><td>${actualService}</td></tr>
            <tr><td style="padding: 6px 0;"><strong>Preferred Date:</strong></td><td>${date}</td></tr>
            <tr><td style="padding: 6px 0;"><strong>Preferred Time:</strong></td><td>${time}</td></tr>
          </table>
          <div style="margin-top: 16px;">
            <strong>Additional Information:</strong>
            <div style="margin-top: 4px; color: #333;">${message || 'No additional information provided'}</div>
          </div>
          <div style="margin-top: 24px;">
            <strong>Google Meet Link:</strong>
            <div style="margin-top: 4px;">
              ${meetLink ? `<a href="${meetLink}" target="_blank">${meetLink}</a>` : 'No meeting link generated.'}
            </div>
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
            <img src="${logoUrl}" alt="NS Financial Logo" style="height: 100px;">
          </div>
          <h2 style="color: #1a237e;">Thank You for Your Booking Request!</h2>
          <p>Dear ${name},</p>
          <p>We have received your consultation booking request for <strong>${actualService}</strong>.</p>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 6px 0;"><strong>Requested Date:</strong></td><td>${date}</td></tr>
            <tr><td style="padding: 6px 0;"><strong>Requested Time:</strong></td><td>${time}</td></tr>
          </table>
          <div style="margin-top: 24px;">
            <strong>Google Meet Link:</strong>
            <div style="margin-top: 4px;">
              ${meetLink ? `<a href="${meetLink}" target="_blank">${meetLink}</a>` : 'No meeting link generated.'}
            </div>
          </div>
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

    // Send confirmation email to client (separately, catch errors)
    try {
      console.log('DEBUG: About to send confirmation to client:', clientMailOptions);
      const clientResult = await transporter.sendMail(clientMailOptions);
      console.log('DEBUG: Client email sendMail result:', clientResult);
      console.log('Client email sent!');
    } catch (clientErr) {
      console.error('Failed to send confirmation email to client:', clientErr);
    }

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