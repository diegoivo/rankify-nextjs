import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    message: 'Rankify API funcionando no Vercel com Next.js',
    framework: 'Next.js 15',
    environment: process.env.NODE_ENV || 'development'
  });
}