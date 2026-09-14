import { MailIcon } from "lucide-react";

const Newsletter = () => {
    return (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mb-24 relative">
            <div className="bg-white/80 backdrop-blur-md rounded-[3rem] p-10 sm:p-16 shadow-[0_10px_50px_-15px_rgba(0,0,0,0.08)] border border-gray-100 relative overflow-hidden flex flex-col items-center text-center">
                
                {/* Decorative blobs */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-orange-50/80 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 -z-10"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-green-50/80 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 -z-10"></div>

                <div className="size-20 bg-gradient-to-br from-green-50 to-emerald-100/50 rounded-[1.5rem] flex items-center justify-center mb-6 shadow-inner border border-green-200/50">
                    <MailIcon className="size-8 text-app-green" strokeWidth={1.5} />
                </div>
                
                <h2 className="text-3xl sm:text-4xl font-bold font-serif text-app-green mb-4 leading-tight">Subscribe to our Newsletter</h2>
                <p className="text-app-text-light mb-10 text-sm sm:text-base max-w-lg leading-relaxed">
                    Get weekly updates on fresh produce, seasonal offers, and exclusive discounts right to your inbox.
                </p>

                <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 w-full max-w-lg relative z-10">
                    <input 
                        type="email" 
                        placeholder="Enter your email address" 
                        required 
                        className="flex-1 px-6 py-4 rounded-2xl border border-gray-200 focus:border-app-green focus:ring-4 focus:ring-app-green/10 bg-white/50 text-sm transition-all shadow-inner outline-none" 
                    />
                    <button 
                        type="submit" 
                        className="px-8 py-4 bg-app-orange text-white font-bold rounded-2xl hover:bg-app-orange-dark hover:shadow-lg hover:-translate-y-0.5 transition-all active:scale-95 whitespace-nowrap"
                    >
                        Subscribe
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Newsletter;
