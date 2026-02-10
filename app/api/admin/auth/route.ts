import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(request: Request) {
  try {
    const { password } = await request.json()
    
    const configPath = path.join(process.cwd(), 'data', 'admin-config.json')
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'))
    
    if (password === config.password) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ success: false, message: 'Mot de passe incorrect' }, { status: 401 })
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Erreur serveur' }, { status: 500 })
  }
}
