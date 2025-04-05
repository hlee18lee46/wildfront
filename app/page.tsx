"use client";
import { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  const handleGoogleLogin = async () => {
    const res = await fetch("https://4621-8-28-178-132.ngrok-free.app/auth-url");
    const data = await res.json();
    window.location.href = data.auth_url;
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-100 via-white to-blue-200 flex flex-col items-center justify-center px-6 py-16 sm:px-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center text-center gap-6"
      >
        <Image
          src="/logo.png"
          alt="App Logo"
          width={200}
          height={200}
          className="rounded-full shadow-xl dark:invert"
        />

        <motion.h1
          className="text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-500 to-teal-400 text-transparent bg-clip-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Welcome to Sync-A-Life
        </motion.h1>

        <p className="text-lg sm:text-xl text-gray-700 max-w-2xl text-center mt-6 mb-12">
          Consolidate your academic and life events from Canvas and Google Calendar in one place.
        </p>

        <div className="flex justify-center w-full mt-10">
          <motion.div
            className="flex flex-col sm:flex-row gap-8 w-full sm:w-auto justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <button
              onClick={handleGoogleLogin}
              className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-blue-600 text-white rounded-full text-xl font-semibold shadow hover:bg-blue-700 transition w-full sm:w-auto"
            >
              <Image src="/google-icon.png" width={24} height={24} alt="Google" />
              Login with Google
            </button>
          </motion.div>
        </div>
      </motion.div>

      <motion.footer
        className="mt-24 text-sm text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Built for WildHacks 2025 🚀
      </motion.footer>
    </div>
  );
}
