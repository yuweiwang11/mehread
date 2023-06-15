import { useEffect, useState } from 'react'
import { UserAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import GoogleButton from 'react-google-button'

export default function SigninPage() {
  const navigate = useNavigate()
  const { signIn, googleSignin, user } = UserAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErr('')
    try {
      await signIn(email, password)
    } catch (e) {
      setErr(e)
      console.log(err)
    }
  }

  const handleGoogleSignin = async () => {
    setErr('')
    try {
      await googleSignin()
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (user != null) {
      navigate('/mehread/account')
    }
  }, [user])

  return (
    <div className="max-w-[700px] max-auto my-16 p-4">
      <div>
        <h1 className="text-2xl font-bold py-2">Sign in</h1>
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
          Sign Up
        </button>
      </form>
      <div className="w-full my-2">
        <GoogleButton onClick={handleGoogleSignin} />
      </div>
    </div>
  )
}
