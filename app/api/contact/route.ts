import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const form = await request.formData()
  const name = form.get('name')
  return NextResponse.json({ ok: true, message: `Thanks ${name}, we received your message.` })
}
