# Confirm Booking API Documentation

## Overview
The Confirm Booking API allows you to create and retrieve booking confirmations. When a booking is created, it automatically syncs with Booksy's calendar system.

**Endpoint:** `/api/agent-tools/confirm-booking`

## Authentication
Booksy API credentials are configured directly in the route handler. No user authentication required for the endpoint itself.

## GET Request

### Retrieve All Bookings

**Endpoint:** `GET /api/agent-tools/confirm-booking`

**Response:**
```json
{
  "success": true,
  "count": 2,
  "bookings": [
    {
      "id": "booking-1731398400000-abc123",
      "customerName": "Jan Kowalski",
      "phoneNumber": "+48 123 456 789",
      "serviceName": "Masaż Relaksacyjny",
      "dateTime": "2024-11-14T10:00:00.000Z",
      "agentName": "ElevenLabs AI Agent",
      "createdAt": "2024-11-12T08:30:00.000Z",
      "booksyAppointmentId": "12345678"
    }
  ]
}
```

**cURL Example:**
```bash
curl http://localhost:3000/api/agent-tools/confirm-booking
```

## POST Request

### Create New Booking

**Endpoint:** `POST /api/agent-tools/confirm-booking`

**Request Body:**
```json
{
  "customerName": "Jan Kowalski",
  "phoneNumber": "+48 123 456 789",
  "serviceName": "Masaż Relaksacyjny",
  "dateTime": "2024-11-14T10:00:00.000Z",
  "agentName": "ElevenLabs AI Agent"
}
```

**Field Descriptions:**
- `customerName` (string, required): Full name of the customer
- `phoneNumber` (string, required): Contact phone number (digits, spaces, +, -, parentheses allowed)
- `serviceName` (string, required): Name of the service being booked
- `dateTime` (string, required): ISO 8601 format date/time for the appointment
- `agentName` (string, required): Name of the AI agent handling the booking

**Success Response (201):**
```json
{
  "success": true,
  "message": "Booking confirmed successfully",
  "booking": {
    "id": "booking-1731398400000-abc123",
    "customerName": "Jan Kowalski",
    "phoneNumber": "+48 123 456 789",
    "serviceName": "Masaż Relaksacyjny",
    "dateTime": "2024-11-14T10:00:00.000Z",
    "agentName": "ElevenLabs AI Agent",
    "createdAt": "2024-11-12T08:30:00.000Z",
    "booksyAppointmentId": "12345678"
  },
  "booksy": {
    "synced": true,
    "appointmentId": "12345678",
    "error": null
  }
}
```

**Error Response (400 - Missing Fields):**
```json
{
  "success": false,
  "error": "Missing required fields",
  "missingFields": ["customerName", "phoneNumber"]
}
```

**Error Response (400 - Invalid Phone):**
```json
{
  "success": false,
  "error": "Invalid phone number format"
}
```

**Error Response (400 - Invalid Date):**
```json
{
  "success": false,
  "error": "Invalid date format. Use ISO 8601 format (e.g., 2024-11-12T10:00:00)"
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:3000/api/agent-tools/confirm-booking \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "Jan Kowalski",
    "phoneNumber": "+48 123 456 789",
    "serviceName": "Masaż Relaksacyjny",
    "dateTime": "2024-11-14T10:00:00.000Z",
    "agentName": "ElevenLabs AI Agent"
  }'
```

## Booksy Integration

### How It Works
1. Booking is saved locally first (ensures data is never lost)
2. API attempts to sync with Booksy calendar
3. If Booksy sync succeeds, `booksyAppointmentId` is added to the booking
4. Response includes `booksy` object with sync status

### Booksy Sync Behavior
- **Success**: Creates appointment in Booksy calendar
- **Booksy API error**: Booking saved locally, error returned in response

### Booksy Appointment Details
- **Duration**: Default 30 minutes (can be customized)
- **Customer Type**: Walk-in
- **Status**: Active (A)
- **Type**: Booking (B)
- **Auto-assign**: Staff automatically assigned based on availability
- **Notifications**: Enabled by default

## Date/Time Formatting

### Accepted Formats
- ISO 8601: `2024-11-14T10:00:00.000Z`
- ISO 8601 with timezone: `2024-11-14T10:00:00+01:00`
- Local ISO format: `2024-11-14T10:00:00`

### Timezone Handling
- All dates stored in UTC
- Booksy uses local business timezone (Europe/Warsaw)
- Frontend should handle timezone conversion for display

## Testing

### Local Development
```bash
# Start development server
npm run dev

# Test GET endpoint
curl http://localhost:3000/api/agent-tools/confirm-booking

# Test POST endpoint
curl -X POST http://localhost:3000/api/agent-tools/confirm-booking \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "Test User",
    "phoneNumber": "+48 123 456 789",
    "serviceName": "Test Service",
    "dateTime": "2024-11-14T10:00:00.000Z",
    "agentName": "Test Agent"
  }'
```

### Integration Testing
1. Create a test booking via POST
2. Verify booking appears in Booksy dashboard
3. Check response includes `booksyAppointmentId`

## Data Storage

### Current Implementation
- In-memory storage (data lost on server restart)
- Suitable for development/testing

### Production Recommendations
Replace the in-memory array with:
- **Vercel KV**: Fast key-value store for bookings
- **Vercel Postgres**: Relational database with full query support
- **External DB**: PostgreSQL, MySQL, MongoDB

### Migration Example (Vercel KV)
```typescript
import { kv } from '@vercel/kv';

// Save booking
await kv.set(`booking:${newBooking.id}`, newBooking);

// Get all bookings
const bookingKeys = await kv.keys('booking:*');
const bookings = await Promise.all(
  bookingKeys.map(key => kv.get(key))
);
```

## Rate Limiting
Consider implementing rate limiting for production:
- Prevents abuse
- Protects Booksy API quota
- Use Vercel's built-in rate limiting or middleware

## Error Handling
The API gracefully handles errors:
- Validates all inputs before processing
- Booksy errors don't prevent local booking save
- All errors logged to console for debugging
- User-friendly error messages in responses

## Future Enhancements
- [ ] Database integration for persistence
- [ ] Webhook support for Booksy updates
- [ ] Email/SMS confirmation to customers
- [ ] Support for service duration lookup
- [ ] Cancellation endpoint
- [ ] Rescheduling endpoint
- [ ] Customer lookup by phone number
- [ ] Staff assignment preferences
- [ ] Multi-service bookings
- [ ] Recurring appointments

## Support
For issues or questions:
- Check Booksy API documentation
- Review server logs for error details
- Verify Booksy credentials in route handler
