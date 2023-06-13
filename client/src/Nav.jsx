import { Link } from 'react-router-dom'

export default function Nav() {
  return (
    <>
      <div className="flex">
        <div className="cursor-pointer w-32">
          <Link to={'/'}>
            <img className="w-32 mb-8 mt-8" src="../logo/MEH_v5.png" alt="logo" />
          </Link>
        </div>
        <div className="mt-2 ml-auto p-5 underline">
          <Link to={'/mehread/login'}>login</Link>
        </div>
      </div>
    </>
  )
}
