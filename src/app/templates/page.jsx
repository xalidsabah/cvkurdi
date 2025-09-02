"use client";

import { useState, useEffect } from "react";
import { FileText, Filter, Search, ArrowRight, Sparkles, Zap, Layers, Eye, Download, Heart, Star, Grid, List, Share2 } from "lucide-react";

export default function TemplatesPage() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isVisible, setIsVisible] = useState({});
  const [activeTab, setActiveTab] = useState("templates");
  const [exampleSearchTerm, setExampleSearchTerm] = useState("");
  const [exampleCategory, setExampleCategory] = useState("all");
  const [exampleViewMode, setExampleViewMode] = useState("grid");

  const categories = [
    { id: "all", name: "هەموو", name_en: "All", icon: <Layers size={16} />, color: "from-gray-500 to-slate-500" },
    { id: "پیشەیی", name: "پیشەیی", name_en: "Professional", icon: <FileText size={16} />, color: "from-blue-500 to-indigo-500" },
    { id: "رەسمی", name: "رەسمی", name_en: "Formal", icon: <FileText size={16} />, color: "from-slate-500 to-gray-500" },
    { id: "هونەری", name: "هونەری", name_en: "Creative", icon: <Sparkles size={16} />, color: "from-purple-500 to-pink-500" },
    { id: "سادە", name: "سادە", name_en: "Minimal", icon: <Zap size={16} />, color: "from-green-500 to-teal-500" }
  ];

  const exampleCategories = [
    { id: "all", name: "هەموو پۆلەکان", icon: <FileText size={20} /> },
    { id: "tech", name: "تەکنەلۆژی", icon: <Layers size={20} /> },
    { id: "creative", name: "هونەری", icon: <Sparkles size={20} /> },
    { id: "academic", name: "زانستی", icon: <FileText size={20} /> },
    { id: "business", name: "بیزنس", icon: <FileText size={20} /> },
    { id: "professional", name: "پیشەیی", icon: <Zap size={20} /> }
  ];

  const exampleCVs = [
    {
      id: 1,
      title: "ئارام کەریم - گەشەپێدەر",
      titleEn: "Aram Karim - Developer",
      category: "tech",
      template: "Tech",
      image: "https://picsum.photos/400/600?random=1",
      likes: 245,
      downloads: 189,
      rating: 4.8,
      description: "نمونه سی ڤییەکی گەشەپێدەر بە تجربەی ٥ ساڵ"
    },
    {
      id: 2,
      title: "دیانا محەمەد - دیزاینەر",
      titleEn: "Diana Mohammed - Designer",
      category: "creative",
      template: "Creative",
      image: "https://picsum.photos/400/600?random=2",
      likes: 198,
      downloads: 156,
      rating: 4.9,
      description: "نمونه سی ڤییەکی دیزاینەر بە پۆرتفۆلیۆی دەستکرد"
    },
    {
      id: 3,
      title: "کەوان ئەحمەد - مامۆستا",
      titleEn: "Kewan Ahmed - Teacher",
      category: "academic",
      template: "Academic",
      image: "https://picsum.photos/400/600?random=3",
      likes: 167,
      downloads: 134,
      rating: 4.7,
      description: "نمونه سی ڤییەکی مامۆستای زانکۆ بە بڕوانامەی دکتۆرا"
    },
    {
      id: 4,
      title: "سارا عەلی - مەنەجەر",
      titleEn: "Sara Ali - Manager",
      category: "business",
      template: "Executive",
      image: "https://picsum.photos/400/600?random=4",
      likes: 223,
      downloads: 201,
      rating: 4.6,
      description: "نمونه سی ڤییەکی مەنەجەری پیشەیی بە تجربەی ٨ ساڵ"
    },
    {
      id: 5,
      title: "ئەحمەد حەسەن - مارکێتینگ",
      titleEn: "Ahmed Hassan - Marketing",
      category: "professional",
      template: "Modern",
      image: "https://picsum.photos/400/600?random=5",
      likes: 189,
      downloads: 145,
      rating: 4.5,
      description: "نمونه سی ڤییەکی شارەزای مارکێتینگ و بازرگانی"
    },
    {
      id: 6,
      title: "مەریەم عوسمان - پزیشک",
      titleEn: "Maryam Osman - Doctor",
      category: "professional",
      template: "Classic",
      image: "https://picsum.photos/400/600?random=6",
      likes: 256,
      downloads: 198,
      rating: 4.9,
      description: "نمونه سی ڤییەکی پزیشکی بە بڕوانامەی تایبەتی"
    }
  ];

  const filteredExamples = exampleCVs.filter(cv => {
    const matchesSearch = cv.title.includes(exampleSearchTerm) || cv.titleEn.toLowerCase().includes(exampleSearchTerm.toLowerCase());
    const matchesCategory = exampleCategory === 'all' || cv.category === exampleCategory;
    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    fetchTemplates();
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const fetchTemplates = async () => {
    try {
      console.log('Fetching templates...');
      const response = await fetch('/api/templates');
      console.log('API response:', response.status, response.statusText);
      if (response.ok) {
        const data = await response.json();
        console.log('Templates data:', data);
        setTemplates(data.templates || []);
      } else {
        console.error('API error:', response.status, response.statusText);
        // Fallback to empty array
        setTemplates([]);
      }
    } catch (error) {
      console.error('Error fetching templates:', error);
      // Fallback to empty array
      setTemplates([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
    const matchesSearch = template.name_ku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.name_en.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Debug logging
  console.log('Templates state:', {
    templates: templates.length,
    filteredTemplates: filteredTemplates.length,
    selectedCategory,
    searchTerm,
    loading
  });

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes slide-up {
          from { 
            opacity: 0; 
            transform: translateY(50px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-in {
          from { 
            opacity: 0; 
            transform: scale(0.8); 
          }
          to { 
            opacity: 1; 
            transform: scale(1); 
          }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-slide-up { animation: slide-up 0.8s ease-out forwards; }
        .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
        .animate-scale-in { animation: scale-in 0.6s ease-out forwards; }
        .hover-lift { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .hover-lift:hover { transform: translateY(-8px); box-shadow: 0 20px 40px rgba(0,0,0,0.15); }
        .glass-effect { backdrop-filter: blur(10px); background: rgba(255, 255, 255, 0.8); }
      `}</style>

      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full animate-float opacity-60"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-full animate-float opacity-50" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 left-1/4 w-12 h-12 bg-gradient-to-r from-green-200 to-teal-200 rounded-full animate-float opacity-40" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-20 right-1/3 w-24 h-24 bg-gradient-to-r from-yellow-200 to-orange-200 rounded-full animate-float opacity-30" style={{ animationDelay: '1s' }}></div>
        <Sparkles className="absolute top-60 left-1/2 w-8 h-8 text-purple-300 animate-float opacity-50" style={{ animationDelay: '3s' }} />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 animate-fade-in">
              <a href="/" className="flex items-center gap-3 group">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white transform group-hover:scale-110 transition-all duration-300 shadow-lg">
                  <FileText size={24} />
                </div>
                <span 
                  className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
                  style={{ fontFamily: "NRT, sans-serif" }}
                >
                  سی ڤی کوردی
                </span>
              </a>
              <div className="hidden md:flex items-center gap-2 text-gray-400">
                <span>|</span>
                <span
                  className="text-lg text-gray-600 font-medium"
                  style={{ fontFamily: "NRT, sans-serif", direction: "rtl" }}
                >
                  تێمپلەیتەکان و نمونەکان
                </span>
              </div>
            </div>
            
            <a 
              href="/builder"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-2.5 rounded-full transition-all duration-300 font-semibold hover:scale-105 hover:shadow-lg animate-fade-in"
              style={{ fontFamily: "NRT, sans-serif", animationDelay: "0.2s" }}
            >
              دەست پێکردن
            </a>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 pt-24">
        {/* Page Header */}
        <div 
          id="header" 
          data-animate
          className={`text-center mb-16 ${isVisible.header ? 'animate-slide-up' : 'opacity-0'}`}
        >
          <h1 
            className="text-4xl md:text-6xl font-bold text-gray-800 mb-6"
            style={{ fontFamily: "NRT, sans-serif", direction: "rtl" }}
          >
            تێمپلەیتەکان و <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">نمونه سی ڤییەکان</span>
          </h1>
          <p 
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: "NRT, sans-serif", direction: "rtl" }}
          >
            لە کۆمەڵە تێمپلەیتە پیشەیی و جوانەکانمان هەڵبژێرە یان نمونە سی ڤییەکان ببینە بۆ وەرگرتنی وەرگیران
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-6 rounded-full"></div>

          {/* Tab Navigation */}
          <div className="flex justify-center mt-12">
            <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-100">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab("templates")}
                  className={`flex items-center gap-3 px-8 py-4 rounded-xl font-bold transition-all duration-300 ${
                    activeTab === "templates"
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                      : "text-gray-600 hover:text-purple-600 hover:bg-gray-50"
                  }`}
                  style={{ fontFamily: "NRT, sans-serif" }}
                >
                  <FileText size={20} />
                  تێمپلەیتەکان
                </button>
                <button
                  onClick={() => setActiveTab("examples")}
                  className={`flex items-center gap-3 px-8 py-4 rounded-xl font-bold transition-all duration-300 ${
                    activeTab === "examples"
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                      : "text-gray-600 hover:text-purple-600 hover:bg-gray-50"
                  }`}
                  style={{ fontFamily: "NRT, sans-serif" }}
                >
                  <Eye size={20} />
                  نمونەکان
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div 
          id="filters" 
          data-animate
          className={`mb-12 ${isVisible.filters ? 'animate-slide-up' : 'opacity-0'}`}
        >
          {activeTab === "templates" ? (
            <>
              {/* Templates Search */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative group">
              <Search size={20} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-purple-500 transition-colors duration-300" />
              <input
                type="text"
                placeholder="گەڕان لە تێمپلەیتەکان..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-12 pl-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-300 text-lg hover:border-gray-300"
                style={{ direction: "rtl" }}
              />
            </div>
          </div>

              {/* Templates Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`group flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 ${
                  selectedCategory === category.id
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg scale-105`
                    : 'bg-white border-2 border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                }`}
                style={{ fontFamily: "NRT, sans-serif" }}
              >
                <div className={`transition-all duration-300 ${
                  selectedCategory === category.id ? 'text-white' : 'text-gray-500 group-hover:text-gray-600'
                }`}>
                  {category.icon}
                </div>
                {category.name}
              </button>
            ))}
          </div>
            </>
          ) : (
            <>
              {/* Examples Search and Filters */}
              <div className="max-w-md mx-auto mb-8">
                <div className="relative group">
                  <Search size={20} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-purple-500 transition-colors duration-300" />
                  <input
                    type="text"
                    placeholder="گەڕان لە نمونەکان..."
                    value={exampleSearchTerm}
                    onChange={(e) => setExampleSearchTerm(e.target.value)}
                    className="w-full pr-12 pl-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-300 text-lg hover:border-gray-300"
                    style={{ direction: "rtl" }}
                  />
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-3 items-center">
                {/* Examples Category Filter */}
                <div className="flex gap-2 overflow-x-auto">
                  {exampleCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setExampleCategory(category.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all duration-200 hover:scale-102 ${
                        exampleCategory === category.id
                          ? 'bg-purple-500 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      style={{ fontFamily: "NRT, sans-serif" }}
                    >
                      {category.icon}
                      <span className="text-sm">{category.name}</span>
                    </button>
                  ))}
                </div>

                {/* View Mode Toggle */}
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => setExampleViewMode('grid')}
                    className={`p-2 rounded-xl transition-all duration-200 ${
                      exampleViewMode === 'grid'
                        ? 'bg-purple-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Grid size={18} />
                  </button>
                  <button
                    onClick={() => setExampleViewMode('list')}
                    className={`p-2 rounded-xl transition-all duration-200 ${
                      exampleViewMode === 'list'
                        ? 'bg-purple-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <List size={18} />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Content Grid */}
        <div 
          id="content"
          data-animate
          className={`${isVisible.templates ? 'animate-slide-up' : 'opacity-0'}`}
        >
          {activeTab === "templates" ? (
            <>
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-pink-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
              </div>
            </div>
          ) : filteredTemplates.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <p 
                className="text-xl text-gray-600"
                style={{ fontFamily: "NRT, sans-serif", direction: "rtl" }}
              >
                هیچ تێمپلەیتێک نەدۆزرایەوە
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredTemplates.map((template, index) => (
                <div 
                  key={template.id} 
                  className={`group hover-lift animate-scale-in opacity-0`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg border border-gray-100 group-hover:border-gray-200 transition-all duration-500">
                    {/* Template Preview */}
                    <div className="aspect-[3/4] overflow-hidden relative">
                      <img 
                        src={template.preview_url} 
                        alt={template.name_ku}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="absolute bottom-4 left-4 right-4 space-y-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          <a 
                            href={`/builder?template=${template.id}`}
                            className="block w-full bg-white/95 backdrop-blur-sm text-gray-800 py-3 px-6 rounded-xl font-bold text-center hover:bg-white transition-all duration-300 hover:scale-105"
                          >
                            بەکارهێنان
                          </a>
                          <button 
                            className="block w-full bg-gray-800/80 backdrop-blur-sm text-white py-3 px-6 rounded-xl font-semibold hover:bg-gray-900/80 transition-all duration-300"
                          >
                            پێشبینین
                          </button>
                        </div>
                      </div>

                      {/* Category Badge */}
                      <div className="absolute top-4 right-4">
                        <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1.5 rounded-full text-sm font-medium shadow-lg border border-white/20">
                          {template.category}
                        </span>
                      </div>
                    </div>

                    {/* Template Info */}
                    <div className="p-6 text-center">
                      <h3 
                        className="font-bold text-lg text-gray-800 mb-2 group-hover:text-purple-600 transition-colors duration-300"
                        style={{ fontFamily: "NRT, sans-serif", direction: "rtl" }}
                      >
                        {template.name_ku}
                      </h3>
                      <p 
                        className="text-gray-500 text-sm"
                        style={{ fontFamily: "NRT, sans-serif", direction: "rtl" }}
                      >
                        {template.category}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
              )}
            </>
          ) : (
            <>
              {/* Examples Section */}
              {filteredExamples.length === 0 ? (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4">🔍</div>
                  <p
                    className="text-xl text-gray-600"
                    style={{ fontFamily: "NRT, sans-serif", direction: "rtl" }}
                  >
                    هیچ نمونەیەک نەدۆزرایەوە
                  </p>
                </div>
              ) : (
                <div className={exampleViewMode === 'grid'
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  : "space-y-6"
                }>
                  {filteredExamples.map((cv, index) => (
                    <div
                      key={cv.id}
                      className={exampleViewMode === 'grid'
                        ? "elegant-card overflow-hidden group"
                        : "elegant-card p-6 flex gap-6"
                      }
                    >
                      {exampleViewMode === 'grid' ? (
                        <>
                          {/* Grid View */}
                          <div className="relative overflow-hidden">
                            <img
                              src={cv.image}
                              alt={cv.title}
                              className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                            {/* Overlay Actions */}
                            <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <button
                                className="flex-1 bg-white/90 text-gray-800 px-4 py-2 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 hover:bg-white transition-colors duration-200"
                              >
                                <Eye size={16} />
                                بینینی سی ڤی
                              </button>
                              <button
                                className="bg-purple-500 text-white px-4 py-2 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 hover:bg-purple-600 transition-colors duration-200"
                              >
                                <Download size={16} />
                                دابەزاندن
                              </button>
                            </div>
                          </div>

                          <div className="p-6">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-2">
                                  {cv.title}
                                </h3>
                                <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                                  {cv.template}
                                </span>
                              </div>
                            </div>

                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                              {cv.description}
                            </p>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                  <Heart size={14} />
                                  <span>{cv.likes}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Download size={14} />
                                  <span>{cv.downloads}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Star size={14} className="text-yellow-500" />
                                  <span>{cv.rating}</span>
                                </div>
                              </div>
                              <button
                                className="p-2 text-gray-400 hover:text-purple-600 transition-colors duration-200"
                              >
                                <Share2 size={16} />
                              </button>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          {/* List View */}
                          <img
                            src={cv.image}
                            alt={cv.title}
                            className="w-32 h-32 object-cover rounded-xl flex-shrink-0"
                          />

                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="font-bold text-xl text-gray-900 mb-1">
                                  {cv.title}
                                </h3>
                                <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                                  {cv.template}
                                </span>
                              </div>
                            </div>

                            <p className="text-gray-600 mb-4">
                              {cv.description}
                            </p>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-6 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                  <Heart size={14} />
                                  <span>{cv.likes}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Download size={14} />
                                  <span>{cv.downloads}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Star size={14} className="text-yellow-500" />
                                  <span>{cv.rating}</span>
                                </div>
                              </div>

                              <div className="flex gap-2">
                                <button
                                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-semibold text-sm flex items-center gap-2 hover:bg-gray-200 transition-colors duration-200"
                                >
                                  <Eye size={16} />
                                  بینینی سی ڤی
                                </button>
                                <button
                                  className="bg-purple-500 text-white px-4 py-2 rounded-lg font-semibold text-sm flex items-center gap-2 hover:bg-purple-600 transition-colors duration-200"
                                >
                                  <Download size={16} />
                                  دابەزاندن
                                </button>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Bottom CTA */}
        <div 
          id="cta" 
          data-animate
          className={`text-center mt-20 pt-16 border-t border-gray-100 ${isVisible.cta ? 'animate-slide-up' : 'opacity-0'}`}
        >
          <h2 
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
            style={{ fontFamily: "NRT, sans-serif", direction: "rtl" }}
          >
            ئامادەیت بۆ دروستکردنی سی ڤی یەکەت؟
          </h2>
          <p 
            className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto"
            style={{ fontFamily: "NRT, sans-serif", direction: "rtl" }}
          >
            تێمپلەیتێک هەڵبژێرە و لە چەند دەقیقەیەکدا سی ڤی یەکی پیشەیی دروست بکە
          </p>
          <a 
            href="/builder"
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold px-10 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl text-lg"
            style={{ fontFamily: "NRT, sans-serif" }}
          >
            دەست پێکردن
            <div className="p-1 bg-white/20 rounded-full group-hover:bg-white/30 transition-colors duration-300">
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-6 mt-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-purple-900/20 to-gray-900"></div>
        <div className="max-w-6xl mx-auto relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                  <FileText size={24} />
                </div>
                <span
                  className="text-2xl font-bold"
                  style={{ fontFamily: "NRT, sans-serif" }}
                >
                  سی ڤی کوردی
                </span>
              </div>
              <p
                className="text-gray-300 leading-relaxed"
                style={{ fontFamily: "NRT, sans-serif", direction: "rtl" }}
              >
                یەکەم سایتی کوردی بۆ دروستکردنی سی ڤی بە شێوەیەکی پیشەیی و ئاسان.
              </p>
            </div>

            <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <h3
                className="font-bold mb-6 text-xl"
                style={{ fontFamily: "NRT, sans-serif", direction: "rtl" }}
              >
                بەستەرە گرنگەکان
              </h3>
              <ul className="space-y-4">
                {[
                  { href: "/", text: "سەرەتا" },
                  { href: "/templates", text: "تێمپلەیتەکان و نمونەکان" },
                  { href: "/help", text: "یارمەتی" },
                  { href: "/contact", text: "پەیوەندی" }
                ].map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2 inline-block"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <h3
                className="font-bold mb-6 text-xl"
                style={{ fontFamily: "NRT, sans-serif", direction: "rtl" }}
              >
                پەیوەندی
              </h3>
              <p
                className="text-gray-300"
                style={{ fontFamily: "NRT, sans-serif", direction: "rtl" }}
              >
                info@cvkurdi.com
              </p>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-12 pt-8 text-center animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <p
              className="text-gray-400"
              style={{ fontFamily: "NRT, sans-serif", direction: "rtl" }}
            >
              © {new Date().getFullYear()} سی ڤی کوردی. هەموو مافەکان پارێزراون.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}