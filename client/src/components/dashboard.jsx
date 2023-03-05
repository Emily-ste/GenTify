import axios from 'axios'
import React, { useEffect , useState} from 'react'
import useAuth from './useAuth'

export default function dashboard({code}) {
    const accessToken = useAuth(code)
    const [userData, setUserData] = useState()
    const [currentSong, setCurrentSong] = useState()

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
        axios.get('https://api.spotify.com/v1/me/player', {
            headers: { 'Authorization': 'Bearer ' + accessToken }
        }).then (res => {
            setCurrentSong(res.data)
            console.log(res.data)
        })
    }, [accessToken])
  

  return (
    <>
    {/* <div>{code}</div>
    <div>{accessToken}</div> */}
    <div>{userData?.display_name}</div>
    <div>{currentSong?.item?.name}</div>
    <div>{currentSong?.item?.artists[0].name}</div>
    </>
  )
}
