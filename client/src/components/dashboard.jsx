import axios from 'axios'
import React, { useEffect , useState} from 'react'
import useAuth from './useAuth'

export default function dashboard({code}) {
    const accessToken = useAuth(code)
    const [userData, setUserData] = useState()
    const [currentSong, setCurrentSong] = useState()
    const [geniusSearch, setGeniusSearch] = useState()

    const geniusToken = "FmuCLo8qFEmhSjIJzBmj3mzsoPkF10b4CNpdUlNNG377RBGL2nz5LuFt5CpRdPTD"

    useEffect(() => {
        if (!accessToken) return
        axios.get('https://api.spotify.com/v1/me', {  
            headers: { 'Authorization': 'Bearer ' + accessToken }
        }).then (res => {
            setUserData(res.data)
        })
    }, [accessToken])

    useEffect(() => {
        if (!accessToken) return
        setInterval(() => {
        axios.get('https://api.spotify.com/v1/me/player', {
            headers: { 'Authorization': 'Bearer ' + accessToken }
        }).then (res => {
            setCurrentSong(res.data.item.name + ' ' + res.data.item.artists[0].name)
        })
    }, 1000)
    }, [accessToken])

    useEffect(() => {
        if (!currentSong) return
      axios
        .get(`https://api.genius.com/search?q=${encodeURIComponent(currentSong)}&access_token=${geniusToken}`)
        .then(res => {
            setGeniusSearch(res.data.response.hits[0].result.id)
        })
    }, [currentSong])

    useEffect(() => {
        if (!geniusSearch) return
        axios
        .get(`https://api.genius.com/songs/${geniusSearch}?access_token=${geniusToken}`)
        .then(res => {
            //console.log(res.data)
            console.log(res.data.response.song.full_title)
            console.log(res.data.response.song.album.name)
            console.log(res.data.response.song.custom_performances)
            console.log(res.data.response.song.description)
            console.log(res.data.response.song.header_image_thumbnail_url)
            console.log(res.data.response.song.media)
            console.log(res.data.response.song.producer_artists)
            console.log(res.data.response.song.release_date_for_display)
            console.log(res.data.response.song.recording_location)
            console.log(res.data.response.song.url)
        })
    }, [geniusSearch])
  return (
    <>
    <div>{userData?.display_name}</div>
    <div>{currentSong}</div>
    </>
  )
}
