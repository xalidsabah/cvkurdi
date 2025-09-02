"use client";

import { useState, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { FileText, Users, Download, Star, ArrowRight, Sparkles, Zap, Shield, Facebook, Instagram, MessageCircle, Mail, Phone, MapPin } from "lucide-react";
import { useRef } from "react";

export default function HomePage() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scrollY, setScrollY] = useState(0);

  // Animation controls
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const templatesRef = useRef(null);
  const statsRef = useRef(null);
  const ctaRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const featuresInView = useInView(featuresRef, { once: true });
  const templatesInView = useInView(templatesRef, { once: true });
  const statsInView = useInView(statsRef, { once: true });
  const ctaInView = useInView(ctaRef, { once: true });

  // Fallback templates data
  const fallbackTemplates = [
    {
      id: 1,
      name_ku: "پیشەیی",
      category: "پیشەیی",
      preview_url: "/templates/professional.svg"
    },
    {
      id: 2,
      name_ku: "مۆدێرن",
      category: "مۆدێرن",
      preview_url: "/templates/modern.svg"
    },
    {
      id: 3,
      name_ku: "رەسمی",
      category: "رەسمی",
      preview_url: "/templates/formal.svg"
    },
    {
      id: 4,
      name_ku: "دەستکراو",
      category: "دەستکراو",
      preview_url: "/templates/creative.svg"
    }
  ];

  useEffect(() => {
    fetchTemplates();
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchTemplates = async () => {
    try {
      const response = await fetch("/api/templates");
      if (response.ok) {
        const data = await response.json();
        setTemplates(data.templates?.slice(0, 4) || fallbackTemplates);
      } else {
        // Use fallback data if API fails
        setTemplates(fallbackTemplates);
      }
    } catch (error) {
      console.error("Error fetching templates:", error);
      setTemplates(fallbackTemplates);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: <Sparkles size={32} className="text-purple-600" />,
      title: "تێمپلەیتی پیشەیی",
      description: "زیاتر لە ٢٠ تێمپلەیتی جیاواز بۆ هەموو پیشەکان",
      color: "from-purple-500 to-pink-500",
      delay: 0.1
    },
    {
      icon: <Zap size={32} className="text-blue-600" />,
      title: "ئاسان بۆ بەکارهێنان",
      description: "هیچ زانیاریی تەکنیکی پێویست ناکات، تەنها زانیارییەکانت بنووسە",
      color: "from-blue-500 to-cyan-500",
      delay: 0.2
    },
    {
      icon: <Shield size={32} className="text-green-600" />,
      title: "داگرتنی PDF",
      description: "سی ڤی یەکەت بە کوالیتیی بەرز دابەزێنە",
      color: "from-green-500 to-teal-500",
      delay: 0.3
    },
    {
      icon: <Star size={32} className="text-yellow-600" />,
      title: "زمانەکانی جیاواز",
      description: "پشتیوانی لە زمانی کوردی، عەرەبی و ئینگلیزی",
      color: "from-yellow-500 to-orange-500",
      delay: 0.4
    },
    {
      icon: <Download size={32} className="text-indigo-600" />,
      title: "خێرا و بێ کەمتەر",
      description: "لە کەمتر لە ٥ خولەکدا سی ڤی یەکەت دروست بکە",
      color: "from-indigo-500 to-purple-500",
      delay: 0.5
    },
    {
      icon: <Users size={32} className="text-red-600" />,
      title: "بێ خۆتۆمارکردن",
      description: "هیچ پێویستی بە خۆتۆمارکردن نییە، بەکاربهێنە",
      color: "from-red-500 to-pink-500",
      delay: 0.6
    }
  ];

  // Optimized Animation variants - Faster and smoother
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.05,
        ease: [0.25, 0.46, 0.45, 0.94] // Custom cubic-bezier for snappy feel
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
        ease: [0.25, 0.46, 0.45, 0.94] // Custom easing for bounce effect
      }
    }
  };

  const floatVariants = {
    animate: {
      y: [-8, 8, -8],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const scaleVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden relative">
      {/* Floating Background Elements */}
      <motion.div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full"
          variants={floatVariants}
          animate="animate"
        />
        <motion.div
          className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-blue-200/30 to-cyan-200/30 rounded-full"
          variants={floatVariants}
          animate="animate"
          style={{ animationDelay: '2s' }}
        />
        <motion.div
          className="absolute bottom-40 left-1/4 w-20 h-20 bg-gradient-to-br from-green-200/30 to-teal-200/30 rounded-full"
          variants={floatVariants}
          animate="animate"
          style={{ animationDelay: '4s' }}
        />
        <motion.div
          className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-br from-yellow-200/30 to-orange-200/30 rounded-full"
          variants={floatVariants}
          animate="animate"
          style={{ animationDelay: '1s' }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-16 h-16 bg-gradient-to-br from-indigo-200/30 to-purple-200/30 rounded-full"
          variants={floatVariants}
          animate="animate"
          style={{ animationDelay: '3s' }}
        />
      </motion.div>



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
                <FileText size={24} />
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
                href="/templates"
                className="text-gray-700 hover:text-purple-600 transition-all duration-300 font-medium nrt-font"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                تێمپلەیتەکان
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
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle at 50% 50%, rgba(167, 139, 250, 0.15) 0%, transparent 50%),
                        radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.15) 0%, transparent 50%),
                        radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)`,
          }}
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={heroInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.h1
              className="text-[52px] md:text-[78px] lg:text-[104px] leading-[0.85] font-black text-gray-900 mb-8 tracking-tight nrt-font"
              style={{ direction: "rtl" }}
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              سی ڤی یەکەت بە
              <motion.span
                className="block bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mt-2"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={heroInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                کوردی دروست بکە
              </motion.span>
            </motion.h1>
          </motion.div>

          <motion.p
            className="text-xl md:text-2xl text-gray-700 mb-16 max-w-5xl mx-auto leading-relaxed nrt-font font-medium"
            style={{ direction: "rtl" }}
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            بە ئاسانترین شێوە سی ڤی یەکەت بە زمانی کوردی دروست بکە. تێمپلەیتی پیشەیی هەڵبژێرە و زانیارییەکانت تێبکە.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-8 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.a
              href="/builder"
              className="elegant-button text-xl px-12 py-5 flex items-center gap-4 shadow-elegant-xl"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              دەست پێکردن
              <motion.div
                whileHover={{ x: 6 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <ArrowRight size={24} />
              </motion.div>
            </motion.a>
            <motion.a
              href="/templates"
              className="elegant-card px-12 py-5 text-xl font-bold text-gray-700 hover:text-purple-600 transition-all duration-300 flex items-center gap-4"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              تێمپلەیتەکان ببینە
              <motion.div
                className="w-3 h-3 bg-purple-500 rounded-full"
                whileHover={{ scale: 1.3 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              />
            </motion.a>
          </motion.div>

          {/* Animated Stats */}
          <motion.div
            ref={statsRef}
            className="flex flex-wrap justify-center gap-12 mt-20 pt-12 border-t border-gray-100"
            variants={containerVariants}
            initial="hidden"
            animate={statsInView ? "visible" : "hidden"}
          >
            {[
              { number: "٢٥+", label: "تێمپلەیت", color: "from-red-500 to-pink-500" },
              { number: "٢٥٠٠+", label: "بەکارهێنەر", color: "from-blue-500 to-purple-500" },
              { number: "٤.٩", label: "هەڵسەنگاندن", color: "from-green-500 to-teal-500" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center group"
                variants={itemVariants}
                whileHover={{ scale: 1.1, y: -8 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <motion.div
                  className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2 nrt-font`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={statsInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1, type: "spring", bounce: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
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

      {/* Features Section */}
      <motion.section
        ref={featuresRef}
        id="features" 
        className="py-32 px-6 bg-gradient-to-br from-white via-gray-50/50 to-blue-50/30 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={featuresInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={featuresInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 2 }}
        >
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl"></div>
        </motion.div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h2
              className="text-5xl md:text-6xl font-black text-gray-900 mb-8 tracking-tight nrt-font"
              style={{ direction: "rtl" }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={featuresInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              بۆچی سی ڤی کوردی؟
            </motion.h2>
            <motion.div
              className="w-32 h-1.5 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full shadow-elegant"
              initial={{ scaleX: 0 }}
              animate={featuresInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
              style={{ originX: 0.5 }}
            />
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
            variants={containerVariants}
            initial="hidden"
            animate={featuresInView ? "visible" : "hidden"}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="elegant-card text-center p-10 rounded-3xl shadow-elegant-lg group"
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  y: -8,
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
                transition={{ duration: 0.4, delay: feature.delay * 0.5 }}
              >
                <motion.div
                  className="flex justify-center mb-8"
                  whileHover={{ scale: 1.1, rotate: 6 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <div className={`p-6 bg-gradient-to-br ${feature.color} rounded-3xl shadow-elegant-lg`}>
                    <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                </motion.div>
                <motion.h3
                  className="text-2xl font-black text-gray-900 mb-6 group-hover:text-purple-600 transition-all duration-300 nrt-font"
                  style={{ direction: "rtl" }}
                  initial={{ opacity: 0, y: 15 }}
                  animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                  transition={{ duration: 0.4, delay: feature.delay * 0.5 + 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  {feature.title}
                </motion.h3>
                <motion.p
                  className="text-gray-700 leading-relaxed group-hover:text-gray-900 transition-all duration-300 nrt-font text-lg"
                  style={{ direction: "rtl" }}
                  initial={{ opacity: 0, y: 15 }}
                  animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                  transition={{ duration: 0.4, delay: feature.delay * 0.5 + 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  {feature.description}
                </motion.p>
                <motion.div
                  className={`w-16 h-1.5 bg-gradient-to-r ${feature.color} mx-auto mt-8 rounded-full shadow-elegant`}
                  initial={{ scaleX: 0 }}
                  animate={featuresInView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 0.4, delay: feature.delay * 0.5 + 0.3, ease: "easeOut" }}
                  style={{ originX: 0.5 }}
                  whileHover={{ scaleX: 1.25 }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Templates Preview */}
      <motion.section
        ref={templatesRef}
        id="templates" 
        className="py-32 px-6 bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30"
        initial={{ opacity: 0 }}
        animate={templatesInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            animate={templatesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h2
              className="text-5xl md:text-6xl font-black text-gray-900 mb-8 tracking-tight nrt-font"
              style={{ direction: "rtl" }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={templatesInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              تێمپلەیتە جوانەکان
            </motion.h2>
            <motion.p
              className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed nrt-font font-medium"
              style={{ direction: "rtl" }}
              initial={{ opacity: 0 }}
              animate={templatesInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              لە تێمپلەیتە پیشەیی و مۆدێرنەکانمان هەڵبژێرە کە بۆ هەموو پیشەکان گونجاون
            </motion.p>
            <motion.div
              className="w-32 h-1.5 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full mt-8 shadow-elegant"
              initial={{ scaleX: 0 }}
              animate={templatesInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              style={{ originX: 0.5 }}
            />
          </motion.div>

          {loading ? (
            <motion.div
              className="flex justify-center items-center py-24"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative">
                <motion.div
                  className="w-20 h-20 border-4 border-purple-200/50 border-t-purple-500 rounded-full shadow-elegant"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-pink-500 rounded-full shadow-elegant"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-2 w-16 h-16 border-4 border-transparent border-t-cyan-500 rounded-full shadow-elegant"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
              variants={containerVariants}
              initial="hidden"
              animate={templatesInView ? "visible" : "hidden"}
            >
              {templates.map((template, index) => (
                <motion.div
                  key={template.id}
                  className="group cursor-pointer"
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.05,
                    y: -10,
                    transition: { duration: 0.3 }
                  }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <motion.div
                    className="elegant-card relative overflow-hidden rounded-3xl shadow-elegant-lg"
                    whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                  >
                    <motion.div
                      className="aspect-[3/4] overflow-hidden rounded-t-3xl"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img
                        src={template.preview_url}
                        alt={template.name_ku}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    <motion.div
                      className="p-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={templatesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                    >
                      <h3
                        className="text-xl font-black text-gray-900 mb-3 nrt-font group-hover:text-purple-600 transition-all duration-300"
                        style={{ direction: "rtl" }}
                    >
                      {template.name_ku}
                    </h3>
                    <p
                        className="text-sm text-gray-600 mb-4 nrt-font leading-relaxed"
                        style={{ direction: "rtl" }}
                    >
                      {template.category}
                    </p>
                      <motion.div
                        className="flex items-center justify-between"
                        initial={{ opacity: 0 }}
                        animate={templatesInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 + 0.5 }}
                      >
                        <motion.div
                          className="elegant-button text-sm px-4 py-2"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          هەڵبژاردن
                        </motion.div>
                        <motion.div
                          className="flex items-center gap-1 text-purple-600"
                          whileHover={{ scale: 1.1 }}
                        >
                          <Star size={16} />
                          <span className="text-sm font-semibold">4.8</span>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          )}

          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 50 }}
            animate={templatesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.a
              href="/templates"
              className="group inline-flex items-center gap-3 text-purple-600 hover:text-purple-700 font-bold text-lg nrt-font"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              هەموو تێمپلەیتەکان ببینە
              <motion.div
                className="p-2 bg-purple-100 rounded-full group-hover:bg-purple-200 transition-colors duration-300"
                whileHover={{ x: 8 }}
                transition={{ duration: 0.3 }}
              >
                <ArrowRight size={16} />
              </motion.div>
            </motion.a>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        ref={ctaRef}
        id="cta" 
        className="py-20 px-6 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={ctaInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={ctaInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 2 }}
        >
          <motion.div
            className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full"
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-10 right-10 w-24 h-24 bg-white/10 rounded-full"
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 w-16 h-16 bg-white/10 rounded-full"
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          />
        </motion.div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2
            className="text-4xl md:text-6xl font-bold text-white mb-6 nrt-font"
            style={{ direction: "rtl" }}
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={ctaInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.8 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            ئێستا دەست پێبکە!
          </motion.h2>
          <motion.p
            className="text-xl text-white/90 mb-12 nrt-font"
            style={{ direction: "rtl" }}
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            سی ڤی یەکی پیشەیی بە کوردی دروست بکە و کاری خەونەکانت بدۆزەوە
          </motion.p>
          <motion.a
            href="/builder"
            className="elegant-button text-xl px-12 py-5 inline-flex items-center gap-4 shadow-elegant-xl"
            initial={{ opacity: 0, y: 50 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            دروستکردنی سی ڤی
            <motion.div
              whileHover={{ x: 8 }}
              transition={{ duration: 0.3 }}
            >
              <ArrowRight size={24} />
            </motion.div>
          </motion.a>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-20 px-6 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        {/* Background Pattern */}
        <motion.div
          className="absolute inset-0 opacity-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.05 }}
          transition={{ duration: 2 }}
          viewport={{ once: true }}
        >
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full blur-3xl"></div>
        </motion.div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div
              className="animate-slide-in-left"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-8">
                <motion.div
                  className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-elegant-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <FileText size={32} />
                </motion.div>
                <span className="text-2xl font-black text-gradient nrt-font">
                  سی ڤی کوردی
                </span>
              </div>
              <p
                className="text-gray-300 text-lg leading-relaxed nrt-font mb-6"
                style={{ direction: "rtl" }}
              >
                یەکەم سایتی کوردی بۆ دروستکردنی سی ڤی بە شێوەیەکی پیشەیی و ئاسان.
              </p>
              <div className="flex gap-4">
                <motion.a
                  href="https://facebook.com/cvkurdi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-elegant"
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <Facebook size={20} className="text-white" />
                </motion.a>
                <motion.a
                  href="https://instagram.com/cvkurdi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center shadow-elegant"
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <Instagram size={20} className="text-white" />
                </motion.a>
                <motion.a
                  href="https://t.me/cvkurdi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center shadow-elegant"
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <MessageCircle size={20} className="text-white" />
                </motion.a>
            </div>
            </motion.div>

            <motion.div
              className="animate-slide-up opacity-0"
              style={{ animationDelay: "0.2s" }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3
                className="font-bold mb-6 text-xl nrt-font"
                style={{ direction: "rtl" }}
              >
                بەستەرە گرنگەکان
              </h3>
              <ul className="space-y-4">
                {[
                  { href: "/templates", text: "تێمپلەیتەکان و نمونەکان" },
                  { href: "/builder", text: "دروستکردنی سی ڤی" },
                  { href: "/help", text: "یارمەتی" },
                  { href: "/about", text: "دەربارەی ئێمە" },
                  { href: "/contact", text: "پەیوەندی" }
                ].map((link, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <motion.a
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-all duration-300 inline-block nrt-font"
                      style={{ direction: "rtl" }}
                      whileHover={{ x: 10, color: "#ffffff" }}
                      transition={{ duration: 0.3 }}
                    >
                      {link.text}
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className="animate-slide-in-right"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3
                className="font-bold mb-6 text-xl nrt-font"
                style={{ direction: "rtl" }}
              >
                پەیوەندی
              </h3>
              <div className="space-y-3">
                <motion.div
                  className="flex items-center gap-3"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <Mail size={18} className="text-purple-400" />
                  <p className="text-gray-300 nrt-font" style={{ direction: "rtl" }}>
                info@cvkurdi.com
              </p>
                </motion.div>

                <motion.div
                  className="flex items-center gap-3"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <MapPin size={18} className="text-purple-400" />
                  <p className="text-gray-300 nrt-font" style={{ direction: "rtl" }}>
                    هەولێر، کوردستان
                  </p>
                </motion.div>
            </div>
            </motion.div>
          </div>

          <motion.div
            className="border-t border-gray-700 mt-12 pt-8 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            viewport={{ once: true }}
          >
            <p
              className="text-gray-400 nrt-font"
              style={{ direction: "rtl" }}
            >
              © {new Date().getFullYear()} سی ڤی کوردی. هەموو مافەکان پارێزراون.
            </p>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
}