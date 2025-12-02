import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
} from "@react-three/rapier";

const textureLoader = new THREE.TextureLoader();

// Fixed image URLs with proper CORS support
const imageUrls = [
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1566837945684-85db4444e70d?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=400&h=400&fit=crop",
];

// Safe texture loading with error handling
const loadTextures = () => {
  const textures = [];
  imageUrls.forEach((url, index) => {
    try {
      const texture = textureLoader.load(
        url,
        undefined, // onLoad
        undefined, // onProgress
        (error) => {
          console.warn(`Failed to load texture ${index}:`, error);
          // Create a fallback colored texture
          const canvas = document.createElement('canvas');
          canvas.width = 256;
          canvas.height = 256;
          const context = canvas.getContext('2d');
          const hue = (index * 45) % 360;
          context.fillStyle = `hsl(${hue}, 70%, 50%)`;
          context.fillRect(0, 0, 256, 256);
          context.fillStyle = 'white';
          context.font = '48px Arial';
          context.textAlign = 'center';
          context.fillText(`Tech ${index + 1}`, 128, 140);
          const fallbackTexture = new THREE.CanvasTexture(canvas);
          textures[index] = fallbackTexture;
        }
      );
      textures.push(texture);
    } catch (error) {
      console.warn(`Error loading texture ${index}:`, error);
    }
  });
  return textures;
};

const sphereGeometry = new THREE.SphereGeometry(1, 28, 28);

const spheres = [...Array(30)].map(() => ({
  scale: [0.7, 1, 0.8, 1, 1][Math.floor(Math.random() * 5)],
}));

function SphereGeo({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  material,
  isActive,
}) {
  const api = useRef(null);

  useFrame((_state, delta) => {
    if (!isActive || !api.current) return;
    
    try {
      delta = Math.min(0.1, delta);
      const impulse = vec
        .copy(api.current.translation())
        .normalize()
        .multiply(
          new THREE.Vector3(
            -50 * delta * scale,
            -150 * delta * scale,
            -50 * delta * scale
          )
        );

      api.current.applyImpulse(impulse, true);
    } catch (error) {
      console.warn('Error in SphereGeo animation:', error);
    }
  });

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={[r(20), r(20) - 25, r(20) - 10]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeometry}
        material={material}
        rotation={[0.3, 1, 1]}
      />
    </RigidBody>
  );
}

function Pointer({ vec = new THREE.Vector3(), isActive }) {
  const ref = useRef();

  useFrame(({ pointer, viewport }) => {
    if (!isActive || !ref.current) return;
    
    try {
      const targetVec = vec.lerp(
        new THREE.Vector3(
          (pointer.x * viewport.width) / 2,
          (pointer.y * viewport.height) / 2,
          0
        ),
        0.2
      );
      ref.current.setNextKinematicTranslation(targetVec);
    } catch (error) {
      console.warn('Error in Pointer animation:', error);
    }
  });

  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

const TechStack = () => {
  const [isActive, setIsActive] = useState(false);
  const [texturesLoaded, setTexturesLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      try {
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        const workElement = document.getElementById("work");
        
        if (workElement) {
          const rect = workElement.getBoundingClientRect();
          const threshold = rect.top + window.scrollY;
          setIsActive(scrollY > threshold);
        }
      } catch (error) {
        console.warn('Error in scroll handler:', error);
      }
    };

    // Safe event listener setup
    try {
      document.querySelectorAll(".header a").forEach((elem) => {
        elem.addEventListener("click", () => {
          const interval = setInterval(() => {
            handleScroll();
          }, 10);
          setTimeout(() => {
            clearInterval(interval);
          }, 1000);
        });
      });
    } catch (error) {
      console.warn('Error setting up click listeners:', error);
    }
    
    window.addEventListener("scroll", handleScroll);
    
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const materials = useMemo(() => {
    const loadedTextures = loadTextures();
    setTexturesLoaded(true);
    
    return loadedTextures.map(
      (texture) =>
        new THREE.MeshPhysicalMaterial({
          map: texture,
          emissive: "#ffffff",
          emissiveMap: texture,
          emissiveIntensity: 0.3,
          metalness: 0.5,
          roughness: 1,
          clearcoat: 0.1,
        })
    );
  }, []);

  return (
    <div className="w-full h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center items-center">
        <div className="text-center mb-8">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            My Tech Stack
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore the technologies and tools I work with through this interactive 3D experience
          </p>
        </div>

        <div className="w-full h-2/3 rounded-2xl overflow-hidden border border-white/10 shadow-2xl backdrop-blur-sm bg-white/5">
          {texturesLoaded ? (
            <Canvas
              shadows
              gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
              camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
              onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
              className="w-full h-full"
            >
              <ambientLight intensity={1} />
              <spotLight
                position={[20, 20, 25]}
                penumbra={1}
                angle={0.2}
                color="white"
                castShadow
                shadow-mapSize={[512, 512]}
              />
              <directionalLight position={[0, 5, -4]} intensity={2} />
              <Physics gravity={[0, 0, 0]}>
                <Pointer isActive={isActive} />
                {spheres.map((props, i) => (
                  <SphereGeo
                    key={i}
                    {...props}
                    material={materials[Math.floor(Math.random() * materials.length)]}
                    isActive={isActive}
                  />
                ))}
              </Physics>
              <Environment
                preset="city"
                environmentIntensity={0.5}
                environmentRotation={[0, 4, 2]}
              />
              <EffectComposer enableNormalPass={false}>
                <N8AO color="#0f002c" aoRadius={2} intensity={1.15} />
              </EffectComposer>
            </Canvas>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-white text-xl">Loading 3D Experience...</div>
            </div>
          )}
        </div>

        {/* Instruction text */}
        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            {isActive 
              ? "Move your cursor to interact with the spheres" 
              : "Scroll down to activate the animation"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TechStack;