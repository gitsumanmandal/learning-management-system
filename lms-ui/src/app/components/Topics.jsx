import React from 'react'
import { Box } from '@mui/material'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'

const Topics = ({topics}) => {
  return (
    <Box sx={{ display: 'block', flexWrap: 'wrap' }}>
            {topics?.map((ele, key) => (
                    <Card key={'this-topic-' + key} sx={{ minWidth: 300, mr: 3, mt: 3, bgcolor: 'whitesmoke' }}>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {ele.name}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                {ele.description}
                            </Typography>
                            <Typography variant="body2">
                                <Box sx={{bgcolor: 'white', p: 3}}>
                                {ele.content}
                                </Box>
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
  )
}

export default Topics