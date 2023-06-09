import { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { UserDataContext } from './contexts/UserDataContext'
import navLogo from './logo/MEH_v5.png'
import loggedinUserIcon from './logo/usericon_filled.png'
import visitorIcon from './logo/usericon_lined.png'

export default function Nav() {
  const { user } = useContext(UserDataContext)
  const path = useLocation()
  const currentPath = path.pathname
  const [isHomePage, setIsHomePage] = useState(false)

  useEffect(() => {
    if (currentPath === '/') {
      setIsHomePage(true)
    } else {
      setIsHomePage(false)
    }
  }, [currentPath])

  return (
    <>
      <div className="flex">
        {!isHomePage && (
          <div className="cursor-pointer w-32">
            <Link to={'/'}>
              <img className="w-32 mb-8 mt-8" src={navLogo} alt="logo" />
            </Link>
          </div>
        )}

        <div className=" mt-2 ml-auto p-5 underline">
          {user ? (
            <>
              <img
                className="inline-flex w-6 mr-1 -mt-2 rounded-full"
                src={loggedinUserIcon}
                alt="user_icon"
              />
              <Link to={'/mehread/account'}>{user.username}</Link>
            </>
          ) : (
            <Link to={'/mehread/signin'}>
              <img className="inline-flex w-6 mr-1 -mt-2" src={visitorIcon} alt="visitor_icon" />
              Log In
            </Link>
          )}
        </div>
      </div>
    </>
  )
}
