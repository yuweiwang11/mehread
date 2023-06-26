import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function SignupPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      await axios.post('/auth/register', {
        username,
        email,
        password,
      })
      alert('Successfully signed up! Now you can sign in to your account')
      navigate('/mehread/signin')
    } catch (err) {
      console.log(err)
      alert('Registration failed. Please check your registration infomation and try again.')
    }
  }

  return (
    <div className="max-w-[700px] max-auto my-16 p-4">
      <div>
        <h1 className="text-2xl font-bold py-2">Sign Up</h1>
        <p className="py-2">
          Already have an account?&nbsp;{' '}
          <Link to={'/mehread/signin'} className="underline">
            Sign in
          </Link>
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col py-2">
          <label className="py-2 font-medium">Username: </label>
          <input
            onChange={(e) => {
              setUsername(e.target.value)
            }}
            className="border p-3"
            type="text"
          />
        </div>

        <div className="flex flex-col py-2">
          <label className="py-2 font-medium">Email: </label>
          <input
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            className="border p-3"
            type="email"
          />
        </div>

        <div className="flex flex-col py-2">
          <label className="py-2 font-medium">Password: </label>
          <input
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            className="border p-3"
            type="password"
          />
        </div>
        <button className="w-full p-4 my-2 border-gary-500 bg-gray-800 hover:bg-gray-500 text-white">
          Sign Up
        </button>
      </form>
    </div>
  )
}
