import { Clock, Tag, Truck } from "lucide-react";

function Layer() {
  return (
    <section className="py-20 px-4 md:px-12 bg-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div
          className="grid grid-cols-2 grid-rows-2 gap-6"
          data-aos="fade-right"
        >
          <img
            src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
            alt="Chef cooking"
            className="row-span-2 w-full h-full object-cover rounded-2xl"
          />

          <img
            src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe"
            alt="Food bowl"
            className="w-full h-full object-cover rounded-2xl"
          />

          <img
            src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1"
            alt="Grilled food"
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>

        <div data-aos="fade-left">
          <h2 className="font-['Oswald',_system-ui,_sans-serif] text-3xl md:text-4xl font-semibold text-[#2C2F24] mb-4 leading-tight">
            Experience The Best
            <span className="block text-[#AD343E]">Flavours In The City</span>
          </h2>

          <p className="font-['Oswald',_system-ui,_sans-serif] text-gray-600 mb-8 max-w-md text-sm md:text-base tracking-wide">
            Freshly prepared meals delivered straight to your door with speed,
            care, and uncompromising quality.
          </p>

          <ul className="space-y-6">
            <li className="group flex items-center gap-4 transition-transform duration-300 hover:-translate-y-1">
              <span className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 transition-colors duration-300 group-hover:bg-[#AD343E] group-hover:text-white">
                <Clock size={20} />
              </span>
              <span className="font-['Oswald',_system-ui,_sans-serif] text-[#2C2F24]">
                Delivery within 30 minutes
              </span>
            </li>

            <li className="group flex items-center gap-4 transition-transform duration-300 hover:-translate-y-1">
              <span className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 transition-colors duration-300 group-hover:bg-[#AD343E] group-hover:text-white">
                <Tag size={20} />
              </span>
              <span className="font-['Oswald',_system-ui,_sans-serif] text-[#2C2F24]">
                Best Offer & Prices
              </span>
            </li>

            <li className="group flex items-center gap-4 transition-transform duration-300 hover:-translate-y-1">
              <span className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 transition-colors duration-300 group-hover:bg-[#AD343E] group-hover:text-white">
                <Truck size={20} />
              </span>
              <span className="font-['Oswald',_system-ui,_sans-serif] text-[#2C2F24]">
                Online Services Available
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Layer;
