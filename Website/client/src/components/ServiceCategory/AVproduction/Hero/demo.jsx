import Link from 'next/link';
import { StaggerText } from './stagger-text';

const AV_GALLERY = [
  {
    src: 'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg',
    alt: 'Professional cinema camera on set',
  },
  {
    src: 'https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg',
    alt: 'Video production crew filming',
  },
  {
    src: 'https://images.pexels.com/photos/8412361/pexels-photo-8412361.jpeg',
    alt: 'Film director reviewing footage',
  },
  {
    src: 'https://images.pexels.com/photos/6883796/pexels-photo-6883796.jpeg',
    alt: 'Studio lighting for commercial shoot',
  },
  {
    src: 'https://images.pexels.com/photos/6405771/pexels-photo-6405771.jpeg',
    alt: 'Corporate video interview setup',
  },
  {
    src: 'https://images.pexels.com/photos/7803253/pexels-photo-7803253.jpeg',
    alt: 'Aerial drone filming',
  },
];

export default function Demotwo() {
  return (
    <>
      {/* Hero — single clean background, no overlapping parallax on load */}
      <section className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden mt-15">
        <img
          src="https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt=""
          role="presentation"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/65 to-black/80" />

        <div className="relative z-10 text-center px-6 flex flex-col items-center max-w-4xl mx-auto py-24">
          <p className="text-[#FF6600] font-bold uppercase tracking-[0.12em] text-sm md:text-base mb-5">
            BrandBase Capsule Video Production Agency
          </p>

          <StaggerText
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight"
            text="India's Leading Ad Film Production Agency for Bold Brands"
            direction="y"
          />

          <p className="mt-6 text-gray-200 text-base md:text-lg max-w-2xl leading-relaxed">
            We help businesses and brands turn their vision into reality through
            corporate films, commercials, event coverage, and social content.
          </p>

          <Link
            href="/contact"
            className="mt-10 bg-[#FF6600] hover:bg-[#E55A00] text-white transition-colors px-10 py-3.5 rounded-full font-semibold text-sm tracking-widest uppercase shadow-lg"
          >
            Enquire Now
          </Link>
        </div>
      </section>

      {/* Gallery — below the hero, not stacked on top of it */}
      <section className="bg-black py-16 md:py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-white text-2xl md:text-3xl font-bold text-center mb-10">
            Production that looks as good as your brand
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {AV_GALLERY.map((item) => (
              <div
                key={item.src}
                className="aspect-[4/3] rounded-xl overflow-hidden border border-white/10"
              >
                <img
                  src={`${item.src}?auto=compress&cs=tinysrgb&w=800`}
                  alt={item.alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
