import { useNavigate } from 'react-router-dom'
import Spinner from '../Spinner'
import { useContext, useEffect } from 'react'
import { UserDataContext } from '../contexts/UserDataContext'

export default function AccountPage() {
  const navigate = useNavigate()
  const { user } = useContext(UserDataContext)
  // console.log(user)

  useEffect(() => {
    if (!user) {
      return navigate('/mehread/signin')
    }
  }, [user])

  function logout() {
    window.open('http://localhost:4000/auth/logout', '_self')
  }

  return (
    <div className="flex items-center h-screen w-full justify-center">
      {user && (
        <div className="max-w-xs">
          <div className="bg-white shadow-xl rounded-lg p-6 ">
            <div className="photo-wrapper p-2">
              <img
                className="w-32 h-32 rounded-full mx-auto"
                src={user.image ? user.image : '../logo/usericon_filled.png'}
              />
            </div>
            <div className="p-2">
              <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
                {user.username}
              </h3>

              <table className="text-xs my-3">
                <tbody>
                  <tr>
                    <td className="px-2 py-2 text-gray-500 font-semibold">Email</td>
                    <td className="px-2 py-2">{user.email}</td>
                  </tr>
                </tbody>
              </table>

              <div className="text-center my-3 flex justify-center">
                <button
                  className="border px-4 py-2 "
                  onClick={(e) => {
                    e.preventDefault()
                    navigate('/mehread/bookshelf')
                  }}
                >
                  Bookshelf
                </button>
                <button onClick={logout} className="border px-4 py-2">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
