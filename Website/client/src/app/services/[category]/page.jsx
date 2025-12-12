import CategoryContent from '@/components/ServiceCategory/CategoryContent';
import categoriesData from '@/Data/Categories.json';

// Helper function inside the file
function getCategoryData(categorySlug) {
  return categoriesData.categoryMaster.find(
    cat => cat.category === categorySlug
  );
}

// 1. Static Params Generation (Runs at build time)
export function generateStaticParams() {
  return categoriesData.categoryMaster.map((cat) => ({
    category: cat.category,
  }));
}

// 2. Metadata Generation (Updated: async/await params)
export async function generateMetadata({ params }) {
  const { category } = await params;
  const pageData = getCategoryData(category);

  return {
    title: pageData?.pageMetadata?.title || `${category?.replace('-', ' ')} Services`,
    description: pageData?.pageMetadata?.description || `Professional ${category?.replace('-', ' ')} services`,
  };
}

// 3. Main Page Component (Updated: async/await params)
export default async function CategoryPage({ params }) {
  // In Next.js 15+, params is a Promise. We must await it.
  const resolvedParams = await params;
  const category = resolvedParams?.category;

  // Safety check
  if (!category) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Invalid Request</h1>
        <p className="text-gray-600">No category specified in the URL.</p>
      </div>
    );
  }

  const pageData = getCategoryData(category);

  // Data validation check
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