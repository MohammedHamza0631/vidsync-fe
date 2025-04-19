"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <motion.h1
        className="text-4xl font-bold mb-12 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Watch YouTube Together
      </motion.h1>
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-2xl justify-center">
        <motion.div
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1"
        >
          <Card className="shadow-lg cursor-pointer hover:ring-2 hover:ring-primary transition-all"
                onClick={() => router.push('/create-room')}>
            <CardHeader>
              <CardTitle>Create Room</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Start a new room and share a YouTube video link to watch in sync with friends.</p>
              <Button className="w-full" variant="default">Create Room</Button>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1"
        >
          <Card className="shadow-lg cursor-pointer hover:ring-2 hover:ring-primary transition-all"
                onClick={() => router.push('/join-room')}>
            <CardHeader>
              <CardTitle>Join Room</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Already have a room code? Join your friends and watch together in real-time.</p>
              <Button className="w-full" variant="secondary">Join Room</Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </main>
  );
}

