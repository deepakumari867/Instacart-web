import { ArrowUpRightIcon, BikeIcon, ChevronDownIcon, LogOutIcon, MapPinIcon, MenuIcon, PackageIcon, SearchIcon, ShieldIcon, ShoppingBag, ShoppingCartIcon, UserIcon, XIcon, Leaf, Moon, Sun } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
    const { user, logout } = useAuth();
    const { cartCount, setIsCartOpen } = useCart();
    const { theme, toggleTheme } = useTheme();
    const [searchQuery, setSearchQuery] = useState("");
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
    const navigate = useNavigate();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery("");
            setMobileSearchOpen(false);
        }
    };

    const handleLogout = () => {
        logout();
        setUserMenuOpen(false);
        navigate("/");
    };

    return (
        <nav className="sticky top-0 sm:top-4 z-50 mx-0 sm:mx-4 lg:mx-auto max-w-7xl transition-all duration-300">
            <div className="bg-white/90 backdrop-blur-xl sm:rounded-full border-b sm:border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.04)] px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 sm:h-20 gap-4 relative">
                {/* Decorative glow behind navbar */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-50/50 via-transparent to-green-50/50 sm:rounded-full -z-10 blur-xl"></div>
                
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 text-xl sm:text-[22px] font-bold shrink-0 group transition-colors">
                    <div className="p-1.5 sm:p-2 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-500/20 dark:to-orange-500/10 rounded-xl sm:rounded-2xl group-hover:scale-105 group-hover:-rotate-6 transition-all duration-300 shadow-sm border border-orange-200/50 dark:border-orange-500/30">
                        <Leaf size={20} className="text-app-orange dark:text-orange-400 sm:w-6 sm:h-6" />
                    </div>
                    <span className="font-serif tracking-wide hidden min-[360px]:block text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 to-app-green dark:from-white dark:to-orange-100 drop-shadow-sm">Instacart</span>
                </Link>

                <div className="w-full flex items-center justify-end gap-2 sm:gap-4 lg:gap-8">
                    {/* Nav Links - Desktop */}
                    <div className="hidden md:flex items-center gap-1 bg-gray-50/50 dark:bg-white/5 p-1 rounded-full border border-gray-100 dark:border-white/10">
                        <Link to="/" className="px-5 py-2 text-sm font-semibold text-zinc-600 dark:text-zinc-300 hover:text-app-green dark:hover:text-white hover:bg-white dark:hover:bg-white/10 rounded-full transition-all shadow-sm shadow-transparent hover:shadow-[0_2px_10px_rgba(0,0,0,0.02)]">Home</Link>
                        <Link to="/products" className="px-5 py-2 text-sm font-semibold text-zinc-600 dark:text-zinc-300 hover:text-app-green dark:hover:text-white hover:bg-white dark:hover:bg-white/10 rounded-full transition-all shadow-sm shadow-transparent hover:shadow-[0_2px_10px_rgba(0,0,0,0.02)]">Products</Link>
                        <Link to="/deals" className="px-5 py-2 text-sm font-bold text-app-orange dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-500/10 rounded-full transition-all">Deals</Link>
                    </div>

                    {/* Desktop Search */}
                    <form onSubmit={handleSearch} className="hidden sm:flex flex-1 max-w-xs text-xs sm:text-sm relative">
                        <div className="relative w-full group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <SearchIcon className="size-4 text-zinc-400 group-focus-within:text-app-orange dark:group-focus-within:text-orange-400 transition-colors" />
                            </div>
                            <input 
                                type="text" 
                                placeholder="Search groceries..." 
                                value={searchQuery} 
                                onChange={(e) => setSearchQuery(e.target.value)} 
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-50/80 dark:bg-white/5 hover:bg-gray-100/80 dark:hover:bg-white/10 border border-gray-100 dark:border-white/10 rounded-full focus:ring-4 focus:ring-app-orange/10 dark:focus:ring-orange-500/20 focus:border-app-orange/30 dark:focus:border-orange-500/50 outline-none transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-500 font-medium text-zinc-700 dark:text-white shadow-inner dark:shadow-none" 
                            />
                        </div>
                    </form>

                    {/* Right Actions */}
                    <div className="flex items-center gap-1 sm:gap-2 bg-white/50 dark:bg-white/5 p-1 sm:p-1.5 rounded-full sm:border border-gray-100 dark:border-white/10 sm:shadow-sm">
                        {/* Mobile Search Toggle */}
                        <button className="sm:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors" onClick={() => setMobileSearchOpen(!mobileSearchOpen)}>
                            <SearchIcon className="size-5 text-zinc-600 dark:text-zinc-300" />
                        </button>

                        {/* Theme Toggle */}
                        <button 
                            className="p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-zinc-600 dark:text-zinc-300 hover:text-app-orange dark:hover:text-orange-400"
                            onClick={toggleTheme}
                            aria-label="Toggle Theme"
                        >
                            {theme === "light" ? <Moon className="size-5" /> : <Sun className="size-5" />}
                        </button>

                        {/* Cart */}
                        <button className="relative p-2.5 rounded-full hover:bg-orange-50 dark:hover:bg-orange-500/10 transition-colors group" onClick={() => setIsCartOpen(true)}>
                            <ShoppingBag className="size-5 text-zinc-600 dark:text-zinc-300 group-hover:text-app-orange dark:group-hover:text-orange-400 transition-colors" />
                            {cartCount > 0 && (
                                <span className="absolute top-0 right-0 size-5 bg-app-orange text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white dark:border-[#1a1a1a] shadow-sm transform group-hover:scale-110 transition-transform">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                        
                        {/* User Menu */}
                        <div className="relative">
                            {user ? (
                                <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors border border-transparent">
                                    <div className="size-8 sm:size-9 rounded-full bg-gradient-to-br from-app-green to-emerald-600 dark:from-app-orange dark:to-orange-500 text-white flex-center font-bold shadow-sm shadow-app-green/20 dark:shadow-orange-500/20 text-sm">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <ChevronDownIcon className="size-4 text-zinc-400 hidden sm:block mr-1" />
                                </button>
                            ) : (
                                <div className="flex-center">
                                    <Link to="/login" className="hidden md:flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-app-green dark:bg-app-orange rounded-full hover:bg-app-green-dark dark:hover:bg-orange-600 shadow-lg shadow-app-green/20 dark:shadow-orange-500/20 transition-all active:scale-95 ml-2">
                                        <UserIcon size={16} /> Sign In
                                    </Link>
                                    <button className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors ml-1" onClick={() => setUserMenuOpen(!userMenuOpen)}>
                                        {userMenuOpen ? <XIcon className="size-6 text-zinc-700 dark:text-zinc-300" /> : <MenuIcon className="size-6 text-zinc-700 dark:text-zinc-300" />}
                                    </button>
                                </div>
                            )}

                            {/* Dropdown Menu */}
                            {userMenuOpen && (
                                <>
                                    <div className="fixed inset-0 z-40 md:hidden bg-black/5 backdrop-blur-sm" onClick={() => setUserMenuOpen(false)} />
                                    <div className="absolute right-0 mt-4 w-64 bg-white/95 backdrop-blur-xl rounded-[1.5rem] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 py-3 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
                                        {user ? (
                                            <div className="px-5 py-3 border-b border-gray-100 mb-2">
                                                <p className="text-sm font-bold text-zinc-800 truncate">{user?.name}</p>
                                                <p className="text-[11px] text-zinc-500 font-medium truncate mt-0.5">{user?.email}</p>
                                            </div>
                                        ) : (
                                            <div className="px-3 py-2 md:hidden">
                                                <Link to="/login" className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-app-green text-white rounded-xl text-sm font-bold shadow-md shadow-app-green/20">
                                                    <UserIcon size={16} /> Sign In
                                                </Link>
                                            </div>
                                        )}
                                        
                                        <div onClick={() => setUserMenuOpen(false)} className="px-2 space-y-1">
                                            {user && (
                                                <>
                                                    <Link to="/orders" className="flex items-center gap-3 px-4 py-2.5 text-[13px] font-semibold text-zinc-600 hover:bg-gray-50 hover:text-app-green rounded-xl transition-colors">
                                                        <PackageIcon size={16} /> My Orders
                                                    </Link>
                                                    <Link to="/addresses" className="flex items-center gap-3 px-4 py-2.5 text-[13px] font-semibold text-zinc-600 hover:bg-gray-50 hover:text-app-green rounded-xl transition-colors">
                                                        <MapPinIcon size={16} /> Addresses
                                                    </Link>
                                                </>
                                            )}

                                            <div className="md:hidden">
                                                {user && <div className="h-px bg-gray-100 my-2 mx-3"></div>}
                                                <Link to="/" className="flex items-center gap-3 px-4 py-2.5 text-[13px] font-semibold text-zinc-600 hover:bg-gray-50 hover:text-app-green rounded-xl transition-colors">
                                                    Home
                                                </Link>
                                                <Link to="/products" className="flex items-center gap-3 px-4 py-2.5 text-[13px] font-semibold text-zinc-600 hover:bg-gray-50 hover:text-app-green rounded-xl transition-colors">
                                                    <ArrowUpRightIcon size={16} /> Products
                                                </Link>
                                                <Link to="/deals" className="flex items-center gap-3 px-4 py-2.5 text-[13px] font-bold text-app-orange hover:bg-orange-50 rounded-xl transition-colors">
                                                    <ArrowUpRightIcon size={16} /> Deals
                                                </Link>
                                            </div>

                                            {user?.isAdmin && (
                                                <>
                                                    <div className="h-px bg-gray-100 my-2 mx-3"></div>
                                                    <Link to="/admin/products" className="flex items-center gap-3 px-4 py-2.5 text-[13px] font-bold text-app-orange-dark hover:bg-orange-50 rounded-xl transition-colors">
                                                        <ShieldIcon size={16} /> Admin Panel
                                                    </Link>
                                                </>
                                            )}
                                            
                                            {user && (
                                                <>
                                                    <div className="h-px bg-gray-100 my-2 mx-3"></div>
                                                    <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-2.5 text-[13px] font-bold text-red-600 hover:bg-red-50 w-full rounded-xl transition-colors text-left">
                                                        <LogOutIcon size={16} /> Logout
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Search Bar Dropdown */}
            {mobileSearchOpen && (
                <div className="sm:hidden px-4 pb-4 pt-2 absolute w-full top-full animate-in fade-in slide-in-from-top-2">
                    <form onSubmit={handleSearch} className="relative w-full">
                        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
                        <input autoFocus type="text" placeholder="Search groceries..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-11 pr-4 py-3.5 bg-white shadow-xl shadow-black/5 border border-gray-100 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-app-orange/10 transition-all placeholder:text-zinc-400" />
                    </form>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
