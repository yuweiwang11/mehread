import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function BookDetail() {
  const { bookISBN } = useParams()
  const [bookInfo, setBookInfo] = useState({})

  useEffect(() => {
    axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${bookISBN}`)

      .then((response) => {
        setBookInfo(response.data.items[0].volumeInfo)
        console.log(response.data.items[0].volumeInfo)
      })
  }, [bookISBN])
  return (
    <div>
      <h1 className="text-2xl">{bookInfo.title}</h1>
      <h3>
        {bookInfo.authors?.map((author) => (
          <div key={author[0]}>{author}</div>
        ))}
      </h3>
      <h3>
        {bookInfo.categories?.map((category) => (
          <div key={category[0]}>{category}</div>
        ))}
      </h3>
      <h3>{bookInfo.description}</h3>
      <h3>{bookISBN}</h3>
      <h3>{bookInfo.language}</h3>
      <h3>{bookInfo.pageCount}</h3>
      <h3>{bookInfo.publisher}</h3>
      <h3>{bookInfo.publishedDate}</h3>
      <img src={bookInfo.imageLinks?.thumbnail} alt={bookInfo.title} />
    </div>
  )
}
