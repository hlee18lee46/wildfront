// app/oauth2callback/page.tsx

"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

export default function OAuthCallbackPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OAuthCallback />
    </Suspense>
  );
}

function OAuthCallback() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    if (code) {
      // Call your FastAPI backend with the code
      fetch(`http://localhost:8000/oauth2callback?code=${code}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("OAuth callback result:", data);
          // You could store the access_token or redirect here
        })
        .catch((err) => console.error("OAuth callback failed", err));
    }
  }, [code]);

  return (
    <div className="p-10 text-center">
      <h1 className="text-2xl font-semibold">Authenticating...</h1>
    </div>
  );
}
