import { UserAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import Spinner from '../Spinner'

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
    // <div className="max-w-[600] mx-auto my-16 p-4">
    //   <h1 className="text-2xl font-bold py-4">Account Page</h1>
    //   <p>Username: {user && user.displayName}</p>
    //   <p>User Email: {user && user.email}</p>
    //   <p>emailVerified?:{user && user.emailVerified === true && 'yes'}</p>
    //   <button className="border px-6 py-2 my-4" onClick={handleLogout}>
    //     Logout
    //   </button>
    // </div>

    <div className="flex items-center h-screen w-full justify-center">
      <div className="max-w-xs">
        <div className="bg-white shadow-xl rounded-lg p-6 ">
          <div className="photo-wrapper p-2">
            <img
              className="w-32 h-32 rounded-full mx-auto"
              src={user && user.photoURL ? user.photoURL : '../logo/usericon_filled.png'}
              alt={user && user.displayName}
            />
          </div>
          <div className="p-2">
            <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
              {user && user.displayName}
            </h3>
            <h3
              className={
                user && user.emailVerified === true
                  ? 'text-center text-sm text-gray-800 font-medium leading-8'
                  : 'text-center text-sm text-red-700 font-medium leading-8'
              }
            >
              {user && user.emailVerified === true ? 'Verified' : 'Not Verified'}
            </h3>
            <p
              className={
                user && user.emailVerified === true
                  ? ''
                  : 'text-center px-2 py-2 text-xs text-gray-900 font-medium'
              }
            >
              {user && user.emailVerified === true ? '' : 'Please verify your email'}
            </p>

            {/* <div className="text-center text-gray-400 text-xs font-semibold">
              <p>Web Developer</p>
            </div> */}
            <table className="text-xs my-3">
              <tbody>
                <tr>
                  <td className="px-2 py-2 text-gray-500 font-semibold">Email</td>
                  <td className="px-2 py-2">{user && user.email}</td>
                </tr>
              </tbody>
            </table>

            <div className="text-center my-3">
              {/* <a
                className="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium"
                href="#"
              >
                Go to my library{' '}
              </a> */}

              <button className="border px-4 py-2" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
