import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Lock, Heart, Stars, Music } from "lucide-react";

export default function LoveWebsite() {
    const [isLogged, setIsLogged] = useState(false);
    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [showLetter, setShowLetter] = useState(false);
    const [showSecret, setShowSecret] = useState(false);
    const [showFinalScene, setShowFinalScene] = useState(false);
    const [timeTogether, setTimeTogether] = useState({});
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = React.useRef(null);

    const loveStartDate = new Date("2025-08-25T00:00:00");
    const { scrollYProgress } = useScroll();
    const scaleHero = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const diff = now - loveStartDate;

            const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
            const years = Math.floor(totalDays / 365);
            const months = Math.floor((totalDays % 365) / 30);
            const days = totalDays % 30;
            const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
            const minutes = Math.floor(diff / (1000 * 60)) % 60;
            const seconds = Math.floor(diff / 1000) % 60;

            setTimeTogether({ years, months, days, hours, minutes, seconds });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleLogin = () => {
        if (day === "25" && month === "8" && year === "2025") {
            setIsLogged(true);
            if (audioRef.current) {
                audioRef.current.play().catch(e => console.log("Audio play failed:", e));
                setIsPlaying(true);
            }
            setTimeout(() => setShowLetter(true), 1200);
        } else {
            alert("جربوا تاريخكم المميز");
        }
    };

    const triggerSecret = () => {
        setShowSecret(true);
        setTimeout(() => setShowSecret(false), 2000);
    };

    if (!isLogged) {
        return (
            <div
                className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
                style={{ backgroundImage: "url('/background.jpg')" }}
            >
                {/* Overlay for better text visibility */}
                <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative z-10 bg-white/10 backdrop-blur-lg border border-white/20 p-10 rounded-3xl text-center text-white shadow-2xl max-w-sm w-full"
                >
                    <div className="mb-6 flex justify-center">
                        <div className="bg-white/20 p-4 rounded-full shadow-lg animate-pulse">
                            <Heart className="text-pink-400" size={50} fill="currentColor" />
                        </div>
                    </div>

                    <h1 className="text-4xl font-bold mb-8 font-serif drop-shadow-md">بوابة عالمنا ❤️</h1>

                    <div className="flex gap-3 justify-center mb-8">
                        <input
                            type="text"
                            placeholder="اليوم"
                            value={day}
                            onChange={(e) => setDay(e.target.value)}
                            className="w-16 p-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/70 text-center focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
                        />
                        <input
                            type="text"
                            placeholder="الشهر"
                            value={month}
                            onChange={(e) => setMonth(e.target.value)}
                            className="w-16 p-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/70 text-center focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
                        />
                        <input
                            type="text"
                            placeholder="السنة"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            className="w-20 p-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/70 text-center focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
                        />
                    </div>

                    <button
                        onClick={handleLogin}
                        className="w-full bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-bold py-3 rounded-xl shadow-lg transform transition hover:scale-105"
                    >
                        دخول
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-b from-rose-100 via-pink-200 to-rose-300 text-gray-800 overflow-hidden relative">
            <audio ref={audioRef} src="./new_music.mp4" loop />

            <button
                onClick={() => {
                    if (isPlaying) audioRef.current.pause();
                    else audioRef.current.play();
                    setIsPlaying(!isPlaying);
                }}
                className={`fixed top-4 left-4 z-50 bg-white/80 p-3 rounded-full shadow-lg text-pink-600 hover:bg-white transition-all duration-300 ${isPlaying ? "animate-spin" : ""}`}
            >
                <Music size={24} />
            </button>

            {/* Secret Popup */}
            <AnimatePresence>
                {showSecret && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
                    >
                        <div className="bg-white px-16 py-10 rounded-3xl text-4xl font-bold text-pink-600 shadow-2xl">
                            بحبك ❤
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Final Scene Overlay */}
            <AnimatePresence>
                {showFinalScene && (
                    <FinalSceneComponent onClose={() => setShowFinalScene(false)} />
                )}
            </AnimatePresence>

            {/* Hero Cinematic */}
            <motion.section style={{ scale: scaleHero }} className="text-center py-32">
                <h1 className="text-6xl font-extrabold mb-6">روميثاء ❤ محمد</h1>
                <p className="text-2xl">قصة حب مكتوبة للابد</p>
                <button
                    onClick={triggerSecret}
                    className="mt-10 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-3 rounded-full shadow-xl"
                >
                    زر المفاجأة
                </button>
            </motion.section>

            {/* Timeline Memories */}
            <section className="py-24 bg-white/70">
                <h2 className="text-4xl font-bold text-center mb-16">خط ذكرياتنا</h2>
                <div className="relative max-w-4xl mx-auto">
                    <div className="absolute left-1/2 top-0 w-1 bg-pink-400 h-full" />

                    {[
                        "أول تعارف 13/9/2025",
                        "أول ضحكة سوا",
                        "أول خروجة",
                        "الاعتراف بالحب 23/9/2025",
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className={`mb-16 flex ${index % 2 === 0 ? "justify-start" : "justify-end"
                                }`}
                        >
                            <div className="bg-pink-500 text-white p-6 rounded-2xl w-80 shadow-xl">
                                {item}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Luxury Gallery */}
            <section className="py-24 text-center">
                <h2 className="text-4xl font-bold mb-16">صورنا</h2>
                <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
                        {[
                            { src: "/img1.jpg", caption: "عيني ما شافت جمال زي جمالك.. وكأنك مرسوم بفرشة فنان 🎨❤" },
                            { src: "/img2.jpg", caption: "وجودك هو السند والضهر.. الراجل الي بجد بيحلي دنيتي ✨💍" },
                            { src: "/img3.jpg", caption: "كل تفصيله فيك بتخطف قلبي.. بحبك يا أغلى ناسي 🌏💞" }
                        ].map((img, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                className="p-2 bg-gradient-to-r from-pink-400 to-rose-500 rounded-3xl shadow-2xl relative group overflow-hidden"
                            >
                                <div className="bg-white h-96 rounded-2xl flex flex-col items-center justify-start overflow-hidden relative">
                                    <img
                                        src={img.src}
                                        alt={`Love Memory ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                        <p className="text-lg font-medium">{img.caption}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Sea Section */}
            <section className="py-24 bg-gradient-to-b from-blue-300 to-cyan-400 text-center text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="relative z-10 max-w-4xl mx-auto px-6"
                >
                    <h2 className="text-5xl font-bold mb-8 drop-shadow-lg">مكانا المفضل 🌊</h2>
                    <p className="text-3xl font-serif leading-relaxed drop-shadow-md">
                        "مكانا المفضل هو البحر عشان احنا عارفين ان حبنا زيو مليان اسرار"
                    </p>
                </motion.div>
                {/* Wave Decoration (Simple SVG Wave) */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
                    <svg className="relative block w-[calc(100%+1.3px)] h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white/30"></path>
                    </svg>
                </div>
            </section>

            {/* Counter */}
            <section className="py-24 bg-white/70 text-center">
                <h2 className="text-3xl font-bold mb-10">مدة حبنا</h2>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-6 max-w-4xl mx-auto">
                    <TimeBox label="سنين" value={timeTogether.years} />
                    <TimeBox label="شهور" value={timeTogether.months} />
                    <TimeBox label="أيام" value={timeTogether.days} />
                    <TimeBox label="ساعات" value={timeTogether.hours} />
                    <TimeBox label="دقائق" value={timeTogether.minutes} />
                    <TimeBox label="ثواني" value={timeTogether.seconds} />
                </div>
            </section>

            <footer className="text-center py-10 text-lg flex flex-col items-center gap-4">
                <p>For the rest of our life ❤</p>
                <button
                    onClick={() => setShowFinalScene(true)}
                    className="bg-purple-600 text-white px-6 py-2 rounded-full text-sm hover:bg-purple-700 transition"
                >
                    النهاية
                </button>
            </footer>
        </div>
    );
}

function TimeBox({ label, value }) {
    return (
        <div className="bg-pink-500 text-white p-5 rounded-2xl shadow-xl">
            <div className="text-2xl font-bold">{value || 0}</div>
            <div className="text-sm">{label}</div>
        </div>
    );
}

function FinalSceneComponent({ onClose }) {
    const [step, setStep] = useState(0);

    // Timings for the sequence (in milliseconds)
    useEffect(() => {
        const timeouts = [];

        // Start sequence
        timeouts.push(setTimeout(() => setStep(1), 500)); // Header: بحبك..
        timeouts.push(setTimeout(() => setStep(2), 2500)); // و بحبك دي كلمة مش عادية
        timeouts.push(setTimeout(() => setStep(3), 5500)); // دي بيترص تحتها كلام...
        timeouts.push(setTimeout(() => setStep(4), 9500)); // بس انا عارفه...
        timeouts.push(setTimeout(() => setStep(5), 13500)); // و مهما حصل مني...
        timeouts.push(setTimeout(() => setStep(6), 17500)); // و مش بيرضيك زعلي...
        timeouts.push(setTimeout(() => setStep(7), 21500)); // بس انت اطيب قلب...
        timeouts.push(setTimeout(() => setStep(8), 25500)); // و بتمنى من ربنا...
        timeouts.push(setTimeout(() => setStep(9), 29500)); // يا اجمل هدية...

        // Final Grand Reveal
        timeouts.push(setTimeout(() => setStep(10), 34000)); // Clear text, Darken more
        timeouts.push(setTimeout(() => setStep(11), 35000)); // مهند ❤️ مريم
        timeouts.push(setTimeout(() => setStep(12), 38000)); // For the rest of our life + Hearts

        // The very last whisper
        timeouts.push(setTimeout(() => setStep(13), 43000)); // شكراً إنك جيت حياتي...

        return () => timeouts.forEach(clearTimeout);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center text-center p-8 overflow-hidden"
        >
            {/* Close button for safety */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/30 hover:text-white text-sm"
            >
                خروج
            </button>

            {/* Floating Background Particles (Stars/Hearts) */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{
                            opacity: 0,
                            x: Math.random() * window.innerWidth,
                            y: window.innerHeight
                        }}
                        animate={{
                            opacity: [0, 1, 0],
                            y: -100,
                            x: Math.random() * window.innerWidth
                        }}
                        transition={{
                            duration: 5 + Math.random() * 5,
                            repeat: Infinity,
                            delay: Math.random() * 5
                        }}
                        className="absolute text-pink-500/30"
                    >
                        {i % 2 === 0 ? <Heart size={10 + Math.random() * 20} /> : <Stars size={10 + Math.random() * 20} />}
                    </motion.div>
                ))}
            </div>

            <div className="relative z-10 max-w-3xl w-full flex flex-col items-center justify-center min-h-[50vh] px-4">
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.h2
                            key="step1"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.2 }}
                            transition={{ duration: 0.8 }}
                            className="text-6xl font-bold text-pink-500 mb-8"
                        >
                            بحبك..
                        </motion.h2>
                    )}

                    {step >= 2 && step < 10 && (
                        <motion.div
                            key="sequence-text"
                            className="space-y-6 text-center"
                        >
                            {step >= 2 && (
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                    className="text-3xl text-white font-semibold"
                                >
                                    و بحبك دي كلمة مش عادية..
                                </motion.p>
                            )}
                            {step >= 3 && (
                                <motion.p
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                    className="text-xl text-pink-200"
                                >
                                    دي بيترص تحتها كلام و مشاعر مبنعرفش نعبر بيها صح..
                                </motion.p>
                            )}
                            {step >= 4 && (
                                <motion.p
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                    className="text-xl text-white/90"
                                >
                                    بس انا عارفه اني مهما قلت بتفضل فاهمني
                                </motion.p>
                            )}
                            {step >= 5 && (
                                <motion.p
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                    className="text-xl text-rose-300"
                                >
                                    و مهما حصل مني بتفضل حنين عليا
                                </motion.p>
                            )}
                            {step >= 6 && (
                                <motion.p
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                    className="text-xl text-white/90"
                                >
                                    و مش بيرضيك زعلي على الرغم من عصبيتك
                                </motion.p>
                            )}
                            {step >= 7 && (
                                <motion.p
                                    initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }}
                                    className="text-3xl font-bold text-pink-500 mt-6"
                                >
                                    بس انت اطيب قلب قابلتو فحياتي ❤️
                                </motion.p>
                            )}
                            {step >= 8 && (
                                <motion.p
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                    className="text-xl text-white/80 mt-4"
                                >
                                    و بتمنى من ربنا انو يخليك ليا طول العمر
                                </motion.p>
                            )}
                            {step >= 9 && (
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                    className="text-2xl text-yellow-300 font-bold mt-4"
                                >
                                    يا اجمل هدية جتلي من عند ربنا 🥹❤️❤️❤️
                                </motion.p>
                            )}
                        </motion.div>
                    )}

                    {step >= 11 && (
                        <motion.div
                            key="grand-finale"
                            className="flex flex-col items-center"
                        >
                            <motion.h1
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1.5, type: "spring" }}
                                className="text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-600 mb-8"
                            >
                                محمد ❤️ روميثاء
                            </motion.h1>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1, duration: 2 }}
                                className="text-2xl text-white flex items-center gap-2"
                            >
                                <span>إلى ما لا نهاية</span>
                                <motion.span
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                >
                                    ♾️
                                </motion.span>
                            </motion.div>

                            {step >= 12 && (
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1 }}
                                    className="text-xl text-gray-400 mt-4 font-serif italic"
                                >
                                    For the rest of our life.
                                </motion.p>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* The Final Whisper */}
            {step >= 13 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                    className="absolute bottom-10 text-sm text-gray-500"
                >
                    شكراً إنك جيت حياتي… وغيرتها للأبد.
                </motion.div>
            )}
        </motion.div>
    );
}
