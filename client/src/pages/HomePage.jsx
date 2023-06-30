import SearchBar from '../SearchBar'
import Nav from '../Nav'
import Footer from '../Footer'

export default function HomePage() {
  // function submitSearch(e) {
  //   e.preventDefault()
  //   axios.post('/bookSearch', {
  //     searchKeyword,
  //   })
  // }
  return (
    <>
      <div className="max-w-3xl mx-auto">
        <Nav />
        <div className="p-6 flex flex-col justify-center items-center mt-36">
          <img className="w-96 mb-8" src="../../logo/MEH_v3.png" alt="logo" />
          <SearchBar />
        </div>
      </div>
      <div className="pt-80">
        <Footer />
      </div>
    </>
  )
}
