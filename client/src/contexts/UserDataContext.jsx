import { createContext, useEffect, useState } from 'react'

import axios from 'axios'
// import Cookies from 'js-cookie'

export const UserDataContext = createContext()

export function UserDataContextProvider({ children }) {
  const [user, setUser] = useState(null)
  // console.log(Cookies.get())

  useEffect(() => {
    const getUser = () => {
      if (!user) {
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
            if (response.status === 200) {
              setUser(response.data.user)
            } else {
              throw new Error('authentication failed')
            }
          })
          .catch((error) => {
            console.log(error)
          })
      }
    }
    getUser()
  }, [])

  useEffect(() => {
    const getUser = () => {
      if (!user) {
        axios
          .get('/auth/profile', {
            withCredentials: true,
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          })
          .then((response) => {
            console.log('local user: ' + JSON.stringify(response.data))
            console.log('local user: ' + response.status)
            if (response.status === 200) {
              setUser(response.data)
            } else {
              throw new Error('Local user authentication failed')
            }
          })
          .catch((error) => {
            console.log(error)
          })
      }
    }
    getUser()
  }, [])

  return <UserDataContext.Provider value={{ user, setUser }}>{children}</UserDataContext.Provider>
}
