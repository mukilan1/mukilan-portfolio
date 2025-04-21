'use client'

import { useEffect, useState } from 'react'

const ClientHydrationFix = ({ children }) => {
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])
  
  if (!isClient) {
    return <div style={{ visibility: "hidden" }}>{children}</div>
  }
  
  return <>{children}</>
}

export default ClientHydrationFix
