import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Nav from '../Nav'
import Spinner from '../Spinner'
import SearchBar from '../SearchBar'

export default function BookDetailPage() {
  const { bookIdentifier } = useParams()
  const [bookInfo, setBookInfo] = useState({})
  const [loading, setLoading] = useState(false)

  function getBookById(bookId) {
    axios
      .get(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
      .then((response) => {
        setBookInfo(response.data.volumeInfo)
      })
      .then(() => {
        setLoading(true)
      })
  }

  function getBookByISBN(ISBN) {
    axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${ISBN}`)
      .then((response) => {
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

  return (
    <>
      <Nav />
      <SearchBar />

      <div>
        <h1 className="text-2xl">{bookInfo.title}</h1>
        <h1 className="text-xl">{bookInfo.subtitle}</h1>

        <h3 className="flex">
          Author(s):&nbsp;
          {bookInfo.authors?.map((author, index) => (
            <div key={index}>{author}</div>
          ))}
        </h3>
        <h3 className="flex">
          Category:{' '}
          {bookInfo.categories?.map((category, index) => (
            <div key={index}>&nbsp;{category}</div>
          ))}
        </h3>

        <h3>
          ISBN:{' '}
          {bookInfo.industryIdentifiers
            ? bookInfo.industryIdentifiers[1].identifier
            : 'Not available'}
        </h3>
        <h3>Language: {bookInfo.language}</h3>
        <h3>Pages count: {bookInfo.pageCount}</h3>
        <h3>
          Published: {bookInfo.publishedDate} {bookInfo.publisher}
        </h3>

        <img src={bookInfo.imageLinks?.thumbnail} alt={bookInfo.title} />

        <h3>Description: {bookInfo.description}</h3>
      </div>
    </>
  )
}
