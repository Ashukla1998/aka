import React from "react";
import { useFrame, useThree } from "@react-three/fiber";
import CarouselItem from "./CarouselItem";

export default function CircularTeamRing({
  items,
  radius,
  selectedMember,
  onSelect,
  accentColor,
  groupRef,
  isPaused,
}) {
  const { size } = useThree();
  const isMobile = size.width < 640;

  useFrame((_, delta) => {
    if (groupRef.current && !isPaused) {
      groupRef.current.rotation.y += delta * 0.12;
    }
  });

  const count = items.length;

  return (
    <group ref={groupRef}>
      {items.map((member, i) => {
        const angle = (i / count) * Math.PI * 2;
        const isSelected = selectedMember?.name === member.name;

        return (
          <CarouselItem
            key={member.name || i}
            member={member}
            angle={angle}
            radius={radius}
            index={i}
            isSelected={isSelected}
            onSelect={onSelect}
            accentColor={accentColor}
            isMobile={isMobile}
          />
        );
      })}
    </group>
  );
}