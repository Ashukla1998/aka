import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, RoundedBox, Html } from "@react-three/drei";

export default function CarouselItem({
  member,
  angle,
  radius,
  index,
  isSelected,
  onSelect,
  accentColor,
  isMobile,
}) {
  const meshRef = useRef();

  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;
  const rotationY = -angle + Math.PI / 2;

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    meshRef.current.position.y =
      Math.sin(time * 1.5 + index * 0.7) * (isMobile ? 0.04 : 0.08);
  });

  const cardW = isMobile ? 1.4 : 1.6;
  const cardH = isMobile ? 2.1 : 2.4;

  const imageSrc =
    typeof member.photo === "object" && member.photo !== null
      ? member.photo.default || member.photo.src || ""
      : member.photo;

  return (
    <group
      ref={meshRef}
      position={[x, 0, z]}
      rotation={[0, rotationY, 0]}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(member);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "auto";
      }}
    >
      {/* 3D Rounded Card Bezel */}
      <RoundedBox
        args={[cardW, cardH, 0.06]}
        radius={0.1}
        smoothness={4}
        position={[0, 0, -0.02]}
      >
        <meshStandardMaterial
          color={isSelected ? accentColor : "#141c2b"}
          metalness={0.6}
          roughness={0.25}
          emissive={isSelected ? accentColor : "#000000"}
          emissiveIntensity={isSelected ? 0.35 : 0}
        />
      </RoundedBox>

      {/* 3D HTML Photo Plane */}
      <Html
        position={[0, isMobile ? 0.28 : 0.32, 0.04]}
        transform
        distanceFactor={isMobile ? 1.7 : 2.0}
        zIndexRange={[100, 0]}
        pointerEvents="none"
      >
        {/* CRITICAL: transform: translate(-50%, -50%) counters the top-left HTML origin */}
        <div
          style={{
            transform: "translate(-50%, -50%)",
            width: isMobile ? "140px" : "170px",
            height: isMobile ? "145px" : "180px",
            borderRadius: "14px",
            overflow: "hidden",
            backgroundColor: "#0f172a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 10px 25px rgba(0,0,0,0.6)",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={member.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "top center",
                display: "block",
              }}
              onError={(e) => {
                e.target.style.display = "none";
                if (e.target.nextSibling) {
                  e.target.nextSibling.style.display = "flex";
                }
              }}
            />
          ) : null}

          {/* Fallback avatar if photo fails to load */}
          <div
            style={{
              display: imageSrc ? "none" : "flex",
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #ff6600, #c2410c)",
              color: "#ffffff",
              fontSize: "40px",
              fontWeight: "bold",
              fontFamily: "sans-serif",
            }}
          >
            {member.name
              ? member.name
                  .replace(/^Ar\s+/i, "")
                  .replace(/^Er\s+/i, "")
                  .charAt(0)
                  .toUpperCase()
              : "?"}
          </div>
        </div>
      </Html>

      {/* Member Name */}
      <Text
        position={[0, isMobile ? -0.58 : -0.68, 0.05]}
        fontSize={isMobile ? 0.1 : 0.115}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={cardW - 0.2}
      >
        {member.name}
      </Text>

      {/* Member Role / Degree */}
      <Text
        position={[0, isMobile ? -0.78 : -0.9, 0.05]}
        fontSize={isMobile ? 0.07 : 0.08}
        color={isSelected ? "#ffffff" : "#94a3b8"}
        anchorX="center"
        anchorY="middle"
        maxWidth={cardW - 0.2}
      >
        {member.role || member.degree}
      </Text>
    </group>
  );
}