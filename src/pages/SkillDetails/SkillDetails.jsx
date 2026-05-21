import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import skills from "../../data/skills.json";

const SkillDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();

    const skill = skills.find((s) => s.skillId === parseInt(id));

    const [name, setName] = useState(user?.displayName || "");
    const [email, setEmail] = useState(user?.email || "");

    if (!skill) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500 text-lg">Skill not found.</p>
            </div>
        );
    }

    const handleBook = (e) => {
        e.preventDefault();
        toast.success(`Session booked for ${skill.skillName}! We'll contact you soon.`);
        setName("");
        setEmail("");
    };

    const categoryIcon =
        skill.category === "Music" ? "🎸" :
            skill.category === "Language" ? "🌍" :
                skill.category === "Technology" ? "💻" :
                    skill.category === "Health" ? "🧘" :
                        skill.category === "Arts" ? "📸" : "🍳";

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <Toaster position="top-right" />
            <div className="max-w-5xl mx-auto">

                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="mb-6 flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium transition"
                >
                    ← Back
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Left: Skill Info */}
                    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                        {/* Banner */}
                        <div className="bg-gradient-to-br from-emerald-400 to-teal-500 h-52 flex items-center justify-center text-8xl">
                            {categoryIcon}
                        </div>

                        <div className="p-6">
                            {/* Category Badge */}
                            <span className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-medium">
                                {skill.category}
                            </span>

                            {/* Skill Name */}
                            <h1 className="text-2xl font-bold text-gray-800 mt-3 mb-1">
                                {skill.skillName}
                            </h1>

                            {/* Provider */}
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-sm font-bold">
                                    {skill.providerName.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-700">{skill.providerName}</p>
                                    <p className="text-xs text-gray-400">{skill.providerEmail}</p>
                                </div>
                            </div>

                            {/* Description */}
                            <p className="text-gray-600 text-sm leading-relaxed mb-5">
                                {skill.description}
                            </p>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-3">
                                <div className="bg-emerald-50 rounded-xl p-3 text-center">
                                    <p className="text-yellow-500 font-bold text-lg">⭐ {skill.rating}</p>
                                    <p className="text-xs text-gray-500">Rating</p>
                                </div>
                                <div className="bg-emerald-50 rounded-xl p-3 text-center">
                                    <p className="text-emerald-600 font-bold text-lg">${skill.price}</p>
                                    <p className="text-xs text-gray-500">Per Hour</p>
                                </div>
                                <div className="bg-emerald-50 rounded-xl p-3 text-center">
                                    <p className="text-teal-600 font-bold text-lg">{skill.slotsAvailable}</p>
                                    <p className="text-xs text-gray-500">Slots Left</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Book Session Form */}
                    <div className="bg-white rounded-2xl shadow-md p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-1">Book a Session</h2>
                        <p className="text-sm text-gray-500 mb-6">
                            Fill in your details to reserve your spot with {skill.providerName}.
                        </p>

                        <form onSubmit={handleBook} className="space-y-4">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="John Doe"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Your Email
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

                            {/* Slots Info */}
                            <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
                                <p className="text-amber-700 text-sm">
                                    ⚠️ Only <strong>{skill.slotsAvailable} slots</strong> remaining. Book now to secure your spot!
                                </p>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-lg transition text-sm"
                            >
                                Confirm Booking
                            </button>
                        </form>

                        {/* Extra Info */}
                        <div className="mt-6 border-t pt-4">
                            <p className="text-xs text-gray-400 text-center">
                                By booking, you agree to our{" "}
                                <span className="text-emerald-600 cursor-pointer hover:underline">
                                    Terms of Service
                                </span>
                                . The provider will contact you within 24 hours.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkillDetails;