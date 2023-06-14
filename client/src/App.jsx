import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import axios from 'axios'

import SearchResultPage from './pages/SearchResultPage'
import BookDetailPage from './pages/BookDetailPage'
import SigninPage from './pages/SigninPage'
import SignupPage from './pages/SignupPage'
import AccountPage from './pages/AccountPage'
import { AuthContextProvider } from './context/AuthContext'
import ProtectedRoute from './ProtectedRoute'

axios.defaults.baseURL = 'http://localhost:4000'

function App() {
  return (
    <>
      <AuthContextProvider>
        <Routes>
          <Route>
            {/* <Route path="/" element={<Layout />}> */}
            <Route path="/" element={<HomePage />} />
            <Route path="/books/:searchKeyword" element={<SearchResultPage />} />
            <Route path="/book/:bookIdentifier" element={<BookDetailPage />} />
            <Route
              path="/mehread/account"
              element={
                <ProtectedRoute>
                  <AccountPage />
                </ProtectedRoute>
              }
            />
            <Route path="/mehread/signin" element={<SigninPage />} />
            <Route path="/mehread/signup" element={<SignupPage />} />
          </Route>
        </Routes>
      </AuthContextProvider>
    </>
  )
}

export default App
