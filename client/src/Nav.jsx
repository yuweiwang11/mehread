import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Nav() {
  const path = useLocation()
  const currentPath = path.pathname
  const [isHomePage, setIsHomePage] = useState(false)
  console.log(currentPath === '/')
  if (!path.pathname) {
    console.log('home page')
  }

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
              <img className="w-32 mb-8 mt-8" src="../logo/MEH_v5.png" alt="logo" />
            </Link>
          </div>
        )}

        <div className=" mt-2 ml-auto p-5 underline">
          <Link to={'/mehread/signin'}>
            <img
              className="inline-flex w-6 mr-1 -mt-2"
              src="../logo/usericon_lined.png"
              alt="user_icon"
            />
            Log In
          </Link>
        </div>
      </div>
    </>
  )
}
