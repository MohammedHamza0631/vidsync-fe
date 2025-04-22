'use client';
import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import io from 'socket.io-client';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Copy, LogOut, Users } from 'lucide-react';

const SOCKET_URL = 'http://localhost:4000';

export default function RoomPage() {
  const { roomId }           = useParams();
  const searchParams         = useSearchParams();
  const yourName             = searchParams.get('name') || 'Anonymous';
  const [videoId, setVideoId] = useState(null);
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(true);
  const [users, setUsers]     = useState([]);
  const router                = useRouter();
  const playerRef            = useRef(null);
  const playerInstanceRef    = useRef(null); // Store actual YT player instance
  const socketRef            = useRef(null);
  const isSyncing            = useRef(false); // Flag for sync operations

  // 1️⃣ Fetch the room's videoId (with retry)
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

    socket.emit('join-room', { roomId, name: yourName });
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

    // On initial join, get all users in the room
    socket.on('room-users', (userList) => {
      setUsers(userList); // userList is [{id, name}, ...]
    });

    socket.on('error', (msg) => setError(msg));

    return () => {
      socket.disconnect();
    };
  }, [videoId, yourName, roomId]);  // Include yourName as a dependency

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
    <div className="dark:bg-purple-950/10 bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] bg-opacity-90 text-white min-h-screen flex flex-col">      
      <main id="main-content" role="main" className="flex-1 container mx-auto px-4 py-10 flex flex-col items-center justify-center" tabIndex="-1">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-5xl"
        >
          <div className="bg-zinc-900/50 border border-purple-900/30 rounded-xl overflow-hidden shadow-xl">
            {/* Room header */}
            <header className="p-4 md:p-6 border-b border-purple-900/40 flex flex-col md:flex-row justify-between items-start md:items-center gap-4" aria-label="Room Info">
              <div className="flex items-center gap-3">
                <div className="bg-purple-600/20 rounded-full p-2">
                  <Users className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <h1 className="text-lg font-medium text-white">Room ID</h1>
                  <div className="flex items-center">
                    <code className="font-mono text-sm px-2 py-1 rounded bg-zinc-800/70 text-zinc-300 select-all">
                      {roomId}
                    </code>
                    <div className="relative ml-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        aria-label="Copy Room ID"
                        className="text-zinc-400 hover:text-white hover:bg-purple-800/30 relative group"
                        onClick={() => {
                          navigator.clipboard.writeText(roomId);
                          const tooltip = document.getElementById('copy-tooltip');
                          if (tooltip) {
                            tooltip.innerText = 'Copied to clipboard';
                            setTimeout(() => {
                              tooltip.innerText = 'Copy';
                            }, 2000);
                          }
                        }}
                      >
                        <Copy className="h-4 w-4" />
                        <div 
                          id="copy-tooltip"
                          className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-zinc-800/90 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap"
                        >
                          Copy
                        </div>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm bg-zinc-800/30 border border-purple-800/20 px-3 py-2 rounded-full" aria-label="Connected users">
                <Users className="h-4 w-4 text-purple-400" />
                <span className="font-medium text-zinc-300">Connected:</span>
                <span className="font-mono text-zinc-300" aria-live="polite">{users.length}</span>
              </div>
            </header>

            {/* Video content */}
            <section className="aspect-video w-full bg-black relative" aria-label="YouTube Video Player">
              <div id="yt-player" className="w-full h-full" />
            </section>
            
            {/* User list and controls */}
            <div className="p-4 md:p-6 border-t border-purple-900/40">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="text-sm text-zinc-300 space-y-2">
                  <p className="mb-2">Users in this room:</p>
                  <ul className="ml-5 list-disc space-y-1">
                    {users.map((user) => (
                      <li key={user.id} className="text-zinc-300">
                        {user.name} {user.name === yourName ? "(you)" : ""}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button 
                  variant="destructive" 
                  onClick={() => router.push("/")} 
                  aria-label="Leave Room"
                  className="bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white py-3 h-auto font-medium rounded-lg flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Leave Room
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
