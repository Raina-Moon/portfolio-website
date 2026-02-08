import { Canvas } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import { Suspense } from "react";

function Moon() {
  const [colorMap, bumpMap] = useTexture([
    "/images/moon_color.jpg",
    "/images/moon_color.jpg",
  ]);

  return (
    <mesh>
      <sphereGeometry args={[2, 128, 128]} />
      <meshStandardMaterial
        map={colorMap}
        bumpMap={bumpMap}
        bumpScale={0.04}
        roughness={0.9}
        metalness={0}
      />
    </mesh>
  );
}

const MoonScene = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 42 }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 3, 5]} intensity={1.5} />
      <directionalLight position={[-3, -1, -2]} intensity={0.15} />
      <Suspense fallback={null}>
        <Moon />
      </Suspense>
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        autoRotate={true}
        autoRotateSpeed={0.5}
        minDistance={4}
        maxDistance={12}
      />
    </Canvas>
  );
};

export default MoonScene;
