import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 pt-12 pb-6 mt-auto">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                {/* Brand */}
                <div>
                    <h2 className="text-2xl font-bold text-white mb-3">
                        <span className="text-emerald-400">Skill</span>Swap
                    </h2>
                    <p className="text-sm leading-relaxed text-gray-400">
                        A local platform to exchange skills, learn from others, and grow together as a community.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-white font-semibold mb-3">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/" className="hover:text-emerald-400 transition">Home</Link></li>
                        <li><Link to="/login" className="hover:text-emerald-400 transition">Login</Link></li>
                        <li><Link to="/register" className="hover:text-emerald-400 transition">Sign Up</Link></li>
                        <li><a href="#" className="hover:text-emerald-400 transition">Privacy Policy</a></li>
                    </ul>
                </div>

                {/* Contact & Social */}
                <div>
                    <h3 className="text-white font-semibold mb-3">Contact Us</h3>
                    <p className="text-sm text-gray-400 mb-1">📧 support@skillswap.com</p>
                    <p className="text-sm text-gray-400 mb-4">📍 Dhaka, Bangladesh</p>
                    <div className="flex gap-3">
                        <a href="#" className="bg-gray-700 hover:bg-emerald-500 p-2 rounded-full transition"><FaFacebookF size={14} /></a>
                        <a href="#" className="bg-gray-700 hover:bg-emerald-500 p-2 rounded-full transition"><FaTwitter size={14} /></a>
                        <a href="#" className="bg-gray-700 hover:bg-emerald-500 p-2 rounded-full transition"><FaInstagram size={14} /></a>
                        <a href="#" className="bg-gray-700 hover:bg-emerald-500 p-2 rounded-full transition"><FaLinkedinIn size={14} /></a>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-700 pt-4 text-center text-xs text-gray-500">
                © {new Date().getFullYear()} SkillSwap. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;