function Footer() {
  return (
    <footer className="bg-[#2C2F24] text-[#F9F9F7] py-10 px-4 md:px-12 font-['Oswald',_system-ui,_sans-serif] ">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="font-['Oswald',_system-ui,_sans-serif] text-xl tracking-[0.18em] uppercase">
            Wahba
          </p>
          <p className="mt-2 text-xs md:text-sm text-[#D4D4C7]">
            Crafted experiences, warm gatherings, and bold flavours.
          </p>
        </div>
        <div className="flex flex-col items-center md:items-end gap-2 text-xs md:text-sm text-[#D4D4C7]">
          <p>Open daily 11:00 AM – 11:00 PM</p>
          <p>123 Culinary Avenue, Food City</p>
          <p className="mt-1">© {new Date().getFullYear()} Wahba. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer


