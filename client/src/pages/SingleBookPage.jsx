import React from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

export default function SingleBookPage() {
  const { userbookid } = useParams()
  return <div>{userbookid}</div>
}
