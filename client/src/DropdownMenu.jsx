export default function DropdownMenu() {
  return (
    <>
      <ul className="menu absolute  w-40 rounded-md border border-zinc-300 bg-white divide-y divide-zinc-300 shadow dark:bg-gray-700">
        <li>
          <a
            onClick={() => {
              console.log('onclick')
            }}
            className="text-gray-700 block px-4 py-2 text-md hover:bg-zinc-200 cursor-pointer"
          >
            Move to
          </a>
        </li>
        <li>
          <a className="text-gray-700 block px-4 py-2 text-md hover:bg-rose-700 hover:text-white cursor-pointer">
            Delete
          </a>
        </li>
      </ul>
    </>
  )
}
