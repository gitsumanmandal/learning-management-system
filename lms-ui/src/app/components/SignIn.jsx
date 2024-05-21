'use client'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Snackbar } from '@mui/material'
import { useRouter } from 'next/navigation'
import CircularProgress from '@mui/material/CircularProgress';

const SignIn = () => {
    const [isLoaded, setIsLoaded] = useState(false)
    const router = useRouter()
    const [dialog, setDialog] = useState({
        isOpen: false,
        message: ''
    })
    const [user, setUser] = useState({
        'userName': '',
        'password': ''
    })
    const submit = async () => {
        try {
            const result = await axios.post(
                'http://localhost:3000/auth/login',
                user
            )
            localStorage.setItem('access_token', result.data.data.access_token)
            router.push('/')
        } catch (err) {
            setDialog({ isOpen: true, message: err.response.data.message })
        }
    }
    useEffect(() => {
        const access_token = localStorage.getItem('access_token')
        if (access_token) router.push('/')
        else setIsLoaded(true)
    }, [router])

    return (
        <>
            {isLoaded ?
                <Box sx={{ '& > :not(style)': { m: 2, width: '40ch' } }}>
                    <Box>
                        <TextField fullWidth id='userName' label='User Name' variant='outlined' type='text'
                            value={user.userName}
                            onChange={(e) => setUser({ ...user, userName: e.currentTarget.value })} />
                    </Box>
                    <Box>
                        <TextField fullWidth id='password' label='Pasword' variant='outlined' type='password'
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.currentTarget.value })} />
                    </Box>
                    <Box>
                        <Button fullWidth variant="contained" onClick={submit}>Sign In</Button>
                    </Box>
                    <Box>
                        <a onClick={(e) => router.push('/sign-up')} href='#'>Are you new? Create new user</a>
                    </Box>
                </Box>
                : <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>}

            <Snackbar
                open={dialog.isOpen}
                autoHideDuration={5000}
                onClose={() => setDialog({ isOpen: false, message: '' })}
                message={dialog.message}
            />
        </>
    )
}

export default SignIn