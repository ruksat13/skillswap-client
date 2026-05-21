import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";

const MyProfile = () => {
    const { user, updateUserProfile } = useAuth();

    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(user?.displayName || "");
    const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
    const [loading, setLoading] = useState(false);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await updateUserProfile(name, photoURL);
            toast.success("Profile updated successfully!");
            setIsEditing(false);
        } catch (err) {
            toast.error("Failed to update profile.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <Toaster position="top-right" />
            <div className="max-w-2xl mx-auto">

                {/* Profile Card */}
                <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                    {/* Banner */}
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-32"></div>

                    {/* Avatar */}
                    <div className="px-6 pb-6">
                        <div className="flex justify-between items-end -mt-12 mb-4">
                            <img
                                src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName || "User"}&background=10b981&color=fff&size=128`}
                                alt="avatar"
                                className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover"
                            />
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                            >
                                {isEditing ? "Cancel" : "Update Profile"}
                            </button>
                        </div>

                        {/* User Info */}
                        <h2 className="text-2xl font-bold text-gray-800">
                            {user?.displayName || "No Name Set"}
                        </h2>
                        <p className="text-gray-500 text-sm mt-1">{user?.email}</p>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 mt-6">
                            <div className="bg-emerald-50 rounded-xl p-4 text-center">
                                <p className="text-2xl font-bold text-emerald-600">0</p>
                                <p className="text-xs text-gray-500 mt-1">Sessions Booked</p>
                            </div>
                            <div className="bg-teal-50 rounded-xl p-4 text-center">
                                <p className="text-2xl font-bold text-teal-600">0</p>
                                <p className="text-xs text-gray-500 mt-1">Skills Listed</p>
                            </div>
                            <div className="bg-indigo-50 rounded-xl p-4 text-center">
                                <p className="text-2xl font-bold text-indigo-600">New</p>
                                <p className="text-xs text-gray-500 mt-1">Member Status</p>
                            </div>
                        </div>

                        {/* Account Details */}
                        <div className="mt-6 border-t pt-5">
                            <h3 className="text-sm font-semibold text-gray-700 mb-3">Account Details</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Full Name</span>
                                    <span className="text-gray-800 font-medium">{user?.displayName || "—"}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Email</span>
                                    <span className="text-gray-800 font-medium">{user?.email}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Account Created</span>
                                    <span className="text-gray-800 font-medium">
                                        {user?.metadata?.creationTime
                                            ? new Date(user.metadata.creationTime).toLocaleDateString()
                                            : "—"}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Last Login</span>
                                    <span className="text-gray-800 font-medium">
                                        {user?.metadata?.lastSignInTime
                                            ? new Date(user.metadata.lastSignInTime).toLocaleDateString()
                                            : "—"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Update Form */}
                {isEditing && (
                    <div className="bg-white rounded-2xl shadow-md p-6 mt-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Update Profile</h3>
                        <form onSubmit={handleUpdate} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Photo URL
                                </label>
                                <input
                                    type="url"
                                    value={photoURL}
                                    onChange={(e) => setPhotoURL(e.target.value)}
                                    placeholder="https://your-photo-url.com"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2.5 rounded-lg transition disabled:opacity-60"
                            >
                                {loading ? "Updating..." : "Save Changes"}
                            </button>
                        </form>
                    </div>
                )}

            </div>
        </div>
    );
};

export default MyProfile;