import { ArrowRightIcon, LeafIcon } from "lucide-react";
import { heroSectionData } from "../../assets/assets";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const slides = [
    {
        image: heroSectionData.hero_image,
        title: (
            <>
                Nourish your home with <span className="text-orange-300">Earth's finest</span>
            </>
        ),
        description: heroSectionData.description,
    },
    {
        image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop",
        title: (
            <>
                Fresh & Organic <span className="text-orange-300">Groceries</span>
            </>
        ),
        description: "Shop from a wide variety of fresh, organic, and locally sourced groceries.",
    },
    {
        image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?q=80&w=1974&auto=format&fit=crop",
        title: (
            <>
                Fast <span className="text-orange-300">Delivery</span> to your door
            </>
        ),
        description: "Get your groceries delivered safely and quickly right to your doorstep.",
    },
];

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative overflow-hidden min-h-[540px] mb-10 rounded-3xl flex items-center">
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                        index === currentSlide ? "opacity-100" : "opacity-0"
                    }`}
                >
                    <img src={slide.image} alt="Hero" className="absolute inset-0 h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-linear-to-r from-app-green via-app-green/70 to-transparent" />
                </div>
            ))}

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full z-10">
                <div className="max-w-xl xl:pl-10 transition-all duration-700 transform translate-y-0 opacity-100">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-orange-300 bg-orange-300/10 rounded-full mb-5 backdrop-blur-sm">
                        <LeafIcon className="size-3" /> Farm-Fresh & Organic
                    </span>

                    <div className="relative h-[160px] sm:h-[180px] lg:h-[200px]">
                        {slides.map((slide, index) => (
                            <div
                                key={index}
                                className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                                    index === currentSlide
                                        ? "opacity-100 translate-y-0 pointer-events-auto"
                                        : "opacity-0 translate-y-8 pointer-events-none"
                                }`}
                            >
                                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-5">
                                    {slide.title}
                                </h1>
                                <p className="text-base text-white/80 leading-relaxed max-w-md">
                                    {slide.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-3 mt-8">
                        <Link to="/products" className="px-7 py-3 bg-orange-400 text-white font-semibold rounded-full hover:bg-orange-500 hover:scale-105 transition-all flex-center gap-2 active:scale-[0.98] shadow-lg shadow-orange-500/30">
                            Shop Now <ArrowRightIcon className="size-4" />
                        </Link>

                        <Link to="/products" className="px-7 py-3 bg-white/10 backdrop-blur-md text-white font-semibold rounded-full hover:bg-white/20 transition-all border border-white/20">
                            Browse Categories
                        </Link>
                    </div>

                    <div className="flex gap-2 mt-10">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`h-1.5 rounded-full transition-all duration-300 ${
                                    index === currentSlide ? "w-8 bg-orange-400" : "w-2 bg-white/40 hover:bg-white/60"
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
