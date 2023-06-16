import { createContext, useContext, useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  sendEmailVerification,
  updateProfile,
} from 'firebase/auth'
import { auth } from '../firebase'

const UserContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({})

  const createUser = async (username, email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password).catch((err) => console.log(err))
      await sendEmailVerification(auth.currentUser).catch((err) => console.log(err))
      await updateProfile(auth.currentUser, { displayName: username }).catch((err) =>
        console.log(err)
      )
    } catch (err) {
      console.log(err)
    }
  }

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logout = () => {
    return signOut(auth)
  }

  const googleSignin = () => {
    const provider = new GoogleAuthProvider()
    // signInWithPopup(auth, provider)
    signInWithRedirect(auth, provider)
  }

  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser)
      setUser(currentUser)
    })
    return () => {
      unsubcribe()
    }
  }, [])

  return (
    <UserContext.Provider value={{ createUser, user, logout, signIn, googleSignin }}>
      {children}
    </UserContext.Provider>
  )
}

export const UserAuth = () => {
  return useContext(UserContext)
}
