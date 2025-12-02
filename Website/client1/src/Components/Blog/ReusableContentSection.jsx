import React from 'react';

// The provided data structure (re-inserting the JSON defined above)
const articlesData = [
  {
    "category": "Business credit cards",
    "articles": [
      {
        "title": "How to get a business credit card with an EIN only",
        "description": "Don't have a Social Security number? You can still apply and get an EIN, but your options will be limited. Here's what you need to know.",
        // Placeholder for the first credit card image
        "imageUrl": "https://ramp.com/assets/images/placeholder/cc-1.webp" 
      },
      {
        "title": "What an LLC should look for in a business credit card",
        "description": "Business credit cards offer LLC owners a way to separate business and personal expenses, and build business credit. Here's what LLCs should look for in a card.",
        // Placeholder for the second credit card image
        "imageUrl": "https://ramp.com/assets/images/placeholder/cc-2.webp"
      },
      {
        "title": "Which high-limit business credit cards are best for your business in 2025",
        "description": "The best high-limit business credit cards combine generous credit lines and perks to help you cut costs in expense management. See our top picks.",
        // Placeholder for the third credit card image
        "imageUrl": "https://ramp.com/assets/images/placeholder/cc-3.webp"
      }
    ]
  },
  {
    "category": "Expense management",
    "articles": [
      {
        "title": "8 best corporate credit card expense management software platforms in 2025",
        "description": "The right expense management software can save your company time and money. See our picks for the top tools and tips for choosing the best one.",
        "imageUrl": "https://ramp.com/assets/images/placeholder/exp-1.webp"
      },
      {
        "title": "The best business expense tracking apps and tools of 2025",
        "description": "The best business expense tracking apps and platforms balance a strong feature set with ease of use and cost-effectiveness. Learn more about our top 7 picks.",
        "imageUrl": "https://ramp.com/assets/images/placeholder/exp-2.webp"
      },
      {
        "title": "7 best expense management software in November 2025",
        "description": "Expense management software helps streamline your finance operations. See our picks for today's best options, plus tips on how to make the right choice.",
        "imageUrl": "https://ramp.com/assets/images/placeholder/exp-3.webp"
      }
    ]
  },
  {
    "category": "Accounts payable",
    "articles": [
      {
        "title": "What is an ACH payment? Benefits, costs, and timing",
        "description": "Learn what an ACH payment is, how it works, how much it costs, and how long it takes to process, and whether ACH transfers are right for your business.",
        "imageUrl": "https://ramp.com/assets/images/placeholder/ap-1.webp"
      },
      {
        "title": "Top BILL.com competitors & stronger alternatives for AP automation in December 2025",
        "description": "BILL (Bill.com) provides AP automation solutions, but they aren't the only ones on the market. We review the top 6 BILL alternatives & competitors for modern AP.",
        "imageUrl": "https://ramp.com/assets/images/placeholder/ap-2.webp"
      },
      {
        "title": "How to build an ideal accounts payable process and team",
        "description": "The accounts payable approved process is key to keeping business operations running smoothly and on time. We outline how to build your ideal AP process in this guide.",
        "imageUrl": "https://ramp.com/assets/images/placeholder/ap-3.webp"
      }
    ]
  },
  {
    "category": "AI",
    "articles": [
      {
        "title": "Ramp agents: Let finance teams do finance",
        "description": "Announcing our first set of AI agents, built and trained specifically for finance to help teams get work like a thousand of them—around the clock.",
        "imageUrl": "https://ramp.com/assets/images/placeholder/ai-1.webp"
      },
      {
        "title": "The CFO AI digest: July 3",
        "description": "As the volume of AI news explodes each week, it can get hard to keep track. Ramp’s CFO AI digest cuts through all the noise and spotlights what counts for finance teams. Th...",
        "imageUrl": "https://ramp.com/assets/images/placeholder/ai-2.webp"
      },
      {
        "title": "Applied AI in finance: 4 tactics to automate advanced reporting",
        "description": "With the rise of large language models, you can use generative AI to create financial reports and models for them to use. We explore four applied AI tactics.",
        "imageUrl": "https://ramp.com/assets/images/placeholder/ai-3.webp"
      }
    ]
  }
];

// Component for a single article card
const ArticleCard = ({ title, description, imageUrl }) => (
  <a href="#" className="group block h-full">
    <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden mb-4">
      <img
        src={imageUrl}
        alt={title}
        className="object-cover w-full h-full"
        loading="lazy"
        // Note: The original images have a subtle hover effect/color shift, which is omitted for simplicity.
      />
    </div>
    <div className="pt-2">
      <p className="text-xs font-semibold text-gray-500 mb-1">ARTICLE</p>
      <h3 className="text-base font-bold mb-1 leading-snug text-gray-900 group-hover:text-indigo-600 transition">
        {title}
      </h3>
      <p className="text-sm text-gray-700">
        {description}
      </p>
    </div>
  </a>
);

// Main component to render the entire section
const ReusableContentSection = () => {
  return (
    <div className="bg-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {articlesData.map((section, index) => (
          <div key={section.category} className={`${index > 0 ? 'mt-12 md:mt-20' : ''}`}>
            
            {/* Section Header */}
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
                {section.category}
              </h2>
              <a href="#" className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition">
                View all
              </a>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {section.articles.map((article, articleIndex) => (
                <ArticleCard
                  key={articleIndex}
                  title={article.title}
                  description={article.description}
                  imageUrl={article.imageUrl}
                />
              ))}
            </div>
            
            {/* Add a horizontal line separator visually between the main sections */}
            {index < articlesData.length - 1 && (
                <hr className="mt-12 md:mt-20 border-gray-200" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReusableContentSection;