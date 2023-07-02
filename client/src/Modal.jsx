import React from 'react'

export default function Modal({ open, children, onClose }) {
  if (!open) return null
  return (
    <div className="relative">
      <div className="fixed bg-slate-600 bg-opacity-60 left-0 right-0 top-0 bottom-0">
        <section className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white  rounded-3xl shadow-2xl">
          <button className="bg-white ml-5 mt-3" onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
          <div className=" p-8 text-center sm:p-6">
            <p className="mb-5 text-xl font-semibold uppercase tracking-widest text-zinc-800">
              Please choose your bookshelf you want to save this book to:
            </p>

            {/* <a
            className="mt-8 inline-block w-full rounded-full bg-pink-600 py-4 text-sm font-bold text-white shadow-xl"
            href=""
          >
            Track Order
          </a> */}
            <div>{children}</div>
          </div>
        </section>
      </div>
    </div>
  )
}
