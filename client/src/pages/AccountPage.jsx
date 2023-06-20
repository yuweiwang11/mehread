import { useNavigate } from 'react-router-dom'
import Spinner from '../Spinner'

export default function AccountPage({ user }) {
  const navigate = useNavigate()

  return (
    <div className="flex items-center h-screen w-full justify-center">
      <div className="max-w-xs">
        <div className="bg-white shadow-xl rounded-lg p-6 ">
          <div className="photo-wrapper p-2">
            <img className="w-32 h-32 rounded-full mx-auto" src="../logo/usericon_filled.png" />
          </div>
          <div className="p-2">
            <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
              {user.username}
            </h3>

            <table className="text-xs my-3">
              <tbody>
                <tr>
                  <td className="px-2 py-2 text-gray-500 font-semibold">Email</td>
                  <td className="px-2 py-2">abc@mehread.com</td>
                </tr>
              </tbody>
            </table>

            <div className="text-center my-3">
              <button className="border px-4 py-2">Logout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
