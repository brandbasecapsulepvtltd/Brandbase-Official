import { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { motion } from "framer-motion";

// 3D MODEL COMPONENT
function StallModel({ modelRef }) {
  const { scene } = useGLTF("/stall.glb");

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={3.5}
      position={[1, -7, 5]}
    />
  );
}

// RESTRICT ROTATION HORIZONTALLY
function HorizontalOrbitControls({ controlsRef }) {
  const controls = useRef();

  useEffect(() => {
    if (controls.current) {
      controls.current.minPolarAngle = Math.PI / 2;
      controls.current.maxPolarAngle = Math.PI / 2;
      controls.current.enableZoom = false;
      controls.current.enableRotate = true;
    }
  }, []);

  return (
    <OrbitControls
      ref={(ref) => {
        controls.current = ref;
        if (controlsRef) controlsRef.current = ref;
      }}
      enablePan={false}
      enableZoom={false}
      minPolarAngle={Math.PI / 2}
      maxPolarAngle={Math.PI / 2}
    />
  );
}

// MAIN ABOUT SECTION COMPONENT
export default function AboutSection() {
  const modelRef = useRef();
  const controlsRef = useRef();

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif">
            Bringing Your <span className="text-[#FF6600]">Brand Vision</span> to Life
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            We're not just another exhibition stall company. We're your creative partners in bringing brand experiences to life.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* LEFT SIDE - 3D MODEL */}
          <motion.div 
            className="w-full h-80 sm:h-96 lg:h-[500px] rounded-2xl overflow-hidden"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7 }}
          >
            <Canvas
              camera={{
                position: [6, 60, 25],
                fov: 22,
              }}
              style={{ width: "100%", height: "75%" }}
              className="bg-orange-200"
            >
              <ambientLight intensity={0.8} />
              <directionalLight position={[10, 15, 10]} intensity={1.2} />

              <StallModel modelRef={modelRef} />

              <HorizontalOrbitControls controlsRef={controlsRef} />
            </Canvas>
          </motion.div>

          {/* RIGHT SIDE - TEXT CONTENT */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7 }}
          >
            <div className="space-y-4">
              <p className="text-lg text-gray-700 leading-relaxed">
                We spend time understanding your vision to create stunning stalls that truly represent your brand. 
                Our team combines innovative design with practical functionality to create exhibition spaces that 
                captivate audiences and drive meaningful engagement.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                From concept to completion, we ensure every detail aligns with your brand identity and exhibition goals, 
                creating memorable experiences that leave lasting impressions.
              </p>
            </div>

            {/* Features List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {[
                "Custom Design Solutions",
                "Brand-Centric Approach",
                "Quality Craftsmanship",
                "Timely Delivery"
              ].map((feature, index) => (
                <div key={feature} className="flex items-center gap-3 group">
                  <div className="flex-shrink-0 w-6 h-6 bg-[#FF6600] text-white rounded-full flex items-center justify-center text-xs font-bold group-hover:scale-110 transition-transform duration-300">
                    ✓
                  </div>
                  <span className="font-medium text-gray-900 group-hover:text-[#FF6600] transition-colors duration-300">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.a
              href="/contact"
              className="inline-block mt-8 px-8 py-4 bg-[#FF6600] text-white font-semibold rounded-xl hover:bg-orange-600 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Project
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

useGLTF.preload("/stall.glb");