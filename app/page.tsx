"use client"
import { signIn, useSession } from "next-auth/react"

export default function Home() {
  const { data: session } = useSession()

  if (session) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
        <h1 className="text-3xl font-bold mb-2">welcome, {session.user?.name}</h1>
        <p className="text-gray-400 mb-8">lets decode your music personality</p>
        <a href="/dashboard" className="bg-green-500 hover:bg-green-400 text-black font-semibold px-8 py-3 rounded-full transition">
          analyze my music
        </a>
      </main>
    )
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-4xl font-bold mb-2">spotify personality</h1>
      <p className="text-gray-400 mb-8">discover what your music says about you</p>
      <button
        onClick={() => signIn("spotify")}
        className="bg-green-500 hover:bg-green-400 text-black font-semibold px-8 py-3 rounded-full transition"
      >
        connect with spotify
      </button>
    </main>
  )
}
