import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";

const ForgotPassword = () => {
    const { resetPassword } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const [email, setEmail] = useState(location.state?.email || "");

    const handleReset = async (e) => {
        e.preventDefault();
        if (!email) {
            toast.error("Please enter your email.");
            return;
        }
        try {
            await resetPassword(email);
            toast.success("Password reset email sent!");
            setTimeout(() => {
                window.open("https://mail.google.com", "_blank");
                navigate("/login");
            }, 1500);
        } catch (err) {
            toast.error("Failed to send reset email. Check the email address.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center px-4 py-12">
            <Toaster position="top-right" />
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
                {/* Title */}
                <div className="text-center mb-6">
                    <div className="text-5xl mb-3">🔐</div>
                    <h2 className="text-3xl font-bold text-gray-800">Forgot Password?</h2>
                    <p className="text-gray-500 text-sm mt-1">
                        Enter your email and we'll send you a reset link.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleReset} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2.5 rounded-lg transition"
                    >
                        Reset Password
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-5">
                    Remembered your password?{" "}
                    <span
                        onClick={() => navigate("/login")}
                        className="text-emerald-600 font-semibold hover:underline cursor-pointer"
                    >
                        Back to Login
                    </span>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;