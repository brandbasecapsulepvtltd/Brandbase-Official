import { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

// ----------------------------
// 3D MODEL COMPONENT
// ----------------------------
function StallModel({ modelRef }) {
  const { scene } = useGLTF("/stall.glb"); // Load model from PUBLIC folder

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={3.5}
      position={[1, -5, 5]}
    />
  );
}

// ----------------------------
// RESTRICT ROTATION HORIZONTALLY
// ----------------------------
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

// ----------------------------
// MAIN ABOUT SECTION COMPONENT
// ----------------------------
export default function AboutSection() {
  const modelRef = useRef();
  const controlsRef = useRef();

  return (
    <section className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* ---------------------- */}
          {/* LEFT SIDE — 3D MODEL   */}
          {/* ---------------------- */}
          <div className="w-full h-80 sm:h-96 lg:h-[500px] rounded-lg overflow-hidden">
            <Canvas
              camera={{
                position: [6, 60, 25],
                fov: 22,
              }}
              style={{ width: "100%", height: "100%" }}
            >
              <ambientLight intensity={0.8} />
              <directionalLight position={[10, 15, 10]} intensity={1.2} />

              <StallModel modelRef={modelRef} />

              <HorizontalOrbitControls controlsRef={controlsRef} />
            </Canvas>

            <div className="text-center mt-2 text-sm text-gray-600">
              Drag left or right to rotate the model
            </div>
          </div>

          {/* ---------------------- */}
          {/* RIGHT SIDE — TEXT      */}
          {/* ---------------------- */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                About Us
              </h2>
              <h3 className="text-2xl lg:text-3xl font-semibold text-blue-600">
                Letting You Have The Best Brand
              </h3>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-gray-900">450+</div>
                <div className="text-gray-600 mt-2">Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-gray-900">900+</div>
                <div className="text-gray-600 mt-2">Projects Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-gray-900">4.9★</div>
                <div className="text-gray-600 mt-2">Google Rating</div>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-lg text-gray-700 leading-relaxed">
                We're not some ordinary digital marketing whales. Think of us as your team
                players. We spend hours researching to understand exactly what you need.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We make use of the latest digital strategies to truly understand
                the minds of consumers.
              </p>
            </div>

            <div className="pt-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105">
                Know More
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

useGLTF.preload("/stall.glb");
