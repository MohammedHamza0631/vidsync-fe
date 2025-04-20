'use client';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { extractYouTubeId } from '@/utils/validateYouTube';

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
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>Create a Room</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Input
                placeholder="YouTube URL or Video ID"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
                required
                autoFocus
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? 'Creating...' : 'Create Room'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  );
}
