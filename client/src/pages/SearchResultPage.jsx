import { Link, useParams } from 'react-router-dom'
import Nav from '../Nav'
import { useEffect, useState } from 'react'
import axios from 'axios'
import SearchBar from '../SearchBar'
import Spinner from '../Spinner'

export default function SearchResultPage() {
  const { searchKeyword } = useParams()
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)

  function searchByName(searchKeyword) {
    axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=${searchKeyword}`)
      .then((response) => {
        setSearchResults(response.data.items)
      })
      .then(() => {
        setLoading(true)
      })
  }

  function searchByISBN(searchKeyword) {
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=isbn:${searchKeyword}`
      )
      .then((response) => {
        setSearchResults(response.data.items)
      })
      .then(() => {
        setLoading(true)
      })
  }

  useEffect(() => {
    if (isNaN(searchKeyword)) {
      searchByName(searchKeyword)
    } else {
      searchByISBN(searchKeyword)
    }
  }, [searchKeyword])

  if (!loading) {
    return <Spinner />
  }

  return (
    <>
      <Nav />
      <SearchBar />
      <div>search results for {searchKeyword}</div>

      <div>
        {searchResults.length > 0 &&
          searchResults.map((book) => (
            <div key={book.id}>
              <Link
                to={`/book/${book.volumeInfo.industryIdentifiers[0].identifier}`}
              >
                <img
                  src={
                    book.volumeInfo.imageLinks === undefined
                      ? 'https://media.istockphoto.com/id/867259496/vector/closed-book-with-blank-cover-icon-image.jpg?s=170667a&w=0&k=20&c=Jj7-vBv9rbCn7_3_ootaVDoU8orpoNwj5X1VQZlOpts='
                      : book.volumeInfo.imageLinks.thumbnail
                  }
                  alt={`${book.volumeInfo.title} img`}
                ></img>
                <h2>{book.volumeInfo.title}</h2>
                <h3>
                  {book.volumeInfo.authors?.map((author) => (
                    <div key={author[0]}>{author}</div>
                  ))}
                </h3>
              </Link>
            </div>
          ))}
      </div>
    </>
  )
}
