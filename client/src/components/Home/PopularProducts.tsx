import { useEffect, useState } from "react";
import type { Product } from "../../types";
import { Link } from "react-router-dom";
import ProductCard from "../ProductCard";
import api from "../../config/api";
import toast from "react-hot-toast";

const PopularProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        api.get("/products?sort=rating")
            .then(({ data }) => {
                setProducts(data.products);
            })
            .catch((error: any) => {
                toast.error(error.response.data.message || error?.message);
            });
    }, []);
    return (
        <section className="py-16 sm:py-24 relative overflow-hidden">
            {/* Subtle background decoration */}
            <div className="absolute top-20 left-0 w-[500px] h-[500px] bg-orange-50/50 rounded-full blur-3xl -translate-x-1/2 -z-10"></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-5">
                    <div className="relative z-10">
                        <span className="text-app-orange font-bold text-xs sm:text-sm tracking-widest uppercase mb-2 block flex items-center gap-2">
                            <span className="w-8 h-[2px] bg-app-orange rounded-full"></span>
                            Top Rated
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold font-serif text-app-green">
                            Popular Products
                        </h2>
                    </div>
                    <Link to="/products" className="flex items-center gap-2 px-6 py-2.5 bg-white text-app-green border border-green-100 rounded-full text-sm font-bold hover:bg-app-green hover:text-white hover:border-app-green transition-all duration-300 shadow-sm hover:shadow-md group relative z-10">
                        View All <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                    </Link>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 sm:gap-6 xl:gap-8 relative z-10">
                    {products.slice(0, 10).map((product, idx) => (
                        <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PopularProducts;
