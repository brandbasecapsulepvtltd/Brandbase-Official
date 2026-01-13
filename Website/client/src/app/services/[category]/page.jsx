import CategoryContent from '@/components/ServiceCategory/CategoryContent';
import { apiCall } from '@/lib/api';

/** * FIX: This line tells Next.js to revalidate the data at most every 60 seconds.
 * Even though the page is "static," it will check the DB for updates 
 * in the background after this timer expires.
 */
export const revalidate = 10;

// Helper function to fetch category data
async function getCategoryData(categorySlug) {
  try {
    // If your apiCall uses 'fetch' internally, Next.js caches it by default.
    // Adding the revalidate constant above handles this globally for the page.
    const response = await apiCall(`/service-categories/${categorySlug}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching category:', error);
    return null;
  }
}

// Helper function to fetch all category slugs
async function getAllCategorySlugs() {
  try {
    const response = await apiCall('/service-categories/slugs');
    return response.data || [];
  } catch (error) {
    console.error('Error fetching category slugs:', error);
    return [];
  }
}

// 1. Static Params Generation (Runs at build time)
export async function generateStaticParams() {
  try {
    const categorySlugs = await getAllCategorySlugs();
    return categorySlugs.map((slug) => ({
      category: slug,
    }));
  } catch (error) {
    console.error('Error in generateStaticParams:', error);
    return [];
  }
}

// 2. Metadata Generation
export async function generateMetadata({ params }) {
  const { category } = await params; // Awaiting params for Next.js 15 compatibility

  try {
    const pageData = await getCategoryData(category);
    if (pageData) {
      return {
        title: pageData?.pageMetadata?.title || `${category?.replace('-', ' ')} Services`,
        description: pageData?.pageMetadata?.description || `Professional ${category?.replace('-', ' ')} services`,
        keywords: pageData?.pageMetadata?.keywords || [],
      };
    }
  } catch (error) {
    console.error('Error generating metadata:', error);
  }

  return {
    title: `${category?.replace('-', ' ')} Services`,
    description: `Professional ${category?.replace('-', ' ')} services`,
  };
}

// 3. Main Page Component
export default async function CategoryPage({ params }) {
  const { category } = await params;

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Invalid Request</h1>
        <p className="text-gray-600">No category specified in the URL.</p>
      </div>
    );
  }

  const pageData = await getCategoryData(category);

  if (!pageData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Category Not Found</h1>
        <p className="text-gray-600">The requested service category does not exist.</p>
      </div>
    );
  }

  return <CategoryContent pageData={pageData} />;
}
// Simple API call function (you can also use your existing apiCall from lib/api)
{/*
async function apiCall(endpoint) {
  const API_URL = "https://api.brandbasecapsule.com/api";
  const API_KEY = "8c36f75937af6c0777eeda50d0a0ca4ab90e8ddc4b518c9dbe51a59f064392de";
  
  const url = `${API_URL}${endpoint}`;
  
  const response = await fetch(url, {
    headers: {
      'X-API-Key': API_KEY,
      'Content-Type': 'application/json',
    },
    next: {
      revalidate: 3600, // Revalidate every hour (adjust as needed)
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error ${response.status}: ${errorText}`);
  }

  return response.json();
}  
*/}
