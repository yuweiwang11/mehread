import axios from 'axios'
import { UserDataContext } from '../contexts/UserDataContext'
import { useContext, useEffect, useState } from 'react'
import Nav from '../Nav'
import Spinner from '../Spinner'
import SearchBar from '../SearchBar'
import { Navigate } from 'react-router-dom'

export default function BookShelfPage() {
  const { user } = useContext(UserDataContext)
  const [userBookshelves, setUserBookshelves] = useState(null)
  let userid = null
  if (user) {
    userid = user._id
  }

  if (!user) return <Navigate to={'/mehread/signin'} />

  if (user && !userBookshelves) {
    axios
      .post('/bookshelf/getbookshelves', { userid })
      .then((response) => {
        console.log(response.data)
        setUserBookshelves(response.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  if (!userBookshelves) {
    return <Spinner />
  }

  return (
    <>
      <div className="max-w-4xl mx-auto">
        <Nav />
        <div className="flex min-h-screen flex-row bg-gray-200 shadow-sm">
          <aside className="sidebar w-48 -translate-x-full transform bg-white p-4 transition-transform duration-150 ease-in md:translate-x-0 md:shadow-md">
            <div className="my-2 w-full border-b-4 border-gray-300 text-center">
              <span className="font-mono text-xl font-bold tracking-widest">
                <span className="">MY BOOKSHELF</span>
              </span>
            </div>
            {userBookshelves &&
              userBookshelves.map((bookshelf, index) => (
                <div className="my-4" key={index}>
                  {/* {bookshelf._id} */}
                  {bookshelf.bookshelfName.toUpperCase()}
                </div>
              ))}
            {/* <div className="my-4">HELLO</div>
            <div className="my-4">HELLO</div> */}
          </aside>
          <main className="main -ml-48 flex flex-grow flex-col p-3 transition-all duration-150 ease-in md:ml-0">
            <div className="flex h-full items-center justify-center bg-white text-center text-5xl font-bold shadow-md">
              Content books
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
