"use client"
import { useSession, signOut } from "next-auth/react"
import { useEffect, useState } from "react"

export default function Dashboard() {
  const { data: session } = useSession()
  const [topTracks, setTopTracks] = useState([])
  const [topArtists, setTopArtists] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (session?.accessToken) {
      Promise.all([
        fetch("https://api.spotify.com/v1/me/top/tracks?limit=10&time_range=medium_term", {
          headers: { Authorization: `Bearer ${session.accessToken}` }
        }).then(r => r.json()),
        fetch("https://api.spotify.com/v1/me/top/artists?limit=5&time_range=medium_term", {
          headers: { Authorization: `Bearer ${session.accessToken}` }
        }).then(r => r.json())
      ]).then(([tracks, artists]) => {
        setTopTracks(tracks.items || [])
        setTopArtists(artists.items || [])
        setLoading(false)
      })
    }
  }, [session])

  if (loading) return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <p className="text-gray-400">loading your music...</p>
    </main>
  )

  return (
    <main className="min-h-screen bg-black text-white p-8 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">your music, decoded</h1>
        <button onClick={() => signOut()} className="text-gray-400 text-sm hover:text-white">sign out</button>
      </div>

      <section className="mb-8">
        <h2 className="text-gray-400 text-sm uppercase tracking-widest mb-4">top artists</h2>
        {topArtists.map((artist: any, i: number) => (
          <div key={artist.id} className="flex items-center gap-4 mb-3">
            <span className="text-gray-600 w-4">{i + 1}</span>
            <img src={artist.images?.[2]?.url} className="w-10 h-10 rounded-full" />
            <span className="font-medium">{artist.name}</span>
          </div>
        ))}
      </section>

      <section className="mb-8">
        <h2 className="text-gray-400 text-sm uppercase tracking-widest mb-4">top tracks</h2>
        {topTracks.map((track: any, i: number) => (
          <div key={track.id} className="flex items-center gap-4 mb-3">
            <span className="text-gray-600 w-4">{i + 1}</span>
            <img src={track.album?.images?.[2]?.url} className="w-10 h-10 rounded" />
            <div>
              <p className="font-medium">{track.name}</p>
              <p className="text-gray-400 text-sm">{track.artists?.[0]?.name}</p>
            </div>
          </div>
        ))}
      </section>

      <a href="/personality" className="block w-full bg-green-500 hover:bg-green-400 text-black font-semibold py-3 rounded-full text-center transition">
        generate my personality analysis
      </a>
    </main>
  )
}