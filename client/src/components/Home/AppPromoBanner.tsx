import { appPromoBannerData, assets } from "../../assets/assets";

const AppPromoBanner = () => {
    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 my-10 relative">
            <div className="bg-gradient-to-r from-app-green to-emerald-900 rounded-[2.5rem] shadow-2xl overflow-hidden relative border border-emerald-800">
                {/* Decorative background circle */}
                <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-emerald-500/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-app-orange/20 rounded-full blur-3xl"></div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-10 px-8 py-12 sm:p-14 lg:p-16 relative z-10">
                    {/* Left side content */}
                    <div className="text-center md:text-left md:max-w-xl">
                        <span className="text-app-orange font-bold text-xs tracking-widest uppercase mb-3 block">Download App</span>
                        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white mb-4 leading-tight">{appPromoBannerData.title}</h2>
                        <p className="text-white/80 mb-8 text-sm sm:text-base leading-relaxed">{appPromoBannerData.description}</p>
                        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                            <button className="flex items-center gap-3 px-6 py-3.5 bg-white text-app-green font-bold rounded-2xl hover:bg-orange-50 hover:scale-105 transition-all shadow-lg active:scale-95">
                                <span className="text-xl">🍎</span> 
                                <div className="text-left leading-tight">
                                    <div className="text-[10px] font-medium text-gray-500">Download on the</div>
                                    <div className="text-sm">App Store</div>
                                </div>
                            </button>
                            <button className="flex items-center gap-3 px-6 py-3.5 bg-white/10 backdrop-blur-md text-white font-bold rounded-2xl hover:bg-white/20 hover:scale-105 transition-all border border-white/20 shadow-lg active:scale-95">
                                <span className="text-xl">▶️</span> 
                                <div className="text-left leading-tight">
                                    <div className="text-[10px] font-medium text-white/70">GET IT ON</div>
                                    <div className="text-sm">Google Play</div>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Right side image */}
                    <div className="relative group">
                        {/* Shadow underneath */}
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[70%] h-6 bg-black/40 rounded-full blur-md group-hover:w-[60%] group-hover:bg-black/20 transition-all duration-500"></div>
                        <img 
                            src={assets.delivery_truck} 
                            alt="Delivery Truck" 
                            className="max-w-[280px] sm:max-w-[350px] lg:max-w-[450px] relative z-10 drop-shadow-2xl group-hover:-translate-y-4 group-hover:scale-105 transition-all duration-500 ease-out" 
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AppPromoBanner;
