import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, LayoutGrid, Heart, ShoppingBag, User } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useWishlistStore } from '../store/useWishlistStore';

export function BottomNav() {
  const { token } = useAuthStore();
  const location = useLocation();
  const wishlistCount = useWishlistStore(s => s.items?.length || 0);

  const isActive = (paths) => paths.some(p =>
    typeof p === 'function' ? p(location.pathname) : location.pathname === p
  );

  const tabs = [
    {
      name: 'Home',
      path: '/',
      active: isActive(['/']),
      icon: (active) => <Home className="w-6 h-6 mb-1" fill={active ? 'currentColor' : 'none'} strokeWidth={active ? "0" : "2"} />
    },
    {
      name: 'Categories',
      path: '/category/all',
      active: isActive([p => p.startsWith('/category')]),
      icon: (active) => <LayoutGrid className="w-6 h-6 mb-1" fill={active ? 'currentColor' : 'none'} strokeWidth={active ? "0" : "2"} />
    },
    {
      name: 'Wishlist',
      path: '/wishlist',
      active: isActive(['/wishlist']),
      badge: wishlistCount,
      icon: (active) => <Heart className="w-6 h-6 mb-1" fill={active ? 'currentColor' : 'none'} strokeWidth={active ? "0" : "2"} />
    },
    {
      name: 'Orders',
      path: '/my-orders',
      active: isActive(['/my-orders']),
      icon: (active) => <ShoppingBag className="w-6 h-6 mb-1" fill={active ? 'currentColor' : 'none'} strokeWidth={active ? "0" : "2"} />
    },
    {
      name: 'Account',
      path: token ? '/profile' : '/login',
      active: isActive(['/dashboard', '/profile', '/my-addresses', '/account-settings', '/login']),
      icon: (active) => <User className="w-6 h-6 mb-1" fill={active ? 'currentColor' : 'none'} strokeWidth={active ? "0" : "2"} />
    },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 w-full z-50 bg-white border-t border-gray-100 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
      <div className="flex justify-around items-center h-[65px] px-2">
        {tabs.map((tab) => (
          <NavLink
            key={tab.name}
            to={tab.path}
            className={`flex flex-col items-center justify-center h-full transition-colors duration-200 flex-1 ${tab.active ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <div className="relative">
              {tab.badge > 0 && (
                <span className="absolute -top-1 -right-2 min-w-[14px] h-[14px] bg-indigo-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center px-1 shadow-sm z-10 border border-white">
                  {tab.badge > 9 ? '9+' : tab.badge}
                </span>
              )}
              {tab.icon(tab.active)}
            </div>
            <span className="text-[10px] font-medium mt-0.5">
              {tab.name}
            </span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
