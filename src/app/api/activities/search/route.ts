import { NextRequest, NextResponse } from 'next/server'
import { searchActivities } from '@/services/activity/searchActivities'

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q') ?? ''
  const category = req.nextUrl.searchParams.get('category') ?? undefined
  const maxCostStr = req.nextUrl.searchParams.get('maxCost')
  const maxCost = maxCostStr ? Number(maxCostStr) : undefined
  const cityId = req.nextUrl.searchParams.get('cityId') ?? undefined
  
  const results = await searchActivities(q, category, maxCost, cityId)
  return NextResponse.json(results)
}
