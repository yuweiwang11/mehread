import axios from 'axios'
import { UserDataContext } from '../contexts/UserDataContext'
import { useContext, useEffect, useState } from 'react'
import Nav from '../Nav'
import SearchBar from '../SearchBar'

export default function BookShelfPage() {
  const { user } = useContext(UserDataContext)
  const [userBookshelves, setUserBookshelves] = useState([])
  let userid = ''
  if (user) {
    userid = user._id
  }

  useEffect(() => {
    if (user) {
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
  }, [user])

  return (
    <>
      {/* <div className="max-w-4xl mx-auto border border-black">
        <Nav />
        <div className="">
          <div>bookshelf page hello {userid}</div>
          {userBookshelves.map((bookshelf, index) => (
            <div className="flex flex-col" key={index}>
              {bookshelf._id}
              {bookshelf.bookshelfName}
            </div>
          ))}
        </div>
      </div> */}
      <div className="max-w-4xl mx-auto">
        <Nav />
        <div className="flex min-h-screen flex-row bg-gray-200 shadow-sm">
          <aside className="sidebar w-48 -translate-x-full transform bg-white p-4 transition-transform duration-150 ease-in md:translate-x-0 md:shadow-md">
            <div className="my-2 w-full border-b-4 border-gray-300 text-center">
              <span className="font-mono text-xl font-bold tracking-widest">
                <span className="">MY BOOKSHELF</span>
              </span>
            </div>
            {userBookshelves.map((bookshelf, index) => (
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
