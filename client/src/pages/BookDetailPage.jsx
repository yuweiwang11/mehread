import axios from 'axios'
import { useEffect, useState, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { UserDataContext } from '../contexts/UserDataContext'
import Nav from '../Nav'
import Footer from '../Footer'

import Spinner from '../Spinner'
import SearchBar from '../SearchBar'
import Modal from '../Modal'
import parse from 'html-react-parser'
import GoBackButton from '../GoBackButton'

export default function BookDetailPage() {
  const navigate = useNavigate()
  const { user } = useContext(UserDataContext)
  const { bookIdentifier } = useParams()
  const [bookInfo, setBookInfo] = useState({})
  const [bookInfoForBookitem, setBookInfoForBookitem] = useState(null)
  const [loading, setLoading] = useState(false)
  const [moreDescription, setMoreDescription] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [bookshelves, setBookshelves] = useState(null)
  const [chosenBookshelf, setChosenBookshelf] = useState(null)
  const [bookAlreadySaved, setBookAlreadySaved] = useState(false)
  let userid = null
  if (user) {
    userid = user._id
  }

  if (user && !bookshelves) {
    axios
      .post('/bookshelf/getbookshelves', { userid })
      .then((response) => {
        console.log(response.data)
        setBookshelves(response.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  let descriptionCSS = ''
  let decriptionButton = ''

  function getBookById(bookId) {
    axios
      .get(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
      .then((response) => {
        setBookInfoForBookitem(response.data)
        setBookInfo(response.data.volumeInfo)
        console.log(response.data)
      })
      .then(() => {
        setLoading(true)
      })
  }

  function getBookByISBN(ISBN) {
    axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${ISBN}`)
      .then((response) => {
        setBookInfoForBookitem(response.data.items[0])
        setBookInfo(response.data.items[0].volumeInfo)
      })
      .then(() => {
        setLoading(true)
      })
  }

  useEffect(() => {
    if (!isNaN(bookIdentifier)) {
      getBookByISBN(bookIdentifier)
    } else {
      getBookById(bookIdentifier)
    }
  }, [bookIdentifier])

  if (!loading) {
    return <Spinner />
  }

  if (user && bookInfoForBookitem) {
    const bookId = bookInfoForBookitem.id
    axios.post('/bookshelf/checkBookSaved', { userid }).then((response) => {
      const userBooks = response.data
      for (let i = 0; i < userBooks.length; i++) {
        if (userBooks[i].bookitem.id === bookId) {
          setBookAlreadySaved(true)
          console.log(userBooks[i]._id)
        }
      }
    })
  }

  if (!moreDescription) {
    descriptionCSS = 'mt-5 line-clamp-6'
    decriptionButton = 'Show More ▽'
  } else if (moreDescription) {
    descriptionCSS = 'mt-5'
    decriptionButton = 'Show Less △'
  }
  if (!bookInfo.description || bookInfo.description.length < 530) {
    descriptionCSS = 'mt-5'
    decriptionButton = null
  }

  function chooseBookshelfButton(bookshelfName) {
    const inactivated =
      'mt-10 inline-block w-2/3 rounded-full bg-zinc-100 border-2 border-zinc-500  py-4 text-sm font-bold text-black shadow-md hover:bg-zinc-800 hover:text-white'
    const activated =
      'mt-10 inline-block w-2/3 rounded-full py-4 bg-zinc-800 text-white text-sm font-bold shadow-md '
    if (bookshelfName === chosenBookshelf) {
      return activated
    } else {
      return inactivated
    }
  }

  function submitAddBook(e) {
    e.preventDefault()
    for (let i = 0; i < bookshelves.length; i++) {
      if (bookshelves[i].bookshelfName === chosenBookshelf) {
        const targetBookshelfId = bookshelves[i]._id
        try {
          axios.put('/bookshelf/addToBookShelves', {
            targetBookshelfId,
            bookInfoForBookitem,
            userid,
          })
          alert(`Added to ${chosenBookshelf}`)
          setModalOpen(false)
        } catch (e) {
          console.log(e)
        }
      }
    }
  }

  return (
    <>
      <div className="mb-32">
        <div className="max-w-4xl mx-auto ">
          <Nav />
          <div className="flex items-center justify-center">
            <SearchBar />
          </div>

          <GoBackButton />

          <div className="mt-5">
            <h1 className="text-2xl font-bold">{bookInfo.title}</h1>
            <h1 className="text-xl">{bookInfo.subtitle}</h1>

            <div className="mt-5 grid grid-cols-3 gap-2">
              <img
                className="ml-2 w-40"
                src={
                  bookInfo.imageLinks
                    ? bookInfo.imageLinks?.thumbnail
                    : 'https://media.istockphoto.com/id/867259496/vector/closed-book-with-blank-cover-icon-image.jpg?s=170667a&w=0&k=20&c=Jj7-vBv9rbCn7_3_ootaVDoU8orpoNwj5X1VQZlOpts='
                }
                alt={bookInfo.title}
              />

              <div>
                <h3 className="">
                  Author(s):&nbsp;
                  {bookInfo.authors?.map((author, index) => (
                    <div className="inline" key={index}>
                      {bookInfo.authors.length > 1 ? ` ${author} |` : `${author}`}
                    </div>
                  ))}
                </h3>

                <h3>
                  ISBN:{' '}
                  {bookInfo.industryIdentifiers && bookInfo.industryIdentifiers[1]
                    ? bookInfo.industryIdentifiers[1]?.identifier
                    : 'Not available'}
                </h3>
                <h3>Language: {bookInfo.language}</h3>
                <h3>Pages count: {bookInfo.pageCount}</h3>
                <h3>
                  Published: {bookInfo.publishedDate} {bookInfo.publisher}
                </h3>
              </div>
            </div>

            {user && (
              <div className="mt-3">
                {bookAlreadySaved ? (
                  <button className="flex mt-5 p-2 my-1  bg-zinc-700 text-white  rounded-xl">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6 "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                      />
                    </svg>
                    &nbsp;Book Already Saved
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setModalOpen(true)
                    }}
                    className="flex mt-5 p-2 my-1 border border-gray-800 bg-white  rounded-xl  hover:bg-black hover:text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                      />
                    </svg>
                    &nbsp;Save to Bookshelf
                  </button>
                )}

                <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
                  {bookshelves &&
                    bookshelves.map((bookshelf) => (
                      <div key={bookshelf._id}>
                        <button
                          onClick={(e) => {
                            setChosenBookshelf(e.target.value)
                          }}
                          className={chooseBookshelfButton(bookshelf.bookshelfName)}
                          value={bookshelf.bookshelfName}
                        >
                          {bookshelf.bookshelfName.toUpperCase()}
                        </button>
                      </div>
                    ))}
                  {chosenBookshelf && (
                    <div className="flex justify-center mt-10 items-center ">
                      <p className="text-xl font-semibold uppercase tracking-widest text-zinc-800">
                        {`Save book to ${chosenBookshelf}.`}
                      </p>
                      <button
                        onClick={submitAddBook}
                        className="ml-5 inline-block w-20 rounded-full bg-zinc-800 py-2 text-sm font-bold text-white shadow-xl hover:bg-zinc-900"
                      >
                        Comfirm
                      </button>
                    </div>
                  )}
                </Modal>
              </div>
            )}

            <div className={descriptionCSS}>
              <div>
                Description: <br />
                {!bookInfo.description ? 'Not available' : parse(bookInfo.description)}
              </div>
            </div>
            <button
              className="bg-white underline float-right"
              onClick={() => {
                moreDescription ? setMoreDescription(false) : setMoreDescription(true)
              }}
            >
              {decriptionButton}
            </button>
          </div>
        </div>
      </div>
      <div className="mt-28 fixed inset-x-0 bottom-0">
        <Footer />
      </div>
    </>
  )
}
