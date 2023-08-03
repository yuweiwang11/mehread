import axios from 'axios'
import { useEffect, useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserDataContext } from '../contexts/UserDataContext'
import Nav from '../Nav'
import Footer from '../Footer'

export default function SignupPage() {
  const navigate = useNavigate()
  const { user } = useContext(UserDataContext)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmEmail, setConfirmEmail] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [confirmEmailCSS, setConfirmEmailCSS] = useState('flex flex-col py-2 hidden')
  const [confirmPasswordCSS, setConfirmPasswordCSS] = useState('flex flex-col py-2 hidden')
  const [userInputValidation, setUserInputValidation] = useState('')

  useEffect(() => {
    if (user) {
      return navigate('/mehread/account')
    }
  }, [user])

  async function handleSubmit(e) {
    e.preventDefault()
    if (password != confirmPassword)
      return setUserInputValidation(`⛔ Password not match, please try again.`)
    if (email != confirmEmail)
      return setUserInputValidation(`⛔ Email not match, please try again.`)
    if (password === confirmPassword && email === confirmEmail) {
      setUserInputValidation(``)
    }

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
    <div>
      <div className="max-w-4xl mx-auto">
        <Nav />
        <div className="max-w-xl mx-auto justify-center">
          <div className="border border-zinc-400 rounded-xl px-5 max-w-[700px] my-10 p-4">
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
                  required
                  onChange={(e) => {
                    setUsername(e.target.value)
                  }}
                  className="border p-3"
                  type="text"
                />
              </div>

              <div className="flex flex-col py-2">
                <label className="py-2 font-medium ">Email: </label>
                <input
                  required
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setConfirmEmailCSS('flex flex-col py-2')
                  }}
                  className="border p-3"
                  type="email"
                />
              </div>

              <div className={confirmEmailCSS}>
                <label className="py-2 font-medium ">Comfirm Email: </label>
                <input
                  required
                  onPaste={(e) => {
                    e.preventDefault()
                    return false
                  }}
                  onDrop={(e) => {
                    e.preventDefault()
                    return false
                  }}
                  onChange={(e) => {
                    setConfirmEmail(e.target.value)
                    setConfirmEmailCSS('flex flex-col py-2')
                  }}
                  className="border p-3"
                  type="email"
                />
              </div>

              <div className={'flex flex-col py-2'}>
                <label className="py-2 font-medium">Password: </label>
                <input
                  required
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setConfirmPasswordCSS('flex flex-col py-2')
                  }}
                  className="border p-3"
                  type="password"
                />
              </div>

              <div className={confirmPasswordCSS}>
                <label className="py-2 font-medium">Comfirm Password: </label>
                <input
                  required
                  onPaste={(e) => {
                    e.preventDefault()
                    return false
                  }}
                  onDrop={(e) => {
                    e.preventDefault()
                    return false
                  }}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value)
                  }}
                  className="border p-3"
                  type="password"
                />
              </div>
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">{userInputValidation}</p>
              <button className="w-full p-4 my-2 border-gary-500 bg-gray-800 hover:bg-gray-500 text-white">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="mt-28 fixed inset-x-0 bottom-0">
        <Footer />
      </div>
    </div>
  )
}
