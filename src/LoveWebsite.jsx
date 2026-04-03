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
    const [selectedImage, setSelectedImage] = useState(null);
    const audioRef = React.useRef(null);

    const loveStartDate = new Date("2016-01-01T00:00:00");
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
        if (day === "24" && month === "11" && year === "2021") {
            setIsLogged(true);
            if (audioRef.current) {
                audioRef.current.play().catch(e => console.log("Audio play failed:", e));
                setIsPlaying(true);
            }
            setTimeout(() => setShowLetter(true), 1200);
        } else {
            alert("التاريخ غلط، حاولي تفتكري تاني ❤️");
        }
    };

    const triggerSecret = () => {
        setShowSecret(true);
        setTimeout(() => setShowSecret(false), 2000);
    };

    if (!isLogged) {
        return (
            <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
                {/* Video Background */}
                <div className="absolute inset-0 z-0">
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover opacity-60"
                    >
                        <source src="/wa_video_2026_02_11_2135.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
                </div>

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

                    <h1 className="text-4xl font-bold mb-8 font-serif drop-shadow-md">افتح قلبي يا قلبي ❤️</h1>

                    <div className="flex justify-center gap-3 mb-8" dir="rtl">
                        <input
                            type="password"
                            placeholder="اليوم"
                            value={day}
                            onChange={(e) => setDay(e.target.value)}
                            className="w-1/3 p-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/70 text-center focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
                        />
                        <input
                            type="password"
                            placeholder="الشهر"
                            value={month}
                            onChange={(e) => setMonth(e.target.value)}
                            className="w-1/3 p-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/70 text-center focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
                        />
                        <input
                            type="password"
                            placeholder="السنة"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            className="w-1/3 p-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/70 text-center focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
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
            <audio ref={audioRef} src="/music.mp3" loop />

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

            {/* Letter Modal */}
            <AnimatePresence>
                {showLetter && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6"
                    >
                        <div className="bg-white rounded-3xl max-w-3xl w-full p-8 shadow-2xl text-right" dir="rtl">
                            <div className="flex justify-between items-start mb-4">
                                <h2 className="text-2xl font-bold">رسالة من قلبي</h2>
                                <button onClick={() => setShowLetter(false)} className="text-gray-500 hover:text-red-500">
                                    إغلاق
                                </button>
                            </div>

                            <div className="text-lg leading-relaxed text-gray-800 space-y-4">
                                <p>حقك عليا مقدرش تكوني بعيده كل ده حاولت معاكي بكل الطرق وبحاول احل المشكله ومش ساكت والله ومكلم كذا حد، بس انتي تبقي معايا.. مينفعش بعد كل السنين دي الموضوع يخلص كده، مش دي النهايه اللي حنا عايزنها ولا دا اللي احنا راسمينو ف دماغنا.</p>
                                <p>عايزك معايا وانا بحاول.. وحشتيني و وحشني كلامنا بليل وتفاصيل يومك، واحشني هزارنا ورخامتك. انتي عارفه محدش هيحبك قدي ومش هتلاقي مع اي حد اللي كنتي بتلاقيه معايا، وانا كمان نفس الكلام.</p>
                                <p>احنا عدينا مع بعض بكل حاجه حلوه او وحشه، صعبه او سهله.. مش هتيجي علي دي و تقف. احنا بنكمل بعض وبنعدي اي حاجه واحنا مع بعض. فكري فينا، فكري في كل حاجه كانت بينا، علي الاقل افتكري ذكرياتنا والحاجات الحلوه اللي بينا.</p>
                                <p>أنا بحاول من جنب وانتي ظبطي الدنيا عندك وقوليلهم اني مش ساكت، وحتي لو محصلش ما احنا كنا متفقين هنعمل اي عقبال ما الدنيا تمشي. بصراحه أنا تعبت خلاص ومش عارف ابطل تفكير ومش قادر اعمل دا لوحدي. لو انتي لسه باقيه علي اللي بينا مستني ردك، ولا قفلتي يبقي ولا كأنك شوفتي حاجه وانا هفهم.. بحبك.</p>
                            </div>

                            <div className="mt-6 flex justify-center">
                                <button onClick={() => setShowLetter(false)} className="bg-pink-500 text-white px-6 py-2 rounded-full shadow hover:scale-105 transition">
                                    بختمها بحبك ❤️
                                </button>
                            </div>
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
            <motion.section style={{ scale: scaleHero }} className="text-center py-32 px-4 text-gray-800">
                <h1 className="text-5xl md:text-6xl font-extrabold mb-6">Gana ❤️</h1>
                <p className="text-xl md:text-2xl">قصة حب مكتوبة للابد</p>
                <button
                    onClick={triggerSecret}
                    className="mt-10 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-3 rounded-full shadow-xl"
                >
                    زر المفاجأة
                </button>
            </motion.section>

            {/* Timeline Memories */}
            <section className="py-24 bg-white/70">
                <h2 className="text-4xl font-bold text-center mb-16 px-4 text-gray-800">خط ذكرياتنا</h2>
                <div className="relative max-w-4xl mx-auto px-4">
                    <div className="absolute left-1/2 top-0 w-1 bg-pink-400 h-full hidden md:block" />

                    {[
                        { text: "أول ما عرفنا بعض", date: "2016" },
                        { text: "أيامنا الحلوة", date: "سنين من الحب" },
                        { text: "كل التحديات اللي عديناها", date: "مع بعض" },
                        { text: "الاعتراف إنك كل حياتي", date: "للأبد" },
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className={`mb-16 flex ${index % 2 === 0 ? "md:justify-start" : "md:justify-end"} justify-center`}
                        >
                            <div className="bg-pink-500 text-white p-6 rounded-2xl w-80 shadow-xl">
                                <div className="font-bold">{item.text}</div>
                                <div className="text-sm mt-1">{item.date}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Luxury Gallery */}
            <section className="py-24 text-center px-4">
                <h2 className="text-4xl font-bold mb-16 text-gray-800">صورنا</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
                    {[
                        { src: "/img1.jpg", caption: "كل تفصيلة فيكي بتخطف قلبي.. بحبك يا أغلى ناسي 🌏💞" },
                        { src: "/img2.jpg", caption: "وجودك مالي عليا دنيتي.. انتي سندي وحته مني ✨💍" },
                        { src: "/img3.jpg", caption: "مستحيل أتخيل حياتي من غيرك.. بحبك يا جنى 😍🫶" }
                    ].map((img, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            className="p-2 bg-gradient-to-r from-pink-400 to-rose-500 rounded-3xl shadow-2xl relative group overflow-hidden"
                            onClick={() => setSelectedImage(img.src)}
                        >
                            <div className="bg-white aspect-[9/16] md:h-96 rounded-2xl flex flex-col items-center justify-start overflow-hidden relative cursor-pointer">
                                <img
                                    src={img.src}
                                    alt={`Love Memory ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                    <p className="text-sm font-medium whitespace-pre-line">{img.caption}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Lightbox */}
            {selectedImage && (
                <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 p-4" onClick={() => setSelectedImage(null)}>
                    <button className="absolute top-6 right-6 text-white text-3xl" onClick={() => setSelectedImage(null)}>×</button>
                    <img src={selectedImage} alt="expanded" className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl" onClick={(e) => e.stopPropagation()} />
                </div>
            )}

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
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
                    <svg className="relative block w-[calc(100%+1.3px)] h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white/30"></path>
                    </svg>
                </div>
            </section>

            {/* Counter */}
            <section className="py-24 bg-white/70 text-center px-4">
                <h2 className="text-3xl font-bold mb-10 text-gray-800">من سنة 2016 واحنا مع بعض</h2>
                <div className="grid grid-cols-2 lg:grid-cols-6 gap-6 max-w-4xl mx-auto">
                    <TimeBox label="سنين" value={timeTogether.years} />
                    <TimeBox label="شهور" value={timeTogether.months} />
                    <TimeBox label="أيام" value={timeTogether.days} />
                    <TimeBox label="ساعات" value={timeTogether.hours} />
                    <TimeBox label="دقائق" value={timeTogether.minutes} />
                    <TimeBox label="ثواني" value={timeTogether.seconds} />
                </div>
            </section>

            <footer className="text-center py-10 flex flex-col items-center gap-4">
                <p className="text-gray-600">For the rest of our life ❤</p>
                <button
                    onClick={() => setShowFinalScene(true)}
                    className="bg-purple-600 text-white px-8 py-3 rounded-full text-lg hover:bg-purple-700 transition-all shadow-lg hover:scale-110 active:scale-95"
                >
                    النهاية
                </button>
            </footer>
        </div>
    );
}

function TimeBox({ label, value }) {
    return (
        <div className="bg-pink-500 text-white p-6 rounded-2xl shadow-xl">
            <div className="text-3xl font-bold">{value || 0}</div>
            <div className="text-sm font-medium">{label}</div>
        </div>
    );
}

function FinalSceneComponent({ onClose }) {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const timeouts = [];
        timeouts.push(setTimeout(() => setStep(1), 500));
        timeouts.push(setTimeout(() => setStep(2), 3000));
        timeouts.push(setTimeout(() => setStep(3), 8000));
        timeouts.push(setTimeout(() => setStep(4), 13000));
        timeouts.push(setTimeout(() => setStep(5), 18000));
        timeouts.push(setTimeout(() => setStep(6), 23000));
        timeouts.push(setTimeout(() => setStep(7), 28000));
        timeouts.push(setTimeout(() => setStep(8), 33000));
        timeouts.push(setTimeout(() => setStep(9), 38000));

        timeouts.push(setTimeout(() => setStep(10), 44000));
        timeouts.push(setTimeout(() => setStep(11), 45000));
        timeouts.push(setTimeout(() => setStep(12), 48000));
        timeouts.push(setTimeout(() => setStep(13), 53000));

        return () => timeouts.forEach(clearTimeout);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center text-center p-8 overflow-y-auto"
        >
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/30 hover:text-white text-sm"
            >
                خروج
            </button>

            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(30)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: Math.random() * 100 + "%", y: "100%" }}
                        animate={{ opacity: [0, 1, 0], y: "-10%" }}
                        transition={{ duration: 5 + Math.random() * 10, repeat: Infinity, delay: Math.random() * 5 }}
                        className="absolute text-pink-500/20"
                    >
                        {i % 2 === 0 ? <Heart size={20 + Math.random() * 30} /> : <Stars size={20 + Math.random() * 30} />}
                    </motion.div>
                ))}
            </div>

            <div className="relative z-10 max-w-2xl w-full flex flex-col items-center justify-center min-h-[60vh]">
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.h2
                            key="step1"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.2 }}
                            className="text-7xl font-bold text-pink-500"
                        >
                            بحبك..
                        </motion.h2>
                    )}

                    {step >= 2 && step < 10 && (
                        <motion.div key="seq" className="space-y-8" dir="rtl">
                            {step >= 2 && <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-2xl text-white font-semibold leading-relaxed">حقك عليا مقدرش تكوني بعيده كل ده.. حاولت معاكي بكل الطرق وبحاول احل المشكله ومش ساكت والله.</motion.p>}
                            {step >= 3 && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xl text-pink-200">مينفعش بعد كل السنين دي الموضوع يخلص كده.. مش دي النهايه اللي حنا عايزنها ولا دا اللي احنا راسمينو ف دماغنا.</motion.p>}
                            {step >= 4 && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xl text-white/90">عايزك معايا وانا بحاول.. وحشتيني و وحشني كلامنا بليل وتفاصيل يومك، واحشني هزارنا ورخامتك.</motion.p>}
                            {step >= 5 && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xl text-rose-300">انتي عارفه محدش هيحبك قدي ومش هتلاقي مع اي حد اللي كنتي بتلاقيه معايا.. وانا كمان نفس الكلام.</motion.p>}
                            {step >= 6 && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xl text-white/90">احنا عدينا مع بعض بكل حاجه حلوه او وحشه.. مش هتيجي علي دي و تقف، احنا بنكمل بعض.</motion.p>}
                            {step >= 7 && <motion.p initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} className="text-2xl font-bold text-pink-500">فكري فينا، فكري في كل حاجه كانت بينا.. علي الاقل افتكري ذكرياتنا والحاجات الحلوه اللي بينا.</motion.p>}
                            {step >= 8 && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xl text-white/80">أنا بحاول من جنب وانتي ظبطي الدنيا عندك.. بصراحه أنا تعبت خلاص ومش قادر اعمل دا لوحدي.</motion.p>}
                            {step >= 9 && <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-2xl text-yellow-300 font-bold">لو انتي لسه باقيه علي اللي بينا مستني ردك.. ولا قفلتي يبقي ولا كأنك شوفتي حاجه وانا هفهم.. بحبك.</motion.p>}
                        </motion.div>
                    )}

                    {step >= 11 && (
                        <motion.div key="final" className="flex flex-col items-center">
                            <motion.h1 initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5 }} className="text-7xl md:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-600 mb-8">Gana ❤️</motion.h1>
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="text-2xl text-white flex items-center gap-2"><span>إلى ما لا نهاية</span><motion.span animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}>♾️</motion.span></motion.div>
                            {step >= 12 && <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-xl text-gray-400 mt-6 font-serif italic">For the rest of our life.</motion.p>}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            {step >= 13 && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute bottom-10 text-sm text-gray-500">شكراً إنك جيت حياتي… وغيرتها للأبد.</motion.div>}
        </motion.div>
    );
}
