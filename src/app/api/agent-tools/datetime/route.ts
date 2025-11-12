import { NextResponse } from 'next/server';

export async function GET() {
  const polandTime = new Date().toLocaleString('pl-PL', {
    timeZone: 'Europe/Warsaw',
    dateStyle: 'full',
    timeStyle: 'long'
  });

  const isoTime = new Date().toLocaleString('en-US', {
    timeZone: 'Europe/Warsaw',
  });

  return NextResponse.json({
    datetime: polandTime,
    iso: new Date(isoTime).toISOString(),
    timezone: 'Europe/Warsaw',
    timestamp: Date.now()
  });
}
