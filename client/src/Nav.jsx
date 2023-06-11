import { Link } from 'react-router-dom'

export default function Nav() {
  return (
    <div className="w-32">
      <Link to={'/'}>
        <img className="w-32 mb-8 mt-8" src="../logo/MEH_v5.png" alt="logo" />
      </Link>
    </div>
  )
}
