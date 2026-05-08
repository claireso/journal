import { pool } from '@infrastructure/db'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const token = process.env.BETTER_STACK_HEALTH_CHECK_TOKEN
  const authorization = (await headers()).get('authorization')

  if (!token || authorization !== `Bearer ${token}`) {
    return new Response(null, { status: 401 })
  }

  try {
    await Promise.race([
      pool.query('SELECT 1'),
      new Promise((_, reject) => setTimeout(() => reject(new Error('DB timeout')), 3000))
    ])
    return NextResponse.json({
      status: 'ok',
      checks: {
        db: 'ok'
      },
      timestamp: new Date().toISOString()
    })
  } catch {
    return NextResponse.json(
      {
        status: 'error',
        checks: {
          db: 'unreachable'
        },
        timestamp: new Date().toISOString()
      },
      { status: 503 }
    )
  }
}
