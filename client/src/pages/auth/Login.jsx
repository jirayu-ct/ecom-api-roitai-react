import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import useEcomStore from '../../store/ecom-store';
import { useNavigate } from 'react-router-dom'



const Login = () => {
  //javascript
  const navigate = useNavigate()
  const actionLogin = useEcomStore((state) => state.actionLogin)
  const user = useEcomStore((state) => state.user)
  console.log("user form zustand", user)

  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    //code e = event
    setForm({
      ...form, //คัดลอกข้อมูลเก่า
      [e.target.name]: e.target.value //เปลี่ยนข้อมูลใหม่
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await actionLogin(form)
      const role = res.data.payload.role

      roleRedirect(role)
      toast.success('Login Success')
    }
    catch (err) {
      console.log(err)
      const errMsg = err.response?.data?.message
      toast.error(errMsg)
    }
  }

  const roleRedirect = (role) => {
    if (role === 'admin') {
      navigate('/admin')
    }
    else {
      //กลับไปที่หน้าที่กดเข้ามา
      navigate(-1)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full shadow-md bg-white p-8 max-w-md rounded-md">

        <h1 className="text-2xl text-center my-4 font-bold">Login</h1>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">

            <input
              className="border w-full px-3 py-2 rounded
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={handleChange}
              name="email"
              type="email"
              placeholder='Email'
            />

            <input
              className="border w-full px-3 py-2 rounded
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={handleChange}
              name="password"
              type="password"
              placeholder='Password'
            />

            <button className="bg-blue-500 rounded-md w-full text-white font-bold py-2 shadow hover:bg-blue-700"
            >Login</button>
          </div>
        </form>

      </div>
    </div>
  )
}
export default Login