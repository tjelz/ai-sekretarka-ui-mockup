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
  booksyAppointmentId?: string;
  booksyServiceId?: number;
  booksyVariantId?: number;
}

// Booksy service mapping (update with actual IDs from Booksy dashboard)
// Default to test service from your curl example
const BOOKSY_SERVICE_MAPPING: Record<string, { serviceId: number; variantId: number; duration: number }> = {
  'test': { serviceId: 1746755, variantId: 3478125, duration: 30 },
  'Masaż Relaksacyjny': { serviceId: 1746755, variantId: 3478125, duration: 60 },
  'Masaż Gorącymi Kamieniami': { serviceId: 1746755, variantId: 3478125, duration: 90 },
  'Zabieg Pielęgnacyjny na Twarz': { serviceId: 1746755, variantId: 3478125, duration: 75 },
  // Add more mappings as needed
};

// Booksy API configuration
const BOOKSY_CONFIG = {
  baseUrl: 'https://gb.booksy.com/core/v2/business_api/me',
  businessId: '170757',
  accessToken: 'nJ9nvw5rbHMu2IEp7J2N9A3OiTGdUxsR',
  apiKey: 'frontdesk-76661e2b-25f0-49b4-b33a-9d78957a58e3',
  fingerprint: 'ccfaa73a-b953-42d4-a0ed-b74ad6a7d15a',
};

// In-memory storage (replace with database in production)
const bookings: Booking[] = [];

/**
 * Create appointment in Booksy calendar
 */
async function createBooksyAppointment(booking: Booking) {
  const appointmentDate = new Date(booking.dateTime);

  // Get service details from mapping or use provided IDs
  const serviceMapping = BOOKSY_SERVICE_MAPPING[booking.serviceName];
  const serviceId = booking.booksyServiceId || serviceMapping?.serviceId || 1746755;
  const variantId = booking.booksyVariantId || serviceMapping?.variantId || 3478125;
  const duration = serviceMapping?.duration || 30;

  // Calculate end time based on service duration
  const endDate = new Date(appointmentDate);
  endDate.setMinutes(endDate.getMinutes() + duration);

  const booksyPayload = {
    is_deposit_available: false,
    partner_app_data: {},
    traveling: null,
    consent_forms: [],
    appointment_uid: null,
    _version: null,
    customer: {
      mode: 'walk-in',
      name: booking.customerName,
      phone: booking.phoneNumber,
    },
    business_note: `Agent: ${booking.agentName}`,
    business_secret_note: '',
    subbookings: [
      {
        partner_app_data: {},
        booked_from: appointmentDate.toISOString(),
        booked_till: endDate.toISOString(),
        staffer_id: 242066, // Default staffer from your curl
        autoassigned_staffer_id: null,
        appliance_id: null,
        service_variant: {
          id: variantId,
          version: 1,
          mode: 'variant',
        },
        addons: [],
        combo_children: [],
        is_staffer_requested_by_client: false,
        id: null,
        service: {
          partner_app_data: {},
          id: serviceId,
          name: booking.serviceName,
          variant: {
            id: variantId,
            type: 'F',
            label: '',
            duration: duration,
            active: true,
          },
          combo_type: null,
          category_name: null,
          service_category_id: null,
          color: 4,
          active: true,
          note_to_customer: '',
          treatment_internal_name: null,
          staffer_ids: [242066, 242071],
          appliance_ids: [],
          is_traveling_service: false,
        },
        service_price: '£0.00',
        staffer: {
          partner_app_data: {},
          id: 242066,
          type: 'S',
          name: 'Flips Dev',
          active: true,
          visible: true,
          description: null,
          position: '',
          staff_user_exists: true,
          is_invited: false,
          invited: null,
        },
        appliance: null,
        autoassign: false,
        gap_hole_start: null,
        gap_hole_end: null,
        wait_time: {},
        is_highlighted: false,
        service_promotion: null,
        editable: true,
        _availability: {
          staffers: {
            '242066': {
              free_from: null,
              ok: true,
              type: 'ok',
              message: 'Available',
            },
            '242071': {
              free_from: null,
              ok: true,
              type: 'ok',
              message: 'Available',
            },
            '-1': {
              free_from: null,
              ok: true,
              type: 'info',
              message: 'Manual update required',
            },
          },
          appliances: {},
        },
        actions: {
          cancel: true,
          cancel_no_show: false,
          change: true,
          change_time_or_note: true,
          confirm: false,
          decline: false,
          no_show: false,
        },
      },
    ],
    appointment_id: null,
    appointment_type: 'single',
    booked_from: appointmentDate.toISOString(),
    booked_till: endDate.toISOString(),
    status: 'A',
    type: 'B',
    customer_note: null,
    repeating: null,
    repeating_series: null,
    actions: {
      cancel: true,
      cancel_no_show: false,
      change: true,
      change_time_or_note: true,
      confirm: false,
      decline: false,
      no_show: false,
    },
    payment_info: {
      deposit_cancel_time: {
        days: 3,
      },
      payable: true,
      transaction_id: null,
      transaction_info: null,
      handle_deposit: false,
      auto_release_deposit_on_cancel: null,
      deposit_id: null,
      deposit_info: null,
      booksy_pay: {
        is_available: false,
        is_payment_window_open: false,
        is_paid: false,
      },
    },
    total: '£0.00',
    total_value: null,
    total_discount_amount: 0,
    total_tax_excluded: 0,
    external_source: '',
    service_questions: [],
    join_meeting_url: null,
    meeting_id: null,
    from_promo: false,
    is_booksy_gift_card_appointment: false,
    new_repeating: null,
    _resource_selection_required: false,
    with_prepayment: false,
    overbooking: false,
    _notification_enabled: true,
    _notify_about_reschedule: false,
    _preserve_order: false,
  };

  const response = await fetch(
    `${BOOKSY_CONFIG.baseUrl}/businesses/${BOOKSY_CONFIG.businessId}/appointments/`,
    {
      method: 'POST',
      headers: {
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'en_GB',
        'cache-control': 'no-cache',
        'content-type': 'application/json;charset=UTF-8',
        'x-access-token': BOOKSY_CONFIG.accessToken,
        'x-api-key': BOOKSY_CONFIG.apiKey,
        'x-app-version': '3.0',
        'x-fingerprint': BOOKSY_CONFIG.fingerprint,
      },
      body: JSON.stringify(booksyPayload),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Booksy API error: ${response.status} - ${errorText}`);
  }

  return await response.json();
}

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
      booksyServiceId: body.booksyServiceId,
      booksyVariantId: body.booksyVariantId,
    };

    // Store booking
    bookings.push(newBooking);

    // Attempt to create appointment in Booksy
    let booksyResponse = null;
    let booksyError = null;

    try {
      booksyResponse = await createBooksyAppointment(newBooking);

      // Update booking with Booksy appointment ID
      if (booksyResponse?.appointment_id) {
        newBooking.booksyAppointmentId = booksyResponse.appointment_id;
      }
    } catch (error) {
      booksyError = error instanceof Error ? error.message : 'Unknown Booksy API error';
      console.error('Booksy API error:', error);
      // Continue despite Booksy error - booking is still saved locally
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Booking confirmed successfully',
        booking: newBooking,
        booksy: {
          synced: !!booksyResponse && !booksyError,
          appointmentId: newBooking.booksyAppointmentId || null,
          error: booksyError,
        },
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
