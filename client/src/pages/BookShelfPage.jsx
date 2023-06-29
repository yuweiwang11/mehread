import axios from 'axios'
import { UserDataContext } from '../contexts/UserDataContext'
import { useContext, useEffect, useState } from 'react'

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
      <div>bookshelf page hello {userid}</div>
      <div>{userBookshelves.map((bookshelf) => bookshelf.bookshelfName)}</div>
    </>
  )
}
