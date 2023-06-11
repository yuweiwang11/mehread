import { Link, useParams } from 'react-router-dom'
import Nav from '../Nav'
import { useEffect, useState } from 'react'
import axios from 'axios'
import SearchBar from '../SearchBar'
import Spinner from '../Spinner'
import Pagination from '../Pagination'

export default function SearchResultPage() {
  const { searchKeyword } = useParams()
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(8)
  const resultsMessage = `Search results for "${searchKeyword}"`

  function linkToBookDetail(book) {
    return `/book/${
      book.volumeInfo.industryIdentifiers
        ? book.volumeInfo.industryIdentifiers[0].identifier
        : book.volumeInfo.title + '#' + book.volumeInfo.authors[0]
    }`
  }

  function searchByName(searchWord) {
    axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=${searchWord}&maxResults=40`)
      .then((response) => {
        setSearchResults(response.data.items)
      })
      .then(() => {
        setLoading(true)
      })
  }

  function searchByISBN(searchWord) {
    axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${searchWord}`)
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

  // pagination
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = searchResults.slice(indexOfFirstPost, indexOfLastPost)
  // paginate function render content clicing on page number
  function paginate(pageNumber) {
    setCurrentPage(pageNumber)
  }

  return (
    <>
      <Nav />
      <SearchBar />
      <div>{resultsMessage}</div>

      <div className="mt-4">
        {currentPosts.length > 0 &&
          currentPosts.map((book) => (
            <div key={book.id}>
              <div className="flex gap-4 p-4 mb-4 border border-gray-300 rounded-xl">
                <div className="flex w-32">
                  <Link to={linkToBookDetail(book)}>
                    <img
                      src={
                        book.volumeInfo.imageLinks === undefined
                          ? 'https://media.istockphoto.com/id/867259496/vector/closed-book-with-blank-cover-icon-image.jpg?s=170667a&w=0&k=20&c=Jj7-vBv9rbCn7_3_ootaVDoU8orpoNwj5X1VQZlOpts='
                          : book.volumeInfo.imageLinks.thumbnail
                      }
                      alt={`${book.volumeInfo.title} img`}
                    ></img>
                  </Link>
                </div>

                <div className="">
                  <Link to={linkToBookDetail(book)}>
                    <h2 className="text-xl font-bold hover:text-gray-500 ">
                      {book.volumeInfo.title}
                    </h2>
                  </Link>

                  <div className="flex mt-1">
                    {book.volumeInfo.authors?.map((author, index) => (
                      <p key={index}>{author} |</p>
                    ))}
                    &nbsp;{book.volumeInfo.publishedDate} | &nbsp;{book.volumeInfo.publisher}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={searchResults.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </>
  )
}
