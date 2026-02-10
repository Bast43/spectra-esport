import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'settings.json')
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const data = JSON.parse(fileContents)
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error reading settings:', error)
    return NextResponse.json({ 
      backgroundImage: '', 
      backgroundOpacity: 1 
    }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const settings = await request.json()
    const filePath = path.join(process.cwd(), 'data', 'settings.json')
    fs.writeFileSync(filePath, JSON.stringify(settings, null, 2))
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving settings:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
