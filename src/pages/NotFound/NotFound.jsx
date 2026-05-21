import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-emerald-500">404</h1>
                <h2 className="text-3xl font-bold text-gray-800 mt-4 mb-2">Page Not Found</h2>
                <p className="text-gray-500 mb-8">
                    Oops! The page you're looking for doesn't exist.
                </p>
                <Link
                    to="/"
                    className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-3 rounded-full transition"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;