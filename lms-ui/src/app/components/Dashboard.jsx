'use client'
import React, { useContext, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { ProfileContext } from '@/app/contexts/ProfileContext'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const config = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') } }
    const { profile, setProfile } = useContext(ProfileContext)
    const router = useRouter()
    const navigate = useNavigate()
    const [courses, setCourses] = useState([])
    const [enrolledCourses, setEnrolledCourses] = useState([])
    const [nonEnrolledCourses, setNonEnrolledCourses] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const access_token = localStorage.getItem('access_token')
                if (!access_token) { router.push('/sign-in') }

                const myProfile = await axios.get(
                    'http://localhost:3000/users/profile',
                    config
                )
                setProfile(myProfile.data.data)

                const allCourses = await getCourses()
                const enrollerd = allCourses.data.data.filter((ele) => ele.enrollement.includes(myProfile.data.data.userName))
                const nonEnrollerd = allCourses.data.data.filter((ele) => !ele.enrollement.includes(myProfile.data.data.userName))
                setEnrolledCourses(enrollerd)
                setNonEnrolledCourses(nonEnrollerd)
            } catch {
                const access_token = localStorage.removeItem('access_token')
                router.push('/sign-in')
            }
        })()
    }, [])

    const getCourses = async () => {
        const allCourses = await axios.get(
            'http://localhost:3000/courses',
            config
        )
        setCourses(allCourses.data.data)
        return allCourses
    }

    const enroll = async (courseId) => {
        const config = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') } }
        const myProfile = await axios.patch(
            `http://localhost:3000/courses/enroll/${courseId}`,
            {},
            config,
        )
        const nonEnrollerd = nonEnrolledCourses.filter((ele) => ele._id != courseId)
        setEnrolledCourses([...enrolledCourses, ...nonEnrolledCourses.filter((ele) => ele._id === courseId)])
        setNonEnrolledCourses(nonEnrollerd)
    }

    return (
        <>
            <h4 style={{ marginTop: 24 }}>All Courses</h4>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                {nonEnrolledCourses.map((ele, key) => (
                    <Card key={'all-course-' + key} sx={{ minWidth: 300, mr: 3, mt: 3 }}>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {ele.name}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                by {ele.teacher}
                            </Typography>
                            <Typography variant="body2">
                                {ele.totalLessons} Lessons
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button onClick={() => { enroll(ele._id) }} size="small" >Enroll</Button>
                        </CardActions>
                    </Card>
                ))}
            </Box>

            <h4 style={{ marginTop: 24 }}>Enrolled Courses</h4>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                {enrolledCourses.map((ele, key) => (
                    <Card key={'enrolled-course-' + key} sx={{ minWidth: 300, mr: 3, mt: 3 }}>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {ele.name}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                by {ele.teacher}
                            </Typography>
                            <Typography variant="body2">
                                {ele.totalLessons} Lessons
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button onClick={() => {
                                navigate(`/course`, { state: { id: ele._id } })
                            }} size="small">Continue Learning</Button>
                        </CardActions>
                    </Card>
                ))}
            </Box>

        </>
    )
}

export default Dashboard