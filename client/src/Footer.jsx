export default function Footer() {
  const currentYear = new Date().getFullYear()
  return (
    <>
      <div className="grid place-content-center bg-primary p-6 text-white font-light">
        © {currentYear} MEHread. All Rights Reserved.
      </div>
    </>
  )
}
