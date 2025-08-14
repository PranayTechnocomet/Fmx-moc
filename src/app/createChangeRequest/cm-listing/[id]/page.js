"use client"
import React from 'react'
import { useParams } from 'next/navigation'
import GatePassProfile from '@/components/gatePass/GatePassProfile'

function page() {
    const { id } = useParams()
    console.log(id)
  return (
    <div>
        <GatePassProfile />
    </div>
  )
}

export default page