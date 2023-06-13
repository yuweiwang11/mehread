import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import axios from 'axios'

import SearchResultPage from './pages/SearchResultPage'
import BookDetailPage from './pages/BookDetailPage'
import LoginPage from './pages/LoginPage'

axios.defaults.baseURL = 'http://localhost:4000'

function App() {
  return (
    <>
      <Routes>
        <Route>
          {/* <Route path="/" element={<Layout />}> */}
          <Route path="/" element={<HomePage />} />
          <Route path="/books/:searchKeyword" element={<SearchResultPage />} />
          <Route path="/book/:bookIdentifier" element={<BookDetailPage />} />
          <Route path="/mehread/login" element={<LoginPage />} />

          {/* <Route path="/account/bookings/:id" element={<BookingPage />} /> */}
        </Route>
      </Routes>
    </>
  )
}

export default App
