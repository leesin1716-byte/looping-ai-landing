"use client";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import type { Mesh } from "three";

/** A neon, slowly-distorting blob that drifts toward the cursor. */
function Blob() {
  const ref = useRef<Mesh>(null);
  useFrame((state, delta) => {
    const m = ref.current;
    if (!m) return;
    m.rotation.x += delta * 0.1;
    m.rotation.y += delta * 0.16;
    // gentle parallax toward the pointer
    m.position.x += (1.6 + state.pointer.x * 0.35 - m.position.x) * 0.05;
    m.position.y += (state.pointer.y * 0.35 - m.position.y) * 0.05;
  });
  return (
    <mesh ref={ref} position={[1.6, 0, 0]} scale={1.45}>
      <icosahedronGeometry args={[1, 16]} />
      <MeshDistortMaterial
        color="#8b5cf6"
        emissive="#5b21b6"
        emissiveIntensity={0.55}
        roughness={0.18}
        metalness={0.7}
        distort={0.45}
        speed={1.7}
      />
    </mesh>
  );
}

export default function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[6, 3, 5]} intensity={140} color="#22d3ee" decay={2} />
      <pointLight position={[-5, -2, 3]} intensity={110} color="#d946ef" decay={2} />
      <pointLight position={[0, 4, 4]} intensity={80} color="#a78bfa" decay={2} />
      <Blob />
    </Canvas>
  );
}
