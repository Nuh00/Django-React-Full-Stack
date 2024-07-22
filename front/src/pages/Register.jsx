import React from 'react'
import  Form  from '../components/Forms'

function Register() {
  return (
    <div>
      <Form method="register" route="/api/user/register/"/>
    </div>
  )
}

export default Register
