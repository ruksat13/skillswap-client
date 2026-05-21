import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import AOS from "aos";
import "aos/dist/aos.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import skills from "../../data/skills.json";

const topProviders = [
    { name: "Rahul Dev", skill: "Python", rating: 4.9, sessions: 120, avatar: "https://i.ibb.co/placeholder/p1.jpg" },
    { name: "Priya Sharma", skill: "Yoga", rating: 4.8, sessions: 95, avatar: "https://i.ibb.co/placeholder/p2.jpg" },
    { name: "Alex Martin", skill: "Guitar", rating: 4.8, sessions: 80, avatar: "https://i.ibb.co/placeholder/p3.jpg" },
    { name: "Fatima Khan", skill: "Cooking", rating: 4.9, sessions: 110, avatar: "https://i.ibb.co/placeholder/p4.jpg" },
];

const steps = [
    { icon: "🔍", title: "Browse Skills", desc: "Explore hundreds of local skill listings across categories." },
    { icon: "📅", title: "Book a Session", desc: "Pick a time that works for you and book instantly." },
    { icon: "🤝", title: "Meet & Learn", desc: "Connect with your provider and start learning right away." },
    { icon: "⭐", title: "Rate & Review", desc: "Share your experience and help others find great providers." },
];

const categories = [
    { name: "Music", icon: "🎵", count: 12 },
    { name: "Technology", icon: "💻", count: 18 },
    { name: "Language", icon: "🌍", count: 9 },
    { name: "Health", icon: "🧘", count: 7 },
    { name: "Arts", icon: "🎨", count: 11 },
    { name: "Lifestyle", icon: "🍳", count: 8 },
];

const Home = () => {
    useEffect(() => {
        AOS.init({ duration: 800, once: true });
    }, []);

    return (
        <div>
            {/* Hero Slider */}
            <section>
                <Swiper
                    modules={[Autoplay, Pagination, Navigation]}
                    autoplay={{ delay: 4000 }}
                    pagination={{ clickable: true }}
                    navigation
                    loop
                    className="w-full"
                >
                    {[
                        { bg: "from-emerald-600 to-teal-500", title: "Share What You Know", sub: "Teach a skill, earn money, and make an impact in your local community." },
                        { bg: "from-indigo-600 to-purple-500", title: "Learn From Locals", sub: "Find skilled people nearby and learn anything — guitar, yoga, coding & more." },
                        { bg: "from-orange-500 to-rose-500", title: "Swap Skills, Grow Together", sub: "Exchange knowledge, build connections, and thrive as a community." },
                    ].map((slide, i) => (
                        <SwiperSlide key={i}>
                            <div className={`bg-gradient-to-r ${slide.bg} text-white min-h-[500px] flex items-center justify-center text-center px-4`}>
                                <div>
                                    <h1 className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</h1>
                                    <p className="text-lg md:text-xl mb-8 max-w-xl mx-auto opacity-90">{slide.sub}</p>
                                    <Link to="/register" className="bg-white text-emerald-600 font-semibold px-8 py-3 rounded-full hover:shadow-lg transition">
                                        Get Started
                                    </Link>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>

            {/* Popular Skills */}
            <section className="max-w-7xl mx-auto px-4 py-16">
                <div className="text-center mb-10" data-aos="fade-up">
                    <h2 className="text-3xl font-bold text-gray-800">Popular Skills</h2>
                    <p className="text-gray-500 mt-2">Browse top-rated skill listings from local providers</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {skills.map((skill, i) => (
                        <div key={skill.skillId} data-aos="fade-up" data-aos-delay={i * 100}
                            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden group">
                            <div className="h-44 bg-gradient-to-br from-emerald-100 to-teal-50 flex items-center justify-center text-6xl">
                                {skill.category === "Music" ? "🎸" : skill.category === "Language" ? "🌍" : skill.category === "Technology" ? "💻" : skill.category === "Health" ? "🧘" : skill.category === "Arts" ? "📸" : "🍳"}
                            </div>
                            <div className="p-4">
                                <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">{skill.category}</span>
                                <h3 className="font-bold text-gray-800 mt-2 mb-1">{skill.skillName}</h3>
                                <p className="text-xs text-gray-500 mb-3">by {skill.providerName}</p>
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-yellow-500 font-semibold">⭐ {skill.rating}</span>
                                    <span className="text-emerald-600 font-bold">${skill.price}/hr</span>
                                </div>
                                <Link to={`/skill/${skill.skillId}`}
                                    className="block text-center bg-emerald-500 hover:bg-emerald-600 text-white text-sm py-2 rounded-lg transition">
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Browse by Category */}
            <section className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-10" data-aos="fade-up">
                        <h2 className="text-3xl font-bold text-gray-800">Browse by Category</h2>
                        <p className="text-gray-500 mt-2">Find skills that match your interests</p>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                        {categories.map((cat, i) => (
                            <div key={i} data-aos="zoom-in" data-aos-delay={i * 80}
                                className="bg-white rounded-2xl p-5 text-center shadow hover:shadow-md hover:-translate-y-1 transition cursor-pointer">
                                <div className="text-4xl mb-2">{cat.icon}</div>
                                <p className="font-semibold text-gray-700 text-sm">{cat.name}</p>
                                <p className="text-xs text-gray-400">{cat.count} skills</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Top Rated Providers */}
            <section className="max-w-7xl mx-auto px-4 py-16">
                <div className="text-center mb-10" data-aos="fade-up">
                    <h2 className="text-3xl font-bold text-gray-800">Top Rated Providers</h2>
                    <p className="text-gray-500 mt-2">Learn from the best in your community</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {topProviders.map((p, i) => (
                        <div key={i} data-aos="fade-up" data-aos-delay={i * 100}
                            className="bg-white rounded-2xl p-6 text-center shadow hover:shadow-lg transition">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-teal-300 flex items-center justify-center text-2xl font-bold text-white mx-auto mb-3">
                                {p.name.charAt(0)}
                            </div>
                            <h3 className="font-bold text-gray-800">{p.name}</h3>
                            <p className="text-sm text-emerald-600 mb-1">{p.skill}</p>
                            <p className="text-yellow-500 text-sm">⭐ {p.rating}</p>
                            <p className="text-xs text-gray-400 mt-1">{p.sessions} sessions completed</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* How It Works */}
            <section className="bg-gradient-to-r from-emerald-600 to-teal-500 py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-10" data-aos="fade-up">
                        <h2 className="text-3xl font-bold text-white">How It Works</h2>
                        <p className="text-emerald-100 mt-2">Get started in just 4 simple steps</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {steps.map((step, i) => (
                            <div key={i} data-aos="fade-up" data-aos-delay={i * 100}
                                className="bg-white bg-opacity-10 backdrop-blur rounded-2xl p-6 text-center text-white">
                                <div className="text-5xl mb-3">{step.icon}</div>
                                <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                                <p className="text-sm text-emerald-100">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Extra Section: Success Stories */}
            <section className="max-w-7xl mx-auto px-4 py-16">
                <div className="text-center mb-10" data-aos="fade-up">
                    <h2 className="text-3xl font-bold text-gray-800">Success Stories</h2>
                    <p className="text-gray-500 mt-2">What our community members are saying</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { name: "Tanvir Ahmed", text: "I learned guitar in just 2 months through SkillSwap. The sessions were affordable and super fun!", skill: "Learned Guitar" },
                        { name: "Riya Das", text: "Teaching yoga on SkillSwap helped me earn extra income while doing what I love every day.", skill: "Teaches Yoga" },
                        { name: "Karim Uddin", text: "Found a Python tutor nearby within minutes. My coding skills improved drastically in weeks.", skill: "Learned Python" },
                    ].map((t, i) => (
                        <div key={i} data-aos="fade-up" data-aos-delay={i * 100}
                            className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition border border-gray-100">
                            <p className="text-gray-600 italic mb-4">"{t.text}"</p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold">
                                    {t.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-800 text-sm">{t.name}</p>
                                    <p className="text-xs text-emerald-600">{t.skill}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;