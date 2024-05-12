import React from 'react'
import {Stack,Box} from '@mui/material'
import {VideoCard,ChannelCard} from './'

export default function Videos({videos,direction}) {
  return (
    <Stack direction={direction || 'row'} flexWrap='wrap' justifyContent='start' gap='10px'>
        {videos.map((item,idx)=>(
          <Box key={idx}>
            {item.id.videoId && <VideoCard video={item}/>}
            {item.id.channelId && <ChannelCard 
            channelDetail={item}/>}
          </Box>
        ))}
    </Stack>
  )
}
