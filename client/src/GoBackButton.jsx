import { useNavigate } from 'react-router-dom'

export default function GoBackButton() {
  const navigate = useNavigate()
  return (
    <div>
      <button
        className="flex mt-5 p-2 my-1 border border-zinc-700 rounded-full bg-white text-black hover:bg-zinc-700 hover:text-white"
        onClick={() => navigate(-1)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        &nbsp;Go back
      </button>
    </div>
  )
}
