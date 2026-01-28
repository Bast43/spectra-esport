'use client'

import { useState, useEffect } from 'react'
import { Save, Plus, Trash2, LogOut, Users, Trophy, X } from 'lucide-react'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [activeTab, setActiveTab] = useState<'teams' | 'results' | 'sponsors' | 'settings'>('teams')
  const [loading, setLoading] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')

  // Data states
  const [teamsData, setTeamsData] = useState<any>(null)
  const [resultsData, setResultsData] = useState<any>(null)
  const [sponsorsData, setSponsorsData] = useState<any>(null)
  const [settingsData, setSettingsData] = useState<any>(null)

  useEffect(() => {
    if (isAuthenticated) {
      loadAllData()
    }
  }, [isAuthenticated])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      const data = await res.json()

      if (data.success) {
        setIsAuthenticated(true)
        setPassword('')
      } else {
        alert('Mot de passe incorrect')
      }
    } catch (error) {
      alert('Erreur de connexion')
    } finally {
      setLoading(false)
    }
  }

  const loadAllData = async () => {
    setLoading(true)
    try {
      const [teamsRes, resultsRes, sponsorsRes, settingsRes] = await Promise.all([
        fetch('/api/data/teams'),
        fetch('/api/data/results'),
        fetch('/api/data/sponsors'),
        fetch('/api/settings'),
      ])

      const teams = await teamsRes.json()
      const results = await resultsRes.json()
      const sponsors = await sponsorsRes.json()
      const settings = await settingsRes.json()

      setTeamsData(teams)
      setResultsData(results)
      setSponsorsData(sponsors)
      setSettingsData(settings)
    } catch (error) {
      alert('Erreur lors du chargement des données')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (dataType: string, data: any) => {
    setLoading(true)
    setSaveMessage('')

    try {
      const res = await fetch('/api/admin/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dataType, data }),
      })

      const result = await res.json()

      if (res.ok) {
        setSaveMessage(`${dataType} saved successfully!`)
        setTimeout(() => setSaveMessage(''), 3000)
        
        // Log success
        if (result.logs) {
          console.log('Save logs:', result.logs)
        }
      } else {
        // Show error with logs
        let errorMsg = `Save failed: ${result.message || 'Unknown error'}`
        if (result.logs) {
          console.error('Save error logs:', result.logs)
          errorMsg += '\n\nCheck console (F12) for detailed logs.'
        }
        alert(errorMsg)
      }
    } catch (error: any) {
      console.error('Save error:', error)
      alert(`Erreur lors de la sauvegarde: ${error.message}\n\nNote: Save only works in local development (npm run dev).`)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setTeamsData(null)
    setResultsData(null)
    setSponsorsData(null)
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-spectra-purple/10 to-black flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="glass-card p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-spectra-violet to-spectra-mauve rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-display font-bold text-white mb-2">Admin Panel</h1>
              <p className="text-gray-400">Enter password to access</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-spectra-violet transition-colors"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary flex items-center justify-center gap-2"
              >
                {loading ? 'Loading...' : 'Login'}
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-spectra-purple/10 to-black pt-32 pb-20">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-display font-bold text-white">Admin Panel</h1>
          <button
            onClick={handleLogout}
            className="btn-secondary flex items-center gap-2"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>

        {/* Save Message */}
        {saveMessage && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-center">
            {saveMessage}
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-3 mb-8">
          <button
            onClick={() => setActiveTab('teams')}
            className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
              activeTab === 'teams'
                ? 'bg-spectra-violet text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            <Users size={20} />
            Teams & Staff
          </button>
          <button
            onClick={() => setActiveTab('results')}
            className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
              activeTab === 'results'
                ? 'bg-spectra-violet text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            <Trophy size={20} />
            Results
          </button>
          <button
            onClick={() => setActiveTab('sponsors')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'sponsors'
                ? 'bg-spectra-violet text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            Sponsors
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
              activeTab === 'settings'
                ? 'bg-spectra-violet text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Settings
          </button>
        </div>

        {/* Content */}
        {loading && !teamsData ? (
          <div className="glass-card text-center py-16">
            <div className="w-16 h-16 border-4 border-spectra-violet border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-400">Loading data...</p>
          </div>
        ) : (
          <>
            {activeTab === 'teams' && teamsData && (
              <TeamsEditor
                data={teamsData}
                onSave={(data: any) => {
                  setTeamsData(data)
                  handleSave('teams', data)
                }}
              />
            )}
            {activeTab === 'results' && resultsData && (
              <ResultsEditor
                data={resultsData}
                teams={teamsData?.teams || []}
                onSave={(data: any) => {
                  setResultsData(data)
                  handleSave('results', data)
                }}
              />
            )}
            {activeTab === 'sponsors' && sponsorsData && (
              <SponsorsEditor
                data={sponsorsData}
                onSave={(data: any) => {
                  setSponsorsData(data)
                  handleSave('sponsors', data)
                }}
              />
            )}

            {activeTab === 'settings' && settingsData && (
              <SettingsEditor
                data={settingsData}
                onSave={async (data: any) => {
                  setSettingsData(data)
                  // Save settings using the settings API
                  try {
                    const res = await fetch('/api/settings', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(data),
                    })
                    if (res.ok) {
                      setSaveMessage('Settings saved successfully!')
                      setTimeout(() => setSaveMessage(''), 3000)
                    }
                  } catch (error) {
                    alert('Error saving settings')
                  }
                }}
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}

// Settings Editor Component
function SettingsEditor({ data, onSave }: any) {
  const [backgroundImage, setBackgroundImage] = useState(data.backgroundImage || '')
  const [backgroundOpacity, setBackgroundOpacity] = useState(data.backgroundOpacity || 1)

  return (
    <div className="space-y-6">
      <div className="p-6 bg-white/5 rounded-lg border border-white/10">
        <h3 className="text-xl font-display font-bold text-white mb-6 flex items-center gap-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Background Image
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Image URL (Imgur, etc.)
            </label>
            <input
              type="text"
              value={backgroundImage}
              onChange={(e) => setBackgroundImage(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-spectra-violet transition-colors"
              placeholder="https://i.imgur.com/..."
            />
            <p className="text-xs text-gray-500 mt-2">
              💡 Tip: Upload your image to <a href="https://imgur.com/upload" target="_blank" rel="noopener noreferrer" className="text-spectra-violet hover:underline">Imgur</a> and paste the direct link here
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Opacity: {Math.round(backgroundOpacity * 100)}%
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={backgroundOpacity}
              onChange={(e) => setBackgroundOpacity(parseFloat(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
              style={{
                accentColor: '#8b5cf6'
              }}
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Transparent</span>
              <span>Opaque</span>
            </div>
          </div>

          {backgroundImage && (
            <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
              <p className="text-sm text-gray-400 mb-3">Preview:</p>
              <div className="relative h-48 rounded-lg overflow-hidden">
                <img
                  src={backgroundImage}
                  alt="Background preview"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ opacity: backgroundOpacity }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                    const parent = e.currentTarget.parentElement
                    if (parent) {
                      const errorDiv = document.createElement('div')
                      errorDiv.className = 'absolute inset-0 flex items-center justify-center text-red-400 text-sm'
                      errorDiv.textContent = 'Invalid image URL'
                      parent.appendChild(errorDiv)
                    }
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-white text-lg font-display drop-shadow-lg">This is how your background will look</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={() => onSave({ backgroundImage, backgroundOpacity })}
        className="w-full px-6 py-4 bg-spectra-violet hover:bg-spectra-purple text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        <Save size={20} />
        Save Settings
      </button>
    </div>
  )
}

// Teams Editor Component
function TeamsEditor({ data, onSave }: any) {
  const [teams, setTeams] = useState(data.teams)
  const [staff, setStaff] = useState(data.staff || [])
  const [activeSection, setActiveSection] = useState<'teams' | 'staff'>('teams')

  const updatePlayer = (teamIndex: number, playerIndex: number, field: string, value: string) => {
    const newTeams = [...teams]
    newTeams[teamIndex].players[playerIndex][field] = value
    setTeams(newTeams)
  }

  const updatePlayerSocialLinks = (teamIndex: number, playerIndex: number, socialsLinks: string[]) => {
    const newTeams = [...teams]
    newTeams[teamIndex].players[playerIndex].socialsLinks = socialsLinks
    setTeams(newTeams)
  }

  const updateCoach = (teamIndex: number, field: string, value: string) => {
    const newTeams = [...teams]
    if (!newTeams[teamIndex].coach) {
      newTeams[teamIndex].coach = {
        id: `${newTeams[teamIndex].id}-coach`,
        name: '',
        photo: '/images/default-coach.jpg',
        socials: { twitter: '', linkedin: '' }
      }
    }
    newTeams[teamIndex].coach[field] = value
    setTeams(newTeams)
  }

  const updateCoachSocialLinks = (teamIndex: number, socialsLinks: string[]) => {
    const newTeams = [...teams]
    if (!newTeams[teamIndex].coach) {
      newTeams[teamIndex].coach = {
        id: `${newTeams[teamIndex].id}-coach`,
        name: '',
        photo: '/images/default-coach.jpg',
        socials: { twitter: '' },
        socialsLinks: []
      }
    }
    newTeams[teamIndex].coach.socialsLinks = socialsLinks
    setTeams(newTeams)
  }

  const updateStaffMember = (index: number, field: string, value: string) => {
    const newStaff = [...staff]
    newStaff[index][field] = value
    setStaff(newStaff)
  }

  const updateStaffSocialLinks = (index: number, socialsLinks: string[]) => {
    const newStaff = [...staff]
    newStaff[index].socialsLinks = socialsLinks
    setStaff(newStaff)
  }

  const addPlayer = (teamIndex: number) => {
    const newTeams = [...teams]
    const teamId = newTeams[teamIndex].id
    const newPlayerId = `${teamId}-player-${Date.now()}`
    
    const newPlayer = {
      id: newPlayerId,
      name: '',
      role: '',
      photo: '',
      socials: {
        twitter: '',
        twitch: '',
        instagram: ''
      }
    }
    
    newTeams[teamIndex].players.push(newPlayer)
    setTeams(newTeams)
  }

  const removePlayer = (teamIndex: number, playerIndex: number) => {
    const newTeams = [...teams]
    if (newTeams[teamIndex].players.length > 1) {
      newTeams[teamIndex].players.splice(playerIndex, 1)
      setTeams(newTeams)
    } else {
      alert('A team must have at least 1 player!')
    }
  }

  const addTeam = () => {
    const teamName = prompt('Team name (e.g., "Valorant Main"):')
    if (!teamName) return

    const gameName = prompt('Game name (e.g., "Valorant"):')
    if (!gameName) return

    // Generate ID from name and game
    const teamId = `${gameName.toLowerCase().replace(/\s+/g, '-')}-${teamName.toLowerCase().replace(/\s+/g, '-')}`

    const newTeam = {
      id: teamId,
      name: `${gameName} - ${teamName}`,
      game: gameName,
      description: `Our ${gameName} ${teamName} roster`,
      logo: '/images/default-team.png',
      players: [
        {
          id: `${teamId}-player-1`,
          name: '',
          role: '',
          photo: '',
          socials: { twitter: '', twitch: '', instagram: '' }
        }
      ],
      coach: {
        id: `${teamId}-coach`,
        name: '',
        photo: '/images/default-coach.jpg',
        socials: { twitter: '', linkedin: '' }
      }
    }

    const newTeams = [...teams, newTeam]
    setTeams(newTeams)
    alert(`Team "${newTeam.name}" created successfully! Don't forget to save!`)
  }

  const deleteTeam = (teamIndex: number) => {
    const newTeams = [...teams]
    
    if (newTeams.length <= 1) {
      alert('You must have at least 1 team!')
      return
    }

    const teamName = newTeams[teamIndex].name
    const confirmDelete = window.confirm(`Are you sure you want to DELETE the team "${teamName}"?\n\nThis will remove:\n- All players\n- The coach\n- All related data\n\nThis action CANNOT be undone!`)
    
    if (confirmDelete) {
      newTeams.splice(teamIndex, 1)
      setTeams(newTeams)
      alert(`Team "${teamName}" deleted. Don't forget to save!`)
    }
  }

  const updateTeamInfo = (teamIndex: number, field: string, value: string) => {
    const newTeams = [...teams]
    newTeams[teamIndex][field] = value
    setTeams(newTeams)
  }

  return (
    <div className="space-y-8">
      {/* Section Selector */}
      <div className="flex gap-3">
        <button
          onClick={() => setActiveSection('teams')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            activeSection === 'teams'
              ? 'bg-spectra-violet text-white'
              : 'bg-white/5 text-gray-400 hover:bg-white/10'
          }`}
        >
          Teams
        </button>
        <button
          onClick={() => setActiveSection('staff')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            activeSection === 'staff'
              ? 'bg-spectra-violet text-white'
              : 'bg-white/5 text-gray-400 hover:bg-white/10'
          }`}
        >
          Staff
        </button>
      </div>

      {/* Teams Section */}
      {activeSection === 'teams' && (
        <>
          {/* Add New Team Button */}
          <button
            onClick={addTeam}
            className="w-full px-6 py-4 bg-gradient-to-r from-spectra-violet to-spectra-mauve hover:from-spectra-violet/80 hover:to-spectra-mauve/80 rounded-lg text-white font-bold transition-all flex items-center justify-center gap-3 border-2 border-spectra-violet/50"
          >
            <Plus className="w-6 h-6" />
            Add New Team
          </button>

          {teams.map((team: any, teamIndex: number) => (
            <div key={team.id} className="p-6 bg-white/5 rounded-lg border border-white/10 relative">
              {/* Delete Team Button */}
              <button
                onClick={() => deleteTeam(teamIndex)}
                className="absolute top-4 right-4 px-4 py-2 bg-red-500/20 hover:bg-red-500/40 border border-red-500/50 rounded-lg text-red-400 font-medium transition-all flex items-center gap-2"
                title="Delete this team"
              >
                <Trash2 className="w-4 h-4" />
                Delete Team
              </button>

              {/* Team Info Section */}
              <div className="mb-6 pr-32">
                <h3 className="text-2xl font-display font-bold text-white mb-4">Team Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Team Name</label>
                    <input
                      type="text"
                      value={team.name}
                      onChange={(e) => updateTeamInfo(teamIndex, 'name', e.target.value)}
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-white text-sm"
                      placeholder="e.g., Valorant - Main"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Game</label>
                    <input
                      type="text"
                      value={team.game}
                      onChange={(e) => updateTeamInfo(teamIndex, 'game', e.target.value)}
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-white text-sm"
                      placeholder="e.g., Valorant"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm text-gray-400 mb-2">Description</label>
                  <textarea
                    value={team.description || ''}
                    onChange={(e) => updateTeamInfo(teamIndex, 'description', e.target.value)}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-white text-sm"
                    placeholder="e.g., Our competitive Valorant roster"
                    rows={2}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Logo URL (optional)</label>
                  <input
                    type="text"
                    value={team.logo || ''}
                    onChange={(e) => updateTeamInfo(teamIndex, 'logo', e.target.value)}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-white text-xs"
                    placeholder="https://i.imgur.com/..."
                  />
                </div>
              </div>

              {/* Players Section */}
              <div className="mb-6">
                <h4 className="text-xl font-display font-bold text-white mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Players
                </h4>
                <div className="space-y-4">
                  {team.players.map((player: any, playerIndex: number) => (
                    <div key={player.id} className="p-4 bg-black/20 rounded-lg space-y-3 relative">
                      {/* Remove Player Button */}
                      <button
                        onClick={() => removePlayer(teamIndex, playerIndex)}
                        className="absolute top-2 right-2 p-2 bg-red-500/20 hover:bg-red-500/40 border border-red-500/50 rounded text-red-400 transition-all"
                        title="Remove player"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={player.name}
                          onChange={(e) => updatePlayer(teamIndex, playerIndex, 'name', e.target.value)}
                          className="px-3 py-2 bg-white/5 border border-white/10 rounded text-white text-sm"
                          placeholder="Player name"
                        />
                        <input
                          type="text"
                          value={player.role}
                          onChange={(e) => updatePlayer(teamIndex, playerIndex, 'role', e.target.value)}
                          className="px-3 py-2 bg-white/5 border border-white/10 rounded text-white text-sm"
                          placeholder="Role"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={player.photo || ''}
                          onChange={(e) => updatePlayer(teamIndex, playerIndex, 'photo', e.target.value)}
                          className="px-3 py-2 bg-white/5 border border-white/10 rounded text-white text-xs"
                          placeholder="Photo URL (https://i.imgur.com/...)"
                        />
                        <input
                          type="text"
                          value={player.country || ''}
                          onChange={(e) => updatePlayer(teamIndex, playerIndex, 'country', e.target.value)}
                          className="px-3 py-2 bg-white/5 border border-white/10 rounded text-white text-xs uppercase"
                          placeholder="Country code (CH, FR, BE, etc.)"
                          maxLength={2}
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                        <input
                          type="text"
                          value={player.socials.twitter || ''}
                          onChange={(e) => updatePlayer(teamIndex, playerIndex, 'socials', { ...player.socials, twitter: e.target.value })}
                          className="px-3 py-2 bg-white/5 border border-white/10 rounded text-white text-xs"
                          placeholder="X (Twitter) URL"
                        />
                        {player.socialsLinks && player.socialsLinks.map((link: { url: string }, idx: number) => (
                          <div key={idx} className="flex gap-2 items-center">
                            <input
                              type="text"
                              value={link.url}
                              onChange={e => {
                                const newLinks = [...player.socialsLinks];
                                newLinks[idx].url = e.target.value;
                                updatePlayerSocialLinks(teamIndex, playerIndex, newLinks);
                              }}
                              className="px-3 py-2 bg-white/5 border border-white/10 rounded text-white text-xs w-full"
                              placeholder="Lien social (YouTube, TikTok, Kick, etc.)"
                            />
                            <button type="button" onClick={() => {
                              const newLinks = player.socialsLinks.filter((_: { url: string }, i: number) => i !== idx);
                              updatePlayerSocialLinks(teamIndex, playerIndex, newLinks);
                            }} className="text-red-400 hover:text-red-600"><Trash2 size={16} /></button>
                          </div>
                        ))}
                        <button type="button" onClick={() => {
                          const newLinks = player.socialsLinks ? [...player.socialsLinks, { url: '' }] : [{ url: '' }];
                          updatePlayerSocialLinks(teamIndex, playerIndex, newLinks);
                        }} className="p-2 bg-spectra-violet/20 border border-spectra-violet/40 rounded text-spectra-violet hover:bg-spectra-violet/40"><Plus size={16} /></button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Player Button */}
                <button
                  onClick={() => addPlayer(teamIndex)}
                  className="mt-4 w-full px-4 py-3 bg-spectra-violet/20 hover:bg-spectra-violet/30 border-2 border-dashed border-spectra-violet/50 rounded-lg text-spectra-violet font-medium transition-all flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Add Player
                </button>
              </div>

              {/* Coach Section */}
              <div className="mt-6 p-4 bg-spectra-violet/10 border border-spectra-violet/30 rounded-lg">
                <h4 className="text-lg font-display font-bold text-white mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Coach
                </h4>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={team.coach?.name || ''}
                    onChange={(e) => updateCoach(teamIndex, 'name', e.target.value)}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-white text-sm"
                    placeholder="Coach name"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={team.coach?.photo || ''}
                      onChange={(e) => updateCoach(teamIndex, 'photo', e.target.value)}
                      className="px-3 py-2 bg-white/5 border border-white/10 rounded text-white text-xs"
                      placeholder="Photo URL (https://i.imgur.com/...)"
                    />
                    <input
                      type="text"
                      value={team.coach?.country || ''}
                      onChange={(e) => updateCoach(teamIndex, 'country', e.target.value)}
                      className="px-3 py-2 bg-white/5 border border-white/10 rounded text-white text-xs uppercase"
                      placeholder="Country code (CH, FR, BE, etc.)"
                      maxLength={2}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                    <input
                      type="text"
                      value={team.coach?.socials?.twitter || ''}
                      onChange={(e) => updateCoach(teamIndex, 'socials', { ...team.coach?.socials, twitter: e.target.value })}
                      className="px-3 py-2 bg-white/5 border border-white/10 rounded text-white text-xs"
                      placeholder="X (Twitter) URL"
                    />
                    {team.coach?.socialsLinks && team.coach.socialsLinks.map((link, idx) => (
                      <div key={idx} className="flex gap-2 items-center">
                        <input
                          type="text"
                          value={link.url}
                          onChange={e => {
                            const newLinks = [...team.coach.socialsLinks];
                            newLinks[idx].url = e.target.value;
                            updateCoachSocialLinks(teamIndex, newLinks);
                          }}
                          className="px-3 py-2 bg-white/5 border border-white/10 rounded text-white text-xs w-full"
                          placeholder="Lien social (YouTube, TikTok, Kick, etc.)"
                        />
                        <button type="button" onClick={() => {
                          const newLinks = team.coach.socialsLinks.filter((_, i) => i !== idx);
                          updateCoachSocialLinks(teamIndex, newLinks);
                        }} className="text-red-400 hover:text-red-600"><Trash2 size={16} /></button>
                      </div>
                    ))}
                    <button type="button" onClick={() => {
                      const newLinks = team.coach?.socialsLinks ? [...team.coach.socialsLinks, { url: '' }] : [{ url: '' }];
                      updateCoachSocialLinks(teamIndex, newLinks);
                    }} className="p-2 bg-spectra-violet/20 border border-spectra-violet/40 rounded text-spectra-violet hover:bg-spectra-violet/40"><Plus size={16} /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      )}

      {/* Staff Section */}
      {activeSection === 'staff' && (
        <div className="space-y-6">
          {staff.map((member: any, index: number) => (
            <div key={member.id} className="p-6 bg-white/5 rounded-lg border border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  value={member.name}
                  onChange={(e) => updateStaffMember(index, 'name', e.target.value)}
                  className="px-3 py-2 bg-white/5 border border-white/10 rounded text-white text-sm"
                  placeholder="Name"
                />
                <input
                  type="text"
                  value={member.role}
                  onChange={(e) => updateStaffMember(index, 'role', e.target.value)}
                  className="px-3 py-2 bg-white/5 border border-white/10 rounded text-white text-sm"
                  placeholder="Role"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <input
                  type="text"
                  value={member.photo || ''}
                  onChange={(e) => updateStaffMember(index, 'photo', e.target.value)}
                  className="px-3 py-2 bg-white/5 border border-white/10 rounded text-white text-xs"
                  placeholder="Photo URL"
                />
                <input
                  type="text"
                  value={member.country || ''}
                  onChange={(e) => updateStaffMember(index, 'country', e.target.value)}
                  className="px-3 py-2 bg-white/5 border border-white/10 rounded text-white text-xs uppercase"
                  placeholder="Country code (CH, FR, BE, etc.)"
                  maxLength={2}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                <input
                  type="text"
                  value={member.socials.twitter || ''}
                  onChange={(e) => updateStaffMember(index, 'socials', { ...member.socials, twitter: e.target.value })}
                  className="px-3 py-2 bg-white/5 border border-white/10 rounded text-white text-xs"
                  placeholder="X (Twitter) URL"
                />
                {member.socialsLinks && member.socialsLinks.map((link, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={link.url}
                      onChange={e => {
                        const newLinks = [...member.socialsLinks];
                        newLinks[idx].url = e.target.value;
                        updateStaffSocialLinks(index, newLinks);
                      }}
                      className="px-3 py-2 bg-white/5 border border-white/10 rounded text-white text-xs w-full"
                      placeholder="Lien social (YouTube, TikTok, Kick, etc.)"
                    />
                    <button type="button" onClick={() => {
                      const newLinks = member.socialsLinks.filter((_, i) => i !== idx);
                      updateStaffSocialLinks(index, newLinks);
                    }} className="text-red-400 hover:text-red-600"><Trash2 size={16} /></button>
                  </div>
                ))}
                <button type="button" onClick={() => {
                  const newLinks = member.socialsLinks ? [...member.socialsLinks, { url: '' }] : [{ url: '' }];
                  updateStaffSocialLinks(index, newLinks);
                }} className="p-2 bg-spectra-violet/20 border border-spectra-violet/40 rounded text-spectra-violet hover:bg-spectra-violet/40"><Plus size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Save Button */}
      <button
        onClick={() => onSave({ teams, staff })}
        className="w-full btn-primary flex items-center justify-center gap-2"
      >
        <Save size={20} />
        Save teams and staff
      </button>
    </div>
  )
}

// Results Editor Component
function ResultsEditor({ data, teams, onSave }: any) {
  const [results, setResults] = useState(data.results || [])

  const addResult = () => {
    const newResult = {
      id: `result-${Date.now()}`,
      teamId: teams[0]?.id || '',
      image: '', // Champ URL image
      opponent: '',
      score: '',
      result: 'win',
      competition: '',
      date: new Date().toISOString().split('T')[0],
    }
    setResults([newResult, ...results])
  }

  const updateResult = (index: number, field: string, value: string) => {
    const newResults = [...results]
    newResults[index][field] = value
    setResults(newResults)
  }

  const deleteResult = (index: number) => {
    if (window.confirm('Delete this result?')) {
      const newResults = [...results]
      newResults.splice(index, 1)
      setResults(newResults)
    }
  }

  return (
    <div className="space-y-6">
      <button
        onClick={addResult}
        className="w-full btn-primary flex items-center justify-center gap-2"
      >
        <Plus size={20} />
        Add Result
      </button>

      {results.map((result: any, index: number) => (
        <div key={result.id} className="p-6 bg-white/5 rounded-lg border border-white/10 relative">
          <button
            onClick={() => deleteResult(index)}
            className="absolute top-4 right-4 p-2 bg-red-500/20 hover:bg-red-500/40 border border-red-500/50 rounded text-red-400 transition-all"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-12">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Team</label>
              <select
                value={result.teamId}
                onChange={(e) => updateResult(index, 'teamId', e.target.value)}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-white text-sm"
              >
                {teams.map((team: any) => (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Image (URL hébergée)</label>
              <input
                type="text"
                value={result.image || ''}
                onChange={(e) => updateResult(index, 'image', e.target.value)}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-white text-sm"
                placeholder="https://..."
              />
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={() => onSave({ results })}
        className="w-full btn-primary flex items-center justify-center gap-2"
      >
        <Save size={20} />
        Save results
      </button>
    </div>
  )
}

// Sponsors Editor Component
function SponsorsEditor({ data, onSave }: any) {
  const [sponsors, setSponsors] = useState(data.sponsors || [])

  const addSponsor = () => {
    const newSponsor = {
      id: `sponsor-${Date.now()}`,
      name: '',
      logo: '',
      website: '',
      tier: 'premium'
    }
    setSponsors([...sponsors, newSponsor])
  }

  const updateSponsor = (index: number, field: string, value: string) => {
    const newSponsors = [...sponsors]
    newSponsors[index][field] = value
    setSponsors(newSponsors)
  }

  const deleteSponsor = (index: number) => {
    if (window.confirm('Delete this sponsor?')) {
      const newSponsors = [...sponsors]
      newSponsors.splice(index, 1)
      setSponsors(newSponsors)
    }
  }

  return (
    <div className="space-y-6">
      <button
        onClick={addSponsor}
        className="w-full btn-primary flex items-center justify-center gap-2"
      >
        <Plus size={20} />
        Add Sponsor
      </button>

      {sponsors.map((sponsor: any, index: number) => (
        <div key={sponsor.id} className="p-6 bg-white/5 rounded-lg border border-white/10 relative">
          <button
            onClick={() => deleteSponsor(index)}
            className="absolute top-4 right-4 p-2 bg-red-500/20 hover:bg-red-500/40 border border-red-500/50 rounded text-red-400 transition-all"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          
          <div className="space-y-3 pr-12">
            <input
              type="text"
              value={sponsor.name}
              onChange={(e) => updateSponsor(index, 'name', e.target.value)}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-white text-sm"
              placeholder="Sponsor name"
            />
            <input
              type="text"
              value={sponsor.logo}
              onChange={(e) => updateSponsor(index, 'logo', e.target.value)}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-white text-xs"
              placeholder="Logo URL"
            />
            <input
              type="text"
              value={sponsor.website || ''}
              onChange={(e) => updateSponsor(index, 'website', e.target.value)}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-white text-xs"
              placeholder="Website URL"
            />
          </div>
        </div>
      ))}

      <button
        onClick={() => onSave({ sponsors })}
        className="w-full btn-primary flex items-center justify-center gap-2"
      >
        <Save size={20} />
        Save sponsors
      </button>
    </div>
  )
}
