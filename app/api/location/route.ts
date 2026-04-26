/**
 * ArogyaBot Location API Route — /api/location
 * CARE module — fetches nearby health resources and helplines.
 */

import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabase/server'
import { getHelplinesForState } from '@/lib/constants/helplines'
import { HealthResource, LocationResponse } from '@/types'

/**
 * GET /api/location?city=<city>&pincode=<pincode>
 * Returns health resources near the specified city/pincode plus national helplines.
 */
export async function GET(request: NextRequest): Promise<NextResponse<LocationResponse>> {
  try {
    const { searchParams } = new URL(request.url)
    const city = searchParams.get('city')
    const pincode = searchParams.get('pincode')

    if (!city && !pincode) {
      return NextResponse.json(
        {
          resources: [],
          helplines: getHelplinesForState(),
        },
        { status: 200 }
      )
    }

    const supabase = getSupabaseServerClient()

    // Build the query — search by city (case-insensitive) or pincode
    let query = supabase
      .from('health_resources')
      .select('*')
      .order('is_govt', { ascending: false }) // Government hospitals first
      .order('name', { ascending: true })
      .limit(5)

    if (city) {
      query = query.ilike('city', `%${city}%`)
    }

    if (pincode) {
      query = query.or(`pincode.eq.${pincode}`)
    }

    const { data, error } = await query

    if (error) {
      console.error('[/api/location] Supabase error:', error)
      return NextResponse.json(
        {
          resources: [],
          helplines: getHelplinesForState(),
        },
        { status: 200 }
      )
    }

    const resources: HealthResource[] = (data as HealthResource[]) || []

    // Try to detect state from results to provide state-specific helplines
    const state = resources.length > 0 ? resources[0].state : undefined

    return NextResponse.json(
      {
        resources,
        helplines: getHelplinesForState(state),
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('[/api/location] Error:', error)
    return NextResponse.json(
      {
        resources: [],
        helplines: getHelplinesForState(),
      },
      { status: 200 }
    )
  }
}
