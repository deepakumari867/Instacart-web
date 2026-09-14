import { heroSectionData } from "../../assets/assets";

const Features = () => {
    return (
        <section className="bg-transparent py-10">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 pt-8">
                    {heroSectionData.hero_features.map((feature, i) => (
                        <div key={i} 
                             className="bag-hang relative bg-white border border-app-border/80 rounded-b-2xl rounded-t-sm shadow-sm hover:shadow-md p-5 flex flex-col items-center gap-3 transition-shadow group cursor-pointer"
                             style={{ animationDelay: `${i * 0.2}s` }}
                        >
                            {/* Bag Handle */}
                            <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-16 h-8 border-[4px] border-gray-300 rounded-t-full border-b-0 z-0 group-hover:border-app-green transition-colors duration-300"></div>
                            
                            {/* Inner block to mask the bottom of the handle */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[calc(100%-2px)] h-[6px] bg-white z-10 rounded-t-sm"></div>
                            
                            {/* Enhanced Icon Container */}
                            <div className="size-14 rounded-full bg-green-50/80 border border-green-100 flex-center shrink-0 mb-2 shadow-sm group-hover:bg-app-green group-hover:shadow-md group-hover:scale-110 transition-all duration-300 relative z-20 mt-2">
                                <feature.icon className="size-6 text-app-green group-hover:text-white transition-colors duration-300" strokeWidth={1.75} />
                            </div>
                            <div className="text-center relative z-20">
                                <p className="text-sm md:text-[15px] font-bold text-app-green mb-1.5 group-hover:text-app-orange transition-colors duration-300">{feature.title}</p>
                                <p className="text-xs text-app-text-light leading-relaxed">{feature.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
