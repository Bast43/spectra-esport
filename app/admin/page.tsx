'use client'

import { useState, useEffect } from 'react'
import { Save, Plus, Trash2, LogOut, Users, Trophy } from 'lucide-react'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [activeTab, setActiveTab] = useState<'teams' | 'results' | 'sponsors'>('teams')
  const [loading, setLoading] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')

  // Data states
  const [teamsData, setTeamsData] = useState<any>(null)
  const [resultsData, setResultsData] = useState<any>(null)
  const [sponsorsData, setSponsorsData] = useState<any>(null)

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
    try {
      const [teams, results, sponsors] = await Promise.all([
        fetch('/api/teams').then((r) => r.json()),
        fetch('/api/results').then((r) => r.json()),
        fetch('/api/sponsors').then((r) => r.json()),
      ])

      setTeamsData(teams)
      setResultsData(results)
      setSponsorsData(sponsors)
    } catch (error) {
      console.error('Error loading data:', error)
    }
  }

  const saveData = async (type: string, data: any) => {
    setLoading(true)
    setSaveMessage('')

    try {
      const res = await fetch('/api/admin/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, data }),
      })

      if (res.ok) {
        setSaveMessage('✅ Sauvegardé avec succès !')
        setTimeout(() => setSaveMessage(''), 3000)
      } else {
        setSaveMessage('❌ Erreur lors de la sauvegarde')
      }
    } catch (error) {
      setSaveMessage('❌ Erreur réseau')
    } finally {
      setLoading(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 px-4">
        <div className="glass-card max-w-md w-full neon-border">
          <h1 className="text-3xl font-display font-bold text-white text-center mb-8">
            Admin <span className="text-spectra-violet">Spectra</span>
          </h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-spectra-violet transition-colors"
                placeholder="Entrez le mot de passe admin"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary disabled:opacity-50"
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
            <p className="text-xs text-gray-500 text-center">
              Mot de passe par défaut: Spectra2025!
            </p>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-display font-bold text-white">
            Panneau d'<span className="text-spectra-violet">Administration</span>
          </h1>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
          >
            <LogOut size={18} />
            Déconnexion
          </button>
        </div>

        {saveMessage && (
          <div className="mb-6 p-4 bg-spectra-violet/20 border border-spectra-violet/50 rounded-lg text-center text-white">
            {saveMessage}
          </div>
        )}

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveTab('teams')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              activeTab === 'teams'
                ? 'bg-gradient-to-r from-spectra-violet to-spectra-purple text-white shadow-lg'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            <Users size={18} />
            Teams
          </button>
          <button
            onClick={() => setActiveTab('results')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              activeTab === 'results'
                ? 'bg-gradient-to-r from-spectra-violet to-spectra-purple text-white shadow-lg'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            <Trophy size={18} />
            Results
          </button>
          <button
            onClick={() => setActiveTab('sponsors')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              activeTab === 'sponsors'
                ? 'bg-gradient-to-r from-spectra-violet to-spectra-purple text-white shadow-lg'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Partners
          </button>
        </div>

        {/* Content */}
        <div className="glass-card">
          {activeTab === 'teams' && teamsData && (
            <TeamsEditor data={teamsData} onSave={(data: any) => saveData('teams', data)} />
          )}
          {activeTab === 'results' && resultsData && (
            <ResultsEditor data={resultsData} onSave={(data: any) => saveData('results', data)} />
          )}
          {activeTab === 'sponsors' && sponsorsData && (
            <SponsorsEditor data={sponsorsData} onSave={(data: any) => saveData('sponsors', data)} />
          )}
        </div>
      </div>
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

  const updatePlayerSocial = (teamIndex: number, playerIndex: number, platform: string, value: string) => {
    const newTeams = [...teams]
    newTeams[teamIndex].players[playerIndex].socials[platform] = value
    setTeams(newTeams)
  }

  const updateStaffMember = (index: number, field: string, value: string) => {
    const newStaff = [...staff]
    newStaff[index][field] = value
    setStaff(newStaff)
  }

  const updateStaffSocial = (index: number, platform: string, value: string) => {
    const newStaff = [...staff]
    newStaff[index].socials[platform] = value
    setStaff(newStaff)
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
          {teams.map((team: any, teamIndex: number) => (
            <div key={team.id} className="p-6 bg-white/5 rounded-lg border border-white/10">
              <h3 className="text-2xl font-display font-bold text-white mb-6">{team.name}</h3>
              <div className="space-y-4">
                {team.players.map((player: any, playerIndex: number) => (
                  <div key={player.id} className="p-4 bg-black/20 rounded-lg space-y-3">
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
                        placeholder="Rôle"
                      />
                    </div>
                    <input
                      type="text"
                      value={player.photo || ''}
                      onChange={(e) => updatePlayer(teamIndex, playerIndex, 'photo', e.target.value)}
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-white text-xs"
                      placeholder="Profile photo URL (ex: /images/joueur1.jpg)"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      <input
                        type="text"
                        value={player.socials.twitter || ''}
                        onChange={(e) => updatePlayerSocial(teamIndex, playerIndex, 'twitter', e.target.value)}
                        className="px-3 py-2 bg-white/5 border border-white/10 rounded text-white text-xs"
                        placeholder="Twitter URL"
                      />
                      <input
                        type="text"
                        value={player.socials.twitch || ''}
                        onChange={(e) => updatePlayerSocial(teamIndex, playerIndex, 'twitch', e.target.value)}
                        className="px-3 py-2 bg-white/5 border border-white/10 rounded text-white text-xs"
                        placeholder="Twitch URL"
                      />
                      <input
                        type="text"
                        value={player.socials.instagram || ''}
                        onChange={(e) => updatePlayerSocial(teamIndex, playerIndex, 'instagram', e.target.value)}
                        className="px-3 py-2 bg-white/5 border border-white/10 rounded text-white text-xs"
                        placeholder="Instagram URL"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </>
      )}

      {/* Staff Section */}
      {activeSection === 'staff' && (
        <div className="p-6 bg-white/5 rounded-lg border border-white/10">
          <h3 className="text-2xl font-display font-bold text-white mb-6">Staff Management</h3>
          <div className="space-y-4">
            {staff.map((member: any, index: number) => (
              <div key={member.id} className="p-4 bg-black/20 rounded-lg space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={member.name}
                    onChange={(e) => updateStaffMember(index, 'name', e.target.value)}
                    className="px-3 py-2 bg-white/5 border border-white/10 rounded text-white text-sm"
                    placeholder="Nom du membre"
                  />
                  <input
                    type="text"
                    value={member.role}
                    onChange={(e) => updateStaffMember(index, 'role', e.target.value)}
                    className="px-3 py-2 bg-white/5 border border-white/10 rounded text-white text-sm"
                    placeholder="Rôle"
                  />
                </div>
                <input
                  type="text"
                  value={member.photo || ''}
                  onChange={(e) => updateStaffMember(index, 'photo', e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-white text-xs"
                  placeholder="Profile photo URL (ex: /images/staff1.jpg)"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={member.socials.twitter || ''}
                    onChange={(e) => updateStaffSocial(index, 'twitter', e.target.value)}
                    className="px-3 py-2 bg-white/5 border border-white/10 rounded text-white text-xs"
                    placeholder="Twitter URL"
                  />
                  <input
                    type="text"
                    value={member.socials.linkedin || ''}
                    onChange={(e) => updateStaffSocial(index, 'linkedin', e.target.value)}
                    className="px-3 py-2 bg-white/5 border border-white/10 rounded text-white text-xs"
                    placeholder="LinkedIn URL"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <button onClick={() => onSave({ teams, staff })} className="btn-primary flex items-center gap-2">
        <Save size={18} />
        Save teams and staff
      </button>
    </div>
  )
}

// Results Editor Component
function ResultsEditor({ data, onSave }: any) {
  const [results, setResults] = useState(data.results)

  const teams = [
    { id: 'r6s-main', name: 'R6S Main', game: 'Rainbow Six Siege' },
    { id: 'r6s-academy', name: 'R6S Academy', game: 'Rainbow Six Siege' },
    { id: 'cs2-main', name: 'CS2 Main', game: 'Counter-Strike 2' },
  ]

  const addResult = () => {
    setResults([
      ...results,
      {
        id: `result-${Date.now()}`,
        opponent: '',
        game: 'Rainbow Six Siege',
        teamId: 'r6s-main',
        teamName: 'R6S Main',
        date: new Date().toISOString().split('T')[0],
        score: '0-0',
        result: 'Win',
        competition: '',
      },
    ])
  }

  const updateResult = (index: number, field: string, value: string) => {
    const newResults = [...results]
    newResults[index][field] = value
    
    // Auto-update teamName and game when teamId changes
    if (field === 'teamId') {
      const selectedTeam = teams.find(t => t.id === value)
      if (selectedTeam) {
        newResults[index].teamName = selectedTeam.name
        newResults[index].game = selectedTeam.game
      }
    }
    
    setResults(newResults)
  }

  const deleteResult = (index: number) => {
    setResults(results.filter((_: any, i: number) => i !== index))
  }

  return (
    <div className="space-y-6">
      {results.map((item: any, index: number) => (
        <div key={item.id} className="p-6 bg-white/5 rounded-lg border border-white/10 space-y-3">
          <div className="flex justify-between items-start gap-4">
            <input
              type="text"
              value={item.opponent || ''}
              onChange={(e) => updateResult(index, 'opponent', e.target.value)}
              className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded text-white font-semibold"
              placeholder="Adversaire (ex: Team Vitality)"
            />
            <button
              onClick={() => deleteResult(index)}
              className="p-2 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <select
              value={item.teamId || 'r6s-main'}
              onChange={(e) => updateResult(index, 'teamId', e.target.value)}
              className="px-3 py-2 bg-white/5 border border-white/10 rounded text-white text-sm"
            >
              {teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={item.game || ''}
              className="px-3 py-2 bg-white/5 border border-white/10 rounded text-gray-400 text-sm"
              placeholder="Jeu (auto)"
              disabled
            />
            <input
              type="date"
              value={item.date || ''}
              onChange={(e) => updateResult(index, 'date', e.target.value)}
              className="px-3 py-2 bg-white/5 border border-white/10 rounded text-white text-sm"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <input
              type="text"
              value={item.competition || ''}
              onChange={(e) => updateResult(index, 'competition', e.target.value)}
              className="px-3 py-2 bg-white/5 border border-white/10 rounded text-white text-sm"
              placeholder="Compétition (ex: ESL Challenger)"
            />
            <input
              type="text"
              value={item.score || ''}
              onChange={(e) => updateResult(index, 'score', e.target.value)}
              className="px-3 py-2 bg-white/5 border border-white/10 rounded text-white text-sm"
              placeholder="Score (ex: 2-1)"
            />
            <select
              value={item.result || 'Win'}
              onChange={(e) => updateResult(index, 'result', e.target.value)}
              className="px-3 py-2 bg-white/5 border border-white/10 rounded text-white text-sm"
            >
              <option value="Win">Victoire</option>
              <option value="Loss">Défaite</option>
            </select>
          </div>
        </div>
      ))}
      <div className="flex gap-3">
        <button onClick={addResult} className="btn-secondary flex items-center gap-2">
          <Plus size={18} />
          Add match
        </button>
        <button onClick={() => onSave({ results })} className="btn-primary flex items-center gap-2">
          <Save size={18} />
          Save
        </button>
      </div>
    </div>
  )
}

// Sponsors Editor Component
function SponsorsEditor({ data, onSave }: any) {
  const [sponsors, setSponsors] = useState(data.sponsors)
  const [contact, setContact] = useState(data.contact)

  const addSponsor = () => {
    setSponsors([
      ...sponsors,
      {
        id: `sponsor-${Date.now()}`,
        name: '',
        logo: '/images/sponsor-placeholder.jpg',
        website: '',
        tier: 'standard',
      },
    ])
  }

  const updateSponsor = (index: number, field: string, value: string) => {
    const newSponsors = [...sponsors]
    newSponsors[index][field] = value
    setSponsors(newSponsors)
  }

  const deleteSponsor = (index: number) => {
    setSponsors(sponsors.filter((_: any, i: number) => i !== index))
  }

  const updateContact = (field: string, value: string) => {
    setContact({ ...contact, [field]: value })
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-display font-bold text-white mb-4">Sponsors</h3>
        <div className="space-y-4">
          {sponsors.map((sponsor: any, index: number) => (
            <div key={sponsor.id} className="p-4 bg-white/5 rounded-lg border border-white/10 space-y-3">
              <div className="flex justify-between items-start gap-4">
                <input
                  type="text"
                  value={sponsor.name}
                  onChange={(e) => updateSponsor(index, 'name', e.target.value)}
                  className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded text-white font-semibold"
                  placeholder="Nom du sponsor"
                />
                <button
                  onClick={() => deleteSponsor(index)}
                  className="p-2 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              <input
                type="text"
                value={sponsor.logo || ''}
                onChange={(e) => updateSponsor(index, 'logo', e.target.value)}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-white text-xs"
                placeholder="URL du logo (ex: /images/sponsors/logo.png ou https://i.imgur.com/abc.jpg)"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  value={sponsor.website}
                  onChange={(e) => updateSponsor(index, 'website', e.target.value)}
                  className="px-3 py-2 bg-white/5 border border-white/10 rounded text-white text-sm"
                  placeholder="Site web"
                />
                <select
                  value={sponsor.tier}
                  onChange={(e) => updateSponsor(index, 'tier', e.target.value)}
                  className="px-3 py-2 bg-white/5 border border-white/10 rounded text-white text-sm"
                >
                  <option value="standard">Standard</option>
                  <option value="premium">Premium</option>
                </select>
              </div>
            </div>
          ))}
        </div>
        <button onClick={addSponsor} className="mt-4 btn-secondary flex items-center gap-2">
          <Plus size={18} />
          Add sponsor
        </button>
      </div>

      <div className="pt-6 border-t border-white/10">
        <h3 className="text-xl font-display font-bold text-white mb-4">Informations de Contact</h3>
        <div className="space-y-3">
          <input
            type="email"
            value={contact.email}
            onChange={(e) => updateContact('email', e.target.value)}
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-white"
            placeholder="Email de contact"
          />
          <input
            type="text"
            value={contact.discord}
            onChange={(e) => updateContact('discord', e.target.value)}
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-white"
            placeholder="Lien Discord"
          />
          <textarea
            value={contact.description}
            onChange={(e) => updateContact('description', e.target.value)}
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-white"
            rows={2}
            placeholder="Description"
          />
        </div>
      </div>

      <button onClick={() => onSave({ sponsors, contact })} className="btn-primary flex items-center gap-2">
        <Save size={18} />
        Save partners
      </button>
    </div>
  )
}
