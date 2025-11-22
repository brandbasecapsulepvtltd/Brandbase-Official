import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Share2, Clock, Calendar, User, ArrowLeft, Bookmark, Eye } from 'lucide-react';

/* ---------------------------- JSON Blog Data ---------------------------- */

const blogData = {
  "ai-in-digital-marketing": {
    title: "The Future of AI in Digital Marketing",
    author: "Sarah Johnson",
    date: "January 15, 2024",
    category: "Technology",
    readTime: "8 min read",
    views: "2.4K",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop",
    featured: true,
    tags: ["AI", "Marketing", "Technology", "Future Trends"],
    content: [
      {
        type: "paragraph",
        text: "Artificial Intelligence is no longer a futuristic concept—it's actively reshaping how brands connect with their audiences. From personalized content recommendations to predictive analytics, AI is becoming the backbone of modern digital marketing strategies."
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop",
        alt: "AI in Marketing",
        caption: "AI-powered analytics dashboard for marketing insights"
      },
      {
        type: "quote",
        text: "AI won't replace marketers, but marketers who use AI will replace those who don't."
      },
      {
        type: "heading",
        text: "Personalized Customer Experiences"
      },
      {
        type: "paragraph",
        text: "AI algorithms analyze user behavior to deliver hyper-personalized content, product recommendations, and marketing messages at scale."
      },
      {
        type: "list",
        items: [
          "Behavioral analysis for content personalization",
          "Dynamic pricing optimization",
          "Personalized email marketing campaigns",
          "AI-powered chat assistants for customer service"
        ]
      },
      {
        type: "stats",
        data: [
          { value: "78%", label: "of marketers say AI increases personalization" },
          { value: "3.5x", label: "higher conversion rates with AI personalization" },
          { value: "64%", label: "reduction in customer acquisition costs" }
        ]
      },
      {
        type: "heading",
        text: "Content Creation and Optimization"
      },
      {
        type: "paragraph",
        text: "AI tools are revolutionizing content creation, from generating ideas to optimizing existing content for better performance."
      },
      {
        type: "table",
        data: [
          { "AI Tool Type": "Content Generation", "Use Case": "Blog ideas, social media posts", "Example": "GPT-4, Jasper AI" },
          { "AI Tool Type": "SEO Optimization", "Use Case": "Keyword research, content grading", "Example": "Surfer SEO, Clearscope" },
          { "AI Tool Type": "Visual Content", "Use Case": "Image generation, video editing", "Example": "DALL-E, Runway ML" }
        ]
      },
      {
        type: "tip",
        text: "Start small with AI implementation. Focus on one area like content optimization or customer segmentation before expanding."
      }
    ],
    authorBio: {
      img: "https://randomuser.me/api/portraits/women/44.jpg",
      name: "Sarah Johnson",
      bio: "AI Marketing Specialist with 8+ years of experience helping brands leverage artificial intelligence for growth. Featured in Forbes and TechCrunch.",
      social: {
        twitter: "#",
        linkedin: "#",
        website: "#"
      }
    }
  },
  "content-strategy-2024": {
    title: "Content Strategy Trends for 2024",
    author: "Mike Chen",
    date: "February 3, 2024",
    category: "Marketing",
    readTime: "6 min read",
    views: "1.8K",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop",
    featured: false,
    tags: ["Content", "Strategy", "Trends", "2024"],
    content: [
      {
        type: "paragraph",
        text: "The content landscape is evolving rapidly, and 2024 brings new challenges and opportunities for content strategists. Understanding these trends is crucial for staying competitive."
      },
      {
        type: "quote",
        text: "Content is still king, but context is the kingdom."
      },
      {
        type: "heading",
        text: "Video-First Content Approach"
      },
      {
        type: "paragraph",
        text: "Short-form video continues to dominate social media platforms, but long-form educational content is gaining traction on platforms like YouTube."
      },
      {
        type: "list",
        items: [
          "TikTok and Reels for brand awareness",
          "YouTube for educational content",
          "Live streaming for real-time engagement",
          "Interactive video for higher engagement"
        ]
      }
    ],
    authorBio: {
      img: "https://randomuser.me/api/portraits/men/32.jpg",
      name: "Mike Chen",
      bio: "Content Strategy Director with a passion for data-driven storytelling and audience engagement.",
      social: {
        twitter: "#",
        linkedin: "#",
        website: "#"
      }
    }
  }
};

/* ---------------------------- Clean Components ---------------------------- */

// Back Navigation
const BackNavigation = () => {
  const navigate = useNavigate();
  
  return (
    <button
      onClick={() => navigate('/blogs')}
      className="flex items-center text-orange-600 hover:text-orange-700 font-medium mb-8 transition-colors group"
    >
      <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
      Back to Blogs
    </button>
  );
};

// Clean Hero Section
const HeroSection = ({ title, author, date, category, readTime, views, featured }) => (
  <div className="w-full bg-white py-16 px-6 border-b border-gray-100">
    <div className="max-w-4xl mx-auto">
      <BackNavigation />
      
      <div className="text-center">
        {featured && (
          <span className="inline-flex items-center px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium mb-4">
            Featured
          </span>
        )}
        
        <span className="text-orange-600 font-semibold uppercase tracking-wider text-sm mb-3 block">
          {category}
        </span>
        
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
          {title}
        </h1>
        
        <div className="flex flex-wrap items-center justify-center gap-4 text-gray-600 text-sm">
          <div className="flex items-center">
            <User className="w-4 h-4 mr-2" />
            <span>{author}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{date}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            <span>{readTime}</span>
          </div>
          <div className="flex items-center">
            <Eye className="w-4 h-4 mr-2" />
            <span>{views}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Clean Blog Image
const BlogImage = ({ src, alt, caption }) => (
  <div className="max-w-4xl mx-auto my-8">
    <div className="rounded-lg overflow-hidden">
      <img
        src={src}
        alt={alt}
        className="w-full h-auto object-cover"
      />
      {caption && (
        <p className="text-gray-600 text-sm italic mt-2 text-center">{caption}</p>
      )}
    </div>
  </div>
);

// Clean Blog Content
const BlogContent = ({ children }) => (
  <div className="max-w-4xl mx-auto px-6 py-8">
    <div className="prose prose-lg max-w-none">
      {children}
    </div>
  </div>
);

// Clean Quote
const Quote = ({ text }) => (
  <blockquote className="border-l-4 border-orange-500 pl-6 my-8 italic text-gray-700 text-lg">
    "{text}"
  </blockquote>
);

// Clean Section Heading
const SectionHeading = ({ children }) => (
  <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">
    {children}
  </h2>
);

// Clean Bullet List
const BulletList = ({ items }) => (
  <ul className="space-y-2 my-6">
    {items.map((item, idx) => (
      <li key={idx} className="flex items-start">
        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
        <span className="text-gray-700">{item}</span>
      </li>
    ))}
  </ul>
);

// Clean Table
const InfoTable = ({ data }) => (
  <div className="overflow-x-auto my-8 rounded-lg border border-gray-200">
    <table className="w-full">
      <thead className="bg-gray-50">
        <tr>
          {Object.keys(data[0]).map((col, idx) => (
            <th key={idx} className="px-4 py-3 text-left text-gray-700 font-semibold text-sm">
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {data.map((row, idx) => (
          <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
            {Object.values(row).map((val, i) => (
              <td key={i} className="px-4 py-3 text-gray-600 text-sm">
                {val}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Clean Stats Component
const StatsBox = ({ data }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
    {data.map((stat, index) => (
      <div key={index} className="bg-orange-50 rounded-lg p-6 text-center border border-orange-100">
        <div className="text-2xl font-bold text-orange-600 mb-1">{stat.value}</div>
        <div className="text-sm text-gray-600">{stat.label}</div>
      </div>
    ))}
  </div>
);

// Clean Tip Box
const TipBox = ({ children }) => (
  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 my-6">
    <div className="flex items-start">
      <span className="text-blue-600 font-semibold mr-2">Tip:</span>
      <span className="text-blue-700">{children}</span>
    </div>
  </div>
);

// Clean Tags Component
const BlogTags = ({ tags }) => (
  <div className="flex flex-wrap gap-2 my-6">
    {tags.map((tag, index) => (
      <span
        key={index}
        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
      >
        #{tag}
      </span>
    ))}
  </div>
);

// Clean Author Bio
const AuthorBio = ({ img, name, bio }) => (
  <div className="max-w-4xl mx-auto px-6 py-12 border-t border-gray-200">
    <div className="flex items-start space-x-4">
      <img src={img} alt={name} className="w-16 h-16 rounded-full flex-shrink-0" />
      <div>
        <h3 className="font-bold text-gray-900 text-lg mb-2">About {name}</h3>
        <p className="text-gray-600">{bio}</p>
      </div>
    </div>
  </div>
);

// Clean Related Posts
const RelatedPosts = () => {
  const relatedPosts = [
    {
      title: "SEO Best Practices 2024",
      desc: "Learn the latest SEO strategies to improve your website's visibility.",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop",
      link: "/blogs/seo-best-practices",
      category: "SEO"
    },
    {
      title: "Email Marketing Mastery",
      desc: "Build lasting customer relationships through effective email campaigns.",
      img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop",
      link: "/blogs/email-marketing",
      category: "Marketing"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 border-t border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">You Might Also Like</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {relatedPosts.map((post, idx) => (
          <div
            key={idx}
            className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => window.location.href = post.link}
          >
            <img
              src={post.img}
              alt={post.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <span className="text-orange-600 text-sm font-medium">{post.category}</span>
              <h3 className="font-semibold text-lg mb-2 mt-1">{post.title}</h3>
              <p className="text-gray-600 text-sm">{post.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Clean Comment Section
const CommentSection = () => {
  const [comments] = useState([
    {
      id: 1,
      name: "Alex Thompson",
      date: "2 days ago",
      comment: "This article perfectly captures the current state of AI in marketing. Great insights!"
    }
  ]);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 border-t border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Discussion</h2>
      
      <div className="space-y-4 mb-8">
        {comments.map(comment => (
          <div key={comment.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <h4 className="font-semibold text-gray-900">{comment.name}</h4>
              <span className="text-gray-500 text-sm">{comment.date}</span>
            </div>
            <p className="text-gray-700">{comment.comment}</p>
          </div>
        ))}
      </div>

      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <textarea
          rows="4"
          placeholder="Share your thoughts..."
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <button
          type="submit"
          className="bg-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors"
        >
          Post Comment
        </button>
      </form>
    </div>
  );
};

/* ---------------------------- Main Page ---------------------------- */

export default function BlogDetailPage() {
  const { slug } = useParams();
  const blog = blogData[slug];

  if (!blog) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Blog Not Found</h1>
          <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
          <a href="/blogs" className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors">
            Back to Blogs
          </a>
        </div>
      </div>
    );
  }

  const renderContent = (content) => {
    return content.map((item, index) => {
      switch (item.type) {
        case 'paragraph':
          return <p key={index} className="mb-6 text-gray-700 leading-relaxed">{item.text}</p>;
        case 'image':
          return <BlogImage key={index} src={item.src} alt={item.alt} caption={item.caption} />;
        case 'quote':
          return <Quote key={index} text={item.text} />;
        case 'heading':
          return <SectionHeading key={index}>{item.text}</SectionHeading>;
        case 'list':
          return <BulletList key={index} items={item.items} />;
        case 'table':
          return <InfoTable key={index} data={item.data} />;
        case 'stats':
          return <StatsBox key={index} data={item.data} />;
        case 'tip':
          return <TipBox key={index}>{item.text}</TipBox>;
        default:
          return null;
      }
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <HeroSection
        title={blog.title}
        author={blog.author}
        date={blog.date}
        category={blog.category}
        readTime={blog.readTime}
        views={blog.views}
        featured={blog.featured}
      />

      <BlogImage src={blog.image} alt={blog.title} />

      <BlogContent>
        <BlogTags tags={blog.tags} />
        {renderContent(blog.content)}
      </BlogContent>

      <AuthorBio
        img={blog.authorBio.img}
        name={blog.authorBio.name}
        bio={blog.authorBio.bio}
      />

      <RelatedPosts />

      <CommentSection />
    </div>
  );
}