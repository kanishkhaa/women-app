import React, { useState } from 'react';
import { Search, Play, FileText, BookOpen, ChevronRight, X, Star, ArrowRight } from 'lucide-react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Cancers  from '../../assets/cancer.jpg';
import Breast from '../../assets/breast.jpeg';
import Lung from '../../assets/lung.jpg';
import Immuno from '../../assets/immuno.jpg';
import  Skin from '../../assets/skin.jpg';
import Collo from  '../../assets/collo.webp';

const Cancer = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [modalContent, setModalContent] = useState(null);

  const placeholderImage = (width, height) => {
    return `/api/placeholder/${width}/${height}`;
  };


  // Categories for cancer health issues
  const categories = [
    { id: 'all', name: 'All Topics' },
    { id: 'breast', name: 'Breast Cancer' },
    { id: 'lung', name: 'Lung Cancer' },
    { id: 'colon', name: 'Colorectal Cancer' },
    { id: 'prostate', name: 'Prostate Cancer' },
    { id: 'skin', name: 'Skin Cancer' },
    { id: 'treatment', name: 'Treatment Options' },
    { id: 'prevention', name: 'Prevention' },
    { id: 'support', name: 'Support Resources' }
  ];
  const videoThumbnails = {
    video1: "https://img.youtube.com/vi/Tc1CO9D_kMs/maxresdefault.jpg",
    video2: "https://img.youtube.com/vi/H46Nhq62oTQ/maxresdefault.jpg",
    video3: "https://img.youtube.com/vi/v93bI-LBSAA/maxresdefault.jpg",
    video4: "https://img.youtube.com/vi/LrfE6JUwIms/maxresdefault.jpg",
    video5: "https://img.youtube.com/vi/olXAnrFbxkI/maxresdefault.jpg",
    video6: "https://img.youtube.com/vi/2DDGUOcPZO0/maxresdefault.jpg"
  };

  const content = [
    {
      id: 1,
      type: 'article',
      title: 'Understanding Cancer Staging and Grading',
      category: 'treatment',
      author: 'American Cancer Society',
      thumbnail: Cancers,
      readTime: '10 min read',
      date: 'Feb 15, 2025',
      description: 'Learn about how cancer is staged and graded, what these classifications mean for treatment options, and how they can affect prognosis.',
      url: 'https://www.cancer.org/treatment/understanding-your-diagnosis/staging.html'
    },
    {
      id: 2,
      type: 'article',
      title: 'Breast Cancer Risk Factors and Prevention',
      category: 'breast',
      author: 'Mayo Clinic',
      thumbnail: Breast,
      readTime: '12 min read',
      date: 'Feb 8, 2025',
      description: 'A comprehensive overview of known risk factors for breast cancer and evidence-based prevention strategies that may reduce your risk.',
      url: 'https://www.mayoclinic.org/diseases-conditions/breast-cancer/symptoms-causes/syc-20352470'
    },
    {
      id: 3,
      type: 'blog',
      title: 'Living with Lung Cancer: A Patient\'s Journey',
      category: 'lung',
      author: 'Cancer Research UK',
      thumbnail: Lung,
      readTime: '8 min read',
      date: 'Jan 30, 2025',
      description: 'A personal account of diagnosis, treatment, and living with lung cancer, offering insights and support for patients and families.',
      url: 'https://www.cancerresearchuk.org/about-cancer/lung-cancer/living-with'
    },
    {
      id: 4,
      type: 'article',
      title: 'Advances in Immunotherapy for Cancer Treatment',
      category: 'treatment',
      author: 'National Cancer Institute',
      thumbnail: Immuno,
      readTime: '15 min read',
      date: 'Jan 25, 2025',
      description: 'Explore the latest developments in cancer immunotherapy, including checkpoint inhibitors, CAR T-cell therapy, and cancer vaccines.',
      url: 'https://www.cancer.gov/about-cancer/treatment/types/immunotherapy'
    },
    {
      id: 5,
      type: 'blog',
      title: 'Sun Safety: Preventing Skin Cancer',
      category: 'skin',
      author: 'Skin Cancer Foundation',
      thumbnail: Skin,
      readTime: '7 min read',
      date: 'Jan 20, 2025',
      description: 'Essential guidelines for protecting your skin from harmful UV radiation and reducing your risk of developing skin cancer.',
      url: 'https://www.skincancer.org/skin-cancer-prevention/'
    },
    {
      id: 6,
      type: 'article',
      title: 'Colorectal Cancer Screening Guidelines',
      category: 'colon',
      author: 'CDC',
      thumbnail: Collo,
      readTime: '9 min read',
      date: 'Jan 12, 2025',
      description: 'Current recommendations for colorectal cancer screening, including when to start, which tests to consider, and screening frequency.',
      url: 'https://www.cdc.gov/cancer/colorectal/basic_info/screening/'
    },
    // Updated YouTube videos with your provided links
    {
      id: 7,
      type: 'video',
      title: 'Cancer: Unraveling the Emperor of All Maladies',
      category: 'treatment',
      author: 'PBS',
      thumbnail: videoThumbnails.video1,
      duration: '10 min watch',
      date: 'Feb 12, 2025',
      description: 'A comprehensive overview of cancer history, modern research advancements, and the ongoing scientific battle against this complex disease.',
      url: 'https://www.youtube.com/watch?v=Tc1CO9D_kMs',
      videoId: 'Tc1CO9D_kMs'
    },
    {
      id: 8,
      type: 'video',
      title: 'Understanding Cancer Immunotherapy Breakthroughs',
      category: 'treatment',
      author: 'Mayo Clinic',
      thumbnail: videoThumbnails.video2,
      duration: '8 min watch',
      date: 'Feb 5, 2025',
      description: 'Experts explain how the revolutionary approach of immunotherapy is transforming cancer treatment by harnessing the body\'s own immune system.',
      url: 'https://www.youtube.com/watch?v=H46Nhq62oTQ',
      videoId: 'H46Nhq62oTQ'
    },
    {
      id: 9,
      type: 'video',
      title: 'Fallopian Tube Cancer',
      category: 'treatment',
      author: 'KIMS Cuddles',
      thumbnail: videoThumbnails.video3,
      duration: '15 min watch',
      date: 'Jan 28, 2025',
      description: 'Fallopian tube cancer starts in the fallopian tubes, which connect a womans ovaries to their uterus.',
      url: 'https://www.youtube.com/watch?v=v93bI-LBSAA',
      videoId: '98c4iLrTVZI'
    },
    {
      id: 10,
      type: 'video',
      title: 'Self-Breast Examination',
      category: 'prevention',
      author: 'Harvard Medical School',
      thumbnail: videoThumbnails.video4,
      duration: '12 min watch',
      date: 'Jan 15, 2025',
      description: 'Medical experts discuss evidence-based lifestyle modifications that can significantly reduce cancer risk, including diet, exercise, and environmental factors.',
      url: 'https://www.youtube.com/watch?v=LrfE6JUwIms',
      videoId: 'LrfE6JUwIms'
    },
    {
      id: 11,
      type: 'video',
      title: 'Precision Medicine: Targeting Cancer at the Genetic Level',
      category: 'treatment',
      author: 'NIH Research',
      thumbnail: videoThumbnails.video5,
      duration: '18 min watch',
      date: 'Jan 10, 2025',
      description: 'An exploration of how genetic sequencing and targeted therapies are revolutionizing personalized cancer treatment approaches.',
      url: 'https://www.youtube.com/watch?v=olXAnrFbxkI',
      videoId: 'olXAnrFbxkI'
    },
    {
      id: 12,
      type: 'video',
      title: 'Cancer Screening Guidelines: What You Need to Know',
      category: 'prevention',
      author: 'Memorial Sloan Kettering',
      thumbnail: videoThumbnails.video6,
      duration: '14 min watch',
      date: 'Jan 5, 2025',
      description: 'A comprehensive guide to current cancer screening recommendations for different types of cancer, helping you understand when and how to get tested.',
      url: 'https://www.youtube.com/watch?v=2DDGUOcPZO0',
      videoId: '2DDGUOcPZO0'
    }
  ];

  // Featured resources - Updated the video with one of your provided links
  const featuredResources = [
    {
      id: 101,
      type: 'article',
      title: 'Cancer Immunotherapy: A Revolutionary Approach',
      category: 'treatment',
      author: 'National Cancer Institute',
      thumbnail: Immuno,
      readTime: '15 min read',
      date: 'Feb 10, 2025',
      description: 'Explore how immunotherapy is transforming cancer treatment by harnessing the power of the body\'s immune system to fight cancer cells.',
      featured: true,
      url: 'https://www.cancer.gov/about-cancer/treatment/types/immunotherapy'
    },
    {
      id: 102,
      type: 'video',
      title: 'Coping with Cancer',
      category: 'treatment',
      author: 'Mayo Clinic',
      thumbnail: videoThumbnails.video2,
      duration: '8 min watch',
      date: 'Jan 22, 2025',
      description: 'Experts explain how the revolutionary approach of immunotherapy is transforming cancer treatment by harnessing the body\'s own immune system.',
      featured: true,
      url: 'https://www.youtube.com/watch?v=H46Nhq62oTQ',
      videoId: 'H46Nhq62oTQ'
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
          <h1 className="text-3xl font-bold text-purple-800">Cancer Information & Resources</h1>
          <p className="text-gray-600 mt-2">Educational resources, support information, and treatment options for cancer</p>
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
            placeholder="Search for cancer types, treatment options, or prevention resources..."
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

export default Cancer;