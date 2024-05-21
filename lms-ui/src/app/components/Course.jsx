import React, { useState, useEffect, useContext } from 'react'
import { ProfileContext } from '@/app/contexts/ProfileContext'
import { Box } from '@mui/material'
import { useLocation } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import axios from 'axios'
import Topics from '@/app/components/Topics'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress'
import { styled } from '@mui/material/styles'

const Course = () => {

    const config = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') } }

    const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
        height: 10,
        borderRadius: 5,
        [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        },
        [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 5,
            backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
        },
    }));

    const { profile, setProfile } = useContext(ProfileContext)
    const { state } = useLocation()
    const [course, setCourse] = useState()
    const [progressPercentage, setProgressPercentage] = useState()
    const [learnedLessons, setLearnedLessons] = useState()

    const markLearned = async (courseId, lessonId) => {
        const config = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') } }
        await axios.patch(
            `http://localhost:3000/students/learned`,
            {
                "courseId": courseId,
                "lessonId": lessonId
            },
            config,
        )
        await getProgress()
        setLearnedLessons([...learnedLessons, lessonId])
    }

    const getProgress = async () => {
        const progress = await axios.get(
            `http://localhost:3000/students/progressMeter/${state.id}`,
            config
        )
        console.log(progress.data.data);
        setProgressPercentage(progress.data.data.progress)
        setLearnedLessons(() => progress.data.data.learned.map(ele => ele.lessonId))
    }

    useEffect(() => {
        (async () => {
            try {
                const thisCourse = await axios.get(
                    `http://localhost:3000/courses/${state.id}`,
                    config
                )
                await getProgress()
                setCourse(thisCourse.data.data)
            } catch { }
        })()
    }, [])

    return (
        <>
            <h4 style={{ marginTop: 24 }}>{course?.name}</h4>
            <p>by {course?.teacher} | {course?.totalLessons} Lessons</p>
            <br />
            <BorderLinearProgress variant="determinate" value={progressPercentage} />
            <p>You have learned {progressPercentage}%</p>
            <br />
            <p>{course?.description}</p>
            <br />
            <Box sx={{ display: 'block', flexWrap: 'wrap' }}>
                {course?.lessons.map((ele, key) => (
                    <Card key={'this-course-' + key} sx={{ minWidth: 300, mr: 3, mt: 3 }}>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {ele.name}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                {ele.description}
                            </Typography>
                            <Typography variant="body2">
                                {ele.topics.length} Topics
                            </Typography>
                            <Topics topics={ele.topics}></Topics>
                        </CardContent>
                        <CardActions sx={{ alignItems: 'end' }}>
                            {learnedLessons.includes(ele.id) ?
                                <Button variant='text' size="small">Already learned</Button>
                                :
                                <Button variant='text' size="small" onClick={() => { markLearned(course._id, ele.id) }}>Mark this lesson learned</Button>}
                        </CardActions>
                    </Card>
                ))}
            </Box>
        </>
    )
}

export default Course