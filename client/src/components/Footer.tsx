import { Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import { footerData } from "../assets/assets";

const Footer = () => {
    return (
        <footer className="bg-app-green text-white rounded-t-[3rem] mt-10 relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-emerald-900/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-16 sm:py-20 relative z-10">
                {/* - top -  */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
                    {/* Brand */}
                    <div className="lg:col-span-2 pr-0 lg:pr-10">
                        <Link to="/" className="flex items-center gap-2 mb-6 group">
                            <div className="p-2 bg-white/10 rounded-xl group-hover:bg-white/20 transition-colors">
                                <Leaf className="size-6 text-app-orange" />
                            </div>
                            <span className="text-2xl font-serif font-bold tracking-wide">{footerData.brand.name}</span>
                        </Link>

                        <p className="text-sm text-white/70 mb-8 leading-relaxed max-w-sm">{footerData.brand.description}</p>

                        <div className="flex gap-4">
                            {footerData.brand.socials.map((social, i) => (
                                <a key={i} href={social.link} className="size-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-app-orange hover:border-app-orange transition-all duration-300 hover:-translate-y-1">
                                    <social.icon className="size-4.5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Dynamic Sections */}
                    {footerData.sections.map((section, i) => (
                        <div key={i}>
                            <h3 className="text-sm font-bold uppercase tracking-wider mb-6 text-white">{section.title}</h3>
                            <ul className="space-y-4">
                                {section.links.map((link, j) => (
                                    <li key={j}>
                                        {link.to ? (
                                            <Link to={link.to} className="text-sm text-white/60 hover:text-app-orange transition-colors flex items-center gap-2 group">
                                                <span className="w-1.5 h-1.5 rounded-full bg-app-orange/0 group-hover:bg-app-orange transition-colors"></span>
                                                {link.label}
                                            </Link>
                                        ) : (
                                            <a href={link.href} className="text-sm text-white/60 hover:text-app-orange transition-colors flex items-center gap-2 group">
                                                <span className="w-1.5 h-1.5 rounded-full bg-app-orange/0 group-hover:bg-app-orange transition-colors"></span>
                                                {link.label}
                                            </a>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Contact */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider mb-6 text-white">Contact Us</h3>
                        <ul className="space-y-4">
                            {footerData.contact.map((item, i) => {
                                const Icon = item.icon;
                                return (
                                    <li key={i} className="flex gap-3 text-sm text-white/60 items-start group hover:text-white transition-colors">
                                        <div className="mt-0.5 p-1.5 bg-white/5 rounded-md group-hover:bg-app-orange transition-colors">
                                            <Icon className="size-3.5 text-white" /> 
                                        </div>
                                        <span className="leading-relaxed">{item.text}</span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-xs sm:text-sm text-white/50">{footerData.bottom.copyright}</p>

                    <div className="flex flex-wrap justify-center gap-6">
                        {footerData.bottom.links.map((link, i) => (
                            <a key={i} href={link.href} className="text-xs sm:text-sm text-white/50 hover:text-white transition-colors">
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
