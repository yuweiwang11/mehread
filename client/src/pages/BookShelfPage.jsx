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
  const [booksFromSelectedBooshelf, setBooksFromSelectedBooshelf] = useState(null)
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

  async function chooseBookshelf(e) {
    e.preventDefault()
    const targetBookshelfId = e.target.value
    const result = await axios.post('/bookshelf/getBookshelfBooks', { targetBookshelfId })
    setBooksFromSelectedBooshelf(result.data)
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
              userBookshelves.map((bookshelf) => (
                <div className="my-4 border-b-4" key={bookshelf._id}>
                  <button
                    onClick={chooseBookshelf}
                    className="bg-white text-zinc-600"
                    value={bookshelf._id}
                  >
                    {bookshelf.bookshelfName.toUpperCase()}
                  </button>
                </div>
              ))}
          </aside>
          <main className="main -ml-48 flex flex-grow flex-col p-3 transition-all duration-150 ease-in md:ml-0">
            <div className="flex h-full items-center justify-center bg-white text-center text-5xl font-bold shadow-md">
              {booksFromSelectedBooshelf &&
                booksFromSelectedBooshelf.map((books) => books.bookitem.volumeInfo.title)}
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
