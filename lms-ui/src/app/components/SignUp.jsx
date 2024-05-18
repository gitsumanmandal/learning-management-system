'use client'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Snackbar } from '@mui/material'
import { useRouter } from 'next/navigation'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const SignUp = () => {
    const router = useRouter()
    const [dialog, setDialog] = useState({
        isOpen: false,
        message: ''
    })
    const [user, setUser] = useState({
        'role': '',
        'name': '',
        'userName': '',
        'emailId': '',
        'contactNo': '',
        'password': ''
    })
    const submit = async () => {
        try {
            const result = await axios.post(
                'http://localhost:3000/users',
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
    }, [router])

    return (
        <>
            <Box sx={{ '& > :not(style)': { m: 2, width: '40ch' } }}>
                <Box>
                    <FormControl fullWidth>
                        <InputLabel id="role-label">Role</InputLabel>
                        <Select
                            labelId="role-label"
                            id="role"
                            value={user.role}
                            onChange={(e) => setUser({ ...user, role: e.target.value })}
                        >
                            <MenuItem value='STUDENT'>Student</MenuItem>
                            <MenuItem value='ADMIN'>Admin</MenuItem>
                            <MenuItem value='TEACHER'>Teacher</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box>
                    <TextField fullWidth id='name' label='Name' variant='outlined' type='text'
                        value={user.name}
                        onChange={(e) => setUser({ ...user, name: e.currentTarget.value })} />
                </Box>
                <Box>
                    <TextField fullWidth id='userName' label='User Name' variant='outlined' type='text'
                        value={user.userName}
                        onChange={(e) => setUser({ ...user, userName: e.currentTarget.value })} />
                </Box>
                <Box>
                    <TextField fullWidth id='emailId' label='Email Id' variant='outlined' type='text'
                        value={user.emailId}
                        onChange={(e) => setUser({ ...user, emailId: e.currentTarget.value })} />
                </Box>
                <Box>
                    <TextField fullWidth id='contactNo' label='Contact No' variant='outlined' type='text'
                        value={user.contactNo}
                        onChange={(e) => setUser({ ...user, contactNo: e.currentTarget.value })} />
                </Box>
                <Box>
                    <TextField fullWidth id='password' label='Pasword' variant='outlined' type='password'
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.currentTarget.value })} />
                </Box>
                <Box>
                    <Button fullWidth variant="contained" onClick={submit}>Sign Up</Button>
                </Box>
                <Box>
                    <a onClick={(e) => router.push('/sign-in')} href='#'>Already have account? Sign in here</a>
                </Box>
            </Box>

            <Snackbar
                open={dialog.isOpen}
                autoHideDuration={5000}
                onClose={() => setDialog({ isOpen: false, message: '' })}
                message={dialog.message}
            />
        </>
    )
}

export default SignUp