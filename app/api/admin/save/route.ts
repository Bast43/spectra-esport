import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(request: Request) {
  try {
    const { type, data } = await request.json()
    
    const validTypes = ['teams', 'news', 'results', 'sponsors']
    if (!validTypes.includes(type)) {
      return NextResponse.json({ success: false, message: 'Type invalide' }, { status: 400 })
    }
    
    const filePath = path.join(process.cwd(), 'data', `${type}.json`)
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8')
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving data:', error)
    return NextResponse.json({ success: false, message: 'Erreur lors de la sauvegarde' }, { status: 500 })
  }
}
