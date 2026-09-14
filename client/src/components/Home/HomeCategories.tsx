import { Link } from "react-router-dom";
import { categoriesData } from "../../assets/assets";

const HomeCategories = () => {
    // Duplicate the array so it seamlessly loops in the marquee
    const duplicatedCategories = [...categoriesData, ...categoriesData, ...categoriesData];

    return (
        <section className="py-16 sm:py-20 bg-app-cream/30 border-t border-app-border/40 overflow-hidden relative">
            {/* Subtle background decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-green-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 -z-10"></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-5">
                    <div className="relative z-10">
                        <span className="text-app-orange font-bold text-xs sm:text-sm tracking-widest uppercase mb-2 block flex items-center gap-2">
                            <span className="w-8 h-[2px] bg-app-orange rounded-full"></span>
                            Fresh Picks
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold font-serif text-app-green relative inline-block">
                            Explore Categories
                        </h2>
                    </div>
                    <Link to="/products" className="flex items-center gap-2 px-6 py-2.5 bg-white text-app-green border border-green-100 rounded-full text-sm font-bold hover:bg-app-green hover:text-white hover:border-app-green transition-all duration-300 shadow-sm hover:shadow-md group relative z-10">
                        View All 
                        <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                    </Link>
                </div>
            </div>
            
            <div className="relative pb-12">
                {/* Marquee container */}
                <div className="flex w-max animate-marquee gap-6 sm:gap-8 px-4 hover:[animation-play-state:paused] py-4">
                    {duplicatedCategories.map((cat, idx) => (
                        <Link 
                            key={`${cat.slug}-${idx}`} 
                            to={`/products?category=${cat.slug}`} 
                            onClick={() => window.scrollTo(0, 0)} 
                            className="group flex flex-col justify-between w-[150px] sm:w-[170px] h-[190px] sm:h-[220px] shrink-0 bg-white border border-gray-100/80 rounded-[2rem] p-3 sm:p-4 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.06)] hover:shadow-[0_15px_35px_-10px_rgba(27,48,34,0.15)] hover:border-app-green/20 hover:-translate-y-2 transition-all duration-300 cursor-pointer relative z-10"
                        >
                            <div className="w-full h-24 sm:h-28 rounded-2xl bg-gradient-to-br from-green-50/80 to-emerald-50/30 flex-center overflow-visible relative mt-1 border border-green-50/50">
                                <img 
                                    src={cat.image} 
                                    alt={cat.name} 
                                    className="w-20 h-20 sm:w-24 sm:h-24 object-contain drop-shadow-md group-hover:-translate-y-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 ease-out relative z-10" 
                                />
                                {/* Ground shadow for the floating image */}
                                <div className="absolute bottom-1 w-12 h-1.5 bg-black/5 rounded-[100%] blur-[2px] group-hover:w-8 group-hover:bg-black/10 transition-all duration-500"></div>
                            </div>
                            
                            <div className="w-full text-center mt-auto pb-1 sm:pb-2 relative overflow-hidden">
                                <h3 className="text-[14px] sm:text-[15px] font-bold text-zinc-800 group-hover:text-app-green transition-colors duration-300 group-hover:-translate-y-1 transform">{cat.name}</h3>
                                <p className="text-[11px] text-zinc-400 font-semibold flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 absolute inset-x-0 bottom-0">
                                    Shop now <span className="text-app-orange">→</span>
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HomeCategories;
