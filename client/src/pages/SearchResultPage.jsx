import { Link, useParams, useNavigate } from 'react-router-dom'
import Nav from '../Nav'
import { useEffect, useState } from 'react'
import axios from 'axios'
import SearchBar from '../SearchBar'
import Spinner from '../Spinner'
import Pagination from '../Pagination'
import Footer from '../Footer'
import { useLocation } from 'react-router-dom'

export default function SearchResultPage() {
  const { pathname } = useLocation()

  const navigate = useNavigate()
  const { searchKeyword } = useParams()
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(8)
  const resultsMessage = `Search results for "${searchKeyword}"`

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
    navigate(`/book/${searchWord}`)
  }

  useEffect(() => {
    if ((!isNaN(searchKeyword) && searchKeyword.length === 13) || searchKeyword.length === 10) {
      searchByISBN(searchKeyword)
    } else {
      searchByName(searchKeyword)
    }
    setCurrentPage(1)
  }, [searchKeyword])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentPage])

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
      <div className="max-w-4xl mx-auto ">
        <Nav />
        <div className="flex items-center justify-center">
          <SearchBar />
        </div>
        <div className="mt-8 ml-2">{resultsMessage}</div>
        <div className="mt-5">
          {currentPosts.length > 0 &&
            currentPosts.map((book) => (
              <div key={book.id}>
                <div className="flex gap-4 p-4 mb-4 border border-gray-100 rounded-xl bg-gray-50 shadow-md">
                  <div>
                    <Link className="flex w-32" to={`/book/${book.id}`}>
                      <img
                        className=""
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
                    <Link to={`/book/${book.id}`}>
                      <h2 className="text-xl font-bold hover:text-gray-500 ">
                        {book.volumeInfo.title}
                      </h2>
                    </Link>

                    <div className="md:justify-left mt-1">
                      {book.volumeInfo.authors?.map((author, index) => (
                        <div className="inline " key={index}>
                          {book.volumeInfo.authors.length > 1 ? ` ${author} |` : `${author}`}
                        </div>
                      ))}
                      <div className="">{book.volumeInfo.publishedDate}</div>
                      <div>{book.volumeInfo.publisher}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="mb-16">
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={searchResults.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </div>
      <Footer />
    </>
  )
}
