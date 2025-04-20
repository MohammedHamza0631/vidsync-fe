'use client';
import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import io from 'socket.io-client';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Copy, LogOut, Users } from 'lucide-react';

const SOCKET_URL = 'http://localhost:4000';

export default function RoomPage() {
  const { roomId }           = useParams();
  const [videoId, setVideoId] = useState(null);
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(true);
  const [users, setUsers]     = useState([]);
  const router                = useRouter();
  const playerRef            = useRef(null);
  const playerInstanceRef    = useRef(null); // Store actual YT player instance
  const socketRef            = useRef(null);
  const isSyncing            = useRef(false); // Flag for sync operations

  // 1️⃣ Fetch the room’s videoId (with retry)
  useEffect(() => {
    let cancelled = false;
    let attempts = 0;
    const maxAttempts = 5;
    const delay = 150;

    async function fetchRoom() {
      attempts++;
      try {
        const res = await fetch(`${SOCKET_URL}/api/room/${roomId}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Room not found.');
        if (!cancelled) {
          setVideoId(data.videoId);
          setLoading(false);
        }
      } catch (err) {
        if (attempts < maxAttempts) {
          setTimeout(fetchRoom, delay);
        } else if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      }
    }

    fetchRoom();
    return () => { cancelled = true; };
  }, [roomId]);

  // 2️⃣ Load YouTube IFrame API and create the player
  useEffect(() => {
    if (!videoId) return;

    function createPlayer() {
      if (playerRef.current) return;
      playerRef.current = new window.YT.Player('yt-player', {
        videoId,
        playerVars: {
          autoplay: 0,
          controls: 1,
          modestbranding: 1,
          rel: 0,
        },
        events: {
          onReady: (event) => {
            // Store player instance for direct access to player methods
            playerInstanceRef.current = event.target;
            console.log('YouTube player ready');
          },
          onStateChange: onPlayerStateChange,
        },
      });
    }

    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      window.onYouTubeIframeAPIReady = createPlayer;
      document.body.appendChild(tag);
    }
  }, [videoId]);

  // 3️⃣ Socket.io: only run **once**, when videoId first becomes non‐null
  useEffect(() => {
    if (!videoId) return;

    const socket = io(SOCKET_URL);
    socketRef.current = socket;

    socket.emit('join-room', { roomId });
    // After joining, request the current user list
    socket.emit('get-users', { roomId });

    socket.on('video-state', (state) => {
      if (playerInstanceRef.current) {
        // Mark that we're making changes due to sync (not user action)
        isSyncing.current = true;
        console.log('Received state:', state);
        
        try {
          // Always seek first
          playerInstanceRef.current.seekTo(state.currentTime, true);
          
          // Then play or pause as needed
          if (state.playing) {
            playerInstanceRef.current.playVideo();
          } else {
            playerInstanceRef.current.pauseVideo();
          }
        } catch (err) {
          console.error('Error syncing video:', err);
        }
        
        // Release sync lock after a reasonable delay to avoid feedback
        setTimeout(() => {
          isSyncing.current = false;
        }, 500); // Longer timeout to ensure state is stable
      }
    });

    socket.on('user-joined', ({ userId }) => {
      setUsers((u) => {
        // Prevent duplicates
        if (u.includes(userId)) return u;
        return [...u, userId];
      });
    });

    socket.on('user-left', ({ userId }) => {
      setUsers((u) => u.filter((id) => id !== userId));
    });

    // On initial join, get all users in the room
    socket.on('room-users', (userIds) => {
      setUsers(userIds);
    });

    socket.on('error', (msg) => setError(msg));

    return () => {
      socket.disconnect();
    };
  }, [videoId]);  // <-- <-- only depends on videoId now

  // 4️⃣ Emit state changes (but only if user-initiated)
  function onPlayerStateChange(event) {
    if (!socketRef.current || !playerInstanceRef.current) return;
    
    // If we're currently syncing from a remote event, don't emit again (breaks the loop)
    if (isSyncing.current) {
      console.log('Ignoring state change during sync');
      return;
    }
    
    // Get current state and time from the event target
    const state = event.data; // YouTube player states are available as event.data
    const currentTime = playerInstanceRef.current.getCurrentTime();
    
    console.log('Local state change:', state);
    
    // Only emit state changes for play/pause events
    if (state === window.YT.PlayerState.PLAYING || state === window.YT.PlayerState.PAUSED) {
      console.log('Emitting state change');
      socketRef.current.emit('video-state-change', {
        playing: state === window.YT.PlayerState.PLAYING,
        currentTime,
      });
    }
  }

  // 5️⃣ Render states
  if (loading) return <div className="h-screen flex items-center justify-center">Loading…</div>;
  if (error)   return <div className="h-screen flex items-center justify-center text-red-500">{error}</div>;
  if (!videoId) return <div className="h-screen flex items-center justify-center">Room not found.</div>;

  return (
    <div className="bg-zinc-950 text-white min-h-screen flex flex-col">      
      <main id="main-content" role="main" className="flex-1 container mx-auto px-4 py-8 flex flex-col items-center justify-center" tabIndex="-1">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-5xl"
        >
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-xl">
            {/* Room header */}
            <header className="p-4 md:p-6 border-b border-zinc-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4" aria-label="Room Info">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-600/20 rounded-full p-2">
                  <Users className="h-5 w-5 text-indigo-400" />
                </div>
                <div>
                  <h1 className="text-lg font-medium text-white">Room ID</h1>
                  <div className="flex items-center">
                    <code className="font-mono text-sm px-2 py-1 rounded bg-zinc-800 text-zinc-300 select-all">
                      {roomId}
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      aria-label="Copy Room Link"
                      className="ml-2 text-zinc-400 hover:text-white hover:bg-zinc-800"
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        // Could add a toast notification here
                      }}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
　　 　 　 　 <div className="flex items-center gap-2 text-sm bg-zinc-800/50 px-3 py-2 rounded-full" aria-label="Connected users">
                <Users className="h-4 w-4 text-indigo-400" />
                <span className="font-medium text-zinc-300">Connected:</span>
                <span className="font-mono text-zinc-300" aria-live="polite">{users.length}</span>
                <span className="text-zinc-400 hidden md:inline-block">[
                  {users.map((id, i) => (
                    <span key={id}>{`User ${i + 1}${i !== users.length - 1 ? ', ' : ''}`}</span>
                  ))}
                ]</span>
              </div>
            </header>

            {/* Video content */}
            <section className="aspect-video w-full bg-black relative" aria-label="YouTube Video Player">
              <div id="yt-player" className="w-full h-full" />
            </section>
            
            {/* Room controls */}
            <div className="p-4 md:p-6 border-t border-zinc-800 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-sm text-zinc-400">
                <p>All changes are synchronized with everyone in real-time</p>
              </div>
              <Button 
                variant="destructive" 
                onClick={() => router.push("/")} 
                aria-label="Leave Room"
                className="bg-red-600 hover:bg-red-700 flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Leave Room
              </Button>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
