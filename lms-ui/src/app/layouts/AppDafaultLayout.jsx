'use client'
import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import Navbar from '@/app/components/Navbar'
import { Outlet } from 'react-router-dom'

const AppDafaultLayout = () => {
    return (
        <>
            <Navbar />
            <CssBaseline />
            <Container maxWidth="xl" sx={{ minHeight: '100vh', }}>
                <Outlet />
            </Container>
        </>
    )
}

export default AppDafaultLayout