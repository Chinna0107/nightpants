import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Tag, Ticket, Copy, Check, ShoppingBag, Calendar, ArrowRight } from 'lucide-react';
import { Header } from '../components/Header';
import { motion } from 'framer-motion';
import { useStoreData } from '../store/useStoreData';
import { ProductCard } from '../components/ProductCard';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api';

export function OffersPage() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const highlightId = searchParams.get('id');

  const { products, fetchData: fetchStoreData } = useStoreData();

  useEffect(() => {
    fetchStoreData();
    fetch(`${BACKEND_URL}/offers/active`)
      .then(r => r.json())
      .then(d => setOffers(d.offers || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [fetchStoreData]);

  const handleCopy = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const discountLabel = (o) =>
    o.discount_type === 'flat' ? `₹${o.discount_percent} OFF` : `${o.discount_percent}% OFF`;

  const restrictionLabel = (o) => {
    if (!o.min_value && !o.restriction_value) return null;
    const val = o.min_value || o.restriction_value;
    const type = o.min_type || o.restriction_type;
    if (type === 'qty' || type === 'min_qty') return `Min. ${val} items`;
    return `Min. order ₹${val}`;
  };

  const productOffers = offers.filter(o => o.offer_type === 'offer' || !o.code);
  const coupons = offers.filter(o => o.offer_type === 'coupon' || o.code);

  const activeOffer = highlightId ? offers.find(o => String(o.id) === highlightId) : null;
  let matchingProducts = [];

  if (activeOffer) {
    if (activeOffer.scope === 'all') {
      matchingProducts = products;
    } else if (activeOffer.scope === 'product') {
      let pIds = activeOffer.product_ids || [];
      if (typeof pIds === 'string') {
        try { pIds = JSON.parse(pIds); } catch(e) { pIds = []; }
      }
      matchingProducts = products.filter(p => pIds.map(String).includes(String(p.id)));
    } else if (activeOffer.scope === 'category') {
      let cIds = activeOffer.category_ids || [];
      if (typeof cIds === 'string') {
        try { cIds = JSON.parse(cIds); } catch(e) { cIds = []; }
      }
      matchingProducts = products.filter(p => cIds.map(String).includes(String(p.category_id || p.category)));
    }
  }

  if (loading) return (
    <div className="min-h-screen bg-transparent">
      <Header />
      <div className="flex items-center justify-center py-32">
        <div className="w-8 h-8 border-4 border-white/10 border-t-indigo-600 rounded-full animate-spin" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-transparent pb-20 font-sans">
      <Header />

      {/* Hero */}
      {!activeOffer && (
        <div className="bg-[#08183A] border-b border-[#D4AF37]/30 px-6 py-12 text-center shadow-lg">
          <div className="inline-flex items-center gap-2 bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.2)] text-xs font-bold px-4 py-1.5 rounded-full mb-4">
            <Tag className="w-3.5 h-3.5" /> EXCLUSIVE DEALS
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">Offers & Coupons</h1>
          <p className="text-gray-300 text-sm md:text-base">Save more on every order with our latest deals</p>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-10">



        {/* Product Offers */}
        {!activeOffer && productOffers.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-6 px-2">
              <Tag className="w-6 h-6 text-[#08183A]" />
              <h2 className="text-xl font-bold text-[#08183A]">Active Offers</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {productOffers.map((o, i) => (
                <motion.div key={o.id}
                  onClick={() => navigate(`/offers?id=${o.id}`)}
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="cursor-pointer bg-white rounded-3xl border border-[#08183A]/10 p-6 shadow-sm hover:border-[#08183A]/30 hover:shadow-lg transition-all">
                  <p className="text-2xl font-black text-[#D4AF37] mb-2">{discountLabel(o)}</p>
                  <p className="text-base font-bold text-[#08183A] mb-1.5">{o.name}</p>
                  <p className="text-xs text-gray-500 capitalize">
                    {o.scope === 'all' ? 'On all products' : o.scope === 'category' ? 'On selected categories' : 'On selected products'}
                  </p>
                  {o.expires_at && (
                    <p className="flex items-center gap-1.5 text-[11px] text-gray-500 mt-4 border-t border-gray-100 pt-3">
                      <Calendar className="w-3.5 h-3.5" /> Expires {new Date(o.expires_at).toLocaleDateString('en-IN')}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {offers.length === 0 && (
          <div className="text-center py-24 bg-white rounded-3xl border border-[#08183A]/10 shadow-sm">
            <Tag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-6 text-lg">No active offers right now. Check back soon!</p>
            <button onClick={() => navigate('/')}
              className="flex items-center justify-center gap-2 mx-auto px-6 py-3 bg-[#08183A] text-white rounded-xl text-sm font-bold shadow-md hover:bg-[#D4AF37] transition-all hover:-translate-y-0.5 w-max">
              <ShoppingBag className="w-4 h-4" /> Shop Now
            </button>
          </div>
        )}

        {/* Global Products Grid (When no specific offer is highlighted) */}
        {!activeOffer && products.length > 0 && (
          <section className="pt-10 border-t border-gray-100 mt-10">
            <div className="flex items-center gap-2 mb-6 px-2">
              <ShoppingBag className="w-6 h-6 text-[#08183A]" />
              <h2 className="text-xl font-bold text-[#08183A]">Featured Products</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.filter(p => p.is_offer).length > 0 
                ? products.filter(p => p.is_offer).map(product => (
                    <ProductCard key={product.id} product={product} layout="grid" />
                  ))
                : products.slice(0, 8).map(product => (
                    <ProductCard key={product.id} product={product} layout="grid" />
                  ))
              }
            </div>
          </section>
        )}
        
        {/* Matching Products for Highlighted Offer */}
        {activeOffer && (
          <section>
            <div className="bg-[#08183A] border-b border-[#D4AF37]/30 px-6 py-12 text-center shadow-lg mb-8">
              <div className="inline-flex items-center gap-2 bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.2)] text-sm font-bold px-4 py-1.5 rounded-full mb-4">
                <Tag className="w-4 h-4" /> {discountLabel(activeOffer)}
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">{activeOffer.name || activeOffer.code}</h1>
              <p className="text-gray-300 text-sm md:text-base">Products eligible for this exclusive offer</p>
            </div>
            
            {matchingProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {matchingProducts.map(product => (
                  <ProductCard key={product.id} product={product} layout="grid" />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 border-t border-white/10">
                <p className="text-brand-text-muted">No products found for this offer.</p>
              </div>
            )}
          </section>
        )}

      </div>
    </div>
  );
}
