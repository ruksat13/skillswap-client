import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
    const { user, logout } = useAuth();
    const [showTooltip, setShowTooltip] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        setMenuOpen(false);
    };

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-1">
                    <span className="text-2xl font-bold text-emerald-600">Skill</span>
                    <span className="text-2xl font-bold text-gray-800">Swap</span>
                </Link>

                {/* Desktop Nav Links */}
                <div className="hidden md:flex items-center gap-6">
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

                {/* Desktop Auth Buttons */}
                <div className="hidden md:flex items-center gap-3">
                    {user ? (
                        <div className="flex items-center gap-3">
                            <div
                                className="relative"
                                onMouseEnter={() => setShowTooltip(true)}
                                onMouseLeave={() => setShowTooltip(false)}
                            >
                                <img
                                    src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || "User"}&background=10b981&color=fff`}
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

                {/* Mobile Hamburger */}
                <button
                    className="md:hidden text-gray-700"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden bg-white border-t px-4 py-4 flex flex-col gap-4">
                    <NavLink
                        to="/"
                        onClick={() => setMenuOpen(false)}
                        className={({ isActive }) =>
                            isActive ? "text-emerald-600 font-semibold" : "text-gray-600"
                        }
                    >
                        Home
                    </NavLink>
                    {user && (
                        <NavLink
                            to="/profile"
                            onClick={() => setMenuOpen(false)}
                            className={({ isActive }) =>
                                isActive ? "text-emerald-600 font-semibold" : "text-gray-600"
                            }
                        >
                            My Profile
                        </NavLink>
                    )}
                    {user ? (
                        <div className="flex items-center gap-3">
                            <img
                                src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || "User"}&background=10b981&color=fff`}
                                alt="avatar"
                                className="w-8 h-8 rounded-full border-2 border-emerald-400 object-cover"
                            />
                            <span className="text-sm text-gray-700">{user.displayName || "User"}</span>
                            <button
                                onClick={handleLogout}
                                className="ml-auto bg-emerald-500 text-white px-3 py-1.5 rounded-lg text-sm"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <Link
                                to="/login"
                                onClick={() => setMenuOpen(false)}
                                className="border border-emerald-500 text-emerald-600 px-4 py-2 rounded-lg text-sm"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                onClick={() => setMenuOpen(false)}
                                className="bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm"
                            >
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;