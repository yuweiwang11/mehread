import axios from 'axios'
import { UserDataContext } from '../contexts/UserDataContext'
import { useContext, useEffect, useState } from 'react'
import Nav from '../Nav'

export default function BookShelfPage() {
  const { user } = useContext(UserDataContext)
  const [userBookshelves, setUserBookshelves] = useState([])
  let userid = ''
  if (user) {
    userid = user._id
  }

  useEffect(() => {
    if (user) {
      axios
        .post('/bookshelf/getbookshelves', { userid })
        .then((response) => {
          console.log(response.data)
          setUserBookshelves(response.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [user])

  return (
    <>
      <div className="max-w-4xl mx-auto border border-black">
        <Nav />
        <div>bookshelf page hello {userid}</div>
        {userBookshelves.map((bookshelf, index) => (
          <div className="flex flex-col" key={index}>
            {bookshelf._id}
            {bookshelf.bookshelfName}
          </div>
        ))}
      </div>
    </>
  )
}
