"use client";

import { useState, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Mail, Phone, MapPin, MessageCircle, Send, CheckCircle, AlertCircle, Globe, MessageSquare, Clock, Users } from "lucide-react";
import { useRef } from "react";

export default function ContactPage() {
  const [language, setLanguage] = useState("ku");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [scrollY, setScrollY] = useState(0);

  // Animation controls
  const heroRef = useRef(null);
  const formRef = useRef(null);
  const contactRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const formInView = useInView(formRef, { once: true });
  const contactInView = useInView(contactRef, { once: true });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const getLocalizedText = (key) => {
    const texts = {
      ku: {
        title: "پەیوەندی",
        subtitle: "پەیوەندی لەگەڵمان بکە",
        getInTouch: "پەیوەندی بکە",
        contactForm: "فۆرمی پەیوەندی",
        name: "ناو",
        email: "ئیمەیڵ",
        subject: "بابەت",
        message: "پەیام",
        send: "بنێرە",
        sending: "دەنێردرێت...",
        backToHome: "گەڕانەوە بۆ سەرەتا",
        successMessage: "پەیامەکەت بە سەرکەوتوویی نێردرا!",
        errorMessage: "هەڵەیەک ڕوویدا. تکایە دووبارە تاقی بکەرەوە.",
        contactInfo: "زانیارییەکانی پەیوەندی",
        responseTime: "کاتی وەڵامدان",
        supportHours: "کاتژمێرەکانی پشتگیری",
        ourLocation: "شوێنەکەمان",
        socialMedia: " تۆرە کۆمەلایەتیەکانمان",
        placeholder: {
          name: "ناوە تەواوەکەت بنووسە",
          email: "ئیمەیڵەکەت بنووسە",
          subject: "بابەتی پەیامەکەت",
          message: "پەیامەکەت لێرە بنووسە..."
        }
      },
      ar: {
        title: "التواصل",
        subtitle: "تواصل معنا",
        getInTouch: "تواصل معنا",
        contactForm: "نموذج التواصل",
        name: "الاسم",
        email: "البريد الإلكتروني",
        subject: "الموضوع",
        message: "الرسالة",
        send: "إرسال",
        sending: "يتم الإرسال...",
        backToHome: "العودة للرئيسية",
        successMessage: "تم إرسال رسالتك بنجاح!",
        errorMessage: "حدث خطأ. يرجى المحاولة مرة أخرى.",
        contactInfo: "معلومات التواصل",
        responseTime: "وقت الرد",
        supportHours: "ساعات الدعم",
        ourLocation: "موقعنا",
        socialMedia: "وسائل التواصل الاجتماعي",
        placeholder: {
          name: "اكتب اسمك الكامل",
          email: "اكتب بريدك الإلكتروني",
          subject: "موضوع رسالتك",
          message: "اكتب رسالتك هنا..."
        }
      },
      en: {
        title: "Contact",
        subtitle: "Get in touch with us",
        getInTouch: "Get in Touch",
        contactForm: "Contact Form",
        name: "Name",
        email: "Email",
        subject: "Subject",
        message: "Message",
        send: "Send",
        sending: "Sending...",
        backToHome: "Back to Home",
        successMessage: "Your message has been sent successfully!",
        errorMessage: "An error occurred. Please try again.",
        contactInfo: "Contact Information",
        responseTime: "Response Time",
        supportHours: "Support Hours",
        ourLocation: "Our Location",
        socialMedia: "Social Media",
        placeholder: {
          name: "Enter your full name",
          email: "Enter your email",
          subject: "Subject of your message",
          message: "Write your message here..."
        }
      }
    };
    return texts[language]?.[key] || texts.ku[key];
  };

  const contactInfo = [
    {
      icon: <Mail size={24} className="text-purple-600" />,
      title: getLocalizedText('email'),
      value: "info@cvkurdi.com",
      description: "ئیمەیڵی فەرمی"
    },
    {
      icon: <MessageCircle size={24} className="text-blue-600" />,
      title: "تێلێگرام",
      value: "@cvkurdi",
      description: "پەیوەندی خێرا"
    },
    {
      icon: <Clock size={24} className="text-green-600" />,
      title: getLocalizedText('supportHours'),
      value: "٢٤/٧",
      description: "پشتیوانی بەردەوام"
    },
    {
      icon: <MapPin size={24} className="text-red-600" />,
      title: getLocalizedText('ourLocation'),
      value: "هەولێر، کوردستان",
      description: "باڵەخانەی سەرەکی"
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
                <MessageSquare size={24} />
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
              <MessageSquare className="text-purple-600" size={24} />
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
              هەر پرسیارێکی پەیوەندیدار بە سی ڤی کوردی هەیە؟ پەیوەندیمان پێوە بکە و یارمەتیت بدەین
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Form & Info Section */}
      <motion.section
        className="py-20 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              ref={formRef}
              className="elegant-card p-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4 nrt-font">
                  {getLocalizedText('contactForm')}
                </h2>
                <p className="text-gray-700 nrt-font">
                  تکایە زانیارییەکانت پڕبکەرەوە و پەیامەکەت بنێرە
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2 nrt-font">
                    {getLocalizedText('name')} *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    placeholder={getLocalizedText('placeholder').name}
                    style={{ direction: language === 'en' ? 'ltr' : 'rtl' }}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2 nrt-font">
                    {getLocalizedText('email')} *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    placeholder={getLocalizedText('placeholder').email}
                    style={{ direction: 'ltr' }}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2 nrt-font">
                    {getLocalizedText('subject')} *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    placeholder={getLocalizedText('placeholder').subject}
                    style={{ direction: language === 'en' ? 'ltr' : 'rtl' }}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2 nrt-font">
                    {getLocalizedText('message')} *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder={getLocalizedText('placeholder').message}
                    style={{ direction: language === 'en' ? 'ltr' : 'rtl' }}
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full elegant-button text-lg py-4 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      {getLocalizedText('sending')}
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      {getLocalizedText('send')}
                    </>
                  )}
                </motion.button>
              </form>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <motion.div
                  className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <CheckCircle size={20} className="text-green-600" />
                  <span className="text-green-800 nrt-font">
                    {getLocalizedText('successMessage')}
                  </span>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <AlertCircle size={20} className="text-red-600" />
                  <span className="text-red-800 nrt-font">
                    {getLocalizedText('errorMessage')}
                  </span>
                </motion.div>
              )}
            </motion.div>

            {/* Contact Information */}
            <motion.div
              ref={contactRef}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4 nrt-font">
                  {getLocalizedText('contactInfo')}
                </h2>
                <p className="text-gray-700 nrt-font">
                  چەندین شێوازی جیاوازمان بەردەستە بۆ پەیوەندی کردن
                </p>
              </div>

              <motion.div
                className="space-y-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    className="elegant-card p-6 flex items-start gap-4"
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      className="p-3 bg-gray-50 rounded-xl"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {info.icon}
                    </motion.div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1 nrt-font">
                        {info.title}
                      </h3>
                      <p className="text-lg text-gray-800 font-semibold nrt-font mb-1">
                        {info.value}
                      </p>
                      <p className="text-gray-600 text-sm nrt-font">
                        {info.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Social Media Links */}
              <motion.div
                className="mt-12 elegant-card p-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6 nrt-font">
                  {getLocalizedText('socialMedia')}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: "Facebook", handle: "@cvkurdi", icon: "📘" },
                    { name: "Instagram", handle: "@cvkurdi", icon: "📷" },
                    { name: "Telegram", handle: "@cvkurdi", icon: "✈️" },
                    { name: "Twitter", handle: "@cvkurdi", icon: "🐦" }
                  ].map((social, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-purple-50 transition-colors duration-200 cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-2xl">{social.icon}</span>
                      <div>
                        <p className="font-semibold text-gray-900 nrt-font text-sm">
                          {social.name}
                        </p>
                        <p className="text-gray-600 text-xs nrt-font">
                          {social.handle}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
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
