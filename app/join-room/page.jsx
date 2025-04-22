"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function JoinRoomPage() {
  const [roomId, setRoomId] = useState("");
  const [name,   setName  ] = useState('');
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }

    const id = roomId.trim();
    if (!id || id.length < 4 || id.length > 12) {
      setError("Please enter a valid Room ID.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:4000/api/room/${id}`);
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Room not found.");
      }
      router.push(`/room/${id}`);
      router.push(`/room/${id}?name=${encodeURIComponent(name)}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="dark:bg-purple-950/10 bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] bg-opacity-90 text-white min-h-screen">
      <main className="container mx-auto px-4 py-16 min-h-[100vh] flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-lg"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Join a Watch Room</h1>
            <p className="mt-3 text-zinc-300">
              Enter a room ID to join your friends and watch together.
            </p>
          </div>
          
          <div className="bg-zinc-900/50 border border-purple-900/30 rounded-xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6" aria-label="Join Room Form">
              <div className="space-y-2">
              <label htmlFor="user-name" className="text-sm font-medium text-zinc-300">Username</label>
                <Input
                  id="user-name"
                  placeholder="Enter a cool username!"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                  required
                  autoFocus
                  aria-required="true"
                  aria-label="Username"
                  className="bg-zinc-800/70 border-purple-800/30 text-white placeholder:text-zinc-500 focus:ring-purple-500 focus:border-purple-500"
                />
                <label htmlFor="roomid-input" className="text-sm font-medium text-zinc-300">Room ID</label>
                <Input
                  id="roomid-input"
                  placeholder="Enter Room ID"
                  value={roomId}
                  onChange={e => setRoomId(e.target.value)}
                  disabled={loading}
                  required
                  autoFocus
                  aria-required="true"
                  aria-label="Room ID"
                  className="bg-zinc-800/70 border-purple-800/30 text-white placeholder:text-zinc-500 focus:ring-purple-500 focus:border-purple-500"
                />
                <p className="text-xs text-zinc-500">
                  The ID is a short code shared by the room creator
                </p>
                {error && <p className="text-red-500 text-sm font-medium mt-2" role="alert">{error}</p>}
              </div>
              
              <Button 
                type="submit" 
                disabled={loading} 
                className="bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white py-6 h-auto font-medium rounded-lg w-full flex items-center justify-center gap-2" 
                aria-label="Join Room"
              >
                {loading ? "Joining..." : "Join Room"}
                {!loading && <ArrowRight className="h-5 w-5" />}
              </Button>
              
              <div className="flex items-center justify-center mt-4">
                <span className="text-zinc-500 text-sm mr-2">Or</span>
                <Link href="/create-room" className="text-purple-400 hover:text-purple-300 text-sm font-medium">
                  Create a new room
                </Link>
              </div>
            </form>
          </div>
          
          <div className="mt-8 text-center text-zinc-400 text-sm">
            <p>No account needed. Watch videos with friends instantly.</p>
          </div>
        </motion.div>
      </main>

    </div>
  );
}
