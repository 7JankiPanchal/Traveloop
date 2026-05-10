import { NextRequest, NextResponse } from 'next/server'
import { searchActivities } from '@/services/activity/searchActivities'

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q') ?? ''
  const results = await searchActivities(q)
  return NextResponse.json(results)
}
