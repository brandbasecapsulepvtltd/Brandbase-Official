// Utility to load category data
import categoriesData from '@/Data/Categories.json';

export function getCategoryData(categorySlug) {
  return categoriesData.categoryMaster.find(
    cat => cat.category === categorySlug
  );
}

export function getAllCategories() {
  return categoriesData.categoryMaster.map(cat => ({
    slug: cat.category,
    title: cat.hero?.title || '',
    description: cat.hero?.description || '',
  }));
}