import React, { useEffect, useState } from 'react'
import wahbaLogo from '../static/logo.png'

function Navbar() {
  const [activePath, setActivePath] = useState('/')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setActivePath(window.location.pathname || '/')
    }
  }, [])

  const links = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Menu', href: '/menu' },
    { label: 'Pages', href: '/pages' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <nav className="flex items-center justify-between px-12 py-5 bg-white border-b border-gray-100">

      {/* Logo ONLY */}
      <div className="cursor-pointer group flex items-center">
        <img
          src={wahbaLogo}
          alt="Wahba"
          className="h-15 w-auto transition-transform duration-300 ease-out group-hover:-translate-y-1"
        />
      </div>

      {/* Center Links */}
      <div className="hidden md:flex items-center gap-6">
        {links.map(link => {
          const isActive = activePath === link.href

          return (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setActivePath(link.href)}
              className={`relative px-4 py-1.5 font-medium transition-colors duration-200 ${
                isActive
                  ? 'text-[#2C2F24]'
                  : 'text-[#474747] hover:text-[#AD343E]'
              }`}
            >
              <span
                className={`absolute inset-0 -z-10 rounded-full transition-colors duration-200 ${
                  isActive ? 'bg-[#DBDFD0]' : 'bg-transparent'
                }`}
              />
              <span className="relative z-10">{link.label}</span>
            </a>
          )
        })}
      </div>

      {/* CTA Button */}
      <div className="flex items-center">
        <button className="border-2 border-[#182226] text-[#182226] px-6 py-2 rounded-full font-bold transition-all duration-300 ease-out hover:bg-[#182226] hover:text-white hover:-translate-y-1">
          Book A Table
        </button>
      </div>

    </nav>
  )
}

export default Navbar
