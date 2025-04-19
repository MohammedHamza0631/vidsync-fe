// "use client";
// import { useEffect, useRef, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import io from "socket.io-client";
// import { Button } from "@/components/ui/button";

// const SOCKET_URL = "http://localhost:4000";

// export default function RoomPage() {
//   const { roomId } = useParams();
//   const [videoId, setVideoId] = useState(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [users, setUsers] = useState([]);
//   const [playerReady, setPlayerReady] = useState(false);
//   const playerRef = useRef(null);
//   const socketRef = useRef(null);
//   const router = useRouter();

//   // Fetch videoId for this room with retry logic
//   useEffect(() => {
//     let cancelled = false;
//     let attempts = 0;
//     const maxAttempts = 5;
//     const delay = 150; // ms
//     async function fetchRoom() {
//       attempts++;
//       try {
//         const res = await fetch(`${SOCKET_URL}/api/room/${roomId}`);
//         const data = await res.json();
//         if (data.error) throw new Error(data.error);
//         if (!cancelled) {
//           setVideoId(data.videoId);
//           setLoading(false);
//         }
//       } catch (err) {
//         if (attempts < maxAttempts) {
//           setTimeout(fetchRoom, delay);
//         } else if (!cancelled) {
//           setError(err.message);
//           setLoading(false);
//         }
//       }
//     }
//     fetchRoom();
//     return () => {
//       cancelled = true;
//     };
//   }, [roomId]);

//   // Load YouTube IFrame API
//   useEffect(() => {
//     if (!videoId) return;
//     if (window.YT && window.YT.Player) {
//       createPlayer();
//     } else {
//       const tag = document.createElement("script");
//       tag.src = "https://www.youtube.com/iframe_api";
//       window.onYouTubeIframeAPIReady = createPlayer;
//       document.body.appendChild(tag);
//     }
//     // eslint-disable-next-line
//   }, [videoId]);

//   // Create player
//   function createPlayer() {
//     if (playerRef.current) return;
//     playerRef.current = new window.YT.Player("yt-player", {
//       videoId,
//       events: {
//         onReady: () => setPlayerReady(true),
//         onStateChange: onPlayerStateChange,
//       },
//     });
//   }

//   // Socket.io setup
//   useEffect(() => {
//     if (!videoId) return;
//     const socket = io(SOCKET_URL);
//     socketRef.current = socket;
//     socket.emit("join-room", { roomId });

//     socket.on("video-state", (state) => {
//       // Sync player state
//       if (playerRef.current && playerReady) {
//         if (state.playing) {
//           playerRef.current.seekTo(state.currentTime, true);
//           playerRef.current.playVideo();
//         } else {
//           playerRef.current.pauseVideo();
//           playerRef.current.seekTo(state.currentTime, true);
//         }
//       }
//     });
//     socket.on("user-joined", ({ userId }) => {
//       setUsers((prev) => [...prev, userId]);
//     });
//     socket.on("user-left", ({ userId }) => {
//       setUsers((prev) => prev.filter((id) => id !== userId));
//     });
//     socket.on("error", (msg) => setError(msg));
//     return () => {
//       socket.disconnect();
//     };
//     // eslint-disable-next-line
//   }, [videoId, playerReady]);

//   // Handle player state changes
//   function onPlayerStateChange(event) {
//     if (!socketRef.current || !playerRef.current) return;
//     const player = playerRef.current;
//     const state = player.getPlayerState();
//     const currentTime = player.getCurrentTime();
//     if (state === window.YT.PlayerState.PLAYING) {
//       socketRef.current.emit("video-state-change", { playing: true, currentTime });
//     } else if (state === window.YT.PlayerState.PAUSED) {
//       socketRef.current.emit("video-state-change", { playing: false, currentTime });
//     }
//     // Seeking handled by pause/play events
//   }

//   if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
//   if (error) return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>;
//   if (!videoId) return <div className="flex items-center justify-center h-screen">Room not found.</div>;

//   return (
//     <main className="min-h-screen flex flex-col items-center justify-center bg-background px-4 py-8">
//       <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-4 flex flex-col gap-4">
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
//           <div>
//             <span className="text-sm text-muted-foreground">Room ID:</span>
//             <span className="font-mono ml-2 px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 select-all">{roomId}</span>
//           </div>
//           {/* Optional: Copy link button */}
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => {
//               navigator.clipboard.writeText(window.location.href);
//             }}
//           >
//             Copy Room Link
//           </Button>
//         </div>
//         <div className="aspect-video w-full rounded overflow-hidden bg-black">
//           <div id="yt-player" className="w-full h-full" />
//         </div>
//         {/* Optional: List of users */}
//         {/* <div className="text-sm text-muted-foreground">Connected users: {users.length}</div> */}
//         {/* Optional: Leave Room */}
//         {/* <Button variant="destructive" onClick={() => router.push("/")}>Leave Room</Button> */}
//       </div>
//     </main>
//   );
// }

'use client';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import io from 'socket.io-client';
import { Button } from '@/components/ui/button';

const SOCKET_URL = 'http://localhost:4000';

export default function RoomPage() {
  const { roomId }           = useParams();
  const [videoId, setVideoId] = useState(null);
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(true);
  const [users, setUsers]     = useState([]);
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
      setUsers((u) => [...u, userId]);
    });

    socket.on('user-left', ({ userId }) => {
      setUsers((u) => u.filter((id) => id !== userId));
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
    <main className="min-h-screen flex flex-col items-center justify-center bg-background px-4 py-8">
      <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-4 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm text-muted-foreground">Room ID:</span>
            <span className="font-mono ml-2 px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 select-all">
              {roomId}
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigator.clipboard.writeText(window.location.href)}
          >
            Copy Room Link
          </Button>
        </div>
        <div className="aspect-video w-full rounded overflow-hidden bg-black">
          <div id="yt-player" className="w-full h-full" />
        </div>
        {/* Optionally show users */}
        {/* <div className="text-sm text-muted-foreground">Users: {users.length}</div> */}
      </div>
    </main>
  );
}
