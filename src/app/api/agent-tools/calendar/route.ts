import { NextResponse } from 'next/server';

export async function GET() {
  const now = new Date();
  const polandNow = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Warsaw' }));

  const timeslots = [];

  for (let day = 0; day < 7; day++) {
    const date = new Date(polandNow);
    date.setDate(date.getDate() + day);
    date.setHours(9, 0, 0, 0);

    const daySlots = [];

    for (let hour = 9; hour < 22; hour++) {
      const slotTime = new Date(date);
      slotTime.setHours(hour, 0, 0, 0);

      // Only include future timeslots
      if (slotTime > polandNow) {
        daySlots.push({
          time: slotTime.toLocaleString('pl-PL', {
            timeZone: 'Europe/Warsaw',
            hour: '2-digit',
            minute: '2-digit'
          }),
          datetime: slotTime.toISOString(),
          available: Math.random() > 0.3 // 70% availability
        });
      }
    }

    if (daySlots.length > 0) {
      timeslots.push({
        date: date.toLocaleDateString('pl-PL', {
          timeZone: 'Europe/Warsaw',
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        dateISO: date.toISOString().split('T')[0],
        slots: daySlots
      });
    }
  }

  return NextResponse.json({
    timezone: 'Europe/Warsaw',
    currentTime: polandNow.toISOString(),
    availableSlots: timeslots
  });
}
