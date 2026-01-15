import React from 'react'
import heroImage from '../static/hero.png'

function Hero() {
  return (
    <section
      className="relative h-[80vh] w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="absolute inset-0 bg-black/45" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <h1 className="font-['Oswald',_system-ui,_sans-serif] uppercase font-semibold tracking-[0.25em] leading-tight drop-shadow-[0_8px_20px_rgba(0,0,0,0.35)] transition-transform duration-300 ease-out hover:-translate-y-1">
          <span className="block text-white text-4xl md:text-6xl lg:text-7xl">
            Taste
          </span>
          <span className="block text-[#AD343E] text-4xl md:text-6xl lg:text-7xl my-2">
            Bold
          </span>
          <span className="block text-white text-4xl md:text-6xl lg:text-7xl">
            Moments
          </span>
        </h1>

        <button className="mt-12 bg-[#AD343E] text-white px-10 py-4 rounded-full font-['Oswald',_system-ui,_sans-serif] uppercase tracking-[0.2em] text-sm transition-all duration-300 hover:bg-[#8f2a32] hover:-translate-y-1">
          Book a Table
        </button>

      </div>
    </section>
  )
}

export default Hero
