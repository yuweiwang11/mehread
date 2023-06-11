export default function Pagination({ postsPerPage, totalPosts, paginate }) {
  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i)
  }
  return (
    <div className="flex ">
      {pageNumbers.map((num) => (
        <div className="text-xl content-center" key={num}>
          <a onClick={() => paginate(num)} href="!#">
            {num}
          </a>
        </div>
      ))}
    </div>
  )
}
