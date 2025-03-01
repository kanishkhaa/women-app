import React, { useState } from 'react';
import { Search, Play, FileText, BookOpen, ChevronRight, X, Star, ArrowRight } from 'lucide-react';
import Depression  from '../../assets/depression.jpeg';
import Pregnancy from '../../assets/pregnancy.jpg';
import Postpartum from '../../assets/postpartum.jpg';
import Breastfeeding from '../../assets/breastfeeding.jpg';
import  Care from '../../assets/care.jpg';
import Postdepression from  '../../assets/postdepression.jpg';
import Sidebar from '../../components/Sidebar/Sidebar';


const Maternal = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [modalContent, setModalContent] = useState(null);

  // Categories for women's health issues
  const categories = [
    { id: 'all', name: 'All Topics' },
    { id: 'postpartum', name: 'Postpartum Care' },
    { id: 'pregnancy', name: 'Pregnancy' },
    { id: 'breastfeeding', name: 'Breastfeeding' },
    { id: 'maternal', name: 'Maternal Health' },
    { id: 'recovery', name: 'Recovery' },
    { id: 'complications', name: 'Complications' }
  ];

  // YouTube video thumbnails
  const videoThumbnails = {
    video1: "https://img.youtube.com/vi/JMPckx9kDuA/maxresdefault.jpg",
    video2: "https://img.youtube.com/vi/h3GJ7TqDGZw/maxresdefault.jpg",
    video3: "https://img.youtube.com/vi/uGQeX2t6un8/maxresdefault.jpg",
    video4: "https://img.youtube.com/vi/Y9j_oemy-0Y/maxresdefault.jpg",
    video5: "https://img.youtube.com/vi/_4gpfOudxQc/maxresdefault.jpg",
    video6: "https://img.youtube.com/vi/BLtFIi6d9Xw/maxresdefault.jpg"
  };

  // Updated content with new articles and videos
  const content = [
    {
      id: 1,
      type: 'article',
      title: 'Postpartum Preeclampsia: Symptoms and Causes',
      category: 'postpartum',
      author: 'Mayo Clinic',
      thumbnail: Depression,
      readTime: '8 min read',
      date: 'Feb 10, 2025',
      description: 'Learn about postpartum preeclampsia, a serious condition that can occur after childbirth, including its symptoms, causes, and treatment options.',
      url: 'https://www.mayoclinic.org/diseases-conditions/postpartum-preeclampsia/symptoms-causes/syc-20376646?utm'
    },
    {
      id: 2,
      type: 'article',
      title: 'Complications of Pregnancy',
      category: 'complications',
      author: 'Wikipedia',
      thumbnail: Pregnancy,
      readTime: '15 min read',
      date: 'Feb 5, 2025',
      description: 'A comprehensive overview of potential complications that can arise during pregnancy, their risk factors, and how they are typically managed.',
      url: 'https://en.wikipedia.org/wiki/Complications_of_pregnancy?utm'
    },
    {
      id: 3,
      type: 'blog',
      title: 'Postpartum Incontinence is Common but Untreated',
      category: 'postpartum',
      author: 'Parents',
      thumbnail: Postpartum,
      readTime: '7 min read',
      date: 'Jan 28, 2025',
      description: 'Exploring the issue of postpartum incontinence that affects many new mothers but is often left untreated or undiscussed in maternal healthcare.',
      url: 'https://www.parents.com/postpartum-incontinence-is-common-but-untreated-8785817?utm'
    },
    {
      id: 4,
      type: 'article',
      title: 'Optimizing Postpartum Care',
      category: 'postpartum',
      author: 'ACOG',
      thumbnail: Care,
      readTime: '12 min read',
      date: 'Jan 20, 2025',
      description: 'Clinical guidance for healthcare providers on optimizing care for women in the postpartum period, emphasizing the importance of ongoing care.',
      url: 'https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2018/05/optimizing-postpartum-care?utm'
    },
    {
      id: 5,
      type: 'blog',
      title: 'What is DMER in Breastfeeding?',
      category: 'breastfeeding',
      author: 'The Guardian Wellness',
      thumbnail: Breastfeeding,
      readTime: '9 min read',
      date: 'Jan 15, 2025',
      description: 'Understanding Dysphoric Milk Ejection Reflex (DMER), a condition that can cause negative emotions during breastfeeding milk letdown.',
      url: 'https://www.theguardian.com/wellness/2024/oct/18/what-is-dmer-breastfeeding?utm'
    },
    
    // Updated YouTube videos
    {
      id: 7,
      type: 'video',
      title: 'Postpartum Depression: More Than Baby Blues',
      category: 'postpartum',
      author: 'CrashCourse',
      thumbnail: videoThumbnails.video1,
      duration: '14 min watch',
      date: 'Feb 8, 2025',
      description: 'A comprehensive overview of postpartum depression, including symptoms, risk factors, and treatment options for new mothers.',
      url: 'https://www.youtube.com/watch?v=JMPckx9kDuA',
      videoId: 'JMPckx9kDuA'
    },
    {
      id: 8,
      type: 'video',
      title: 'What to Expect After a C-Section',
      category: 'recovery',
      author: 'Mayo Clinic',
      thumbnail: videoThumbnails.video2,
      duration: '8 min watch',
      date: 'Jan 25, 2025',
      description: 'Medical professionals explain what to expect during recovery from a cesarean section, including healing timeframes and post-operative care.',
      url: 'https://www.youtube.com/watch?v=h3GJ7TqDGZw',
      videoId: 'h3GJ7TqDGZw'
    },
    {
      id: 9,
      type: 'video',
      title: 'Common Breastfeeding Problems and Solutions',
      category: 'breastfeeding',
      author: 'La Leche League',
      thumbnail: videoThumbnails.video3,
      duration: '22 min watch',
      date: 'Jan 18, 2025',
      description: 'Lactation consultants discuss common breastfeeding challenges and provide practical solutions for new mothers experiencing difficulties.',
      url: 'https://www.youtube.com/watch?v=uGQeX2t6un8',
      videoId: 'uGQeX2t6un8'
    },
    {
      id: 10,
      type: 'video',
      title: 'Maternal Mental Health: Beyond Depression',
      category: 'maternal',
      author: 'Health Channel',
      thumbnail: videoThumbnails.video4,
      duration: '19 min watch',
      date: 'Jan 12, 2025',
      description: 'Exploring the spectrum of maternal mental health conditions including anxiety, OCD, and PTSD that can affect women during and after pregnancy.',
      url: 'https://www.youtube.com/watch?v=Y9j_oemy-0Y',
      videoId: 'Y9j_oemy-0Y'
    },
    {
      id: 11,
      type: 'video',
      title: 'Perimenopause என்பது என்ன? இதற்கும் Menopause -க்கும் என்ன வித்தியாசம்?',
      category: 'maternal',
      author: 'BBC News Tamil',
      thumbnail: videoThumbnails.video5,
      duration: '35 min watch',
      date: 'Jan 5, 2025',
      description: 'உடல் அடிக்கடி சூடாகி வியர்த்தல், சீரற்ற மாதவிடாய், பிறப்புறுப்பில் ஈரப்பதமின்மை, தெளிவற்ற சிந்தனை. இவை எல்லாம் எதன் அறிகுறிகள் தெரியுமா?',
      url: 'https://www.youtube.com/watch?v=_4gpfOudxQc',
      videoId: '_4gpfOudxQc'
    },
    {
      id: 12,
      type: 'video',
      title: 'Prenatal Vitamins: What You Need to Know',
      category: 'pregnancy',
      author: 'Pregnancy Health',
      thumbnail: videoThumbnails.video6,
      duration: '16 min watch',
      date: 'Dec 28, 2024',
      description: 'A guide to essential prenatal vitamins and supplements that support healthy fetal development and maternal wellbeing during pregnancy.',
      url: 'https://www.youtube.com/watch?v=BLtFIi6d9Xw',
      videoId: 'BLtFIi6d9Xw'
    }
  ];

  // Featured resources
  const featuredResources = [
    {
      id: 101,
      type: 'article',
      title: 'Optimizing Postpartum Care',
      category: 'postpartum',
      author: 'ACOG',
      thumbnail: Postdepression,
      readTime: '12 min read',
      date: 'Jan 20, 2025',
      description: 'Clinical guidance for healthcare providers on optimizing care for women in the postpartum period, emphasizing the importance of ongoing care.',
      featured: true,
      url: 'https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2018/05/optimizing-postpartum-care?utm'
    },
    {
      id: 102,
      type: 'video',
      title: 'Common Breastfeeding Problems and Solutions',
      category: 'breastfeeding',
      author: 'La Leche League',
      thumbnail: videoThumbnails.video3,
      duration: '22 min watch',
      date: 'Jan 18, 2025',
      description: 'Lactation consultants discuss common breastfeeding challenges and provide practical solutions for new mothers experiencing difficulties.',
      featured: true,
      url: 'https://www.youtube.com/watch?v=uGQeX2t6un8',
      videoId: 'uGQeX2t6un8'
    }
  ];

  // Filter content based on search, category, and tab
  const filteredContent = content.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    
    const matchesTab = activeTab === 'all' || item.type === activeTab;
    
    return matchesSearch && matchesCategory && matchesTab;
  });

  // Filter featured resources
  const filteredFeatured = featuredResources.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    
    const matchesTab = activeTab === 'all' || item.type === activeTab;
    
    return matchesSearch && matchesCategory && matchesTab;
  });

  // Content type icon mapping
  const getTypeIcon = (type) => {
    switch(type) {
      case 'video': return <Play className="w-5 h-5" />;
      case 'article': return <FileText className="w-5 h-5" />;
      case 'blog': return <BookOpen className="w-5 h-5" />;
      default: return null;
    }
  };

  // Modal for viewing content
  const Modal = ({ content, onClose }) => {
    if (!content) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold">{content.title}</h2>
              <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {content.type === 'video' ? (
              <div className="mb-4 relative pt-[56.25%] w-full">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${content.videoId}`}
                  title={content.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <div className="mb-4">
                <img src={content.thumbnail} alt={content.title} className="w-full h-64 object-cover rounded-lg" />
              </div>
            )}
            
            <div className="flex items-center gap-3 text-sm text-gray-600 mb-4">
              <span className="font-medium">{content.author}</span>
              <span>•</span>
              <span>{content.date}</span>
              <span>•</span>
              <span>{content.type === 'video' ? content.duration : content.readTime}</span>
              {content.featured && (
                <>
                  <span>•</span>
                  <span className="flex items-center text-yellow-500">
                    <Star className="w-4 h-4 mr-1" />
                    Featured
                  </span>
                </>
              )}
            </div>
            
            <p className="text-gray-700 mb-6">{content.description}</p>
            
            <div className="flex justify-between items-center mb-6">
              <button 
                onClick={onClose}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
              >
                Close
              </button>
              
              <a 
                href={content.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-200 transition flex items-center"
              >
                Visit Original Source
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <div className="w-[250px]">
        <Sidebar />
      </div>
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-purple-800">Maternal & Postpartum Health</h1>
          <p className="text-gray-600 mt-2">Resources and support for pregnancy, childbirth, and the postpartum journey</p>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 ml-[260px]">
        {/* Featured Resources Section */}
        {filteredFeatured.length > 0 && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-purple-800">
                Featured Resources
              </h2>
              <button className="text-purple-600 font-medium text-sm flex items-center">
                View all featured
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredFeatured.map(item => (
                <div 
                  key={item.id} 
                  className="rounded-lg overflow-hidden cursor-pointer shadow-lg transition hover:shadow-xl"
                  onClick={() => setModalContent(item)}
                >
                  <div className="relative h-full" style={{ minHeight: '280px' }}>
                    {/* Background image */}
                    <img 
                      src={item.thumbnail} 
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover" 
                    />
                    
                    {/* Purple gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-700 via-purple-500 to-transparent opacity-50"></div>
                    
                    {/* Add a dark gradient at the bottom for better text readability */}
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent opacity-30"></div>
                    
                    {/* Video play button for video content */}
                    {item.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="rounded-full bg-white bg-opacity-80 p-4">
                          <Play className="w-10 h-10 text-purple-700" />
                        </div>
                      </div>
                    )}
                    
                    {/* Content positioned at the bottom */}
                    <div className="absolute inset-x-0 bottom-0 p-6 text-white z-10">
                      {/* Content type badge */}
                      <div className="uppercase text-xs font-bold tracking-wider mb-2 bg-purple-600 bg-opacity-60 inline-block px-2 py-1 rounded-sm">
                        {item.type}
                      </div>
                      
                      {/* Title */}
                      <h3 className="font-bold text-2xl mb-2">
                        {item.title}
                      </h3>
                      
                      {/* Author and read time or duration */}
                      <div className="text-sm mb-2">
                        {item.author} • {item.type === 'video' ? item.duration : item.readTime}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Search Bar */}
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Search for postpartum care, breastfeeding resources, or pregnancy topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* Categories */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-2 pb-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  activeCategory === category.id 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* Content Type Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('all')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'all'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              All Content
            </button>
            <button
              onClick={() => setActiveTab('article')}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                activeTab === 'article'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FileText className="w-4 h-4 mr-2" />
              Articles
            </button>
            <button
              onClick={() => setActiveTab('blog')}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                activeTab === 'blog'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Blogs
            </button>
            <button
              onClick={() => setActiveTab('video')}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                activeTab === 'video'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Play className="w-4 h-4 mr-2" />
              Videos
            </button>
          </div>
        </div>
        
        {/* Content Grid */}
        {filteredContent.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContent.map(item => (
              <div 
                key={item.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer"
                onClick={() => setModalContent(item)}
              >
                <div className="relative">
                  <img 
                    src={item.thumbnail} 
                    alt={item.title} 
                    className="w-full h-48 object-cover"
                  />
                  {item.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                      <div className="rounded-full bg-white bg-opacity-80 p-3">
                        <Play className="w-8 h-8 text-purple-700" />
                      </div>
                    </div>
                  )}
                  <div className="absolute top-2 right-2 bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center text-xs text-gray-500 mb-2">
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">
                      {categories.find(cat => cat.id === item.category)?.name}
                    </span>
                    <span className="mx-2">•</span>
                    <span>{item.type === 'video' ? item.duration : item.readTime}</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-gray-800">{item.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">{item.date}</span>
                    <div className="flex items-center text-purple-600 text-sm font-medium">
                      {item.type === 'video' ? (
                        <span>Watch now</span>
                      ) : (
                        <span>Read more</span>
                      )}
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500 text-lg">No content found matching your criteria.</p>
            <button 
              onClick={() => {
                setActiveCategory('all');
                setActiveTab('all');
                setSearchQuery('');
              }}
              className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>
      
      {/* Modal */}
      <Modal content={modalContent} onClose={() => setModalContent(null)} />
    </div>
  );
};

export default Maternal;