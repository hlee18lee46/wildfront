"use client";
import { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

export default function Home() {
  const handleGoogleLogin = async () => {
    const res = await fetch("http://localhost:8000/auth-url");
    const data = await res.json();
    window.location.href = data.auth_url;
  };

  return (
    
    <div className="min-h-screen flex flex-col sm:flex-row bg-gradient-to-tr from-blue-100 via-white to-blue-200 px-6 sm:px-20">

      {/* LEFT SECTION */}
      <div className="flex flex-col justify-center sm:w-1/2 py-16 pl-12 sm:pl-30 space-y-6">

      <motion.h1
  className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500 text-transparent bg-clip-text transition duration-300 hover:scale-105 hover:brightness-110 cursor-pointer font-serif"
  initial={{ opacity: 0, x: -20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8 }}
>
  Sync-a-Life
</motion.h1>


        {/* Each line with independent animation */}
        <motion.div
          className="text-2xl sm:text-3xl text-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Typewriter
            words={["Life as a student?", "Canvas API -> Student Life"]}
            loop={1}
            cursor
            typeSpeed={60}
            deleteSpeed={40}
            delaySpeed={1500}
          />
        </motion.div>

        <motion.div
          className="text-2xl sm:text-3xl text-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <Typewriter
            words={["Life as an employee?", "Outlook API -> Employee Life"]}
            loop={1}
            cursor
            typeSpeed={60}
            deleteSpeed={40}
            delaySpeed={1500}
          />
        </motion.div>

        <motion.div
          className="text-2xl sm:text-3xl text-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.9 }}
        >
          <Typewriter
            words={["Life as an individual?", "Google API -> Individual Life"]}
            loop={1}
            cursor
            typeSpeed={60}
            deleteSpeed={40}
            delaySpeed={1500}
          />
        </motion.div>

        <motion.div
          className="text-2xl sm:text-3xl text-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.6 }}
        >
          <Typewriter
            words={["Life as a significant other?", "Gemini Vision -> Personal Life"]}
            loop={1}
            cursor
            typeSpeed={60}
            deleteSpeed={40}
            delaySpeed={1500}
          />
        </motion.div>

{/* Animated 4 Labeled and Interactive Icons */}
<motion.div
  className="flex flex-wrap gap-10 mt-14"
  initial="hidden"
  animate="visible"
  variants={{
    hidden: {},
    visible: {
      transition: {
        delayChildren: 6,
        staggerChildren: 0.4,
      },
    },
  }}
>
  {[
    { src: "/student.png", label: "Canvas" },
    { src: "/employee.png", label: "Outlook" },
    { src: "/individual.png", label: "Google" },
    { src: "/alyssa.jpg", label: "Hand-Note" },
  ].map(({ src, label }, index) => (
    <motion.div
      key={index}
      className="flex flex-col items-center gap-3"
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      <motion.div
        whileHover={{ scale: 2 }}
        className="w-40 h-40 bg-white rounded-2xl shadow-2xl p-4 cursor-pointer transition-transform duration-300 ease-in-out"
      >
        <Image
          src={src}
          alt={label}
          width={512} // Use higher resolution
          height={512}
          className="object-contain w-full h-full"
          priority // ensures sharpness on first load
        />
      </motion.div>
      <span className="text-lg font-semibold text-gray-700">{label}</span>
    </motion.div>
  ))}
</motion.div>




      </div>

      {/* RIGHT SECTION */}
      <div className="flex flex-col items-center justify-center sm:w-1/2 py-6">
        <motion.div
          className="flex flex-col items-center gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
<Image
  src="/logo.png"
  alt="App Logo"
  width={300}
  height={120} // rectangle shape
  className="rounded-xl shadow-xl dark:invert object-cover"
/>

          <button
            onClick={handleGoogleLogin}
            className="mt-6 inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-full text-lg font-semibold shadow hover:bg-blue-700 transition"
          >
            <Image src="/google-icon.png" width={24} height={24} alt="Google" />
            Login with Google
          </button>
{/* Fancy typewriter message below login */}
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 8, duration: 1 }} // ⏱️ Delay until after all images show
  className="mt-6 text-center"
>
  <span className="text-red-600 italic text-lg sm:text-xl font-[cursive]">
    <Typewriter
      words={["Sync your life into one. Never miss a beat."]}
      typeSpeed={50}
      cursor
    />
  </span>
</motion.div>

        </motion.div>
      </div>
    </div>
  );
}
