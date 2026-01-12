import Head from 'next/head';
import Link from 'next/link';
import { api } from '../../lib/api';

// Metadata
export const metadata = {
  title: 'Our Services | Brandbase',
  description: 'Explore our comprehensive range of services designed to elevate your brand.',
};

// Revalidate data every 60 seconds
export const revalidate = 60;

export default async function ServicesPage() {
  let categories = [];
  try {
    const response = await api.getServiceCategories({ active: 'true', sort: 'order' });
    if (response.success) {
      categories = response.data;
    }
  } catch (error) {
    console.error('Failed to fetch services:', error);
  }

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">

      {/* Hero Section */}
      <section className="relative py-20 px-4 md:px-8 mb-12 bg-secondary/30 border-b border-border">
        <div className="max-w-7xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Example Excellence
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Our <span className="text-primary">Services</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive solutions tailored to elevate your brand presence and drive growth in the digital landscape.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="space-y-24">
          {categories.map((category) => (
            <div key={category._id} className="scroll-mt-24" id={category.category}>

              {/* Category Header */}
              <div className="mb-10 md:mb-14">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold capitalize mb-2">{category.hero?.title || category.category}</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl">{category.hero?.subtitle || category.categoryServices?.description}</p>
                  </div>
                  <Link
                    href={`/services/${category.category}`}
                    className="group inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors"
                  >
                    View Main Page
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                  </Link>
                </div>
                <div className="h-px w-full bg-gradient-to-r from-border via-border to-transparent"></div>
              </div>

              {/* Individual Services Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 md:gap-8">
                {category.categoryServices?.services?.map((service, index) => (
                  <Link
                    key={index}
                    href={`/services/${category.category}/${service.link?.split('/').pop() || '#'}`}
                    className="group relative flex flex-col h-full bg-card hover:bg-secondary/50 border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  >
                    {/* Image */}
                    <div className="relative w-full aspect-[16/9] overflow-hidden bg-secondary">
                      {service.image ? (
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          No Image
                        </div>
                      )}

                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                    </div>

                    {/* Content */}
                    <div className="p-6 md:p-8 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
                      <p className="text-muted-foreground leading-relaxed flex-grow">{service.description}</p>

                      <div className="mt-6 pt-6 border-t border-border flex items-center text-primary font-medium text-sm">
                        <span>Explore Service</span>
                        <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {categories.length === 0 && (
            <div className="text-center py-20">
              <h2 className="text-2xl font-semibold mb-2">No Services Found</h2>
              <p className="text-muted-foreground">Please check back later as we update our offerings.</p>
            </div>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <section className="mt-32 max-w-7xl mx-auto px-4 md:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-primary px-6 py-16 md:px-16 md:py-24 text-center text-primary-foreground shadow-2xl">
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to elevate your brand?</h2>
            <p className="text-white/90 text-lg md:text-xl mb-10">
              Let's create something extraordinary together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-background text-foreground font-semibold rounded-full hover:bg-background/90 transition-colors"
              >
                Get Started
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-full hover:bg-white/30 transition-colors border border-white/30"
              >
                View Portfolio
              </Link>
            </div>
          </div>

          {/* Decorative circles */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-black/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
        </div>
      </section>

    </div>
  );
}

