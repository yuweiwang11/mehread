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

  useEffect(() => {
    axios.post('/bookshelf/getUserSingleBook', { userbookid }).then((response) => {
      console.log(response.data)
      setUserBookData(response.data)
      setUserSingleBookInfo(response.data.bookitem.volumeInfo)
    })
  }, [userbookid])

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
            <div>{userSingleBookInfo.title}</div>
            <div>{userSingleBookInfo.subtitle}</div>
            {userSingleBookInfo.authors?.map((author, index) => (
              <div className="inline " key={index}>
                {userSingleBookInfo.authors.length > 1 ? ` ${author} |` : `${author}`}
              </div>
            ))}

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
          </div>
        )}
      </div>
    </>
  )
}
