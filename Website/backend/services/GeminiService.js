const { GoogleGenerativeAI } = require("@google/generative-ai");

const API_KEY = process.env.GEMINI_API_KEY || "AIzaSyC-ooQpN9eaZXy83ssVfNBnOyF2Wfki7ow";

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

class GeminiService {
  /**
   * Generate blog topics based on event details.
   * @param {Object} event 
   * @param {string} keyword 
   * @returns {Promise<string[]>}
   */
  static async generateBlogTopics(event, keyword = "") {
    const prompt = `
            You are an SEO Expert and Content Strategist for a high-end exhibition stall design company.
            
            Target Event: "${event.name}"
            Industry: "${event.industry}"
            City: "${event.city}"
            Dates: "${event.startDate}" to "${event.endDate}"
            Focus Keywords: "${keyword}"

            Goal: Generate 5 highly effective, search-optimized blog titles that potential clients would search for BEFORE attending this exhibition. 
            The titles should aim to capture leads looking for stall designers, exhibition services, or brand presence at ${event.name}.

            Examples of high-converting titles:
            - "Best Stall Design Company for ${event.name} 2026"
            - "Top 10 Exhibition Stand Builders in ${event.city} for ${event.name}"
            - "How to Stand Out at ${event.name}: Stall Design Trends"
            - "Custom Booth Designs for ${event.industry} Exhibitions in ${event.city}"

            Return strictly a JSON array of strings. No markdown, no "json" tags.
            Example: ["Title 1", "Title 2"]
        `;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      // Clean up if markdown code blocks are present
      const cleanText = text.replace(/```json|```/g, '').trim();
      return JSON.parse(cleanText);
    } catch (error) {
      console.error("Error generating topics:", error);
      return [];
    }
  }

  static blogPrompts = {
    guide: {
      title: "Ultimate Exhibitor Guide for [EventName] [Year] (Dates, Venue, Stall Sizes, Cost & Tips)",
      focus: "Captures top-of-funnel + informational searches. pillar content for the exhibition.",
      sections: [
        "What is [EventName]?",
        "Who should exhibit",
        "Dates, venue, hall layout",
        "Stall sizes & space options",
        "Raw space vs shell scheme",
        "Common exhibitor mistakes",
        "Timeline to prepare",
        "Why stall design matters in this exhibition",
        "How to choose the right location",
        "CTA: Talk to Brandbase stall experts"
      ]
    },
    fabricator: {
      title: "Best Stall Design & Fabrication Company for [EventName] [Year] (Mumbai Experts)",
      focus: "Targets high-intent keywords for conversion. Position Brandbase as the leader.",
      sections: [
        "Why [EventName] needs specialized stall design",
        "Common design challenges at this exhibition",
        "The Brandbase process (concept → 3D → fabrication → installation)",
        "Past experience at similar exhibitions",
        "Why Mumbai fabricators have an edge",
        "Materials and technology used in modern stalls",
        "Safety and compliance standards",
        "Project management for large exhibitions",
        "FAQs specific to [EventName] stalls",
        "Strong CTA: Book your [EventName] stall consultation"
      ]
    },
    trends: {
      title: "Stall Design Ideas & Trends That Work Best at [EventName] (With Real Examples)",
      focus: "Warms up cold leads by showing authority and inspiration.",
      sections: [
        "What kind of stalls work best at [EventName]",
        "Open vs closed booth designs",
        "Product-heavy vs experience-based stalls",
        "Lighting, tech, LED walls",
        "Space optimization for [EventName]",
        "Interactive elements that drive traffic",
        "Branding and visual communication trends",
        "Sustainable stall design options",
        "Common design mistakes to avoid",
        "CTA: Get a custom [EventName] stall concept"
      ]
    },
    checklist: {
      title: "Complete Checklist to Prepare Your Exhibition Stall for [EventName] [Year]",
      focus: "SEO gold. Positions Brandbase as professionals.",
      sections: [
        "90 days before exhibition: Initial planning",
        "60 days before: Design and vendor selection",
        "30 days before: Finalizing approvals",
        "15 days before: Marketing and team prep",
        "7 days before: Final logistics",
        "Stall design approvals & documentation",
        "Electrical & power planning",
        "Logistics & installation timeline",
        "On-ground execution & staff management",
        "Post-event dismantling and lead follow-up",
      ]
    },
    roi: {
      title: "Why Choosing the Right Stall Fabricator for [EventName] Can Make or Break Your ROI",
      focus: "Targets decision-stage searches. Emotional hook: Fear + ROI + Authority.",
      sections: [
        "Why [EventName] is different from normal expos",
        "Common exhibitor regrets",
        "Cheap vs professional fabrication costs",
        "Timeline risks and how to avoid them",
        "Safety & compliance issues in stall building",
        "Real-life scenarios and lessons learned",
        "The importance of an end-to-end partner",
        "Measuring ROI from your [EventName] participation",
        "Brand presence vs just a booth",
        "CTA: Work with an experienced [EventName] fabricator"
      ]
    }
  };

  /**
   * Generates a full blog post based on a category and event details.
   * @param {string} category - The blog category/slug.
   * @param {Object} event - The event object.
   * @returns {Promise<Object>} - The blog content structure.
   */
  static async generateBlogContent(category, event) {
    const year = new Date(event.startDate).getFullYear();
    const config = this.blogPrompts[category] || this.blogPrompts.guide;
    const title = config.title.replace(/\[EventName\]/g, event.name).replace(/\[Year\]/g, year);
    const sectionsList = config.sections.map(s => s.replace(/\[EventName\]/g, event.name).replace(/\[Year\]/g, year)).join("\n- ");

    const prompt = `
      You are a world-class SEO Expert and professional blog writer for Brandbase, a leading premium exhibition stall design company.
      Write a comprehensive, authoritative, and 100% SEO-friendly blog post.
      
      Topic: "${title}"
      Focus: ${config.focus}

      Context:
      - Event: ${event.name} (${event.city})
      - Industry: ${event.industry}
      - Target Audience: High-value exhibitors looking for premium solutions.
      - Tonality: Professional, premium, authoritative, and persuasive.

      STRICT REQUIREMENTS:
      1. YOU MUST GENERATE EXACTLY 10 SECTIONS.
      2. Each section must be detailed, valuable, and highly relevant to the topic.
      3. Use top-notch SEO keywords naturally throughout the content: "${event.name} stall design", "best fabricator ${event.city}", "exhibition stand builder", "custom booth", etc.
      4. Mention "Brandbase" as the expert partner.
      5. The content should be so good that it ranks #1 on Google.

      REQUIRED SECTIONS TO COVER:
      - ${sectionsList}

      Format the output strictly as a JSON object with the following structure:
      {
        "title": "${title}",
        "description": "A compelling meta description (150-160 chars) including keywords.",
        "contentSections": [
          {
            "title": "Section Heading 1",
            "content": "Comprehensive paragraph text..."
          },
          ... (10 sections total)
        ],
        "tags": ["tag1", "tag2", "tag3"]
      }

      Do NOT return markdown formatting around the JSON. Just the raw JSON string.
    `;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      let text = response.text();
      text = text.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(text);

      // Validation for 10 sections
      if (parsed.contentSections.length < 10) {
        console.warn(`Gemini generated only ${parsed.contentSections.length} sections. Expected 10.`);
      }

      return parsed;
    } catch (error) {
      console.error("Error generating blog content:", error);
      throw error;
    }
  }
  /**
   * Generates full event details based on a user prompt.
   * @param {string} userPrompt - The user's instruction (e.g., "Create event for OTM 2026").
   * @returns {Promise<Object>} - The event object structure.
   */
  static async generateEventDetails(userPrompt) {
    const prompt = `
      You are an expert Event Manager and SEO Specialist for "Brandbase Capsule", a premium exhibition stall design agency.
      
      Goal: Create a comprehensive, realistic, and SEO-optimized event profile based on this request: "${userPrompt}"

      Important Note: if someone searches for the best stall design company for exhibitionname / best stall fabricator or even searches for the exhibition name of guide or anything related to that exhibition our this page should come on top so put the content accordingly and lots of keywords as well
      Requirements:
      1.  **Content**:
          -   **Name**: Official event name (e.g., "OTM Mumbai 2026").
          -   **Description**: Professional overview (2-3 sentences).
          -   **Dates**: Realistic future dates (if not specified, pick likely dates in 2026).
          -   **Venue/City**: Realistic venue and city.
          -   **10 Content Sections**: YOU MUST GENERATE EXACTLY 10 SECTIONS. Cover "Why Visit", "Exhibitor Profile", "Highlights", "Stall Design Trends", "Brandbase Services", "Networking Opportunities", "Innovation Zone", "Global Reach", "Travel & Stay", "Future Outlook".
          -   **10 FAQs**: YOU MUST GENERATE EXACTLY 10 FAQs. Common questions (Registration, Dates, Location, Stall Booking, Fabricator Services, etc.).
      
      2.  **SEO & Branding**:
          -   **Slug**: URL-friendly version of the name.
          -   **SEO Title**: e.g., "OTM Mumbai 2026 | Best Stall Designer & Fabricator".
          -   **SEO Description**: Compelling meta description including keywords like "stall design", "exhibition booth".
          -   **Keywords**: 10-15 high-value keywords (e.g., "exhibition stall designer", "custom booth").
          -   **Canonical URL**: "https://brandbasecapsule.com/events/[slug]"
          -   **Structured Data**: Generate a valid JSON-LD string for Event schema.

      3.  **Strict Output Format**: JSON ONLY. No markdown.
      {
        "name": "string",
        "startDate": "YYYY-MM-DD",
        "endDate": "YYYY-MM-DD",
        "venue": "string",
        "city": "string",
        "industry": "string (one of: tech, healthcare, manufacturing, retail, food, auto, fashion, pharma)",
        "organizer": "string",
        "organizerWebsite": "string",
        "isIndoor": true,
        "expectedFootfall": 1000,
        "stallSizes": ["9x9", "12x12"],
        "description": "string",
        "whyParticipate": "string",
        "slug": "string",
        "seoTitle": "string",
        "seoDescription": "string",
        "seoKeywords": ["string"],
        "canonicalUrl": "string",
        "structuredData": "string (JSON-LD string)",
        "status": "published",
        "portfolioItems": [],
        "similarEvents": [],
        "sections": [
          { 
            "title": "string", 
            "content": ["paragraph 1", "paragraph 2"],
            "listItems": ["item 1", "item 2"],
            "media": []
          }
          // GENERATE EXACTLY 10 SECTIONS HERE
        ],
        "faqs": [
          { "question": "string", "answer": "string" }
          // GENERATE EXACTLY 10 FAQs HERE
        ],
        "blogConfiguration": {
           "enabled": true,
           "postsPerDay": 0.2,
           "keywords": ["best stall design", "custom booth"] 
        }
      }
    `;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      let text = response.text();
      text = text.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(text);
    } catch (error) {
      console.error("Error generating event details:", error);
      throw error;
    }
  }
}

module.exports = GeminiService;
