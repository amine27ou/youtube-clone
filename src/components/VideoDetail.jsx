import React,{useState,useEffect} from 'react'
import {Link,useParams} from 'react-router-dom'
import ReactPlayer from 'react-player'
import {Typography,Box,Stack} from '@mui/material'
import { CheckCircle } from '@mui/icons-material'
import {Videos} from './'
import { fetchFromAPI } from '../utils/fetchFromAPI'

export default function VideoDetail() {
  const [videoDetail,setVideoDetail] = useState({})
  const [videos,setVideos] = useState([])
  const {id} = useParams()
  useEffect(()=>{
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
    .then((data)=>setVideoDetail(data.items[0]))

    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`).then((data)=>setVideos(data.items))
  },[id])
  const { snippet } = videoDetail
  return (
    <Box minHeight='95vh'>
      <Stack direction={{xs:'column',md:'row'}}>
        <Box flex={1}>
          <Box sx={{width:"100%",position:'sticky',top:'86px'}}>
            <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className='react-player' controls/>
          </Box>
          <Typography color='#fff' variant="h5" fontWeight='bold' p={2}>
            {snippet?.title}
          </Typography>
          <Stack direction='row' justifyContent='space-between' sx={{color:'#fff'}} py={1} px={2}>
            <Link to={`/channel/${snippet?.channelId}`}>
              <Typography color='#fff' variant={{sm:'subtitle1',md:'h6'}} >
                {snippet?.channelTitle}
                <CheckCircle sx={{fontSize:"12px", color:'gray',ml:'5px'}} />
              </Typography>
            </Link>
            <Stack direction="row" gap="20px" alignItems='center' >
                <Typography variant='body1' color='grey' sx={{opacity:0.7}}>
                  {videoDetail?.statistics?.viewCount} views
                </Typography>
                <Typography variant='body1' color='grey' sx={{opacity:0.7}}>
                  {videoDetail?.statistics?.likeCount} likes
                </Typography>
            </Stack>
          </Stack>
        </Box>
      <Box  px={2} py={{md:1,xs:5}} justifyContent='center' alignItems='center'>
      <Videos direction='column' videos={videos} />
      </Box>
      </Stack>
    </Box>
  )
}
