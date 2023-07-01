import { useContext, useEffect, useState } from 'react'
import { Navigate, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../contexts/UserDataContext'

export default function SigninPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [redirect, setRedirect] = useState(false)
  const { user, setUser } = useContext(UserDataContext)

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const response = await axios.post(
        '/auth/login',
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      setUser(response.data.userData)
      alert('Login successful')
      setRedirect(true)
    } catch (err) {
      console.log(err)
      alert('Login failed')
    }
  }
  if (redirect) {
    navigate('/')
    location.reload()
  }

  return (
    <div className="max-w-[700px] max-auto my-16 p-4">
      <div>
        <h1 className="text-2xl font-bold py-2">Sign In</h1>
        <p className="py-2">
          Don&apos;t have an accout yet?&nbsp;
          <Link to={'/mehread/signup'} className="underline">
            Sign up
          </Link>
        </p>
      </div>

      <form onSubmit={handleSubmit}>
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
          Sign In
        </button>
      </form>
      <div className="w-full my-2">
        <button
          onClick={() => {
            window.open('http://localhost:4000/auth/google', '_self')
          }}
          className="px-4 py-3 border flex gap-3 bg-gray-50  border-slate-400 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
        >
          <img
            className="w-6 h-6"
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            loading="lazy"
            alt="google logo"
          />
          <span>Login with Google</span>
        </button>
      </div>
    </div>
  )
}
