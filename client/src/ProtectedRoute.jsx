import { Navigate } from 'react-router-dom'
import { UserAuth } from './context/AuthContext'
export default function ProtectedRoute({ children }) {
  const { user } = UserAuth()
  if (!user) {
    return <Navigate to="/mehread/signin" />
  }

  return children
}
