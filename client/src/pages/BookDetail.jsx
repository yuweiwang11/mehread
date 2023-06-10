import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function BookDetail() {
  const { bookId } = useParams()
  const [bookInfo, setBookInfo] = useState([])

  useEffect(() => {
    axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=${bookId}`)
      .then((response) => {
        setBookInfo(response.data.items)
        console.log(response.data.items)
        console.log(bookId)
      })
    // .then(() => {
    //   setLoading(true)
    // })
  }, [bookId])
  // return <div>{bookInfo[0].volumeInfo.title}</div>
  return <div>{bookInfo.map((book) => book.volumeInfo.title)}</div>
}
