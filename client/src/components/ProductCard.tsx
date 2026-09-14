import { useNavigate } from "react-router-dom";
import type { Product } from "../types";
import { ShoppingBag, Star, TrendingUp } from "lucide-react";
import { useCart } from "../context/CartContext";

interface Props {
    product: Product;
}

const ProductCard = ({ product }: Props) => {
    const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "$";
    const { addToCart } = useCart();
    const navigate = useNavigate();

    return (
        <div 
            className="group bg-white rounded-[1.5rem] p-3 sm:p-4 border border-gray-100/80 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_15px_35px_-10px_rgba(27,48,34,0.12)] hover:border-app-green/20 hover:-translate-y-1.5 transition-all duration-500 cursor-pointer flex flex-col h-full relative overflow-hidden"
            onClick={() => navigate(`/products/${product.id}`)}
        >
            {/* Top Badges */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
                {product.discount > 0 ? (
                    <span className="px-2.5 py-1 text-[10px] font-bold uppercase bg-app-orange text-white rounded-full shadow-sm flex items-center gap-1">
                        <TrendingUp className="size-3" />
                        {product.discount}% OFF
                    </span>
                ) : (
                    <div></div>
                )}
            </div>

            {/* Image Section */}
            <div className="relative w-full aspect-square rounded-2xl bg-gradient-to-br from-green-50/50 to-transparent flex-center mb-4 overflow-hidden">
                <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-[85%] h-[85%] object-contain drop-shadow-md group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 ease-out relative z-10" 
                />
                {/* Decorative circle */}
                <div className="absolute inset-0 bg-white/40 rounded-full blur-2xl group-hover:bg-app-orange/10 transition-colors duration-500 scale-75"></div>
            </div>

            {/* Info Section */}
            <div className="flex flex-col flex-grow">
                {/* Rating */}
                <div className="flex items-center gap-1 mb-1.5">
                    <Star className="size-3.5 text-app-warning fill-app-warning" />
                    <span className="text-[11px] font-bold text-zinc-700">{product.rating ? product.rating.toFixed(1) : "0.0"}</span>
                    <span className="text-[10px] text-zinc-400 font-medium">({product.reviewCount} reviews)</span>
                </div>

                <h3 className="text-sm sm:text-[15px] font-bold text-zinc-800 leading-snug mb-3 line-clamp-2 group-hover:text-app-green transition-colors">
                    {product.name}
                </h3>
                
                {/* Price and Add Button */}
                <div className="flex items-end justify-between mt-auto pt-2 border-t border-gray-100/60">
                    <div className="flex flex-col">
                        <span className="text-[11px] text-zinc-400 font-medium mb-0.5">{product.unit}</span>
                        <div className="flex items-baseline gap-1.5">
                            <span className="text-lg font-black text-app-green">
                                {currency}{product.price.toFixed(1)}
                            </span>
                            {product.originalPrice > product.price && (
                                <span className="text-xs text-zinc-400 line-through font-medium">
                                    {currency}{product.originalPrice.toFixed(1)}
                                </span>
                            )}
                        </div>
                    </div>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product);
                        }}
                        className="w-10 h-10 rounded-full bg-app-cream text-app-green flex items-center justify-center shrink-0 hover:bg-app-orange hover:text-white transition-all duration-300 shadow-sm hover:shadow-md hover:scale-110 active:scale-95 group/btn"
                    >
                        <ShoppingBag className="size-[18px] group-hover/btn:scale-110 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
