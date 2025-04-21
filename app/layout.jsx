import { Geist, Geist_Mono } from "next/font/google";
import { TubelightNavbar } from "@/components/ui/tubelight-navbar";
import { Footer } from '@/components/ui/footer';
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://vidsync.app"), // <-- 👈 your production URL,
  title: "VidSync",
  description: "Watch YouTube videos in perfect sync with friends. No accounts needed, real-time synchronization, and easy sharing.",
  keywords: "YouTube watch party, video sync, watch together, synchronized video, real-time video sharing",
  openGraph: {
    title: "VidSync - Watch YouTube Videos Together in Perfect Sync",
    description: "Create a room, share the link, and watch YouTube videos with friends in real-time synchronization. No accounts required.",
    url: "https://vidsync.app",
    siteName: "VidSync",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "VidSync - Watch YouTube Videos Together",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VidSync - Watch YouTube Videos Together in Perfect Sync",
    description: "Create a room, share the link, and watch YouTube videos with friends in real-time synchronization. No accounts required.",
    images: ["/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-950 text-white min-h-screen overflow-x-hidden`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
        <TubelightNavbar />
        {children}
        <Footer/>
        </ThemeProvider>
      </body>
    </html>
  );
}
