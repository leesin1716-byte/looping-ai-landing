"use client";
import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import type { Group, Mesh, PointLight } from "three";

/**
 * Cursor-reactive neon core: a distorting inner blob inside a counter-rotating
 * wireframe shell. It tracks the global pointer (so it reacts even though the
 * canvas itself is pointer-events:none, which keeps the hero CTAs clickable):
 * the group leans toward the cursor and a neon light follows it.
 */
function Scene() {
  const group = useRef<Group>(null);
  const core = useRef<Mesh>(null);
  const shell = useRef<Mesh>(null);
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
      g.rotation.y += (x * 0.7 - g.rotation.y) * 0.06;
      g.rotation.x += (-y * 0.5 - g.rotation.x) * 0.06;
      g.position.x += (1.5 + x * 0.45 - g.position.x) * 0.05;
      g.position.y += (y * 0.45 - g.position.y) * 0.05;
    }
    if (core.current) core.current.rotation.y += delta * 0.15;
    if (shell.current) {
      shell.current.rotation.y -= delta * 0.22;
      shell.current.rotation.x += delta * 0.07;
    }
    if (light.current) {
      light.current.position.x = x * 4;
      light.current.position.y = y * 4;
    }
  });

  return (
    <group ref={group} position={[1.5, 0, 0]}>
      <mesh ref={core} scale={1.35}>
        <icosahedronGeometry args={[1, 18]} />
        <MeshDistortMaterial
          color="#8b5cf6"
          emissive="#5b21b6"
          emissiveIntensity={0.55}
          roughness={0.15}
          metalness={0.75}
          distort={0.4}
          speed={2}
        />
      </mesh>
      <mesh ref={shell} scale={2}>
        <icosahedronGeometry args={[1, 2]} />
        <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.1} />
      </mesh>
      <pointLight
        ref={light}
        position={[3, 2, 4]}
        intensity={130}
        color="#22d3ee"
        decay={2}
      />
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
      <ambientLight intensity={0.6} />
      <pointLight position={[-5, -2, 3]} intensity={90} color="#d946ef" decay={2} />
      <pointLight position={[0, 4, 4]} intensity={70} color="#a78bfa" decay={2} />
      <Scene />
    </Canvas>
  );
}
