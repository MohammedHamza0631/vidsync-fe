'use client';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';


import { extractYouTubeId } from '@/utils/validateYouTube';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CreateRoomPage() {
  const [input, setInput]     = useState('');
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);
  const router                = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    const videoId = extractYouTubeId(input.trim());
    if (!videoId) {
      setError('Please enter a valid YouTube URL or video ID.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('http://localhost:4000/api/create-room', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create room.');

      // Immediately navigate once the room is confirmed created
      router.push(`/room/${data.roomId}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-zinc-950 text-white min-h-screen">
      <main className="container mx-auto px-4 py-16 min-h-[85vh] flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-lg"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Create a Watch Room</h1>
            <p className="mt-3 text-zinc-400">
              Share a YouTube video with friends and watch together in perfect sync.
            </p>
          </div>
          
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6" aria-label="Create Room Form">
              <div className="space-y-2">
                <label htmlFor="youtube-input" className="text-sm font-medium text-zinc-300">YouTube URL or Video ID</label>
                <Input
                  id="youtube-input"
                  placeholder="https://youtube.com/watch?v=..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={loading}
                  required
                  autoFocus
                  aria-required="true"
                  aria-label="YouTube URL or Video ID"
                  className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <p className="text-xs text-zinc-500">
                  E.g., https://youtube.com/watch?v=dQw4w9WgXcQ or dQw4w9WgXcQ
                </p>
                {error && <p className="text-red-500 text-sm font-medium mt-2" role="alert">{error}</p>}
              </div>
              
              <Button 
                type="submit" 
                disabled={loading} 
                className="bg-indigo-600 hover:bg-indigo-700 text-white py-6 h-auto font-medium rounded-lg w-full flex items-center justify-center gap-2" 
                aria-label="Create Room"
              >
                {loading ? 'Creating...' : 'Create Room'}
                {!loading && <ArrowRight className="h-5 w-5" />}
              </Button>
              
              <div className="flex items-center justify-center mt-4">
                <span className="text-zinc-500 text-sm mr-2">Or</span>
                <Link href="/join-room" className="text-indigo-400 hover:text-indigo-300 text-sm font-medium">
                  Join an existing room
                </Link>
              </div>
            </form>
          </div>
          
          <div className="mt-8 text-center text-zinc-500 text-sm">
            <p>No account needed. Rooms disappear after everyone leaves.</p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
