import { useState } from 'react'
import axios from 'axios'
import { Navigate, Link } from 'react-router-dom'
import SearchBar from '../SearchBar'

export default function HomePage() {
  // function submitSearch(e) {
  //   e.preventDefault()
  //   axios.post('/bookSearch', {
  //     searchKeyword,
  //   })
  // }
  return (
    <>
      <div className="p-6 flex flex-col justify-center items-center mt-36">
        <img className="w-96 mb-8" src="./logo/MEH_v3.png" alt="logo" />
        <SearchBar />
      </div>
    </>
  )
}
