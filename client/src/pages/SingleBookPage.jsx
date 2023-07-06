import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import GoBackButton from '../GoBackButton'
import Nav from '../Nav'
import SearchBar from '../SearchBar'

export default function SingleBookPage() {
  const { userbookid } = useParams()
  const [userBookData, setUserBookData] = useState(null)
  const [userSingleBookInfo, setUserSingleBookInfo] = useState(null)
  const [bookshelfName, setBookshelfName] = useState(null)

  useEffect(() => {
    axios.post('/bookshelf/getUserSingleBook', { userbookid }).then((response) => {
      console.log(response.data)
      setUserBookData(response.data)
      setUserSingleBookInfo(response.data.bookitem.volumeInfo)
    })
  }, [userbookid])
  if (userBookData && !bookshelfName) {
    const bookshelfid = userBookData.bookshelfId
    axios.post('/bookshelf/getBookshelfName', { bookshelfid }).then((response) => {
      setBookshelfName(response.data.bookshelfName)
    })
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
                <img
                  src={
                    userSingleBookInfo.imageLinks
                      ? userSingleBookInfo.imageLinks.thumbnail
                      : 'https://media.istockphoto.com/id/867259496/vector/closed-book-with-blank-cover-icon-image.jpg?s=170667a&w=0&k=20&c=Jj7-vBv9rbCn7_3_ootaVDoU8orpoNwj5X1VQZlOpts='
                  }
                  alt={userSingleBookInfo.title}
                />
              </div>
              {/* --------------------img div--------------------------------- */}
              {/* --------------------info div--------------------------------- */}
              <div>
                <span className="flex bg-gray-100 text-gray-800 text-md font-medium mr-32 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300">
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
                      d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                    />
                  </svg>
                  &nbsp;{bookshelfName}
                </span>
                <div></div>
                <div>{userSingleBookInfo.title}</div>
                <div>{userSingleBookInfo.subtitle}</div>
                {userSingleBookInfo.authors?.map((author, index) => (
                  <div className="inline " key={index}>
                    {userSingleBookInfo.authors.length > 1 ? ` ${author} |` : `${author}`}
                  </div>
                ))}
              </div>
              {/* --------------------info div--------------------------------- */}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
