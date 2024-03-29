import SearchBar from '../SearchBar'
import Nav from '../Nav'
import Footer from '../Footer'
import homeLogo from '../logo/MEH_v3.png'

export default function HomePage() {
  // function submitSearch(e) {
  //   e.preventDefault()
  //   axios.post('/bookSearch', {
  //     searchKeyword,
  //   })
  // }
  return (
    <>
      <div className="max-w-4xl mx-auto">
        <Nav />
        <div className="p-6 flex flex-col justify-center items-center mt-28">
          <img className="w-96 mb-8" src={homeLogo} alt="logo" />
          <SearchBar />
        </div>
      </div>
      <div className="pt-80">
        <Footer />
      </div>
    </>
  )
}
