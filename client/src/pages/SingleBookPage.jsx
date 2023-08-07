import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import GoBackButton from '../GoBackButton'
import Nav from '../Nav'
import SearchBar from '../SearchBar'
import Rating from '../Rating'
import DropdownMenu from '../DropdownMenu'
import Footer from '../Footer'

export default function SingleBookPage() {
  const { userbookid } = useParams()
  const [userBookData, setUserBookData] = useState(null)
  const [userSingleBookInfo, setUserSingleBookInfo] = useState(null)
  const [bookshelfName, setBookshelfName] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [addBookComment, setAddBookcomment] = useState(null)
  const [bookCommentUpdate, setBookCommentUpdate] = useState(false)

  useEffect(() => {
    axios.post('/bookshelf/getUserSingleBook', { userbookid }).then((response) => {
      console.log(response.data)
      setUserBookData(response.data)
      setUserSingleBookInfo(response.data.bookitem.volumeInfo)
    })
    setBookCommentUpdate(false)
  }, [bookCommentUpdate])

  if (userBookData && !bookshelfName) {
    const bookshelfid = userBookData.bookshelfId
    axios.post('/bookshelf/getBookshelfName', { bookshelfid }).then((response) => {
      setBookshelfName(response.data.bookshelfName)
    })
  }

  function addComment(e) {
    e.preventDefault()
    const bookid = userBookData._id
    axios.post('/bookshelf/addComment', { addBookComment, bookid }).then((response) => {
      setUserBookData(response.data)
      setBookCommentUpdate(true)
    })
  }

  function deleteComment(e) {
    console.log(e.target.value)
  }

  return (
    <>
      <div className="max-w-4xl mx-auto">
        <Nav />
        <div className="flex items-center justify-center">
          <SearchBar />
        </div>
        <GoBackButton />
        {userSingleBookInfo && (
          <div className="mt-5">
            <div className="mt-5 grid grid-cols-3 gap-2">
              {/* --------------------img div--------------------------------- */}
              <div>
                <button
                  onClick={() => {
                    setMenuOpen((prev) => !prev)
                  }}
                  data-dropdown-toggle="dropdown"
                  className="flex justify-center bg-gray-200 mt-5 text-gray-800 text-md font-medium mr-28 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300"
                >
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
                      d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                    />
                  </svg>
                  &nbsp;{bookshelfName && bookshelfName.toUpperCase()}
                </button>
                {menuOpen && <DropdownMenu userBookData={userBookData} />}
                <img
                  className="w-40 mt-5"
                  src={
                    userSingleBookInfo.imageLinks
                      ? userSingleBookInfo.imageLinks.thumbnail
                      : 'https://media.istockphoto.com/id/867259496/vector/closed-book-with-blank-cover-icon-image.jpg?s=170667a&w=0&k=20&c=Jj7-vBv9rbCn7_3_ootaVDoU8orpoNwj5X1VQZlOpts='
                  }
                  alt={userSingleBookInfo.title}
                />

                <Rating userBookRating={userBookData.rating} userbookid={userbookid} />
              </div>
              {/* --------------------img div--------------------------------- */}
              {/* --------------------info div--------------------------------- */}
              <div className="mt-3">
                <div className="text-2xl font-bold">{userSingleBookInfo.title}</div>
                <div className="text-xl">{userSingleBookInfo.subtitle}</div>
                {userSingleBookInfo.authors?.map((author, index) => (
                  <div className="inline mt-1" key={index}>
                    {userSingleBookInfo.authors.length > 1 ? ` ${author} |` : `${author}`}
                  </div>
                ))}

                <div className="mt-8">
                  <form onSubmit={addComment}>
                    <label className="text-xl font-bold">Your thoughts on this book:</label>
                    <textarea
                      name="comment"
                      onChange={(e) => {
                        setAddBookcomment(e.target.value)
                      }}
                      cols="30"
                      rows="10"
                    ></textarea>
                    <button>submit</button>
                  </form>
                </div>
              </div>
              <div className="mt-3 ml-2 ">
                <div className="flex justify-center text-xl font-bold">Comment</div>
                <div className="border border-zinc-400 rounded-md ">
                  {userBookData.comment.map((com, index) => (
                    <div className=" group ml-2" key={index}>
                      {com}
                      <button
                        onClick={deleteComment}
                        value={index}
                        className="ml-2 invisible group-hover:visible bg-pink-50 text-red-700 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-pink-700 dark:text-pink-50"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* --------------------info div--------------------------------- */}
            </div>
          </div>
        )}
      </div>
      <div className="fixed inset-x-0 bottom-0">
        <Footer />
      </div>
    </>
  )
}
