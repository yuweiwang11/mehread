import { Routes, Route } from 'react-router-dom'
import axios from 'axios'
import HomePage from './pages/HomePage'
import SearchResultPage from './pages/SearchResultPage'
import BookDetailPage from './pages/BookDetailPage'
import SigninPage from './pages/SigninPage'
import SignupPage from './pages/SignupPage'
import AccountPage from './pages/AccountPage'
import BookShelfPage from './pages/BookShelfPage'
import { UserDataContextProvider } from './contexts/UserDataContext'

axios.defaults.baseURL = 'http://localhost:4000'

function App() {
  return (
    <>
      <UserDataContextProvider>
        <Routes>
          <Route>
            {/* <Route path="/" element={<Layout />}> */}
            <Route path="/" element={<HomePage />} />
            <Route path="/books/:searchKeyword" element={<SearchResultPage />} />
            <Route path="/book/:bookIdentifier" element={<BookDetailPage />} />
            <Route path="/mehread/account" element={<AccountPage />} />
            <Route path="/mehread/signin" element={<SigninPage />} />
            <Route path="/mehread/signup" element={<SignupPage />} />
            <Route path="/mehread/bookshelf" element={<BookShelfPage />} />
          </Route>
        </Routes>
      </UserDataContextProvider>
    </>
  )
}

export default App
