"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function JoinRoomPage() {
  const [roomId, setRoomId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
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
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-zinc-950 text-white min-h-screen">
      <Navbar />

      <main className="container mx-auto px-4 py-16 min-h-[85vh] flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-lg"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Join a Watch Room</h1>
            <p className="mt-3 text-zinc-400">
              Enter a room ID to join your friends and watch together.
            </p>
          </div>
          
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6" aria-label="Join Room Form">
              <div className="space-y-2">
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
                  className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <p className="text-xs text-zinc-500">
                  The ID is a short code shared by the room creator
                </p>
                {error && <p className="text-red-500 text-sm font-medium mt-2" role="alert">{error}</p>}
              </div>
              
              <Button 
                type="submit" 
                disabled={loading} 
                className="bg-indigo-600 hover:bg-indigo-700 text-white py-6 h-auto font-medium rounded-lg w-full flex items-center justify-center gap-2" 
                aria-label="Join Room"
              >
                {loading ? "Joining..." : "Join Room"}
                {!loading && <ArrowRight className="h-5 w-5" />}
              </Button>
              
              <div className="flex items-center justify-center mt-4">
                <span className="text-zinc-500 text-sm mr-2">Or</span>
                <Link href="/create-room" className="text-indigo-400 hover:text-indigo-300 text-sm font-medium">
                  Create a new room
                </Link>
              </div>
            </form>
          </div>
          
          <div className="mt-8 text-center text-zinc-500 text-sm">
            <p>No account needed. Watch videos with friends instantly.</p>
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
}
