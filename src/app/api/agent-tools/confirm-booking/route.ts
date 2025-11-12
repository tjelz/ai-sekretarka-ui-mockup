import { NextRequest, NextResponse } from 'next/server';

// Type definition for booking data
interface Booking {
  id: string;
  customerName: string;
  phoneNumber: string;
  serviceName: string;
  dateTime: string;
  agentName: string;
  createdAt: string;
}

// In-memory storage (replace with database in production)
const bookings: Booking[] = [];

/**
 * GET /api/agent-tools/confirm-booking
 * Retrieves all confirmed bookings
 */
export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      count: bookings.length,
      bookings: bookings,
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch bookings',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/agent-tools/confirm-booking
 * Creates a new booking confirmation
 *
 * Request body:
 * {
 *   customerName: string,
 *   phoneNumber: string,
 *   serviceName: string,
 *   dateTime: string (ISO format),
 *   agentName: string
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = ['customerName', 'phoneNumber', 'serviceName', 'dateTime', 'agentName'];
    const missingFields = requiredFields.filter(field => !body[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields',
          missingFields
        },
        { status: 400 }
      );
    }

    // Validate phone number format (basic validation)
    const phoneRegex = /^[\d\s\+\-\(\)]+$/;
    if (!phoneRegex.test(body.phoneNumber)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid phone number format'
        },
        { status: 400 }
      );
    }

    // Validate date format
    const dateTime = new Date(body.dateTime);
    if (isNaN(dateTime.getTime())) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid date format. Use ISO 8601 format (e.g., 2024-11-12T10:00:00)'
        },
        { status: 400 }
      );
    }

    // Create new booking
    const newBooking: Booking = {
      id: `booking-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      customerName: body.customerName.trim(),
      phoneNumber: body.phoneNumber.trim(),
      serviceName: body.serviceName.trim(),
      dateTime: dateTime.toISOString(),
      agentName: body.agentName.trim(),
      createdAt: new Date().toISOString(),
    };

    // Store booking
    bookings.push(newBooking);

    return NextResponse.json(
      {
        success: true,
        message: 'Booking confirmed successfully',
        booking: newBooking,
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create booking',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
