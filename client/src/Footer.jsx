export default function Footer() {
  const currentYear = new Date().getFullYear()
  return (
    <>
      <div className="flex w-full place-content-center item-center bg-primary p-6 text-white font-light">
        © {currentYear} MEHread. All Rights Reserved.
      </div>
    </>
  )
}
