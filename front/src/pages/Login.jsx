import React from 'react'
import  Forms  from '../components/Forms'

function Login() {
  return (
    <div>
      <Forms method="login" route="/api/token/"/>
    </div>
  )
}

export default Login
