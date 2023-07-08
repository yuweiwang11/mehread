import axios from 'axios'
import { UserDataContext } from '../contexts/UserDataContext'
import { useContext, useEffect, useState } from 'react'
import Nav from '../Nav'
import Spinner from '../Spinner'
import SearchBar from '../SearchBar'
import { Link, Navigate } from 'react-router-dom'

export default function BookShelfPage() {
  const { user } = useContext(UserDataContext)
  const [userBookshelves, setUserBookshelves] = useState(null)
  const [booksFromSelectedBooshelf, setBooksFromSelectedBooshelf] = useState(null)
  const [chosenBookshelf, setChosenBookshelf] = useState(null)
  const [getAllBooks, setGetAllBooks] = useState(null)
  let userid = null
  if (user) {
    userid = user._id
  }

  useEffect(() => {
    axios
      .post('/bookshelf/getbookshelves', { userid })
      .then((response) => {
        console.log(response.data)
        setUserBookshelves(response.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    axios
      .get('/bookshelf/checkBookSaved', { userid })
      .then((response) => {
        console.log(response.data)
        setGetAllBooks(response.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  if (!user) return <Navigate to={'/mehread/signin'} />

  if (!userBookshelves) {
    return <Spinner />
  }

  async function chooseBookshelf(e) {
    e.preventDefault()
    const targetBookshelfId = e.target.value
    const result = await axios.post('/bookshelf/getBookshelfBooks', { targetBookshelfId })
    setBooksFromSelectedBooshelf(result.data)
    setChosenBookshelf(targetBookshelfId)
  }

  function chosenbooshelfButton(bookshelfId) {
    let defaultCSS = 'bg-white text-zinc-600'
    if (bookshelfId === chosenBookshelf) {
      return (defaultCSS += ' font-bold')
    } else {
      return defaultCSS
    }
  }

  function mapBooks(bookshelfName) {
    return bookshelfName.map((books) => (
      <div key={books._id} className="flex justify-center text-center">
        <Link className="mb-10" to={`/mehread/bookshelf/${books._id}`}>
          <img
            className="w-30 h-48 rounded-lg hover:scale-110"
            src={
              books.bookitem.volumeInfo.imageLinks
                ? books.bookitem.volumeInfo.imageLinks.thumbnail
                : 'https://media.istockphoto.com/id/867259496/vector/closed-book-with-blank-cover-icon-image.jpg?s=170667a&w=0&k=20&c=Jj7-vBv9rbCn7_3_ootaVDoU8orpoNwj5X1VQZlOpts='
            }
            alt={books.bookitem.volumeInfo.title}
          />
          <p className="text-sm">
            {books.bookitem.volumeInfo.title.length > 15
              ? `${books.bookitem.volumeInfo.title.substring(0, 15)}...`
              : books.bookitem.volumeInfo.title}
          </p>
        </Link>
      </div>
    ))
  }

  return (
    <>
      <div className="max-w-4xl mx-auto">
        <Nav />
        <div className="flex min-h-screen flex-row bg-gray-200 shadow-sm">
          <aside className="sidebar w-48 -translate-x-full transform bg-white p-4 transition-transform duration-150 ease-in md:translate-x-0 md:shadow-md">
            <div className="my-2 w-full border-b-4 border-gray-300 text-center">
              <span className="font-mono text-xl font-bold tracking-widest">
                <span className="">BOOKSHELF</span>
              </span>
            </div>
            {userBookshelves &&
              userBookshelves.map((bookshelf) => (
                <div className="my-4 border-b-4" key={bookshelf._id}>
                  <button
                    onClick={chooseBookshelf}
                    className={chosenbooshelfButton(bookshelf._id)}
                    value={bookshelf._id}
                  >
                    {bookshelf.bookshelfName.toUpperCase()}
                  </button>
                </div>
              ))}
          </aside>

          <main className="main -ml-48 gird flex-grow flex-col p-2 transition-all duration-150 md:ml-0">
            <div className=" h-full bg-white shadow-md ">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 pt-6">
                {getAllBooks && !booksFromSelectedBooshelf && mapBooks(getAllBooks)}
                {booksFromSelectedBooshelf && mapBooks(booksFromSelectedBooshelf)}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
