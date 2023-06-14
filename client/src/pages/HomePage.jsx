import SearchBar from '../SearchBar'
import { useLocation } from 'react-router-dom'
import Nav from '../Nav'

export default function HomePage() {
  const path = useLocation()
  console.log(path.pathname)
  if (path.pathname === '/') {
    console.log('home page')
  }
  // function submitSearch(e) {
  //   e.preventDefault()
  //   axios.post('/bookSearch', {
  //     searchKeyword,
  //   })
  // }
  return (
    <>
      <Nav />

      <div className="p-6 flex flex-col justify-center items-center mt-36">
        <img className="w-96 mb-8" src="../logo/MEH_v3.png" alt="logo" />
        <SearchBar />
      </div>
    </>
  )
}
