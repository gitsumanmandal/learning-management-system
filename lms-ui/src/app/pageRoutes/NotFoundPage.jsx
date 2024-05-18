import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const NotFoundPage = () => {
    const navigate = useNavigate()
    useEffect(() => {
        navigate('/')
    }, [])
    return (
        <div>
            <h5>Redirecting to dashboard page...</h5>
        </div>
    )
}

export default NotFoundPage