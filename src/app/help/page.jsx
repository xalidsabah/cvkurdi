"use client";

import { useState, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { HelpCircle, Mail, MessageCircle, FileText, Download, Globe, ChevronDown, ChevronUp, ArrowRight, Sparkles, Zap, Shield, Users } from "lucide-react";
import { useRef } from "react";

export default function HelpPage() {
  const [language, setLanguage] = useState("ku");
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [scrollY, setScrollY] = useState(0);

  // Animation controls
  const heroRef = useRef(null);
  const faqRef = useRef(null);
  const contactRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const faqInView = useInView(faqRef, { once: true });
  const contactInView = useInView(contactRef, { once: true });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const faqData = {
    ku: [
      {
        question: "چۆن سی ڤی یەکەم دروست بکەم؟",
        answer: "لە پەڕەی سەرەکی کلیک لەسەر 'دەست پێکردن' بکە. پاشان زمانێک هەڵبژێرە و تێمپلەیتێک دیاری بکە. دواتر زانیارییەکانت لە هەنگاوەکاندا پڕبکەرەوە و سی ڤی یەکەت بە PDF دابەزێنە."
      },
      {
        question: "چەند زمان پشتگیری دەکرێت؟",
        answer: "سی ڤی کوردی پشتگیری لە سێ زمان دەکات: کوردی، عەرەبی و ئینگلیزی. دەتوانیت زمانەکەت لە دەستپێکردنی دروستکردندا هەڵبژێریت."
      },
      {
        question: "چۆن وێنەیەک بۆ سی ڤی یەکەم زیاد بکەم؟",
        answer: "لە هەنگاوی یەکەم (زانیاری کەسی) کلیک لەسەر بەشی وێنە بکە و وێنەیەکی لە کۆمپیوتەرەکەت هەڵبژێرە. پشتگیری لە JPEG و PNG دەکرێت."
      },
      {
        question: "چۆن (PDF) کەم دابەزێنم؟",
        answer: "لە پەڕەی پێشبینین  کلیک لەسەر دوگمەی 'داگرتنی PDF' بکە. سی ڤی یەکەت بە کوالیتیی بەرز وەک PDF دابەزێنرێت."
      },
      {
        question: "ئایا بەکارهێنانی سی ڤی کوردی  بێ بەرامبەرە؟",
        answer: "بەڵێ، سی ڤی کوردی بە تەواوی بەخۆراییە . دەتوانیت چەند سی ڤی بوێ دروستی بکەی و دابەزێنیت."
      }
    ],
    ar: [
      {
        question: "كيف أنشئ سيرة ذاتية؟",
        answer: "انقر على 'ابدأ' في الصفحة الرئيسية. ثم اختر لغة ونمط. بعد ذلك املأ معلوماتك في الخطوات وقم بتنزيل سيرتك الذاتية كملف PDF."
      },
      {
        question: "كم لغة مدعومة؟",
        answer: "يدعم سي ڤی کوردی ثلاث لغات: الكردية والعربية والإنجليزية. يمكنك اختيار لغتك عند بدء الإنشاء."
      },
      {
        question: "كيف أضيف صورة لسيرتي الذاتية؟",
        answer: "في الخطوة الأولى (المعلومات الشخصية)، انقر على منطقة الصورة واختر صورة من جهازك. يدعم JPEG و PNG."
      },
      {
        question: "كيف يتم حفظ سيرتي الذاتية؟",
        answer: "يتم حفظ سيرتك الذاتية تلقائياً كل 30 دقيقة. يمكنك أيضاً الحفظ يدوياً بالنقر على زر 'حفظ'."
      },
      {
        question: "كيف أقوم بتنزيل PDF؟",
        answer: "في صفحة المعاينة، انقر على زر 'تنزيل PDF'. سيتم تنزيل سيرتك الذاتية بجودة عالية كملف PDF."
      },
      {
        question: "هل الاستخدام مجاني؟",
        answer: "نعم، سي ڤی کوردی مجاني تماماً. يمكنك إنشاء وتنزيل عدد غير محدود من السير الذاتية."
      }
    ],
    en: [
      {
        question: "How do I create a CV?",
        answer: "Click 'Get Started' on the main page. Then choose a language and template. Fill in your information in the steps and download your CV as PDF."
      },
      {
        question: "How many languages are supported?",
        answer: "CV Kurdi supports three languages: Kurdish, Arabic, and English. You can choose your language when starting the creation process."
      },
      {
        question: "How do I add a photo to my CV?",
        answer: "In the first step (Personal Info), click on the photo area and select an image from your computer. JPEG and PNG formats are supported."
      },
      {
        question: "How is my CV saved?",
        answer: "Your CV is automatically saved every 30 minutes. You can also save manually by clicking the 'Save' button."
      },
      {
        question: "How do I download PDF?",
        answer: "In the preview page, click the 'Download PDF' button. Your CV will be downloaded as a high-quality PDF file."
      },
      {
        question: "Is the service free?",
        answer: "Yes, CV Kurdi is completely free. You can create and download unlimited CVs."
      }
    ]
  };

  const getLocalizedText = (key) => {
    const texts = {
      ku: {
        title: "یارمەتی",
        subtitle: "پرسیارە باوەکان",
        contactTitle: "پەیوەندی",
        contactDesc: "ئەگەر هەر  پرسیارێکی دیکەت هەیە، پەیوەندیمان پێوە بکە",
        backToHome: "گەڕانەوە بۆ سەرەتا"
      },
      ar: {
        title: "المساعدة",
        subtitle: "الأسئلة الشائعة",
        contactTitle: "التواصل",
        contactDesc: "إذا كان لديك أي أسئلة أخرى، تواصل معنا",
        backToHome: "العودة للرئيسية"
      },
      en: {
        title: "Help",
        subtitle: "Frequently Asked Questions",
        contactTitle: "Contact Us",
        contactDesc: "If you have any other questions, contact us",
        backToHome: "Back to Home"
      }
    };
    return texts[language]?.[key] || texts.ku[key];
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.05,
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
                <HelpCircle size={24} />
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
              <HelpCircle className="text-purple-600" size={24} />
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
          </motion.div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        ref={faqRef}
        className="py-20 px-6 bg-gradient-to-br from-white via-gray-50/50 to-blue-50/30"
        initial={{ opacity: 0 }}
        animate={faqInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate={faqInView ? "visible" : "hidden"}
          >
            {faqData[language].map((faq, index) => (
              <motion.div
                key={index}
                className="elegant-card overflow-hidden"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-purple-50/50 transition-colors duration-200"
                >
                  <h3
                    className="text-lg font-bold text-gray-900 nrt-font pr-4"
                    style={{ direction: language === 'en' ? 'ltr' : 'rtl' }}
                  >
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown size={20} className="text-purple-600 flex-shrink-0" />
                  </motion.div>
                </button>

                <motion.div
                  initial={false}
                  animate={{
                    height: expandedFaq === index ? "auto" : 0,
                    opacity: expandedFaq === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6">
                    <p
                      className="text-gray-700 leading-relaxed nrt-font"
                      style={{ direction: language === 'en' ? 'ltr' : 'rtl' }}
                    >
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        ref={contactRef}
        className="py-20 px-6 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={contactInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={contactInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 2 }}
        >
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/10 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        </motion.div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white mb-6 nrt-font"
            style={{ direction: language === 'en' ? 'ltr' : 'rtl' }}
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={contactInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.8 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {getLocalizedText('contactTitle')}
          </motion.h2>
          <motion.p
            className="text-xl text-white/90 mb-12 nrt-font"
            style={{ direction: language === 'en' ? 'ltr' : 'rtl' }}
            initial={{ opacity: 0, y: 30 }}
            animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {getLocalizedText('contactDesc')}
          </motion.p>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 50 }}
            animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div
              className="glass-effect p-6 rounded-2xl text-center"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <Mail size={32} className="text-purple-600 mx-auto mb-4" />
              <h3 className="text-gray-900 font-bold mb-2 nrt-font">ئیمەیڵ</h3>
              <p className="text-gray-700 nrt-font">info@cvkurdi.com</p>
            </motion.div>

            <motion.div
              className="glass-effect p-6 rounded-2xl text-center"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle size={32} className="text-pink-600 mx-auto mb-4" />
              <h3 className="text-gray-900 font-bold mb-2 nrt-font">تێلێگرام</h3>
              <p className="text-gray-700 nrt-font">tm.com/@cvkurdi</p>
            </motion.div>
            <motion.div
              className="glass-effect p-6 rounded-2xl text-center"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <FileText size={32} className="text-blue-600 mx-auto mb-4" />
              <h3 className="text-gray-900 font-bold mb-2 nrt-font">دۆکیومێنت</h3>
              <p className="text-gray-700 nrt-font">دەستەبەری یارمەتی</p>
            </motion.div>
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
