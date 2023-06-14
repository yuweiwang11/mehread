import { UserAuth } from '../context/AuthContext'

export default function AccountPage() {
  const { user, logout } = UserAuth()
  return (
    <div className="max-w-[600] mx-auto my-16 p-4">
      <h1 className="text-2xl font-bold py-4">Account Page</h1>
      <p>User Email: {user && user.email}</p>
      <button className="border px-6 py-2 my-4">Logout</button>
    </div>
  )
}
