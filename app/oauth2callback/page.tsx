'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

export default function OAuth2CallbackPage() {
  const [message, setMessage] = useState('Processing...')
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const code = searchParams.get('code')
    if (code) {
      fetch(`http://localhost:8000/oauth2callback?code=${code}`)
        .then(res => res.json())
        .then(data => {
          console.log('✅ Token:', data.access_token)
          localStorage.setItem('google_access_token', data.access_token)
          setMessage('Login successful! Redirecting to calendar...')
          setTimeout(() => router.push('/calendar'), 1500)
        })
        .catch(() => setMessage('❌ Authentication failed.'))
    }
  }, [searchParams, router])

  return <p style={{ padding: '2rem' }}>{message}</p>
}
