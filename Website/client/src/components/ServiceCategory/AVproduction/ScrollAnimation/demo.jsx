import { BentoCell, BentoGrid, ContainerScale, ContainerScroll } from "./hero-gallery-scroll-animation"

const IMAGES = [
    "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=2388&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1498036882173-b41c28a8ba34?q=80&w=2264&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1551641506-ee5bf4cb45f1?q=80&w=2368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dG9reW98ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHRva3lvfGVufDB8fDB8fHww",
]

const HeroDemo1 = () => {
    return (
        <ContainerScroll className="h-[350vh]">
            <BentoGrid className="sticky left-0 top-0 z-0 h-screen w-full p-4">
                {IMAGES.map((imageUrl, index) => (
                    <BentoCell
                        key={index}
                        className="overflow-hidden rounded-xl shadow-xl"
                    >
                        <img
                            className="size-full object-cover object-center"
                            src={imageUrl}
                            alt=""
                        />
                    </BentoCell>
                ))}
            </BentoGrid>

            <ContainerScale className="relative z-10 text-center">
                <h1 className="max-w-xl text-5xl font-bold tracking-tighter text-slate-800 ">
                    Your Animated Hero
                </h1>
                <p className="my-6 max-w-xl text-sm text-slate-700 md:text-base">
                    Yet another hero section, this time with scroll trigger animations,
                    animating the hero content with motion.
                </p>
                <div className="flex items-center justify-center gap-4">
                    <button className="bg-indigo-500 px-4 py-2 font-medium hover:bg-indigo-400">
                        Get Started
                    </button>
                    <button
                        variant="link"
                        className="bg-transparent px-4 py-2 font-medium"
                    >
                        Learn more
                    </button>
                </div>
            </ContainerScale>
        </ContainerScroll>
    )
}

export { HeroDemo1 };
