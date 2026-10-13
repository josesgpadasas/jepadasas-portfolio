import { NextResponse } from 'next/server';
import { getPortfolioProfile } from '@/data/portfolio/profile';

export function GET() {
  return NextResponse.json(getPortfolioProfile());
}
