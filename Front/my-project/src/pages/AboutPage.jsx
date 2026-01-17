import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[400px] bg-gray-900">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80"
          alt="Restaurant"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="font-['Oswald',_sans-serif] text-5xl md:text-6xl font-bold mb-4">
              About <span className="text-[#AD343E]">Us</span>
            </h1>
            <p className="font-['DM_Sans',_sans-serif] text-lg md:text-xl max-w-2xl mx-auto px-4">
              Crafting exceptional dining experiences since day one
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 md:py-20 px-4 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-['Oswald',_sans-serif] text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="font-['DM_Sans',_sans-serif] text-gray-600 leading-relaxed mb-4">
                Welcome to our restaurant, where passion meets flavor. Our journey began with a simple vision: to create a dining experience that brings people together through exceptional food and warm hospitality.
              </p>
              <p className="font-['DM_Sans',_sans-serif] text-gray-600 leading-relaxed mb-4">
                Every dish we serve is crafted with care, using the finest ingredients sourced from local farmers and trusted suppliers. Our talented chefs blend traditional techniques with modern innovation to create unforgettable culinary experiences.
              </p>
              <p className="font-['DM_Sans',_sans-serif] text-gray-600 leading-relaxed">
                We believe that great food is more than just sustenance—it's an art form, a celebration, and a way to connect with the people we love.
              </p>
            </div>
            <div className="h-[400px] rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80"
                alt="Our Kitchen"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-20 px-4 md:px-12 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-['Oswald',_sans-serif] text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Quality */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-[#AD343E] rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-['Oswald',_sans-serif] text-2xl font-bold text-gray-900 mb-4">
                Quality First
              </h3>
              <p className="font-['DM_Sans',_sans-serif] text-gray-600 leading-relaxed">
                We never compromise on the quality of our ingredients or the care we put into every dish.
              </p>
            </div>

            {/* Passion */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-[#AD343E] rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="font-['Oswald',_sans-serif] text-2xl font-bold text-gray-900 mb-4">
                Passion
              </h3>
              <p className="font-['DM_Sans',_sans-serif] text-gray-600 leading-relaxed">
                Our love for food and hospitality drives everything we do, from kitchen to table.
              </p>
            </div>

            {/* Community */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-[#AD343E] rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-['Oswald',_sans-serif] text-2xl font-bold text-gray-900 mb-4">
                Community
              </h3>
              <p className="font-['DM_Sans',_sans-serif] text-gray-600 leading-relaxed">
                We're proud to be part of our local community and support local farmers and suppliers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-20 px-4 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-['Oswald',_sans-serif] text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
            Meet Our Team
          </h2>
          <p className="font-['DM_Sans',_sans-serif] text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Our talented team of chefs and staff work together to create memorable dining experiences
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Chef 1 */}
            <div className="text-center">
              <div className="w-48 h-48 mx-auto rounded-full overflow-hidden mb-4 bg-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&q=80"
                  alt="Head Chef"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-['Oswald',_sans-serif] text-xl font-bold text-gray-900 mb-2">
                John Smith
              </h3>
              <p className="font-['DM_Sans',_sans-serif] text-[#AD343E] font-medium mb-2">
                Head Chef
              </p>
              <p className="font-['DM_Sans',_sans-serif] text-gray-600 text-sm">
                20+ years of culinary excellence
              </p>
            </div>

            {/* Chef 2 */}
            <div className="text-center">
              <div className="w-48 h-48 mx-auto rounded-full overflow-hidden mb-4 bg-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=400&q=80"
                  alt="Pastry Chef"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-['Oswald',_sans-serif] text-xl font-bold text-gray-900 mb-2">
                Sarah Johnson
              </h3>
              <p className="font-['DM_Sans',_sans-serif] text-[#AD343E] font-medium mb-2">
                Pastry Chef
              </p>
              <p className="font-['DM_Sans',_sans-serif] text-gray-600 text-sm">
                Award-winning dessert specialist
              </p>
            </div>

            {/* Manager */}
            <div className="text-center">
              <div className="w-48 h-48 mx-auto rounded-full overflow-hidden mb-4 bg-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80"
                  alt="Restaurant Manager"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-['Oswald',_sans-serif] text-xl font-bold text-gray-900 mb-2">
                Michael Brown
              </h3>
              <p className="font-['DM_Sans',_sans-serif] text-[#AD343E] font-medium mb-2">
                Restaurant Manager
              </p>
              <p className="font-['DM_Sans',_sans-serif] text-gray-600 text-sm">
                Hospitality expert since 2010
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 px-4 md:px-12 bg-[#AD343E]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-['Oswald',_sans-serif] text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Experience Our Cuisine?
          </h2>
          <p className="font-['DM_Sans',_sans-serif] text-white/90 mb-8 text-lg">
            Book a table today and discover why our guests keep coming back
          </p>
          <button className="px-8 py-3 bg-white text-[#AD343E] rounded-full font-['Oswald',_sans-serif] font-bold text-lg hover:bg-gray-100 transition-colors">
            BOOK A TABLE
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default AboutPage;
