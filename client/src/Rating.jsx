import axios from 'axios'
import { useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa'

export default function Rating({ userBookRating, userbookid }) {
  const [rating, setRating] = useState(userBookRating || null)
  const [hover, setHover] = useState(null)

  useEffect(() => {
    if (userBookRating) {
      setRating(userBookRating)
    }
  }, [])

  useEffect(() => {
    if (rating !== userBookRating) {
      axios.put('/bookshelf/rateBook', { userbookid, rating })
    }
  }, [rating])

  return (
    <>
      <div className="inline-block justify-center text-center mt-5">
        <div className="flex space-x-1">
          {[...Array(5)].map((star, index) => {
            const ratingValue = index + 1
            return (
              <div key={index}>
                <label>
                  <input
                    className="hidden"
                    type="radio"
                    name="rating"
                    value={ratingValue}
                    onClick={() => {
                      setRating(ratingValue)
                    }}
                  />
                  <FaStar
                    size={25}
                    color={ratingValue <= (hover || rating) ? 'FFA41B' : 'B7B7B7'}
                    onMouseEnter={() => {
                      setHover(ratingValue)
                    }}
                    onMouseLeave={() => {
                      setHover(null)
                    }}
                  />
                </label>
              </div>
            )
          })}
        </div>
        <div className="mt-1">Rate This Book</div>
      </div>
    </>
  )
}
