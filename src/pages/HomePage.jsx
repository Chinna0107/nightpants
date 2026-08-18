import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Truck, RefreshCcw, ShieldCheck, Award } from 'lucide-react';
import { Header } from '../components/Header';
import { ProductCard } from '../components/ProductCard';
import { useStoreData } from '../store/useStoreData';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import imgHeroBanner from '../assets/hero_banner.png';
import imgHeroBannerPremium from '../assets/hero_banner_premium.jpg';
import imgAarti from '../assets/story_aarti.png';

export function HomePage() {
  const container = useRef(null);
  const { products, categories, loading } = useStoreData();
  const [banners, setBanners] = React.useState([]);
  const [vendors, setVendors] = React.useState([
    { id: 'v1', business_name: 'Aradhana Apparels Silks', store_image: 'https://images.unsplash.com/photo-1555529771-835f59bfc50c?w=500&q=80' },
    { id: 'v2', business_name: 'Kavya Creations', store_image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=500&q=80' },
    { id: 'v3', business_name: 'The Loom Story', store_image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&q=80' },
    { id: 'v4', business_name: 'Ethnic Aura', store_image: 'https://images.unsplash.com/photo-1605901309584-818e25960b8f?w=500&q=80' },
  ]);

  React.useEffect(() => {
    const url = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";
    fetch(`${url}/general/banners`)
      .then(r => r.json())
      .then(d => { if (d.banners) setBanners(d.banners); })
      .catch(e => console.error(e));

    fetch(`${url}/general/vendors`)
      .then(r => r.json())
      .then(d => { if (d.vendors && d.vendors.length > 0) setVendors(d.vendors); })
      .catch(e => console.error(e));
  }, []);

  useGSAP(() => {
    if (!loading) {
      gsap.from('.animate-section', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        clearProps: 'all'
      });
    }
  }, { scope: container, dependencies: [loading] });

  return (
    <div ref={container} className="bg-white min-h-screen pb-20">
      <Header variant="home" />



      {/* 1. Hero Banner Carousel */}
      <div className="animate-section px-4 md:px-6 mb-8 max-w-[1280px] mx-auto mt-4 md:mt-10 lg:mt-12">
        {banners.length > 0 ? (
          <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar mt-2">
            {banners.map((banner) => (
              <div key={banner.id} className="relative w-full shrink-0 snap-center rounded-[2rem] md:rounded-[2.5rem] overflow-hidden bg-gray-50 aspect-[3/2] md:aspect-[21/9] group border border-gray-100 shadow-sm">
                <img src={banner.image_url} alt={banner.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end px-6 py-8">
                  <div className="mb-2">
                    <span className="bg-black/40 backdrop-blur-md text-white/90 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest">
                      {banner.badge || 'NEW SEASON'}
                    </span>
                  </div>
                  <h2 className="text-white text-4xl sm:text-5xl font-serif font-bold mb-1 leading-tight tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
                    {banner.title}
                  </h2>
                  <p className="text-white/90 font-medium text-sm tracking-wide">
                    {banner.subtitle || 'Explore our latest collection'}
                  </p>

                  <div className="absolute bottom-6 right-6 flex gap-1.5 items-center">
                    <div className="w-4 h-1.5 rounded-full bg-white"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-white/50"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-white/50"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar mt-2">
            <div className="relative w-full shrink-0 snap-center rounded-[2rem] md:rounded-[2.5rem] overflow-hidden bg-gray-50 aspect-[3/2] md:aspect-[21/9] group border border-gray-100 shadow-sm">
              <img src={imgHeroBannerPremium} alt="Hero Banner" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end px-6 py-8">
                <div className="mb-2">
                  <span className="bg-black/40 backdrop-blur-md text-white/90 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest">
                    SILK EDIT
                  </span>
                </div>
                <h2 className="text-white text-4xl sm:text-5xl font-serif font-bold mb-1 leading-tight tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
                  Kanjeevaram<br />Heirlooms
                </h2>
                <p className="text-white/90 font-medium text-sm tracking-wide">
                  Up to 50% off
                </p>

                <div className="absolute bottom-6 right-6 flex gap-1.5 items-center">
                  <div className="w-4 h-1.5 rounded-full bg-white"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-white/50"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-white/50"></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>



      {/* 2. Categories Ribbon */}
      <div className="animate-section z-30 mb-8 px-4 max-w-[1280px] mx-auto mt-4">
        <div className="flex justify-between items-end mb-4">
          <h3 className="text-2xl font-bold text-gray-900 tracking-tight font-serif">Shop by Category</h3>
          <Link to="/category/all" className="text-[#88313A] hover:text-red-900 text-sm font-medium transition-colors">See all {'>'}</Link>
        </div>
        <div className="flex gap-4 md:gap-8 justify-start md:justify-center min-w-max mx-auto px-2 overflow-x-auto hide-scrollbar pb-2">
          {categories.slice(0, 10).map(cat => (
            <Link key={cat.id} to={`/category/${cat.id}`} className="flex flex-col items-center gap-3 group w-20 md:w-24">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white flex items-center justify-center p-3 border border-gray-100 shadow-sm transition-all duration-300 relative overflow-hidden group-hover:-translate-y-1 group-hover:border-brand-orange group-hover:shadow-md">
                {cat.image_url ? (
                  <img src={cat.image_url} alt={cat.name} className="w-full h-full object-contain relative z-10 mix-blend-multiply" />
                ) : (
                  <div className="w-full h-full bg-gray-100 rounded-full"></div>
                )}
                <div className="absolute inset-0 bg-brand-orange/0 group-hover:bg-brand-orange/5 transition-colors duration-300"></div>
              </div>
              <span className="text-[12px] font-medium text-gray-700 text-center group-hover:text-brand-orange transition-colors leading-tight line-clamp-2">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto w-full px-4 md:px-6">

        {/* Unified Transparent Block */}
        <div className="animate-section mb-12 flex flex-col gap-8 md:gap-10">





          {/* Best Sellers */}
          {products.filter(p => p.is_bestseller).length > 0 && (
            <div>
              <div className="flex justify-between items-center px-4 py-4 mb-4 border-b border-gray-100 bg-white rounded-t-2xl shadow-sm">
                <h3 className="text-xl md:text-2xl font-bold text-[#022A21] tracking-tight font-serif">Best Selling</h3>
                <Link to="/collection/best-sellers" className="text-brand-orange hover:text-orange-700 text-sm md:text-base font-semibold flex items-center gap-2 transition-colors">View All →</Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                {products.filter(p => p.is_bestseller).slice(0, 6).map(product => (
                  <div key={product.id} className="hover:-translate-y-2 transition-transform duration-300 h-full">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          )}


          {/* Trending */}
          {products.filter(p => p.is_trending).length > 0 && (
            <div>
              <div className="flex justify-between items-end mb-4">
                <div className="flex items-center gap-2">
                  <svg className="w-6 h-6 text-[#E57E25]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <h3 className="text-2xl font-bold text-gray-900 tracking-tight font-serif mb-0">Trending Now</h3>
                </div>
                <Link to="/collection/trending" className="text-[#88313A] hover:text-red-900 text-sm font-medium transition-colors">See all {'>'}</Link>
              </div>
              <div className="flex overflow-x-auto gap-4 md:gap-6 hide-scrollbar pb-4 snap-x">
                {products.filter(p => p.is_trending).slice(0, 8).map(product => (
                  <div key={product.id} className="w-[160px] md:w-[220px] flex-shrink-0 snap-start h-full hover:-translate-y-1 transition-transform duration-300">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          )}



          {/* Recommended for You */}
          {products.length > 6 && (
            <div className="pt-2">
              <div className="flex justify-between items-end mb-4">
                <div className="flex items-center gap-2">
                  <svg className="w-6 h-6 text-[#E57E25]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                  <h3 className="text-2xl font-bold text-gray-900 tracking-tight font-serif mb-0">Recommended for You</h3>
                </div>
                <Link to="/collection/recommended" className="text-[#88313A] hover:text-red-900 text-sm font-medium transition-colors">See all {'>'}</Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                {products.filter(p => !p.is_trending).slice(0, 6).map(product => (
                  <div key={`rec-${product.id}`} className="hover:-translate-y-2 transition-transform duration-300 h-full">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Categories horizontally scrolling products */}
          {categories.map((cat) => {
            const catProducts = products.filter(p => p.category === cat.name);
            if (catProducts.length === 0) return null;
            return (
              <div key={cat.id}>
                <div className="flex justify-between items-center px-2 py-4 mb-4 border-b border-gray-100">
                  <h3 className="text-2xl md:text-3xl font-bold text-[#022A21] tracking-tight font-serif">{cat.name}</h3>
                  <Link to={`/category/${cat.id}`} className="text-brand-orange hover:text-orange-700 text-sm md:text-base font-semibold flex items-center gap-2 transition-colors">View All →</Link>
                </div>
                <div className="flex gap-4 md:gap-6 overflow-x-auto hide-scrollbar pb-4 snap-x">
                  {catProducts.slice(0, 8).map(product => (
                    <div key={product.id} className="w-[160px] md:w-[220px] shrink-0 snap-start hover:-translate-y-2 transition-transform duration-300 h-full">
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Customer Reviews */}
          <div className="mb-12 mt-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-[#022A21] mb-2 font-serif" style={{ fontFamily: 'Georgia, serif' }}>What Our Customers Say</h3>
              <p className="text-gray-500">Trusted by thousands of happy shoppers.</p>
            </div>

            <div className="flex gap-6 overflow-x-auto snap-x hide-scrollbar pb-4 px-2">
              {[
                { name: "Priya Sharma", rating: 5, review: "Absolutely in love with the silk saree I bought! The quality is top-notch and the delivery was super fast." },
                { name: "Anjali Verma", rating: 5, review: "The festive collection is amazing. Bought a lehenga for my sister's wedding and everyone complimented it." },
                { name: "Sneha Reddy", rating: 4, review: "Great products and good prices. The cotton kurti fits perfectly and is very comfortable." },
                { name: "Riya Kapoor", rating: 5, review: "Aradhana Apparels never disappoints. The app is so easy to use and the customer service is excellent." }
              ].map((rev, idx) => (
                <div key={idx} className="w-[280px] shrink-0 snap-start bg-white p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col justify-between">
                  <div>
                    <div className="flex gap-1 mb-3 text-brand-orange text-lg">
                      {'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed italic">"{rev.review}"</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="font-bold text-gray-900 text-sm">{rev.name}</p>
                    <p className="text-xs text-gray-400">Verified Buyer</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Features Block (Free Delivery, etc) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-10 mb-6 px-2 md:px-0">
            {[
              { icon: Truck, title: "Free Delivery", subtitle: "On orders over $50", color: "text-blue-500", bg: "bg-blue-50/50", border: "border-blue-100/50" },
              { icon: RefreshCcw, title: "Easy Returns", subtitle: "30 days policy", color: "text-brand-orange", bg: "bg-orange-50/50", border: "border-orange-100/50" },
              { icon: ShieldCheck, title: "Secure Payments", subtitle: "100% secure checkout", color: "text-emerald-500", bg: "bg-emerald-50/50", border: "border-emerald-100/50" },
              { icon: Award, title: "Best Prices", subtitle: "Guaranteed deals", color: "text-yellow-500", bg: "bg-yellow-50/50", border: "border-yellow-100/50" },
            ].map((feature, idx) => (
              <div key={idx} className="flex flex-col items-center p-5 md:p-6 text-center bg-white rounded-[2rem] border border-gray-100/60 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-300 group">
                <div className={`w-14 h-14 md:w-16 md:h-16 rounded-[1.25rem] ${feature.bg} flex items-center justify-center ${feature.color} border ${feature.border} mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  <feature.icon className="w-6 h-6 md:w-7 md:h-7" strokeWidth={1.5} />
                </div>
                <h4 className="text-gray-900 font-extrabold text-[14px] md:text-[15px] mb-1.5 leading-tight">{feature.title}</h4>
                <p className="text-gray-500 text-[12px] md:text-[13px] leading-relaxed">{feature.subtitle}</p>
              </div>
            ))}
          </div>

        </div>
      </div>

    </div>
  );
}
