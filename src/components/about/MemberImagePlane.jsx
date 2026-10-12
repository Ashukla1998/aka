import React, { useState, useEffect } from "react";
import * as THREE from "three";

export default function MemberImagePlane({ photoUrl, name, width = 1.34, height = 1.4 }) {
  const [texture, setTexture] = useState(null);

  useEffect(() => {
    let isMounted = true;

    // Resolve webpack / file-loader / CRA module formats
    let src = photoUrl;
    if (typeof photoUrl === "object" && photoUrl !== null) {
      src = photoUrl.default || photoUrl.src || "";
    }

    // Fallback: Elegant initials avatar if an image cannot load
    function makeInitialsTexture() {
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext("2d");

      // Dark card surface
      ctx.fillStyle = "#1e293b";
      ctx.fillRect(0, 0, 512, 512);

      // Radial glowing disc
      const gradient = ctx.createRadialGradient(256, 256, 20, 256, 256, 200);
      gradient.addColorStop(0, "#ff7722");
      gradient.addColorStop(1, "#c2410c");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(256, 256, 140, 0, Math.PI * 2);
      ctx.fill();

      // Initial
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 150px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const initial = name ? name.replace(/^Ar\s+/i, "").replace(/^Er\s+/i, "").charAt(0).toUpperCase() : "?";
      ctx.fillText(initial, 256, 265);

      const tex = new THREE.CanvasTexture(canvas);
      tex.needsUpdate = true;
      if (isMounted) setTexture(tex);
    }

    if (!src) {
      makeInitialsTexture();
      return;
    }

    // Native HTML Image Loader -> Guarantees decode before WebGL upload
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;

    img.onload = () => {
      if (!isMounted) return;
      const tex = new THREE.Texture(img);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.generateMipmaps = true;
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      tex.needsUpdate = true;
      setTexture(tex);
    };

    img.onerror = (err) => {
      console.warn(`[MemberImagePlane] Failed to load image for ${name} at path:`, src, err);
      makeInitialsTexture();
    };

    return () => {
      isMounted = false;
      if (texture) {
        texture.dispose();
      }
    };
  }, [photoUrl, name]);

  return (
    // Z-offset is 0.05 to guarantee it renders in front of the card bezel
    <mesh position={[0, 0, 0.05]}>
      <planeGeometry args={[width, height]} />
      {texture ? (
        <meshBasicMaterial
          map={texture}
          transparent={true}
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      ) : (
        <meshBasicMaterial color="#1e293b" side={THREE.DoubleSide} />
      )}
    </mesh>
  );
}