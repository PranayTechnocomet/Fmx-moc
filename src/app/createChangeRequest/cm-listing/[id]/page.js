"use client"
import React from 'react'
import { useParams } from 'next/navigation'
import MocPassProfile from '@/components/moc/MocPassProfile'

function page() {

  return (
    <div>
        <MocPassProfile />
    </div>
  )
}

export default page