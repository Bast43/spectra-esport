'use client'

import { useEffect, useState } from 'react'
import { Trophy, Calendar, Award } from 'lucide-react'

interface Result {
  id: string;
  teamId: string;
  image: string;
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
        // Convertir la structure {r6x:[], cs2:[], aca:[]} en liste plate
        const allResults = [
          ...(resultsData.r6x || []).map((r: any) => ({ ...r, teamId: 'r6x' })),
          ...(resultsData.cs2 || []).map((r: any) => ({ ...r, teamId: 'cs2' })),
          ...(resultsData.aca || []).map((r: any) => ({ ...r, teamId: 'aca' }))
        ]
        setResults(allResults)
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredResults.map((result, index) => (
              <div
                key={result.id}
                className="glass-card fade-in flex items-center justify-center"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {result.image && (
                  <a href={result.image} target="_blank" rel="noopener noreferrer">
                    <img
                      src={result.image}
                      alt="Result image"
                      className="max-h-64 rounded-lg border border-white/10 shadow-lg mx-auto"
                      style={{ maxWidth: '100%', objectFit: 'contain' }}
                    />
                  </a>
                )}
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
