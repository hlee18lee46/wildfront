// app/components/Sidebar.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Sidebar() {
  const pathname = usePathname();

  const linkStyle = (href: string) =>
    `block px-4 py-3 rounded-md text-lg font-medium transition ${
      pathname === href
        ? "bg-purple-600 text-white"
        : "text-purple-700 hover:bg-purple-100"
    }`;

  return (
    <aside className="w-full sm:w-64 bg-purple-50 min-h-screen border-r px-4 py-8">
      <nav className="space-y-4">
              <div className="flex items-center space-x-3">
                <Image src="/logo.png" alt="Logo" width={200} height={200} />
              </div>
        <Link href="/sync" className={linkStyle("/sync")}>🔄 Sync</Link>
        <Link href="/events" className={linkStyle("/calendar")}>📅 Events</Link>
        <Link href="/upload" className={linkStyle("/upload")}>📤 Upload</Link>
        <Link href="/ai" className={linkStyle("/ai")}>🤖 AI</Link> 
        <Link href="/alert" className={linkStyle("/alert")}>🚨 Alert</Link>     
</nav>
    </aside>
  );
}
