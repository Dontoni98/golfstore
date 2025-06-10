'use client'
import React from 'react'
import DebugTest from './components/DebugTest';
import LogoutButton from '../sign-in/components/LogoutButton';

const page = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Innlogget</h1>
      <LogoutButton/>
    </div>
  )
}

export default page