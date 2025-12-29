import { 
  Parallax, 
  ParallaxItem, 
  PrallaxContainer 
} from "./parallax";
import { StaggerText } from './stagger-text';

export default function Demotwo() {

  return (
    // Height is set to 3000px to allow room for the parallax scroll effect
    <Parallax className="relative h-[3000px] md:h-[2500px] bg-black">
      
      {/* STICKY HERO SECTION - This stays fixed while you scroll */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center overflow-hidden mt-15">
        
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source
            src="https://ik.imagekit.io/vinayak06/Mavnox/BrandBase/homepage-banner.mp4"
            type="video/mp4"
          />
        </video>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/10 z-10" />

        {/* Hero Content */}
        <div className="relative z-20 text-center px-6 flex flex-col items-center">
          <p className="text-orange-500 font-bold uppercase tracking-[0.1em] text-[15px] md:text-lg mb-4">
            Brandbase Capsule video Production Agency
          </p>

          <StaggerText
            className="text-4xl md:text-7xl font-extrabold tracking-tighter text-white max-w-4xl mx-auto leading-tight"
            text="India's Leading Ad Film Production Agency for Bold Brands"
            direction="y"
          />

          <p className="mt-6 text-gray-200 text-sm md:text-lg max-w-xl mx-auto">
            We’re an ad production agency helping businesses and brands turn their vision into reality through dynamic video content.
          </p>

          <button className="mt-8 bg-white text-black hover:bg-blue-600 hover:text-white transition-colors px-8 py-3 rounded-full font-bold text-sm tracking-widest">
            ENQUIRE NOW
          </button>
        </div>
      </div>

      {/* PARALLAX IMAGES SECTION - These float over the sticky video as you scroll */}
      <PrallaxContainer className="relative z-30 flex flex-wrap justify-around gap-8 w-full px-12 mt-[-50vh]">
        
        <ParallaxItem

          className="w-11/12 md:w-1/4 max-h-96"

          start={250}

          end={-200}

        >

          <img

            className="size-full object-cover object-[50%_50%]"

            src="https://images.unsplash.com/photo-1508849789987-4e5333c12b78?q=80&w=1593&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

            alt="street"

          />

        </ParallaxItem>



        <ParallaxItem

          className="w-11/12 md:w-1/4 max-h-96"

          start={500}

          end={20}

        >

          <img

            className="size-full object-cover object-[50%_50%]"

            src="https://images.unsplash.com/photo-1666053691228-5f2c957b1755?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

            alt="street"

          />

        </ParallaxItem>

        <ParallaxItem

          className="w-11/12 md:w-1/4 max-h-96"

          start={800}

          end={50}

        >

          <img

            className="size-full object-cover object-[50%_50%]"

            src="https://images.unsplash.com/photo-1705693346612-bbc9f38f1621?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

            alt="street"

          />

        </ParallaxItem>

        <ParallaxItem

          className="w-11/12 md:w-1/4 max-h-96"

          start={500}

          end={50}

        >

          <img

            className="size-full object-cover object-[50%_50%]"

            src="https://images.unsplash.com/photo-1534270804882-6b5048b1c1fc?q=80&w=706&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

            alt="street"

          />

        </ParallaxItem>



        <ParallaxItem

          className="w-11/12 md:w-1/4 max-h-96"

          start={800}

          end={70}

        >

          <img

            className="size-full object-cover object-[50%_50%]"

            src="https://images.unsplash.com/photo-1643451481461-f73ff49a3f93?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

            alt="street"

          />

        </ParallaxItem>

      </PrallaxContainer>
    </Parallax>
  );
}