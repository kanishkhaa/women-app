
import React, { useState } from "react";
import {
  Search,
  Play,
  FileText,
  BookOpen,
  ChevronRight,
  X,
  Star,
  ArrowRight,
} from "lucide-react";
import s1 from "../assets/SexualHealth/s1.png";
import s2 from "../assets/SexualHealth/s2.png";
import s3 from "../assets/SexualHealth/s3.png";
import d1 from "../assets/SexualHealth/d1.png";
import d2 from "../assets/SexualHealth/d2.png";



const WomensHealthPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [modalContent, setModalContent] = useState(null);


  // Categories for women's health issues
  const categories = [
    { "id": "all", "name": "All Topics" },
    { "id": "sexual-intimate-health", "name": "Sexual & Intimate Health" },
    { "id": "dyspareunia", "name": "Dyspareunia (Pain During Sex)" },
    { "id": "low-libido", "name": "Low Libido & Sexual Dysfunction" },
];

  // First declare the content array without thumbnails
  const content = [
    {
      "id": 23,
      "type": "video",
      "title": "5 Intimate Hygiene Tips For Women - Women's Sexual Health Advice By Dr. Seema Sharma Gynecologist",
      "category": "sexual-intimate-health",
      "author": "Dr. Seema Sharma",
      "duration": "6:30",
      "date": "2021-07-15",
      "description": "Dr. Seema Sharma, a gynecologist, shares five essential hygiene tips to maintain women’s intimate health and promote sexual wellness.",
      "url": "https://youtu.be/ayn4f2HPE5A",
      "videoId": "ayn4f2HPE5A"
    },
    {
      "id": 24,
      "type": "video",
      "title": "8 Foods for a Happy and Healthy Vagina! | Sex Smarts Ep. 2 | soothingsista",
      "category": "sexual-intimate-health",
      "author": "soothingsista",
      "duration": "5:45",
      "date": "2019-09-20",
      "description": "Explores eight foods that support vaginal health, contributing to overall sexual and intimate wellness, in an engaging series format.",
      "url": "https://youtu.be/Nuusx7KjjnQ",
      "videoId": "Nuusx7KjjnQ"
    },
    {
      "id": 25,
      "type": "video",
      "title": "Watch this before your first time | ft. Dr. Tanushree Panday",
      "category": "sexual-intimate-health",
      "author": "Dr. Tanushree Panday",
      "duration": "8:15",
      "date": "2022-04-10",
      "description": "Dr. Tanushree Panday provides advice for women preparing for their first sexual experience, focusing on health and comfort.",
      "url": "https://youtu.be/eVe1_177riU",
      "videoId": "eVe1_177riU"
    },
    {
      "id": 26,
      "type": "video",
      "title": "How does the female body change after sex? | Dr. Riddhima Shetty",
      "category": "sexual-intimate-health",
      "author": "Dr. Riddhima Shetty",
      "duration": "4:50",
      "date": "2023-02-05",
      "description": "Dr. Riddhima Shetty explains the physical changes in a woman’s body after sexual activity, addressing intimate health impacts.",
      "url": "https://youtu.be/YPDqA6uWwEE",
      "videoId": "YPDqA6uWwEE"
    },
    {
      "id": 27,
      "type": "article",
      "title": "Intimate Wellness for Women: What is Non-Surgical Vaginal Rejuvenation?",
      "category": "sexual-intimate-health",
      "author": "The Health Site",
      "date": "2023-06-20",
      "description": "An article exploring non-surgical vaginal rejuvenation options for women’s intimate wellness and sexual health.",
      "url": "https://www.thehealthsite.com/diseases-conditions/intimate-wellness-for-women-what-is-non-surgical-vaginal-rejuvenation-1189589/",
      "imageUrl": s1
    },
    {
      "id": 28,
      "type": "article",
      "title": "Intimate Health",
      "category": "sexual-intimate-health",
      "author": "Health Shots",
      "date": "2022-11-10",
      "description": "A guide to maintaining intimate health, covering hygiene, sexual wellness, and common concerns for women.",
      "url": "https://www.healthshots.com/intimate-health/",
      "imageUrl": s2
    },
    {
      "id": 29,
      "type": "article",
      "title": "Women’s Health and Sex",
      "category": "sexual-intimate-health",
      "author": "Healthline",
      "date": "2021-08-25",
      "description": "An overview of how sexual health intersects with women’s overall wellness, including tips for a healthy intimate life.",
      "url": "https://www.healthline.com/health/womens-health-sex",
      "imageUrl": s3
    },

    // Dyspareunia
    {
      "id": 30,
      "type": "video",
      "title": "Dyspareunia Explained - SheCares",
      "category": "dyspareunia",
      "author": "SheCares",
      "duration": "3:20",
      "date": "2020-05-15",
      "description": "A concise explanation of dyspareunia, detailing causes of painful intercourse and potential solutions for women.",
      "url": "https://youtu.be/2NjNT-fn94g",
      "videoId": "2NjNT-fn94g"
    },
    {
      "id": 31,
      "type": "video",
      "title": "Painful Intercourse || Dyspareunia || Fertility Tips || Dr Chekuri Suvarchala || Ziva Fertility",
      "category": "dyspareunia",
      "author": "Ziva Fertility",
      "duration": "6:10",
      "date": "2021-09-30",
      "description": "Dr. Chekuri Suvarchala discusses dyspareunia, its impact on fertility, and tips to address painful intercourse.",
      "url": "https://youtu.be/r6p8dRxhvp4",
      "videoId": "r6p8dRxhvp4"
    },
    {
      "id": 32,
      "type": "video",
      "title": "Dyspareunia (Painful Sex) in the Premenopausal Period",
      "category": "dyspareunia",
      "author": "Unknown", // Author not specified; can update if known
      "duration": "5:00",
      "date": "2022-07-20",
      "description": "Explores dyspareunia in premenopausal women, focusing on causes and management strategies for painful sex.",
      "url": "https://youtu.be/FAis_RVsdf4",
      "videoId": "FAis_RVsdf4"
    },
    {
      "id": 33,
      "type": "article",
      "title": "Painful Intercourse (Dyspareunia) - Symptoms & Causes",
      "category": "dyspareunia",
      "author": "Mayo Clinic Staff",
      "date": "2023-03-15",
      "description": "A detailed look at dyspareunia, its symptoms, underlying causes, and when to seek medical help.",
      "url": "https://www.mayoclinic.org/diseases-conditions/painful-intercourse/symptoms-causes/syc-20375967",
      "imageUrl": d1
    },
    {
      "id": 34,
      "type": "article",
      "title": "Dyspareunia: Painful Sex for Women",
      "category": "dyspareunia",
      "author": "Healthline",
      "date": "2022-01-10",
      "description": "An article explaining dyspareunia, its effects on women, and treatment options to alleviate pain during sex.",
      "url": "https://www.healthline.com/health/dyspareunia",
      "imageUrl": d2
    },

    // Low Libido & Sexual Dysfunction
    {
      "id": 35,
      "type": "video",
      "title": "Low Sex Drive? Female Sexual Dysfunction | Explained by an OBGYN",
      "category": "low-libido",
      "author": "Mama Doctor Jones",
      "duration": "10:25",
      "date": "2021-11-05",
      "description": "An OBGYN explains female sexual dysfunction, including low libido, with insights into causes and treatments.",
      "url": "https://youtu.be/v_iQX_JjUfY",
      "videoId": "v_iQX_JjUfY"
    },
    {
      "id": 36,
      "type": "video",
      "title": "5 Common Sex Problems Women Face [ Hindi ] || Female Sexual Dysfunction - Chapter 1 | Practo",
      "category": "low-libido",
      "author": "Practo",
      "duration": "7:40",
      "date": "2020-08-15",
      "description": "In Hindi, this video covers five common sexual problems in women, including low libido, with practical advice.",
      "url": "https://youtu.be/Ux0WOrT6jNs",
      "videoId": "Ux0WOrT6jNs"
    },
    {
      "id": 37,
      "type": "video",
      "title": "Hyperactive Sexual Disorder vs Sexual Aversion Disorder",
      "category": "low-libido",
      "author": "Unknown", // Author not specified; can update if known
      "duration": "6:00",
      "date": "2022-06-25",
      "description": "Compares hyperactive sexual desire and sexual aversion disorder, addressing extremes of libido issues in women.",
      "url": "https://youtu.be/JzbH3uIuKqw",
      "videoId": "JzbH3uIuKqw"
    },
    {
      "id": 38,
      "type": "video",
      "title": "HSDD in Women - HSDD: Low Sexual Desire in Women",
      "category": "low-libido",
      "author": "Unknown", // Author not specified; can update if known
      "duration": "4:30",
      "date": "2023-04-10",
      "description": "Focuses on Hypoactive Sexual Desire Disorder (HSDD), a common cause of low libido in women, with management tips.",
      "url": "https://youtu.be/m5eAMU6Gvz4",
      "videoId": "m5eAMU6Gvz4"
    }
];

  // Filter content based on search, category, and tab
  const filteredContent = content.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      activeCategory === "all" || item.category === activeCategory;

    const matchesTab = activeTab === "all" || item.type === activeTab;

    return matchesSearch && matchesCategory && matchesTab;
  });
  const featuredResources = [
    {
      "id": 23,
      "type": "video",
      "title": "5 Intimate Hygiene Tips For Women - Women's Sexual Health Advice By Dr. Seema Sharma Gynecologist",
      "category": "sexual-intimate-health",
      "author": "Dr. Seema Sharma",
      "duration": "6:30",
      "date": "2021-07-15",
      "description": "Dr. Seema Sharma, a gynecologist, shares five essential hygiene tips to maintain women’s intimate health and promote sexual wellness.",
      "url": "https://youtu.be/ayn4f2HPE5A",
      "videoId": "ayn4f2HPE5A"
    },
    {
      "id": 24,
      "type": "video",
      "title": "8 Foods for a Happy and Healthy Vagina! | Sex Smarts Ep. 2 | soothingsista",
      "category": "sexual-intimate-health",
      "author": "soothingsista",
      "duration": "5:45",
      "date": "2019-09-20",
      "description": "Explores eight foods that support vaginal health, contributing to overall sexual and intimate wellness, in an engaging series format.",
      "url": "https://youtu.be/Nuusx7KjjnQ",
      "videoId": "Nuusx7KjjnQ"
    },
  ];

  function generateAllThumbnails(contents) {
    const thumbnails = {};
  
    contents.forEach((item) => {
      const key = `${item.type}${item.id}`;
      
      // Handle different content types
      if (item.type === 'video' && item.videoId) {
        thumbnails[key] = `https://img.youtube.com/vi/${item.videoId}/maxresdefault.jpg`;
      } else if (item.type === 'blog' && item.imageUrl) {
        thumbnails[key] = item.imageUrl;
      } else if (item.type === 'article' && item.imageUrl) {
        thumbnails[key] = item.imageUrl;
      }
    });
  
    return thumbnails;
  }
  
  // Generate the thumbnails
  const allThumbnails = generateAllThumbnails(content);
  
  // Now add the thumbnails to the content array
  content.forEach((item) => {
    if (item.id && item.type) {
      item.thumbnail = allThumbnails[`${item.type}${item.id}`];
    }
  });
  // Filter featured resources
  const filteredFeatured = featuredResources.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      activeCategory === "all" || item.category === activeCategory;

    const matchesTab = activeTab === "all" || item.type === activeTab;

    return matchesSearch && matchesCategory && matchesTab;
  });

  // Content type icon mapping
  const getTypeIcon = (type) => {
    switch (type) {
      case "video":
        return <Play className="w-5 h-5" />;
      case "article":
        return <FileText className="w-5 h-5" />;
      case "blog":
        return <BookOpen className="w-5 h-5" />;
      default:
        return null;
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
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {content.type === "video" ? (
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
                <img
                  src={content[0].thumbnail}
                  alt={content[0].title}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            )}

            <div className="flex items-center gap-3 text-sm text-gray-600 mb-4">
              <span className="font-medium">{content.author}</span>
              <span>•</span>
              <span>{content.date}</span>
              <span>•</span>
              <span>
                {content.type === "video" ? content.duration : content.readTime}
              </span>
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
      <div className="w-[250px]"></div>
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-purple-800">
            Women's Health & Wellness
          </h1>
          <p className="text-gray-600 mt-2">
            Natural remedies and holistic approaches for women's wellbeing
          </p>
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
              {filteredFeatured.map((item) => (
                <div
                  key={item.id}
                  className="rounded-lg overflow-hidden cursor-pointer shadow-lg transition hover:shadow-xl"
                  onClick={() => setModalContent(item)}
                >
                  <div
                    className="relative h-full"
                    style={{ minHeight: "280px" }}
                  >
                    {/* Background image */}
                    <img
                      src={`https://img.youtube.com/vi/${item.videoId}/maxresdefault.jpg`}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />

                    {/* Purple gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-700 via-purple-500 to-transparent opacity-50"></div>

                    {/* Add a dark gradient at the bottom for better text readability */}
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent opacity-30"></div>

                    {/* Video play button for video content */}
                    {item.type === "video" && (
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
                      <h3 className="font-bold text-2xl mb-2">{item.title}</h3>

                      {/* Author and read time or duration */}
                      <div className="text-sm mb-2">
                        {item.author} •{" "}
                        {item.type === "video" ? item.duration : item.readTime}
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
            placeholder="Search for remedies, health topics, or specific concerns..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Categories */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-2 pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  activeCategory === category.id
                    ? "bg-purple-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
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
              onClick={() => setActiveTab("all")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "all"
                  ? "border-purple-600 text-purple-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              All Content
            </button>
            <button
              onClick={() => setActiveTab("article")}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                activeTab === "article"
                  ? "border-purple-600 text-purple-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <FileText className="w-4 h-4 mr-2" />
              Articles
            </button>
            <button
              onClick={() => setActiveTab("blog")}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                activeTab === "blog"
                  ? "border-purple-600 text-purple-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Blogs
            </button>
            <button
              onClick={() => setActiveTab("video")}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                activeTab === "video"
                  ? "border-purple-600 text-purple-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
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
            {filteredContent.map((item) => (
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
                  {item.type === "video" && (
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
                      {categories.find((cat) => cat.id === item.category)?.name}
                    </span>
                    <span className="mx-2">•</span>
                    <span>
                      {item.type === "video" ? item.duration : item.readTime}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-gray-800">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">{item.date}</span>
                    <div className="flex items-center text-purple-600 text-sm font-medium">
                      {item.type === "video" ? (
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
            <p className="text-gray-500 text-lg">
              No content found matching your criteria.
            </p>
            <button
              onClick={() => {
                setActiveCategory("all");
                setActiveTab("all");
                setSearchQuery("");
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

export default WomensHealthPage;
