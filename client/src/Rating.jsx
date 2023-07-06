import { useState } from 'react'
import { FaStar } from 'react-icons/fa'

export default function Rating() {
  const [rating, setRating] = useState(null)
  const [hover, setHover] = useState(null)
  return (
    <>
      <div className="flex">
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
                  size={50}
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
      <div>rating: {rating}</div>
    </>
  )
}
