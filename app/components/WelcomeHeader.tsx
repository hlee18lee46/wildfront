"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function WelcomeHeader() {
  const [userEmail, setUserEmail] = useState("Guest");

  useEffect(() => {
    const email = localStorage.getItem("user_email");
    if (email) setUserEmail(email);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, type: "spring" }}
      className="flex items-center justify-between bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-500 text-white px-6 py-5 rounded-xl shadow-md mb-6"
    >
      {/* Left Logo + Title */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="flex items-center gap-4"
      >

        <div>
          <p className="text-xl font-bold">Welcome Hub</p>
          <p className="text-sm opacity-80">Productivity Meets Syncing</p>
        </div>
      </motion.div>

      {/* Right User Email */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="text-right"
      >
        <p className="text-md">👋 Hello,</p>
        <p className="text-lg font-semibold text-yellow-300 transition-all duration-300 hover:brightness-125">
          {userEmail}
        </p>
      </motion.div>
    </motion.div>
  );
}
