import React from 'react';
import { Coffee, Utensils, Wine, Cookie } from 'lucide-react';

function Menu() {
  const handleExploreMenu = (category) => {
    console.log(`Navigating to ${category} menu`);
  };

  const menuItems = [
    {
      icon: Coffee,
      title: 'Breakfast',
      description:
        'Start your day with freshly prepared breakfast options made to energize your mornings.',
      category: 'breakfast',
    },
    {
      icon: Utensils,
      title: 'Main Dishes',
      description:
        'Carefully crafted main courses featuring bold flavors and premium ingredients.',
      category: 'main-dishes',
    },
    {
      icon: Wine,
      title: 'Drinks',
      description:
        'Refreshing beverages and signature drinks perfectly paired with every meal.',
      category: 'drinks',
    },
    {
      icon: Cookie,
      title: 'Desserts',
      description:
        'Indulgent desserts created to satisfy your sweet cravings and end meals perfectly.',
      category: 'desserts',
    },
  ]
  

  return (
    <div className="w-full bg-gray-50 font-['Oswald',_system-ui,_sans-serif]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Oswald:wght@300;400;500;600;700&display=swap');
        
        .oswald {
          font-family: 'Oswald', sans-serif;
        }
        
        .dm-sans {
          font-family: 'DM Sans', sans-serif;
        }
        
        .menu-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .menu-card:hover {
          transform: translateY(-8px);
        }
        
        .menu-card:hover .icon-circle {
          background-color: #AD343E;
          transform: scale(1.1);
        }
        
        .menu-card:hover .icon-circle svg {
          color: white;
          transform: rotate(5deg);
        }
        
        .icon-circle {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .icon-circle svg {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .explore-btn {
          position: relative;
          overflow: hidden;
        }
        
        .explore-btn::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 2px;
          background-color: #AD343E;
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }
        
        .explore-btn:hover::after {
          width: 100%;
        }
      `}</style>

      <section className="py-20 px-4 md:px-12">
        <h2 className="oswald text-center text-4xl md:text-5xl font-medium text-gray-900 mb-16 tracking-wide">
          Browse Our Menu
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className="menu-card border border-gray-200 rounded-xl px-8 py-10 text-center bg-white shadow-sm cursor-pointer"
              >
                <div className="icon-circle w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                  <IconComponent className="w-10 h-10 text-gray-700" strokeWidth={1.5} />
                </div>
                
                <h3 className="oswald text-xl font-medium text-gray-900 mb-4 tracking-wide">
                  {item.title}
                </h3>
                
                <p className="dm-sans text-gray-600 text-sm leading-relaxed mb-6">
                  {item.description}
                </p>
                
                <button
                  onClick={() => handleExploreMenu(item.category)}
                  className="explore-btn oswald text-red-700 text-sm font-medium tracking-widest uppercase"
                >
                  Explore Menu
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default Menu;