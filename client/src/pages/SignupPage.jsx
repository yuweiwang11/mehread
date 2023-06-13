import { Link } from 'react-router-dom'

export default function SignupPage() {
  return (
    <div className="max-w-[700px] max-auto my-16 p-4">
      <div>
        <h1 className="text-2xl font-bold py-2">Sign up</h1>
        <p className="py-2">
          Already have an account? <Link to={'/mehread/signin'}>Sign in</Link>
        </p>
      </div>

      <form>
        <div className="flex flex-col py-2">
          <label className="py-2 font-medium">Email: </label>
          <input className="border p-3" type="email" />
        </div>

        <div className="flex flex-col py-2">
          <label className="py-2 font-medium">Password: </label>
          <input className="border p-3" type="password" />
        </div>
        <button className="w-full p-4 my-2 border-gary-500 bg-gray-800 hover:bg-gray-500 text-white">
          Sign Up
        </button>
      </form>
    </div>
  )
}
