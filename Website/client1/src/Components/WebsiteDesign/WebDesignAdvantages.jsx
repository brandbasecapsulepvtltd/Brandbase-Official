import React, { useState } from 'react';

const WebDesignAdvantages = () => {
  // State to track the active section
  const [activeTab, setActiveTab] = useState('conversion-rate');

  // JSON Data containing content for ALL tabs
  const data = {
    "overview": {
      id: "overview",
      title: "Overview",
      heading: "Overview",
      content: [
        {
          type: "text",
          value: "If you're unsure about the value of professional web design services, there are several factors to consider. For example, you could increase your conversion rates, competitiveness, and search ranking. All are results that could have a direct and positive impact on your profits, market share, and growth."
        },
        {
          type: "text",
          value: "Learn more about the specific benefits of web design services:"
        },
        {
          type: "list",
          items: [
            "1. Increase your conversion rate",
            "2. Optimize your user experience",
            "3. Maximize your competitive edge",
            "4. Improve your search rankings",
            "5. Enhance your digital marketing strategy"
          ]
        }
      ]
    },
    "conversion-rate": {
      id: "conversion-rate",
      title: "1. Increase your conversion rate",
      heading: "1. Increase your conversion rate",
      content: [
        {
          type: "text",
          value: "A conversion can range from a shopper purchasing a product to a user signing up for an <a href='#' class='text-blue-600 hover:underline'>email newsletter</a> — it's unique to your business and your goals. No matter your conversion goal, web design services can help."
        },
        {
          type: "text",
          value: "Why?"
        },
        {
          type: "text",
          value: "Today, most conversions relate or include an online interaction. For example, maybe you want to drive more in-store visits through <a href='#' class='text-blue-600 hover:underline'>local SEO</a> — for reference, <a href='#' class='text-blue-600 hover:underline'>80% of local searches convert</a> — which will likely involve users interacting with your website."
        },
        {
          type: "image",
          src: "https://via.placeholder.com/800x300/1e3a8a/ffffff?text=Conversion+Rate+Banner",
          alt: "Conversion Rate Banner"
        },
        {
          type: "text",
          value: "If you feature an outdated website with poor usability, it's impacting the first impression of users. That first impression shapes not only their opinion of your company but also their decision when it comes to visiting your location, purchasing your product, or joining your email newsletter."
        },
        {
          type: "text",
          value: "With a user-friendly website that's intuitive, as well as modern, you can create a positive first impression with consumers. That can make users more likely to convert, whether by stopping at your store the next day, calling your team for a quote, or becoming another subscriber of your email newsletter."
        }
      ]
    },
    "user-experience": {
      id: "user-experience",
      title: "2. Optimize your user experience",
      heading: "2. Optimize your user experience",
      content: [
        {
          type: "text",
          value: "User experience (UX) is critical to the success of your website. A professional design ensures that users can navigate your site easily and find the information they need without frustration."
        },
        {
          type: "image",
          src: "https://via.placeholder.com/800x300/10b981/ffffff?text=User+Experience+Banner",
          alt: "User Experience Banner"
        },
        {
          type: "text",
          value: "By optimizing page speed, navigation structure, and mobile responsiveness, you reduce bounce rates and keep potential customers engaged longer."
        }
      ]
    },
    "competitive-edge": {
      id: "competitive-edge",
      title: "3. Maximize your competitive edge",
      heading: "3. Maximize your competitive edge",
      content: [
        {
          type: "text",
          value: "In a crowded market, standing out is essential. A custom web design sets you apart from competitors using generic templates."
        },
        {
          type: "image",
          src: "https://via.placeholder.com/800x300/f59e0b/ffffff?text=Competitive+Edge+Banner",
          alt: "Competitive Edge Banner"
        },
        {
          type: "text",
          value: "Your website is often the first interaction a customer has with your brand. Make sure it highlights your unique value proposition effectively."
        }
      ]
    },
    "search-rankings": {
      id: "search-rankings",
      title: "4. Improve your search rankings",
      heading: "4. Improve your search rankings",
      content: [
        {
          type: "text",
          value: "Whether they're searching on their tablet, smartphone, or desktop, users rely on search to find what they're looking for, from services to products. That's why Google processes <a href='#' class='text-blue-600 hover:underline'>more than two trillion searches a year</a>, and why <a href='#' class='text-blue-600 hover:underline'>80% of users</a> turn to search when they need something."
        },
        {
          type: "text",
          value: "If your website doesn't rank on the first page of search results, however, it's difficult for your company to connect with those consumers. That's why <a href='#' class='text-blue-600 hover:underline'>SEO</a> is an essential part of <a href='#' class='text-blue-600 hover:underline'>web marketing</a> — you need your website to rank to drive conversions, sales, and subscribers."
        },
        {
          type: "image",
          src: "https://via.placeholder.com/800x300/3b82f6/ffffff?text=Today,+80%+of+users+turn+to+search",
          alt: "SEO Search Ranking Banner"
        },
        {
          type: "text",
          value: "With best-in-class SEO services, as well as professional web design services, you can ensure your website ranks for keywords or search terms relevant to your business. Plus, you make sure your site provides the best user experience possible."
        },
        {
          type: "text",
          value: "For example, if you provide landscape services in Minneapolis, Minnesota, you may want to rank for the keyword, 'landscape design minneapolis,' or, 'landscaping minneapolis.' Depending on your strategy, you would probably create a webpage optimized for this keyword."
        },
        {
          type: "text",
          value: "With our design strategies, as well as optimization tactics, it's likely this webpage would rank on the first page of search results. That allows your company to reach high-value users in your target audience, transforming them from leads to customers."
        }
      ]
    },
    "digital-marketing": {
      id: "digital-marketing",
      title: "5. Enhance your digital marketing strategy",
      heading: "5. Enhance your digital marketing strategy",
      content: [
        {
          type: "text",
          value: "Your website is the foundation of your digital marketing strategy. Whether it's PPC, social media marketing, or email campaigns, they all lead back to your website."
        },
        {
          type: "image",
          src: "https://via.placeholder.com/800x300/8b5cf6/ffffff?text=Digital+Marketing+Banner",
          alt: "Digital Marketing Banner"
        },
        {
          type: "text",
          value: "A cohesive design ensures that the transition from ad to landing page is seamless, improving ad quality scores and conversion rates."
        }
      ]
    }
  };

  // Helper function to render content based on type
  const renderContent = (item, index) => {
    switch (item.type) {
      case 'text':
        return (
          <p 
            key={index} 
            className="text-gray-700 leading-relaxed mb-6"
            dangerouslySetInnerHTML={{ __html: item.value }}
          />
        );
      case 'image':
        return (
          <div key={index} className="mb-8">
            <img 
              src={item.src} 
              alt={item.alt} 
              className="w-full h-auto rounded-lg shadow-sm"
            />
          </div>
        );
      case 'list':
        return (
          <ul key={index} className="space-y-4 mb-6 pl-4">
             {item.items.map((listItem, listIndex) => (
               <li key={listIndex} className="text-orange-600 font-medium cursor-pointer hover:underline">
                 {listItem}
               </li>
             ))}
          </ul>
        );
      default:
        return null;
    }
  };

  const activeData = data[activeTab];

  return (
    <div className="bg-white p-8 font-sans min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Heading */}
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 text-center mb-12">
          The advantages of web design services
        </h1>

        <div className="flex flex-col md:flex-row gap-12">
          
          {/* Sidebar Navigation */}
          <div className="w-full md:w-1/4">
            <ul className="border-t border-gray-200">
              {Object.values(data).map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`block w-full text-left py-4 text-lg border-b border-gray-200 transition-colors duration-200 ${
                      activeTab === item.id
                        ? 'text-orange-600 font-bold'
                        : 'text-gray-700 hover:text-orange-600'
                    }`}
                  >
                    {item.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Dynamic Content Area */}
          <div className="w-full md:w-3/4">
            <h2 className="text-2xl md:text-3xl font-bold text-orange-600 mb-6">
              {activeData.heading}
            </h2>
            
            <div className="animate-fade-in">
              {activeData.content.map((item, index) => renderContent(item, index))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default WebDesignAdvantages;