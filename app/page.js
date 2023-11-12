"use client"

import Image from 'next/image'
import { useAuth } from "@/context/auth";

export default function Home() {
  const {auth} = useAuth(); 
  return (
    <div className='container'>
      <h1>Home</h1>
      <pre>{JSON.stringify(auth, null, 4)}</pre>
    </div>
  )
}
