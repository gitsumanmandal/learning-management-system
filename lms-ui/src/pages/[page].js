import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const Custom404 = ({ props }) => {
  const router = useRouter()
  useEffect(() => {
    router.push('/')
  }, [])
  return (
    <div>
      <h5>Redirecting to dashboard page...</h5>
    </div>
  )
}

export default Custom404