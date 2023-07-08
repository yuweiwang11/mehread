import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function DropdownMenu({ userBookData }) {
  const navigate = useNavigate()
  const userbookid = userBookData._id
  console.log(userbookid)
  function deleteBook() {
    if (confirm('Are you sure you want to delete this book?')) {
      // Save it!
      axios.post('/bookshelf/deleteBook', { userbookid }).then((response) => {
        console.log(response.data)
      })
      navigate(-1)
    } else {
      // Do nothing!
      return
    }
  }
  return (
    <>
      <ul className="menu absolute  w-40 rounded-md border border-zinc-300 bg-white divide-y divide-zinc-300 shadow dark:bg-gray-700">
        <li>
          <a
            onClick={() => {
              console.log('onclick')
            }}
            className="text-gray-700 block px-4 py-2 text-md hover:bg-zinc-200 cursor-pointer"
          >
            Move to
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
    </>
  )
}
