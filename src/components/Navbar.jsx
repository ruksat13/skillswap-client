import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Navbar = () => {
    const { user, logout } = useAuth();
    const [showTooltip, setShowTooltip] = useState(false);

    const handleLogout = () => {
        logout();
    };

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-emerald-600">Skill</span>
                    <span className="text-2xl font-bold text-gray-800">Swap</span>
                </Link>

                {/* Nav Links */}
                <div className="flex items-center gap-6">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive
                                ? "text-emerald-600 font-semibold"
                                : "text-gray-600 hover:text-emerald-600 transition"
                        }
                    >
                        Home
                    </NavLink>

                    {user && (
                        <NavLink
                            to="/profile"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-emerald-600 font-semibold"
                                    : "text-gray-600 hover:text-emerald-600 transition"
                            }
                        >
                            My Profile
                        </NavLink>
                    )}
                </div>

                {/* Auth Buttons */}
                <div className="flex items-center gap-3">
                    {user ? (
                        <div className="flex items-center gap-3">
                            <div
                                className="relative"
                                onMouseEnter={() => setShowTooltip(true)}
                                onMouseLeave={() => setShowTooltip(false)}
                            >
                                <img
                                    src={user.photoURL || "https://i.ibb.co/placeholder/avatar.png"}
                                    alt="avatar"
                                    className="w-9 h-9 rounded-full object-cover cursor-pointer border-2 border-emerald-400"
                                />
                                {showTooltip && (
                                    <div className="absolute right-0 top-11 bg-gray-800 text-white text-xs px-3 py-1 rounded shadow-lg whitespace-nowrap">
                                        {user.displayName || "User"}
                                    </div>
                                )}
                            </div>
                            <button
                                onClick={handleLogout}
                                className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm transition"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <Link
                                to="/login"
                                className="border border-emerald-500 text-emerald-600 hover:bg-emerald-50 px-4 py-2 rounded-lg text-sm transition"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm transition"
                            >
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;