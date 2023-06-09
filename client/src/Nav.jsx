import { Link } from 'react-router-dom'

export default function Nav() {
  return (
    <>
      <Link to={'/'}>
        <img className="w-32 mb-8" src="../logo/MEH_v3.png" alt="logo" />
      </Link>
    </>
  )
}
