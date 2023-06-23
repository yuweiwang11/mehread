import { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export const UserDataContext = createContext()

export function UserDataContextProvider({ children }) {
  const [user, setUser] = useState(null)

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

  return <UserDataContext.Provider value={{ user, setUser }}>{children}</UserDataContext.Provider>
}
