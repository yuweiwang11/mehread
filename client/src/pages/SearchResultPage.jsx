import { Link, useParams, Navigate } from 'react-router-dom'
import Nav from '../Nav'
import { useEffect, useState } from 'react'
import axios from 'axios'
import SearchBar from '../SearchBar'
import Spinner from '../Spinner'

export default function SearchResultPage() {
  const { searchKeyword } = useParams()
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)
  // const [errMessage, setErrMessage] = useState('')
  // function getSearchResults() {}

  useEffect(() => {
    // if (!searchKeyword) {
    //   setErrMessage('please enter search word')
    //   return <Navigate to={'/'} />
    // } else {
    axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=${searchKeyword}`)
      .then((response) => {
        setSearchResults(response.data.items)
        console.log(response.data.items)
      })
      .then(() => {
        setLoading(true)
      })

    // }
  }, [searchKeyword])

  if (!loading) {
    return <Spinner />
  }

  return (
    <>
      <Nav />
      <SearchBar />
      {/* {errMessage} */}
      <div>search results for {searchKeyword}</div>

      <div>
        {/* {searchResults[0]} */}
        {searchResults.length === 10 &&
          searchResults.map((book) => (
            <div key={book.id}>
              <Link to={`/book/${book.id}`}>
                <img
                  src={
                    book.volumeInfo.imageLinks === undefined
                      ? 'https://islandpress.org/sites/default/files/default_book_cover_2015.jpg'
                      : book.volumeInfo.imageLinks.thumbnail
                  }
                  alt={`${book.volumeInfo.title} img`}
                ></img>
                <h2>{book.volumeInfo.title}</h2>
                <h3>{book.volumeInfo.authors}</h3>
              </Link>
            </div>
          ))}
      </div>
    </>
  )
}
