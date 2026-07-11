import { apiCall } from '@/lib/api';
import { SITE_URL } from '@/lib/siteConfig';
import { getAllSeoLandingSlugs } from '@/lib/seoLandingPages';

function getStaticSitemapEntries(baseUrl, now) {
    const seoLandings = getAllSeoLandingSlugs().map((slug) => ({
        url: `${baseUrl}/${slug}`,
        lastModified: now,
        priority: slug.includes('india') ? 0.92 : 0.95,
    }));

    return [
        // 🔥 Homepage
        {
            url: `${baseUrl}`,
            lastModified: now,
            priority: 1.0,
        },
        // 🔥 SEO landing pages (Mumbai + India services)
        ...seoLandings,

        // 🔥 Core Pages
        {
            url: `${baseUrl}/about`,
            lastModified: now,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/services`,
            lastModified: now,
            priority: 0.85,
        },
        {
            url: `${baseUrl}/portfolio`,
            lastModified: now,
            priority: 0.75,
        },
        {
            url: `${baseUrl}/blogs`,
            lastModified: now,
            priority: 0.75,
        },

        // 🔥 Digital Marketing
        {
            url: `${baseUrl}/services/digital-marketing`,
            lastModified: now,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/services/digital-marketing/seo-optimization`,
            lastModified: now,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/services/digital-marketing/online-ads-campaigns`,
            lastModified: now,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/services/digital-marketing/social-media-marketing`,
            lastModified: now,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/services/digital-marketing/social-media-page-setup`,
            lastModified: now,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/services/digital-marketing/social-media-content-design`,
            lastModified: now,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/services/digital-marketing/content-writing`,
            lastModified: now,
            priority: 0.8,
        },

        // 🔥 Website Development
        {
            url: `${baseUrl}/services/website-development`,
            lastModified: now,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/services/website-development/business-website`,
            lastModified: now,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/services/website-development/portfolio-website`,
            lastModified: now,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/services/website-development/landing-page-development`,
            lastModified: now,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/services/website-development/cms-website`,
            lastModified: now,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/services/website-development/ecommerce-websites`,
            lastModified: now,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/services/website-development/dynamic-static`,
            lastModified: now,
            priority: 0.75,
        },

        // 🔥 Mobile App Development
        {
            url: `${baseUrl}/services/app-development`,
            lastModified: now,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/services/mobile-app-development/android-app-development`,
            lastModified: now,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/services/mobile-app-development/ios-app-development`,
            lastModified: now,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/services/mobile-app-development/ui-ux-design`,
            lastModified: now,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/services/mobile-app-development/cross-platform-app-development`,
            lastModified: now,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/services/mobile-app-development/app-maintenance-support`,
            lastModified: now,
            priority: 0.75,
        },

        // 🔥 Events & Exhibition
        {
            url: `${baseUrl}/services/exhibition-management`,
            lastModified: now,
            priority: 0.85,
        },
        {
            url: `${baseUrl}/services/events-exhibition/stall-design`,
            lastModified: now,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/services/events-exhibition/event-planning-management`,
            lastModified: now,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/services/events-exhibition/wedding-service`,
            lastModified: now,
            priority: 0.75,
        },
        {
            url: `${baseUrl}/services/events-exhibition/event-branding`,
            lastModified: now,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/services/events-exhibition/onsite-event-coordination`,
            lastModified: now,
            priority: 0.75,
        },

        // 🔥 Other Services
        {
            url: `${baseUrl}/services/branding-design`,
            lastModified: now,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/services/av-production`,
            lastModified: now,
            priority: 0.75,
        },

        // 🔥 Conversion pages
        {
            url: `${baseUrl}/contact`,
            lastModified: now,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/appointment`,
            lastModified: now,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/event-calendar`,
            lastModified: now,
            priority: 0.85,
        },
        {
            url: `${baseUrl}/expo`,
            lastModified: now,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/expo/otm`,
            lastModified: now,
            priority: 0.75,
        },

        // 🔥 Legal pages (low priority)
        {
            url: `${baseUrl}/terms`,
            lastModified: now,
            priority: 0.4,
        },
        {
            url: `${baseUrl}/privacy-policy`,
            lastModified: now,
            priority: 0.4,
        },

        // 🔥 Blogs (individual)
        {
            url: `${baseUrl}/blogs/productivity/best-productivity-hacks-for-creative-freelancers-today`,
            lastModified: now,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/blogs/technology/ai-tools-for-creative-professionals`,
            lastModified: now,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/blogs/wellness/mindfulness-for-busy-professionals`,
            lastModified: now,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/blogs/business/sustainable-freelance-business`,
            lastModified: now,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/blogs/productivity/mastering-remote-work-balance`,
            lastModified: now,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/blogs/marketing/building-personal-brand-online`,
            lastModified: now,
            priority: 0.7,
        },
    ];
}

async function getDynamicSitemapEntries(baseUrl, now) {
    const entries = [];

    try {
        const [blogsRes, portfoliosRes, categoriesRes] = await Promise.all([
            apiCall('/blogs', { silent: true }).catch(() => ({ data: [] })),
            apiCall('/portfolios', { silent: true }).catch(() => ({ data: [] })),
            apiCall('/service-categories/slugs', { silent: true }).catch(() => ({ data: [] })),
        ]);

        for (const blog of blogsRes.data || []) {
            const category = blog.metadata?.category || blog.category;
            const slug = blog.metadata?.slug || blog.slug;
            if (!category || !slug) continue;
            entries.push({
                url: `${baseUrl}/blogs/${category}/${slug}`,
                lastModified: blog.updatedAt ? new Date(blog.updatedAt) : now,
                priority: 0.7,
            });
        }

        for (const portfolio of portfoliosRes.data || []) {
            if (!portfolio.slug) continue;
            entries.push({
                url: `${baseUrl}/portfolio/${portfolio.slug}`,
                lastModified: portfolio.updatedAt ? new Date(portfolio.updatedAt) : now,
                priority: 0.65,
            });
        }

        for (const slug of categoriesRes.data || []) {
            if (!slug) continue;
            entries.push({
                url: `${baseUrl}/services/${slug}`,
                lastModified: now,
                priority: 0.85,
            });
        }
    } catch (error) {
        console.error('Dynamic sitemap generation failed:', error);
    }

    return entries;
}

export default async function sitemap() {
    const baseUrl = SITE_URL;
    const now = new Date();
    const staticEntries = getStaticSitemapEntries(baseUrl, now);
    const dynamicEntries = await getDynamicSitemapEntries(baseUrl, now);

    const seen = new Set();
    return [...staticEntries, ...dynamicEntries].filter((entry) => {
        if (seen.has(entry.url)) return false;
        seen.add(entry.url);
        return true;
    });
}
