import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Nav from '../Nav'
import Spinner from '../Spinner'
import SearchBar from '../SearchBar'
import parse from 'html-react-parser'

export default function BookDetailPage() {
  const navigate = useNavigate()

  const { bookIdentifier } = useParams()
  const [bookInfo, setBookInfo] = useState({})
  const [loading, setLoading] = useState(false)
  const [moreDescription, setMoreDescription] = useState(false)

  let descriptionCSS = ''
  let decriptionButton = ''

  function getBookById(bookId) {
    axios
      .get(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
      .then((response) => {
        setBookInfo(response.data.volumeInfo)
        console.log(response.data.volumeInfo)
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

  if (!moreDescription) {
    descriptionCSS = 'mt-5 line-clamp-6'
    decriptionButton = 'Show More ▼'
  } else if (moreDescription) {
    descriptionCSS = 'mt-5'
    decriptionButton = 'Show Less ▲'
  }

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <Nav />
        <div className="flex items-center justify-center">
          <SearchBar />
        </div>

        <button className="mt-5" onClick={() => navigate(-1)}>
          go back
        </button>

        <div className="mt-8">
          <h1 className="text-2xl">{bookInfo.title}</h1>
          <h1 className="text-xl">{bookInfo.subtitle}</h1>

          <div className="mt-5 grid grid-cols-3 gap-2 ">
            <img src={bookInfo.imageLinks?.thumbnail} alt={bookInfo.title} />
            <div>
              <h3 className="flex">
                Author(s):&nbsp;
                {bookInfo.authors?.map((author, index) => (
                  <div key={index}>{author}</div>
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

          <div className={descriptionCSS}>
            <p>
              Description: <br />
              {!bookInfo.description ? 'Not available' : parse(bookInfo.description)}
            </p>
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
    </>
  )
}
