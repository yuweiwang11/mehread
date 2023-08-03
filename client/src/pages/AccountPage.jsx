import { useNavigate } from 'react-router-dom'
import Spinner from '../Spinner'
import { useContext, useEffect } from 'react'
import { UserDataContext } from '../contexts/UserDataContext'
import loggedinUserIcon from '../logo/usericon_filled.png'
import Footer from '../Footer'

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
    <div>
      <div className="flex items-center h-screen w-full justify-center">
        {user && (
          <div className="max-w-xs">
            <div className="bg-white shadow-xl rounded-lg p-6 ">
              <div className="photo-wrapper p-2">
                <img className="w-32 h-32 rounded-full mx-auto" src={loggedinUserIcon} />
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

                <div className="text-center my-3 flex flex-col items-center">
                  <button
                    className="border px-4 py-2 p-2 my-1 border-gray-800 bg-white  rounded-xl  hover:bg-black hover:text-white"
                    onClick={() => {
                      navigate('/mehread/bookshelf')
                    }}
                  >
                    Bookshelf
                  </button>
                  <button
                    onClick={logout}
                    className="border px-6 mt-5 p-2 border-gray-800 bg-white  rounded-xl  hover:bg-red-700 hover:text-white"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
