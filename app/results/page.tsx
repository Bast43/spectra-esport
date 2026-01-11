'use client'

import { useEffect, useState } from 'react'
import { Trophy, Calendar, Award } from 'lucide-react'

interface Result {
  id: string
  opponent: string
  game: string
  teamId: string
  teamName: string
  date: string
  score: string
  result: 'Win' | 'Loss'
  competition: string
}

interface Team {
  id: string
  name: string
  game: string
}

export default function ResultsPage() {
  const [results, setResults] = useState<Result[]>([])
  const [teams, setTeams] = useState<Team[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('')

  useEffect(() => {
    Promise.all([
      fetch('/api/data/results').then((res) => res.json()),
      fetch('/api/data/teams').then((res) => res.json()),
    ])
      .then(([resultsData, teamsData]) => {
        setResults(resultsData.results || [])
        setTeams(teamsData.teams || [])
        
        // Set first team as default filter
        if (teamsData.teams && teamsData.teams.length > 0) {
          setFilter(teamsData.teams[0].id)
        }
        
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error loading data:', error)
        setLoading(false)
      })
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  const filteredResults = results.filter((result) => result.teamId === filter)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-spectra-violet border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading results...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="w-12 h-12 text-spectra-violet" />
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-spectra-violet to-spectra-mauve">Results</span>
            </h1>
          </div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            All our matches and competitive performances
          </p>
        </div>

        {/* Team Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {teams.map((team) => (
            <button
              key={team.id}
              onClick={() => setFilter(team.id)}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                filter === team.id
                  ? 'bg-gradient-to-r from-spectra-violet to-spectra-purple text-white shadow-lg shadow-spectra-violet/30'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {team.name}
            </button>
          ))}
        </div>

        {/* Results */}
        {filteredResults.length > 0 ? (
          <div className="space-y-6">
            {filteredResults.map((result, index) => (
              <div
                key={result.id}
                className="glass-card fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Left side - Match info */}
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      {/* Result badge */}
                      <div className={`flex-shrink-0 w-20 h-20 rounded-full flex items-center justify-center shadow-lg ${
                        result.result === 'Win'
                          ? 'bg-gradient-to-br from-green-500 to-emerald-600 shadow-green-500/30'
                          : 'bg-gradient-to-br from-red-500 to-rose-600 shadow-red-500/30'
                      }`}>
                        <span className="text-2xl font-display font-bold text-white">
                          {result.result === 'Win' ? 'W' : 'L'}
                        </span>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <h3 className="text-xl font-display font-bold text-white">
                            vs {result.opponent}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                            result.result === 'Win'
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-red-500/20 text-red-400'
                          }`}>
                            {result.score}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                          <div className="flex items-center gap-2">
                            <Award className="w-4 h-4 text-spectra-mauve" />
                            <span>{result.competition}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Trophy className="w-4 h-4 text-spectra-mauve" />
                            <span>{result.teamName}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-spectra-mauve" />
                            <span>{formatDate(result.date)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right side - Game badge */}
                  <div className="px-4 py-2 bg-spectra-violet/10 border border-spectra-violet/30 rounded-lg">
                    <span className="text-sm font-display font-bold text-spectra-mauve whitespace-nowrap">
                      {result.game}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Trophy className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">
              No results for this team yet.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
