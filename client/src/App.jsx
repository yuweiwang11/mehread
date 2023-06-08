import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'

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
