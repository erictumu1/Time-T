
function Footer() {
  const year = new Date().getFullYear();

  return (
    <div>
      <p class="copyright" className="text-center font-medium mb-5">
        &copy; {year} Created by <span className="text-blue-700 font-bold" >Eric Tumu</span>. All Rights Reserved.
      </p>
    </div>
  )
}

export default Footer