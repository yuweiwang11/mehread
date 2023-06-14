import { UserAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function AccountPage() {
  const navigate = useNavigate()

  const { user, logout } = UserAuth()

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/mehread/signin')
      console.log('you are logged out')
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <div className="max-w-[600] mx-auto my-16 p-4">
      <h1 className="text-2xl font-bold py-4">Account Page</h1>
      <p>User Email: {user && user.email}</p>
      <button className="border px-6 py-2 my-4" onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}
