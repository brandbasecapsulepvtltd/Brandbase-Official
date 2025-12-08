// ✅ CORRECT - Import servicesData properly
import { servicesData } from '@/Data/masterData'; // Adjust path as needed

// This should be your default page component
export default function CategoryPage({ params }) {
  const { category } = params;
  
  // Find the service data
  const serviceData = servicesData.find(
    service => service.category === category
  );
  
  if (!serviceData) {
    return <div>Service not found</div>;
  }
  
  return (
    <div>
      <h1>{serviceData.data.hero.headline}</h1>
      {/* Rest of your page content */}
    </div>
  );
}

// ✅ CORRECT - generateStaticParams with proper import
export async function generateStaticParams() {
  // Make sure servicesData is imported above
  return servicesData.map((service) => ({
    category: service.category,
  }));
}

// Optional: Generate metadata
export async function generateMetadata({ params }) {
  const { category } = params;
  const service = servicesData.find(s => s.category === category);
  
  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }
  
  return {
    title: service.data.hero.headline,
    description: service.data.hero.subHeadline,
  };
}