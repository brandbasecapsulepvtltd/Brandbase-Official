import { NextResponse } from 'next/server';
import { api } from '@/lib/api';

export const revalidate = 60;

export async function GET() {
  try {
    const [servicesRes, categoriesRes, blogsRes, portfoliosRes] = await Promise.all([
      api.getServices(),
      api.getServicesCategories(),
      api.getBlogs(),
      api.getPortfolios(),
    ]);

    return NextResponse.json({
      services: servicesRes?.data || [],
      categories: categoriesRes?.data || [],
      blogs: blogsRes?.data || [],
      portfolios: portfoliosRes?.data || [],
    });
  } catch (error) {
    console.error('Search index fetch failed:', error?.message || error);
    return NextResponse.json({
      services: [],
      categories: [],
      blogs: [],
      portfolios: [],
    });
  }
}
