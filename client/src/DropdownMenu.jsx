import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function DropdownMenu({ userBookData }) {
  const navigate = useNavigate()
  const userbookid = userBookData._id
  const userid = userBookData.userId
  const [menuOpen, setMenuOpen] = useState(false)
  const [userBookshelves, setUserBookshelves] = useState(null)
  // const [bookshelfIdToMove, setBookshelfIdToMove] = useState(null)

  useEffect(() => {
    axios
      .post('/bookshelf/getbookshelves', { userid })
      .then((response) => {
        setUserBookshelves(response.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  function deleteBook() {
    if (confirm('Are you sure you want to delete this book?')) {
      axios.post('/bookshelf/deleteBook', { userbookid }).then((response) => {
        console.log(response.data)
      })
      navigate(-1)
    } else {
      return
    }
  }

  function changeBookshelf(e) {
    const bookshelfIdToMove = e.target.value
    axios.put('/bookshelf/moveBook', { bookshelfIdToMove, userbookid }).then((response) => {
      console.log(response.data)
    })
    navigate(-1)
  }

  return (
    <>
      <ul className="menu absolute w-40 rounded-md border border-zinc-300 bg-white divide-y divide-zinc-300 shadow dark:bg-gray-700">
        <li>
          <a
            onClick={() => {
              setMenuOpen((prev) => !prev)
            }}
            className="flex items-center text-gray-700 px-4 py-2 text-md hover:bg-zinc-200 cursor-pointer"
          >
            <p>Move to&nbsp;</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4 "
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </a>
        </li>
        <li>
          <a
            onClick={deleteBook}
            className="text-gray-700 block px-4 py-2 text-md hover:bg-rose-700 hover:text-white cursor-pointer"
          >
            Delete
          </a>
        </li>
      </ul>

      {menuOpen && (
        <div className="absolute ml-40">
          <ul className="menu absolute w-40 rounded-md border border-zinc-300 bg-white divide-y divide-zinc-300 shadow dark:bg-gray-700">
            {userBookshelves &&
              userBookshelves
                .filter((availableBookshelf) => availableBookshelf._id !== userBookData.bookshelfId)
                .map((bookshelf) => (
                  <li key={bookshelf._id}>
                    <option
                      value={bookshelf._id}
                      className="flex text-gray-700 px-2 py-1 text-md hover:bg-zinc-200 cursor-pointer"
                      onClick={changeBookshelf}
                    >
                      &nbsp;{bookshelf.bookshelfName.toUpperCase()}
                    </option>
                  </li>
                ))}
          </ul>
        </div>
      )}
    </>
  )
}
