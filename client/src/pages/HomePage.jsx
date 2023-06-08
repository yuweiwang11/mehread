export default function HomePage() {
  return (
    <>
      <div className="p-6 flex flex-col justify-center items-center mt-36">
        <img className="w-96 mb-8" src="./logo/MEH_v3.png" alt="logo" />
        <div className="ml-28">
          <input className=" w-80 content-center" type="text" />
          <button className="ml-4 relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-3xl group bg-gradient-to-br from-gray-900 to-gray-300 group-hover:from-gray-500 group-hover:to-gray-200 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-gray-100 dark:focus:ring-gray-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-3xl group-hover:bg-opacity-0">
              Search
            </span>
          </button>
        </div>
      </div>
    </>
  )
}
