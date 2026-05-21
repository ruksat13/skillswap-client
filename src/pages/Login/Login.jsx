import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";

const Login = () => {
    const { login, googleLogin } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await login(email, password);
            toast.success("Login successful!");
            navigate(from, { replace: true });
        } catch (err) {
            setError("Invalid email or password. Please try again.");
            toast.error("Login failed!");
        }
    };

    const handleGoogle = async () => {
        try {
            await googleLogin();
            toast.success("Login successful!");
            navigate(from, { replace: true });
        } catch (err) {
            toast.error("Google login failed!");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center px-4 py-12">
            <Toaster position="top-right" />
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
                {/* Title */}
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
                    <p className="text-gray-500 text-sm mt-1">Login to your SkillSwap account</p>
                </div>

                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-4">
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <div className="relative">
                            <input
                                type={showPass ? "text" : "password"}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPass(!showPass)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPass ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                            </button>
                        </div>
                    </div>

                    {/* Forgot Password */}
                    <div className="text-right">
                        <Link
                            to="/forgot-password"
                            state={{ email }}
                            className="text-sm text-emerald-600 hover:underline"
                        >
                            Forgot Password?
                        </Link>
                    </div>

                    {/* Error */}
                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2.5 rounded-lg transition"
                    >
                        Login
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-3 my-5">
                    <hr className="flex-grow border-gray-200" />
                    <span className="text-gray-400 text-sm">or</span>
                    <hr className="flex-grow border-gray-200" />
                </div>

                {/* Google */}
                <button
                    onClick={handleGoogle}
                    className="w-full flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2.5 rounded-lg transition"
                >
                    <FaGoogle className="text-red-500" />
                    Continue with Google
                </button>

                {/* Signup Link */}
                <p className="text-center text-sm text-gray-500 mt-5">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-emerald-600 font-semibold hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;