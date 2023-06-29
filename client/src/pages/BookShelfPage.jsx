import axios from 'axios'
import { UserDataContext } from '../contexts/UserDataContext'
import { useContext, useEffect, useState } from 'react'

export default function BookShelfPage() {
  const { user } = useContext(UserDataContext)
  let userid = ''
  if (user) {
    userid = user._id
  }

  useEffect(() => {
    axios
      .post('/bookshelf/getbookshelves', { userid })
      .then((response) => {
        // console.log(response)
        // console.log(response.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [user])

  return <div>bookshelf page hello {userid}</div>
}
