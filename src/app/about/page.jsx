"use client";

import { useState, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Users, Target, Eye, Heart, Star, Award, Globe, Code, Sparkles, ArrowRight, CheckCircle, Zap } from "lucide-react";
import { useRef } from "react";

export default function AboutPage() {
  const [language, setLanguage] = useState("ku");
  const [scrollY, setScrollY] = useState(0);

  // Animation controls
  const heroRef = useRef(null);
  const missionRef = useRef(null);
  const teamRef = useRef(null);
  const statsRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const missionInView = useInView(missionRef, { once: true });
  const teamInView = useInView(teamRef, { once: true });
  const statsInView = useInView(statsRef, { once: true });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getLocalizedText = (key) => {
    const texts = {
      ku: {
        title: "دەربارەی ئێمە",
        subtitle: "یەکەم سایتی کوردی بۆ دروستکردنی سی ڤی",
        mission: "ئەرکەکەمان",
        vision: "بینینەکەمان",
        values: "بەهاکانمان",
        team: "تیمەکەمان",
        backToHome: "گەڕانەوە بۆ سەرەتا",
        missionText: "دروستکردنی ئامرازێکی سادە و بەهێز بۆ دروستکردنی سی ڤی بە زمانی کوردی، بە مەبەستی یارمەتیدانی کوردستان و عێراقییەکان لە دۆزینەوەی کاری خەونەکانیان.",
        visionText: "بوون بە یەکەم و باشترین پلاتفۆرمی کوردی لە جیهاندا بۆ دروستکردنی سی ڤی، کە پشتگیری لە هەموو زمانەکان دەکات و بەشی هەیە لە گەشەی پیشەسازیی دیجیتاڵی کوردستان.",
        valuesText: "باوەڕمان بە سادەیی، کوالیتی و بەردەستبوونی هەمووانە. هەوڵ دەدەین بەردەستترین و باشترین خزمەتگوزارییەکان پێشکەش بە بەکارهێنەرەکانمان بکەین."
      },
      ar: {
        title: "من نحن",
        subtitle: "أول موقع كردي لإنشاء السيرة الذاتية",
        mission: "مهمتنا",
        vision: "رؤيتنا",
        values: "قيمنا",
        team: "فريقنا",
        backToHome: "العودة للرئيسية",
        missionText: "إنشاء أداة بسيطة وقوية لإنشاء السيرة الذاتية باللغة الكردية، بهدف مساعدة الكردستانيين والعراقيين في العثور على وظائفهم المثالية.",
        visionText: "أن نصبح أول وأفضل منصة كردية في العالم لإنشاء السيرة الذاتية، تدعم جميع اللغات وتساهم في تطوير الصناعة الرقمية في كردستان.",
        valuesText: "نؤمن بالبساطة والجودة والتوافر للجميع. نسعى لتقديم أفضل وأكثر الخدمات سهولة لمستخدمينا."
      },
      en: {
        title: "About Us",
        subtitle: "First Kurdish website for CV creation",
        mission: "Our Mission",
        vision: "Our Vision",
        values: "Our Values",
        team: "Our Team",
        backToHome: "Back to Home",
        missionText: "Create a simple and powerful tool for creating CVs in Kurdish language, to help Kurds and Iraqis find their dream jobs.",
        visionText: "To become the first and best Kurdish platform in the world for CV creation, supporting all languages and contributing to the development of Kurdistan's digital industry.",
        valuesText: "We believe in simplicity, quality, and availability for everyone. We strive to provide the easiest and best services to our users."
      }
    };
    return texts[language]?.[key] || texts.ku[key];
  };

  const teamMembers = [
    {
      name: "خالد صباح",
      nameEn: "Khalid Sabah",
      role: "دامەزرێنەر و گەشەپێدەر",
      roleEn: "Founder & Developer",
      image: "👨‍💻",
      description: "گەشەپێدەری پێشەنگ لە بوارەکانی React و Node.js"
    },
  ];

  const values = [
    {
      icon: <Sparkles size={32} className="text-purple-600" />,
      title: "سادەیی",
      titleEn: "Simplicity",
      description: "ئامرازێکی سادە بۆ هەمووان"
    },
    {
      icon: <Zap size={32} className="text-blue-600" />,
      title: "خێرایی",
      titleEn: "Speed",
      description: "دروستکردنی سی ڤی لە کەمتر لە ٥ خولەکدا"
    },
    {
      icon: <Heart size={32} className="text-pink-600" />,
      title: "بێ بەرامبەر",
      titleEn: "Free",
      description: "خزمەتگوزارییەکی بە تەواوی بێ بەرامبەر"
    },
    {
      icon: <Globe size={32} className="text-green-600" />,
      title: "فرە زمانی",
      titleEn: "Multi-language",
      description: "پشتیوانی لە زمانی کوردی، عەرەبی و ئینگلیزی"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full"
          animate={{ y: [-8, 8, -8] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-blue-200/30 to-cyan-200/30 rounded-full"
          animate={{ y: [-8, 8, -8] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute bottom-40 left-1/4 w-20 h-20 bg-gradient-to-br from-green-200/30 to-teal-200/30 rounded-full"
          animate={{ y: [-8, 8, -8] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />
        <motion.div
          className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-br from-yellow-200/30 to-orange-200/30 rounded-full"
          animate={{ y: [-8, 8, -8] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      {/* Header */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-white/20 shadow-elegant"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center gap-3"
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <motion.div
                className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl text-white shadow-elegant"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <Users size={24} />
              </motion.div>
              <span className="text-2xl font-bold text-gradient nrt-font">
                سی ڤی کوردی
              </span>
            </motion.div>
            <motion.nav
              className="hidden md:flex items-center gap-8"
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <motion.a
                href="/"
                className="text-gray-700 hover:text-purple-600 transition-all duration-300 font-medium nrt-font"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {getLocalizedText('backToHome')}
              </motion.a>
              <motion.a
                href="/builder"
                className="elegant-button text-sm px-5 py-2.5"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                دەست پێکردن
              </motion.a>
            </motion.nav>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="pt-40 pb-24 px-6 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={heroInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.div
              className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mb-8 border border-purple-200/50"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Users className="text-purple-600" size={24} />
              <span className="text-purple-700 font-semibold nrt-font">
                {getLocalizedText('title')}
              </span>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl font-black text-gray-900 mb-8 tracking-tight nrt-font"
              style={{ direction: language === 'en' ? 'ltr' : 'rtl' }}
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {getLocalizedText('subtitle')}
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed nrt-font font-medium"
              style={{ direction: language === 'en' ? 'ltr' : 'rtl' }}
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              سی ڤی کوردی یەکەم پلاتفۆرمە کە تایبەت کراوە بە زمانی کوردی بۆ دروستکردنی سی ڤی. ئامانجمان یارمەتیدانی کوردستان و عێراقییەکانە لە دۆزینەوەی کار و گەیشتن بە خەونەکانیان.
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* Mission, Vision, Values Section */}
      <motion.section
        ref={missionRef}
        className="py-20 px-6 bg-gradient-to-br from-white via-gray-50/50 to-blue-50/30"
        initial={{ opacity: 0 }}
        animate={missionInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={missionInView ? "visible" : "hidden"}
          >
            {/* Mission */}
            <motion.div
              className="elegant-card text-center p-8"
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6"
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <Target size={32} className="text-white" />
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 nrt-font">
                {getLocalizedText('mission')}
              </h3>
              <p className="text-gray-700 leading-relaxed nrt-font">
                {getLocalizedText('missionText')}
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              className="elegant-card text-center p-8"
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6"
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <Eye size={32} className="text-white" />
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 nrt-font">
                {getLocalizedText('vision')}
              </h3>
              <p className="text-gray-700 leading-relaxed nrt-font">
                {getLocalizedText('visionText')}
              </p>
            </motion.div>

            {/* Values */}
            <motion.div
              className="elegant-card text-center p-8"
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6"
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <Heart size={32} className="text-white" />
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 nrt-font">
                {getLocalizedText('values')}
              </h3>
              <p className="text-gray-700 leading-relaxed nrt-font">
                {getLocalizedText('valuesText')}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Values Grid */}
      <motion.section
        className="py-20 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16 nrt-font"
            style={{ direction: language === 'en' ? 'ltr' : 'rtl' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            بەها و تایبەتمەندییەکانمان
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="elegant-card text-center p-6"
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="flex justify-center mb-6"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {value.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 nrt-font">
                  {language === 'en' ? value.titleEn : value.title}
                </h3>
                <p className="text-gray-700 leading-relaxed nrt-font">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section
        ref={teamRef}
        className="py-20 px-6 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={teamInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={teamInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 2 }}
        >
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/10 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-white/10 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
        </motion.div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={teamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-white mb-6 nrt-font"
              style={{ direction: language === 'en' ? 'ltr' : 'rtl' }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={teamInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {getLocalizedText('team')}
            </motion.h2>
            <motion.p
              className="text-xl text-white/90 max-w-3xl mx-auto nrt-font"
              style={{ direction: language === 'en' ? 'ltr' : 'rtl' }}
              initial={{ opacity: 0, y: 20 }}
              animate={teamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              تیمەکەمان لە شارەزایان پێکهاتووە کە باوەڕیان بە گەشەی دیجیتاڵی کوردستان هەیە
            </motion.p>
          </motion.div>

          <motion.div
            className="flex justify-center"
            variants={containerVariants}
            initial="hidden"
            animate={teamInView ? "visible" : "hidden"}
          >
            <div className="max-w-md w-full">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="glass-effect rounded-2xl p-8 text-center"
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="text-6xl mb-6"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  {member.image}
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 nrt-font">
                  {language === 'en' ? member.nameEn : member.name}
                </h3>
                <p className="text-purple-700 mb-4 nrt-font">
                  {language === 'en' ? member.roleEn : member.role}
                </p>
                <p className="text-gray-600 leading-relaxed nrt-font">
                  {member.description}
                </p>
              </motion.div>
            ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        ref={statsRef}
        className="py-20 px-6"
        initial={{ opacity: 0 }}
        animate={statsInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={statsInView ? "visible" : "hidden"}
          >
            {[
              { number: "٢٥+", label: "تێمپلەیت", color: "from-purple-500 to-pink-500" },
              { number: "٢٥٠٠+", label: "بەکارهێنەر", color: "from-blue-500 to-cyan-500" },
              { number: "٤.٩", label: "هەڵسەنگاندن", color: "from-green-500 to-teal-500" },
              { number: "٣", label: "زمان", color: "from-yellow-500 to-orange-500" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center group"
                variants={itemVariants}
                whileHover={{ scale: 1.1, y: -8 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <motion.div
                  className={`text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2 nrt-font`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={statsInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1, type: "spring", bounce: 0.6 }}
                >
                  {stat.number}
                </motion.div>
                <motion.div
                  className="text-gray-600 font-medium nrt-font"
                  initial={{ opacity: 0, y: 10 }}
                  animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                >
                  {stat.label}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Language Selector */}
      <div className="fixed bottom-6 left-6 z-40">
        <motion.div
          className="flex gap-2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 1 }}
        >
          {[
            { code: "ku", name: "کوردی", flag: "🔥" },
            { code: "ar", name: "عەرەبی", flag: "🌙" },
            { code: "en", name: "English", flag: "🌍" }
          ].map((lang) => (
            <motion.button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                language === lang.code
                  ? 'bg-purple-500 text-white shadow-lg'
                  : 'bg-white/80 text-gray-700 hover:bg-white shadow-md'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="mr-1">{lang.flag}</span>
              {lang.name}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
