"use client";
import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { Group, Mesh, PointLight } from "three";

/**
 * Cursor-reactive neon crystal: a faceted (flat-shaded) icosahedron core inside
 * a wireframe cage with an orbiting neon ring. Tracks the global pointer (the
 * canvas is pointer-events:none so hero CTAs stay clickable): the group leans
 * toward the cursor and a neon light follows it. Dark-integrated, no jelly.
 */
function Scene() {
  const group = useRef<Group>(null);
  const crystal = useRef<Mesh>(null);
  const cage = useRef<Mesh>(null);
  const ring = useRef<Mesh>(null);
  const light = useRef<PointLight>(null);
  const ptr = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      ptr.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      ptr.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((_, delta) => {
    const { x, y } = ptr.current;
    const g = group.current;
    if (g) {
      g.rotation.y += (x * 0.6 - g.rotation.y) * 0.05;
      g.rotation.x += (-y * 0.45 - g.rotation.x) * 0.05;
      g.position.x += (1.5 + x * 0.4 - g.position.x) * 0.05;
      g.position.y += (y * 0.4 - g.position.y) * 0.05;
    }
    if (crystal.current) crystal.current.rotation.y += delta * 0.25;
    if (cage.current) {
      cage.current.rotation.y -= delta * 0.18;
      cage.current.rotation.x += delta * 0.06;
    }
    if (ring.current) ring.current.rotation.z += delta * 0.5;
    if (light.current) {
      light.current.position.x = x * 4;
      light.current.position.y = y * 4;
    }
  });

  return (
    <group ref={group} position={[1.5, 0, 0]}>
      {/* faceted neon crystal */}
      <mesh ref={crystal} scale={1.4}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#a78bfa"
          metalness={0.6}
          roughness={0.18}
          flatShading
          emissive="#4c1d95"
          emissiveIntensity={0.45}
        />
      </mesh>

      {/* wireframe cage */}
      <mesh ref={cage} scale={1.95}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.12} />
      </mesh>

      {/* orbiting neon ring */}
      <mesh ref={ring} rotation={[1.2, 0.4, 0]} scale={2.25}>
        <torusGeometry args={[1, 0.012, 12, 120]} />
        <meshBasicMaterial color="#d946ef" transparent opacity={0.55} />
      </mesh>

      <pointLight ref={light} position={[3, 2, 4]} intensity={130} color="#22d3ee" decay={2} />
    </group>
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
      <ambientLight intensity={0.5} />
      <pointLight position={[-5, -2, 3]} intensity={100} color="#d946ef" decay={2} />
      <pointLight position={[2, 5, 4]} intensity={90} color="#8b5cf6" decay={2} />
      <Scene />
    </Canvas>
  );
}
