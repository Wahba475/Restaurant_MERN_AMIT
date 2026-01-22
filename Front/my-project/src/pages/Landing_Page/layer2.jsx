import React from "react";
import Gathering from "../../static/Gatherings.png";
import Birthdays from "../../static/birthday.png";
import Weddings from "../../static/marriage.png";
import Events from "../../static/Events.png";

function Layer2() {
  const services = [
    {
      title: "Gatherings",
      image: Gathering,
      description:
        "Perfectly crafted menus and service for intimate gatherings and celebrations.",
    },
    {
      title: "Birthdays",
      image: Birthdays,
      description:
        "Celebrate birthdays with customized dishes and unforgettable moments.",
    },
    {
      title: "Weddings",
      image: Weddings,
      description:
        "Elegant dining experiences designed to make your wedding truly special.",
    },
    {
      title: "Events",
      image: Events,
      description:
        "Professional catering solutions for corporate and private events.",
    },
  ];

  return (
    <section className="py-20 px-4 md:px-12 bg-white font-['Oswald',_system-ui,_sans-serif]">
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-3xl md:text-4xl font-semibold text-[#2C2F24] mb-10 leading-tight"
          data-aos="fade-down"
        >
          We Also Offer Unique Services
          <span className="block text-[#AD343E]">For Your Special Events</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group cursor-pointer transition-transform duration-300 hover:-translate-y-1"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="mb-5 overflow-hidden rounded-2xl shadow-sm">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <h3 className="text-lg font-semibold text-[#2C2F24] mb-2">
                {service.title}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Layer2;
