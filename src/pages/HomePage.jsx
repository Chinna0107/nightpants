import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ChevronRight, CheckCircle2, ShieldCheck, RefreshCcw } from 'lucide-react';
import { Header } from '../components/Header';
import { ProductCard } from '../components/ProductCard';
import { useStoreData } from '../store/useStoreData';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export function HomePage() {
  const container = useRef(null);
  const navigate = useNavigate();
  const { products, categories, loading } = useStoreData();
  const [searchQuery, setSearchQuery] = useState('');

  useGSAP(() => {
    if (!loading) {
      gsap.from('.animate-section', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        clearProps: 'all'
      });
    }
  }, { scope: container, dependencies: [loading] });

  // Dummy data for visual match if real data is missing or doesn't match the sports theme
  const sportsCategories = [
    { id: 'cat-bags', name: 'Bags', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&q=80' },
    { id: 'cat-bats', name: 'Bats', image: 'https://images.unsplash.com/photo-1593766827228-8737b4534aa6?w=300&q=80' },
    { id: 'cat-tshirts', name: 'T-Shirts', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&q=80' },
    { id: 'cat-jeans', name: 'Jeans', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&q=80' }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/category/all?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div ref={container} className="bg-[#f8f9fa] flex-1 pb-4">
      <Header variant="home" />

      {/* 1. Hero Banner */}
      <div className="animate-section px-4 mt-4 md:mt-6 mb-6">
        <div className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-r from-indigo-600 to-indigo-400 aspect-[16/9] md:aspect-[21/9] shadow-sm flex items-center">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
          
          <div className="relative z-10 px-6 py-6 md:px-10 flex flex-col justify-center h-full w-[60%]">
            <h2 className="text-white text-2xl md:text-4xl font-black mb-1 leading-tight tracking-wide">
              PERFORMANCE<br/>MEETS<br/>STYLE
            </h2>
            <p className="text-white/90 font-medium text-xs md:text-sm mb-4">
              Gear up. Stand out.
            </p>
            <button onClick={() => navigate('/category/all')} className="bg-white text-indigo-600 text-xs font-bold py-2 px-4 rounded-full w-max shadow-sm hover:bg-[#f8f9fa] active:scale-95 transition-all">
              SHOP NOW
            </button>
          </div>

          {/* Banner Images Decoration */}
          <div className="absolute right-[-10%] top-0 bottom-0 w-[55%] flex items-center justify-center opacity-100">
            <img src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80" alt="Gear" className="w-full h-full object-cover rounded-l-full rotate-12 scale-150" />
          </div>

          {/* Carousel Dots */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-20">
            <div className="w-2 h-2 rounded-full bg-white"></div>
            <div className="w-2 h-2 rounded-full bg-white/40"></div>
            <div className="w-2 h-2 rounded-full bg-white/40"></div>
            <div className="w-2 h-2 rounded-full bg-white/40"></div>
            <div className="w-2 h-2 rounded-full bg-white/40"></div>
          </div>
        </div>
      </div>

      {/* 2. Shop by Category */}
      <div className="animate-section px-4 mb-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-[17px] font-bold text-gray-900 tracking-tight">Shop by Category</h3>
          <Link to="/category/all" className="text-indigo-600 text-xs font-bold flex items-center gap-0.5">View all <ChevronRight className="w-3.5 h-3.5" /></Link>
        </div>
        <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
          {sportsCategories.map((cat, idx) => (
            <Link key={idx} to={`/category/${cat.id}`} className="flex flex-col gap-2 shrink-0 w-[75px] md:w-[90px] group">
              <div className="w-full aspect-square rounded-[18px] overflow-hidden bg-gray-100 border border-gray-200/50 relative shadow-sm">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors"></div>
              </div>
              <span className="text-[12px] font-bold text-gray-800 text-center">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* 3. Search Bar */}
      <div className="animate-section px-4 mb-8">
        <form onSubmit={handleSearch} className="relative w-full shadow-[0_2px_15px_rgba(0,0,0,0.04)] rounded-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" strokeWidth={2} />
          <input
            type="text"
            placeholder="Search for bags, bats, t-shirts, jeans..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-gray-100 rounded-full py-3.5 pl-12 pr-4 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-shadow"
          />
        </form>
      </div>

      {/* 4. Top Picks (Festive Collections) */}
      <div className="animate-section px-4 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-[17px] font-bold text-gray-900 tracking-tight">Top Picks</h3>
          <Link to="/collection/top-picks" className="text-indigo-600 text-xs font-bold flex items-center gap-0.5">View all <ChevronRight className="w-3.5 h-3.5" /></Link>
        </div>
        
        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {products.slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {[1,2,3,4].map(i => (
              <div key={i} className="bg-white rounded-[20px] aspect-square animate-pulse"></div>
            ))}
          </div>
        )}
      </div>

      {/* 5. Trending Now */}
      {products.filter(p => p.is_trending).length > 0 && (
        <div className="animate-section px-4 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[17px] font-bold text-gray-900 tracking-tight">Trending</h3>
            <Link to="/collection/trending" className="text-indigo-600 text-xs font-bold flex items-center gap-0.5">View all <ChevronRight className="w-3.5 h-3.5" /></Link>
          </div>
          <div className="flex overflow-x-auto gap-3 hide-scrollbar pb-2 snap-x">
            {products.filter(p => p.is_trending).slice(0, 6).map(product => (
              <div key={product.id} className="w-[160px] md:w-[220px] flex-shrink-0 snap-start">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. Best Sellers */}
      {products.filter(p => p.is_bestseller).length > 0 && (
        <div className="animate-section px-4 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[17px] font-bold text-gray-900 tracking-tight">Best Sellers</h3>
            <Link to="/collection/best-sellers" className="text-indigo-600 text-xs font-bold flex items-center gap-0.5">View all <ChevronRight className="w-3.5 h-3.5" /></Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {products.filter(p => p.is_bestseller).slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}

      {/* 7. Recommended For You */}
      {products.length > 4 && (
        <div className="animate-section px-4 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[17px] font-bold text-gray-900 tracking-tight">Recommended</h3>
            <Link to="/collection/recommended" className="text-indigo-600 text-xs font-bold flex items-center gap-0.5">View all <ChevronRight className="w-3.5 h-3.5" /></Link>
          </div>
          <div className="flex overflow-x-auto gap-3 hide-scrollbar pb-2 snap-x">
            {products.filter(p => !p.is_trending && !p.is_bestseller).slice(0, 6).map(product => (
              <div key={`rec-${product.id}`} className="w-[160px] md:w-[220px] flex-shrink-0 snap-start">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. Features Block */}
      <div className="animate-section px-4 mb-2">
        <div className="bg-white rounded-xl p-4 flex justify-between items-center shadow-sm border border-gray-100">
          <div className="flex flex-col items-center gap-1.5 flex-1">
            <div className="w-8 h-8 rounded-full bg-[#f8f9fa] flex items-center justify-center">
              <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-extrabold text-gray-900 leading-tight">Free Shipping</p>
              <p className="text-[9px] text-gray-500 leading-tight">On orders above<br/>₹999</p>
            </div>
          </div>
          
          <div className="w-px h-10 bg-gray-100"></div>

          <div className="flex flex-col items-center gap-1.5 flex-1">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <div className="text-center">
              <p className="text-[10px] font-extrabold text-gray-900 leading-tight">100% Original</p>
              <p className="text-[9px] text-gray-500 leading-tight">Authentic sports<br/>products</p>
            </div>
          </div>

          <div className="w-px h-10 bg-gray-100"></div>

          <div className="flex flex-col items-center gap-1.5 flex-1">
            <div className="w-8 h-8 rounded-full bg-[#f8f9fa] flex items-center justify-center">
              <RefreshCcw className="w-4 h-4 text-indigo-600" strokeWidth={2} />
            </div>
            <div className="text-center">
              <p className="text-[10px] font-extrabold text-gray-900 leading-tight">Easy Returns</p>
              <p className="text-[9px] text-gray-500 leading-tight">7-day return<br/>policy</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
