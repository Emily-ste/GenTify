import React from 'react'

const AUTH_URL ="https://accounts.spotify.com/authorize?client_id=8d213b927f9b44a39e64477029b4216d&response_type=code&redirect_uri=http://localhost:5173&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

export default function login() {
  return (
    <a href={AUTH_URL}>LOGIN</a>
  )
}
