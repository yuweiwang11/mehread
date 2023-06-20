import { Routes, Route } from 'react-router-dom'
import axios from 'axios'

import HomePage from './pages/HomePage'
import SearchResultPage from './pages/SearchResultPage'
import BookDetailPage from './pages/BookDetailPage'
import SigninPage from './pages/SigninPage'
import SignupPage from './pages/SignupPage'
import AccountPage from './pages/AccountPage'
import UserLibrary from './pages/UserLibrary'
import { useEffect, useState } from 'react'

axios.defaults.baseURL = 'http://localhost:4000'

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const getUser = () => {
      // fetch('http://localhost:4000/auth/login/success', {
      //   method: 'GET',
      //   credentials: 'include',
      //   headers: {
      //     Accept: 'application/json',
      //     'Content-Type': 'application/json',
      //     'Access-Control-Allow-Credentials': true,
      //   },
      // })
      //   .then((response) => {
      //     if (response.status === 200) return response.json()
      //     throw new Error('authentication has been failed!')
      //   })
      //   .then((resObject) => {
      //     setUser(resObject.user)
      //   })
      //   .catch((err) => {
      //     console.log(err)
      //   })

      axios
        .get('http://localhost:4000/auth/login/success', {
          withCredentials: true,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          console.log(response.status)
          console.log(response.data.user)
          setUser(response.data.user)
        })
        .catch((error) => {
          console.log(error)
        })
    }
    getUser()
  }, [])

  console.log(user)

  return (
    <>
      <Routes>
        <Route>
          {/* <Route path="/" element={<Layout />}> */}
          <Route path="/" element={<HomePage />} />
          <Route path="/books/:searchKeyword" element={<SearchResultPage />} />
          <Route path="/book/:bookIdentifier" element={<BookDetailPage />} />
          <Route path="/mehread/account" element={<AccountPage user={user} />} />
          <Route path="/mehread/signin" element={<SigninPage />} />
          <Route path="/mehread/signup" element={<SignupPage />} />
          <Route path="/mehread/lib" element={<UserLibrary />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
