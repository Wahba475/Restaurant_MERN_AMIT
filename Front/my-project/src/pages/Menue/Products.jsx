import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useMenu } from '../../context/MenuContext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

function Products() {
  // Get menu data from context
  const { menuItems, loading, error, fetchMenuItems } = useMenu();
  
  // URL search params for category filtering
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // State management
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get('category') || 'All'
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Available categories
  const categories = ['All', 'Breakfast', 'Main Dishes', 'Drinks', 'Desserts'];

  // Category mapping for URL params
  const categoryMap = {
    breakfast: 'Breakfast',
    'main-dishes': 'Main Dishes',
    drinks: 'Drinks',
    desserts: 'Desserts',
  };

  // Sync with URL params on mount or URL change
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      const mappedCategory = categoryMap[categoryParam] || categoryParam;
      setSelectedCategory(mappedCategory);
      fetchMenuItems(mappedCategory === 'All' ? null : mappedCategory);
    } else {
      setSelectedCategory('All');
      fetchMenuItems(null);
    }
  }, [searchParams]);

  // Handle category button click
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);

    if (category === 'All') {
      fetchMenuItems(null);
      setSearchParams({});
    } else {
      fetchMenuItems(category);
      setSearchParams({ category: category.toLowerCase().replace(' ', '-') });
    }
  };

  // Pagination logic - ensure menuItems is always an array
  const safeMenuItems = Array.isArray(menuItems) ? menuItems : [];
  const totalPages = Math.ceil(safeMenuItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = safeMenuItems.slice(startIndex, startIndex + itemsPerPage);

  // Navigate to page
  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-[#AD343E] border-t-transparent mb-4"></div>
            <p className="font-['DM_Sans',_sans-serif] text-gray-600 text-lg">
              Loading menu items...
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="font-['Oswald',_sans-serif] text-2xl text-gray-900 mb-3">
              Unable to Load Menu
            </h2>
            <p className="font-['DM_Sans',_sans-serif] text-red-600 mb-4">
              {error}
            </p>
            <p className="font-['DM_Sans',_sans-serif] text-gray-500 text-sm mb-6">
              Make sure the backend server is running on port 3000
            </p>
            <button
              onClick={() => fetchMenuItems(null)}
              className="px-6 py-3 bg-[#AD343E] text-white rounded-full font-['Oswald',_sans-serif] font-medium tracking-wide hover:bg-[#8f2a32] transition-colors"
            >
              RETRY
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Main render
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Inline styles for custom animations matching landing page */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Oswald:wght@300;400;500;600;700&display=swap');
        
        .product-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .product-card:hover {
          transform: translateY(-8px);
        }
        
        .product-card:hover .product-image {
          transform: scale(1.1);
        }
        
        .product-image {
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .category-btn {
          transition: all 0.3s ease;
        }
        
        .category-btn:hover {
          transform: translateY(-2px);
        }
      `}</style>

      <main className="flex-1 py-16 md:py-20 px-4 md:px-12">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-12 md:mb-16">
            <h1 className="font-['Oswald',_sans-serif] text-4xl md:text-5xl font-medium text-gray-900 mb-4 tracking-wide">
              Our <span className="text-[#AD343E] font-bold">Menu</span>
            </h1>
            <p className="font-['DM_Sans',_sans-serif] text-gray-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              We consider all the drivers of change gives you the components you
              need to change to create a truly happens.
            </p>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex justify-center gap-3 md:gap-4 flex-wrap mb-12 md:mb-16">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`category-btn px-6 md:px-8 py-2.5 md:py-3 rounded-full font-['Oswald',_sans-serif] text-sm md:text-base font-medium tracking-wide border ${
                  selectedCategory === category
                    ? 'bg-[#AD343E] text-white border-[#AD343E] shadow-md'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-[#AD343E] hover:text-[#AD343E]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Menu Items Grid */}
          {safeMenuItems.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
              <div className="text-6xl mb-4">🍽️</div>
              <h3 className="font-['Oswald',_sans-serif] text-xl text-gray-900 mb-2">
                No Menu Items Found
              </h3>
              <p className="font-['DM_Sans',_sans-serif] text-gray-500 text-sm">
               data isnt fetched 
              </p>
            </div>
          ) : currentItems.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="font-['Oswald',_sans-serif] text-xl text-gray-900 mb-2">
                No Items in This Category
              </h3>
              <p className="font-['DM_Sans',_sans-serif] text-gray-500 text-sm">
                Try selecting a different category.
              </p>
            </div>
          ) : (
            <>
              {/* Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12">
                {currentItems.map((item) => (
                  <div
                    key={item._id}
                    onClick={() => navigate(`/menu/${item._id}`)}
                    className="product-card bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl cursor-pointer"
                  >
                    {/* Product Image */}
                    <div className="h-40 md:h-44 overflow-hidden bg-gray-100">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="product-image w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                        }}
                      />
                    </div>

                    {/* Product Info */}
                    <div className="p-4 md:p-5 text-center">
                      {/* Price */}
                      <p className="font-['Oswald',_sans-serif] text-[#AD343E] font-semibold text-xl md:text-2xl mb-2">
                        $ {item.price?.toFixed(2) || '0.00'}
                      </p>

                      {/* Name */}
                      <h3 className="font-['Oswald',_sans-serif] font-medium text-gray-900 text-lg md:text-xl mb-3 tracking-wide">
                        {item.name}
                      </h3>

                      {/* Description */}
                      <p className="font-['DM_Sans',_sans-serif] text-gray-600 text-sm leading-relaxed line-clamp-2">
                        {item.description || 'Made with eggs, lettuce, salt, oil and other ingredients.'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 flex-wrap">
                  {/* Previous Button */}
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-full border font-['Oswald',_sans-serif] text-sm transition-all ${
                      currentPage === 1
                        ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                        : 'border-gray-200 text-gray-700 hover:border-[#AD343E] hover:text-[#AD343E]'
                    }`}
                  >
                    Previous
                  </button>

                  {/* Page Numbers */}
                  {[...Array(totalPages)].map((_, index) => {
                    const page = index + 1;
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={page}
                          onClick={() => goToPage(page)}
                          className={`w-10 h-10 rounded-full font-['Oswald',_sans-serif] text-sm transition-all ${
                            currentPage === page
                              ? 'bg-[#AD343E] text-white shadow-md'
                              : 'bg-white border border-gray-200 text-gray-700 hover:border-[#AD343E] hover:text-[#AD343E]'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    } else if (
                      page === currentPage - 2 ||
                      page === currentPage + 2
                    ) {
                      return (
                        <span key={page} className="px-2 text-gray-400">
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}

                  {/* Next Button */}
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-full border font-['Oswald',_sans-serif] text-sm transition-all ${
                      currentPage === totalPages
                        ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                        : 'border-gray-200 text-gray-700 hover:border-[#AD343E] hover:text-[#AD343E]'
                    }`}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* Delivery Apps Section */}
      <section className="py-16 md:py-20 px-4 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left side - Text */}
            <div className="text-center md:text-left">
              <h2 className="font-['Oswald',_sans-serif] text-3xl md:text-4xl font-medium text-gray-900 mb-3">
                You can order
              </h2>
              <h2 className="font-['Oswald',_sans-serif] text-3xl md:text-4xl font-medium text-gray-900 mb-4">
                through apps
              </h2>
              <p className="font-['DM_Sans',_sans-serif] text-gray-600 text-sm md:text-base max-w-xs">
                Enjoy our menu wherever you are. Order easily through trusted delivery platforms and get your favorites delivered straight to your door.
              </p>
            </div>

            {/* Right side - App logos grid */}
            <div className="grid grid-cols-3 gap-4 md:gap-6">
              {/* Row 1 */}
              <div className="bg-white border border-gray-200 rounded-xl px-6 py-4 flex items-center justify-center hover:shadow-md transition-shadow">
                <span className="font-['Oswald',_sans-serif] text-lg font-medium">Uber <span className="text-[#06C167]">Eats</span></span>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl px-6 py-4 flex items-center justify-center hover:shadow-md transition-shadow">
                <span className="font-['Oswald',_sans-serif] text-lg font-bold text-[#FF8000]">GRUBHUB</span>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl px-6 py-4 flex items-center justify-center hover:shadow-md transition-shadow">
                <span className="font-['Oswald',_sans-serif] text-lg font-medium">Postmates</span>
              </div>

              {/* Row 2 */}
              <div className="bg-white border border-gray-200 rounded-xl px-6 py-4 flex items-center justify-center hover:shadow-md transition-shadow">
                <span className="font-['Oswald',_sans-serif] text-lg font-medium text-[#FF3008]">DOORDASH</span>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl px-6 py-4 flex items-center justify-center hover:shadow-md transition-shadow">
                <span className="font-['Oswald',_sans-serif] text-lg font-medium text-[#E21B70]">foodpanda</span>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl px-6 py-4 flex items-center justify-center hover:shadow-md transition-shadow">
                <span className="font-['Oswald',_sans-serif] text-lg font-medium text-[#00CCBC]">deliveroo</span>
              </div>

              {/* Row 3 */}
              <div className="bg-white border border-gray-200 rounded-xl px-6 py-4 flex items-center justify-center hover:shadow-md transition-shadow">
                <span className="font-['Oswald',_sans-serif] text-lg font-medium text-[#43B02A]">instacart</span>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl px-6 py-4 flex items-center justify-center hover:shadow-md transition-shadow">
                <span className="font-['Oswald',_sans-serif] text-lg font-bold text-[#FF1A00]">JUST EAT</span>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl px-6 py-4 flex items-center justify-center hover:shadow-md transition-shadow">
                <span className="font-['Oswald',_sans-serif] text-lg font-medium text-[#FF6600]">DiDi Food</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Products;
