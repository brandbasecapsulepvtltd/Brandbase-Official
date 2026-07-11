import { BentoCell, BentoGrid, ContainerScale, ContainerScroll } from "./hero-gallery-scroll-animation"

const IMAGES = [
    {
        url: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?q=80&w=2370&auto=format&fit=crop",
        className: "col-span-1 md:col-span-2 row-span-2"
    },
    {
        url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2370&auto=format&fit=crop",
        className: "col-span-1 row-span-1"
    },
    {
        url: "https://images.unsplash.com/photo-1478720568477-152d9b325146?q=80&w=2370&auto=format&fit=crop",
        className: "col-span-1 row-span-1"
    },
    {
        url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2370&auto=format&fit=crop",
        className: "col-span-1 md:col-span-2 row-span-1"
    },
    {
        url: "https://images.unsplash.com/photo-1516280440614-6697288d5d38?q=80&w=2370&auto=format&fit=crop",
        className: "col-span-1 md:col-span-2 row-span-1"
    }
]

const HeroDemo1 = () => {
    return (
        <ContainerScroll>
            <ContainerScale>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4 drop-shadow-lg">
                    Immersive <span className="text-indigo-400">AV Production</span>
                </h1>
                <p className="max-w-2xl text-lg text-slate-200 mb-8 drop-shadow-md">
                    Transforming your events with cutting-edge audiovisual technology,
                    stunning lighting, and crystal-clear sound engineering.
                </p>
                <div className="flex items-center justify-center gap-4">
                    <button className="bg-indigo-600 px-6 py-3 rounded-full font-medium text-white hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-500/30">
                        Get a Quote
                    </button>
                    <button
                        className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-full font-medium hover:bg-white/20 transition-colors"
                    >
                        View Portfolio
                    </button>
                </div>
            </ContainerScale>

            <BentoGrid>
                {IMAGES.map((img, index) => (
                    <BentoCell
                        key={index}
                        className={`relative overflow-hidden rounded-2xl shadow-2xl border border-white/10 ${img.className}`}
                    >
                        <img
                            className="size-full object-cover object-center transition-transform duration-700 hover:scale-110"
                            src={img.url}
                            alt="AV Production Work"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                    </BentoCell>
                ))}
            </BentoGrid>
        </ContainerScroll>
    )
}

export { HeroDemo1 };
