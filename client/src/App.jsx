import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:4000'

function App() {
  return (
    <>
      <Routes>
        <Route>
          {/* <Route path="/" element={<Layout />}> */}
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/account/bookings/:id" element={<BookingPage />} /> */}
        </Route>
      </Routes>
    </>
  )
}

export default App
