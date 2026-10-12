import React, { useRef, useState, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Center } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import CircularTeamRing from "./CircularTeamRing";

function CameraRig({ targetDistance }) {
  const { camera, size } = useThree();
  const isMobile = size.width < 640;

  useFrame(() => {
    const effectiveDistance = isMobile ? targetDistance * 1.45 : targetDistance;
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, effectiveDistance, 0.08);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, isMobile ? 1.8 : 2.5, 0.08);
    camera.updateProjectionMatrix();
  });
  return null;
}

export default function TeamCarousel3D({ allTeams }) {
  const ringRef = useRef();
  const [isPaused, setIsPaused] = useState(false);

  const teamKeys = Object.keys(allTeams);
  const [activeTeamKey, setActiveTeamKey] = useState(teamKeys[0]);
  const activeTeam = allTeams[activeTeamKey];

  const [selectedMember, setSelectedMember] = useState(activeTeam?.members[0] || null);

  const handleSelectTeam = (key) => {
    setActiveTeamKey(key);
    setSelectedMember(allTeams[key]?.members[0] || null);
    if (ringRef.current) {
      ringRef.current.rotation.y = 0;
    }
  };

  const rotateStep = (direction) => {
    if (!ringRef.current) return;
    const step = (Math.PI * 2) / (activeTeam.members.length || 1);
    ringRef.current.rotation.y += direction * step;
  };

  const radius = useMemo(() => {
    const count = activeTeam?.members?.length || 0;
    if (count <= 3) return 2.6;
    if (count <= 5) return 3.2;
    return Math.max(3.6, count * 0.6);
  }, [activeTeam]);

  return (
    <section className="mb-24 md:mb-32">
      <div className="max-w-3xl mx-auto text-center mb-6 md:mb-8">
        <p
          className="text-[11px] md:text-xs tracking-[0.3em] uppercase mb-2 font-mono font-semibold"
          style={{ color: activeTeam.color }}
        >
          // {activeTeam.tag}
        </p>
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-2">
          Our People
        </h3>
        <p className="text-slate-500 text-xs sm:text-sm mb-6">
          Swipe horizontally or tap arrows to rotate members. Tap any card for info.
        </p>

        {/* Team Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {teamKeys.map((key) => {
            const isActive = activeTeamKey === key;
            return (
              <button
                key={key}
                onClick={() => handleSelectTeam(key)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                  isActive
                    ? "bg-slate-900 text-white font-bold shadow-md scale-105"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-slate-400 hover:text-slate-900 shadow-sm"
                }`}
              >
                {key} ({allTeams[key].members.length})
              </button>
            );
          })}
        </div>
      </div>

      {/* Dark 3D WebGL Canvas Viewport */}
      <div
        className="relative w-full h-[460px] sm:h-[520px] md:h-[580px] rounded-[24px] md:rounded-[32px] overflow-hidden border border-slate-800 bg-gradient-to-b from-[#111723] via-[#0d121c] to-[#080b11] shadow-[0_25px_60px_-15px_rgba(15,23,42,0.4)]"
        style={{ touchAction: "pan-y" }}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setTimeout(() => setIsPaused(false), 2500)}
      >
        <Canvas
          camera={{ position: [0, 2, 7.5], fov: 48 }}
          gl={{
            antialias: true,
            powerPreference: "high-performance",
          }}
          onCreated={({ gl }) => {
            gl.domElement.addEventListener("webglcontextlost", (e) => e.preventDefault(), false);
          }}
        >
          <ambientLight intensity={0.9} />
          <pointLight position={[10, 15, 10]} intensity={1.8} />
          <pointLight position={[-10, 0, -5]} intensity={0.8} color={activeTeam.color} />
          <spotLight position={[0, 8, 0]} intensity={1.2} angle={0.6} penumbra={1} />

          <CameraRig targetDistance={radius + 4.2} />

          <Suspense fallback={null}>
            <Center>
              <CircularTeamRing
                key={activeTeamKey}
                groupRef={ringRef}
                items={activeTeam.members}
                radius={radius}
                selectedMember={selectedMember}
                onSelect={setSelectedMember}
                accentColor={activeTeam.color}
                isPaused={isPaused}
              />
            </Center>
          </Suspense>

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 2.5}
            maxPolarAngle={Math.PI / 1.9}
            rotateSpeed={0.9}
          />
        </Canvas>

        {/* Step Buttons */}
        <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
          <button
            aria-label="Rotate left"
            onClick={() => rotateStep(1)}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 border border-white/15 flex items-center justify-center text-white text-base transition-all"
          >
            ‹
          </button>
          <button
            aria-label="Rotate right"
            onClick={() => rotateStep(-1)}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 border border-white/15 flex items-center justify-center text-white text-base transition-all"
          >
            ›
          </button>
        </div>

        {/* Selected Member HUD */}
        <AnimatePresence mode="wait">
          {selectedMember && (
            <motion.div
              key={selectedMember.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-auto md:right-8 md:w-80 backdrop-blur-xl bg-[#0d121c]/90 border border-white/15 p-4 rounded-2xl shadow-2xl pointer-events-none z-20"
            >
              <span
                className="text-[9px] uppercase font-mono tracking-widest block mb-1 font-semibold"
                style={{ color: activeTeam.color }}
              >
                {activeTeam.title}
              </span>
              <h4 className="text-base sm:text-lg font-bold text-white leading-tight">
                {selectedMember.name}
              </h4>
              <p className="text-xs text-slate-300 font-medium mt-0.5">
                {selectedMember.role}
              </p>
              <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/10 text-[11px] sm:text-xs text-slate-400 font-mono">
                <span>{selectedMember.degree}</span>
                <span>•</span>
                <span>Exp: {selectedMember.experience}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}