export default function Pagination({ postsPerPage, totalPosts, paginate, currentPage }) {
  const pageNumbers = []

  const currentPageIndexStyle =
    'px-3 py-2 text-white border border-gray-300 bg-black hover:bg-Gray-200 hover:text-Gray-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
  const InactivePageIndexStyle =
    'px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i)
  }
  return (
    <nav className="mt-8 flex justify-center">
      <ul className="inline-flex -space-x-px">
        {pageNumbers.map((num) => (
          <li className="text-xl content-center" key={num}>
            <a
              className={num === currentPage ? currentPageIndexStyle : InactivePageIndexStyle}
              onClick={() => paginate(num)}
            >
              {num}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
