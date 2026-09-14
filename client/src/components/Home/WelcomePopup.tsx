import { useState, useEffect } from "react";
import { categoriesData } from "../../assets/assets";

const WelcomePopup = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isClosed, setIsClosed] = useState(false);

    useEffect(() => {
        // Check if already seen in this session to not annoy the user, but for demo let's just use state
        const timer = setTimeout(() => {
            if (!isClosed) setIsVisible(true);
        }, 1200);

        return () => clearTimeout(timer);
    }, [isClosed]);

    if (isClosed) return null;

    return (
        <div 
            className={`fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-50 transition-all duration-700 cubic-bezier(0.34, 1.56, 0.64, 1) transform ${
                isVisible ? "translate-x-0 opacity-100 scale-100" : "translate-x-[120%] opacity-0 scale-90"
            }`}
        >
            <div className="bg-white rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] p-4 w-[280px] sm:w-[320px] border border-gray-100 relative overflow-hidden flex flex-col gap-3 group">
                {/* Decorative background blob */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-100 rounded-full blur-2xl -z-10"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-green-100 rounded-full blur-2xl -z-10"></div>

                {/* Close Button */}
                <button 
                    onClick={() => {
                        setIsVisible(false);
                        setTimeout(() => setIsClosed(true), 700);
                    }}
                    className="absolute top-4 right-4 z-20 w-7 h-7 flex items-center justify-center bg-white hover:bg-gray-100 text-gray-400 hover:text-gray-800 rounded-full shadow-sm transition-all"
                >
                    ✕
                </button>

                {/* Image Section */}
                <div className="w-full h-32 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl flex items-center justify-center p-2 relative overflow-hidden group-hover:shadow-inner transition-all">
                    <img 
                        src={categoriesData[0].image} // Fruits & Vegetables image
                        alt="Fresh Groceries" 
                        className="w-full h-full object-contain drop-shadow-md group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 relative z-10" 
                    />
                </div>

                {/* Content Section */}
                <div className="text-center px-1 pt-1 pb-1 relative z-10">
                    <div className="inline-block px-3 py-1 bg-green-100 text-app-green text-[10px] font-bold uppercase tracking-wider rounded-full mb-2">Special Offer</div>
                    <h3 className="text-[17px] font-bold font-serif text-app-green leading-tight">Welcome to Instacart!</h3>
                    <p className="text-xs text-zinc-500 mt-2 leading-relaxed px-2">
                        Get <span className="text-app-orange font-bold text-[13px]">20% OFF</span> on your first order of fresh organic produce.
                    </p>
                    <button 
                        onClick={() => {
                            setIsVisible(false);
                            setTimeout(() => setIsClosed(true), 700);
                        }}
                        className="mt-4 w-full py-2.5 bg-app-orange hover:bg-app-orange-dark text-white rounded-xl text-sm font-bold shadow-[0_4px_14px_rgba(234,88,12,0.3)] hover:shadow-[0_6px_20px_rgba(234,88,12,0.4)] hover:-translate-y-0.5 transition-all duration-300"
                    >
                        Claim Offer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WelcomePopup;
