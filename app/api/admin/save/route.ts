import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log('Received save request:', body)
    
    const { dataType, data } = body
    
    if (!dataType) {
      console.error('No dataType provided')
      return NextResponse.json({ 
        success: false, 
        message: 'dataType is required' 
      }, { status: 400 })
    }

    if (!data) {
      console.error('No data provided')
      return NextResponse.json({ 
        success: false, 
        message: 'data is required' 
      }, { status: 400 })
    }
    
    // Map dataType to filename
    const typeMap: { [key: string]: string } = {
      'teams': 'teams',
      'results': 'results',
      'sponsors': 'sponsors',
      'news': 'news'
    }
    
    const filename = typeMap[dataType.toLowerCase()]
    
    if (!filename) {
      console.error('Invalid dataType:', dataType)
      return NextResponse.json({ 
        success: false, 
        message: `Invalid dataType: ${dataType}. Must be one of: teams, results, sponsors, news` 
      }, { status: 400 })
    }
    
    const filePath = path.join(process.cwd(), 'data', `${filename}.json`)
    console.log('Writing to:', filePath)
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8')
    console.log('Save successful!')
    
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error saving data:', error)
    return NextResponse.json({ 
      success: false, 
      message: error.message || 'Erreur lors de la sauvegarde' 
    }, { status: 500 })
  }
}
