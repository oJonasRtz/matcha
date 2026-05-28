"use client";

import React, { useEffect, useRef, useState } from "react";

type Props = {
  lat?: number | null;
  lng?: number | null;
  onSelect?: (data: { lat: number; lng: number; name: string }) => void;
};

export default function GlobeDiscover({ lat = null, lng = null, onSelect }: Props) {
  const globeRef = useRef<any>(null);
  const [GlobeComp, setGlobeComp] = useState<any>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    // Use runtime import via eval to avoid static bundler resolution at build time.
    // If the package isn't installed in the build environment, this will fail at runtime
    // and we fall back to the static visual.
    try {
      // eslint-disable-next-line no-eval
      eval("import('react-globe.gl')")
        .then((mod: any) => {
          if (!mounted) return;
          setGlobeComp(() => mod.default || mod);
        })
        .catch(() => {
          // ignore - fallback will be used
        })
        .finally(() => setLoaded(true));
    } catch (e) {
      setLoaded(true);
    }

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!GlobeComp || !globeRef.current) return;
    // ensure non-interactive and autoplay rotation
    try {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.4;
      globeRef.current.controls().enableRotate = false;
      globeRef.current.controls().enableZoom = false;
    } catch {}

    if (lat !== null && lng !== null) {
      globeRef.current.pointOfView({ lat, lng, altitude: 1.5 }, 1500);
    }
  }, [GlobeComp, lat, lng]);

  if (!loaded) {
    return (
      <div className="h-full w-full grid place-items-center text-white/60">Loading globe…</div>
    );
  }

  if (!GlobeComp) {
    // fallback static visual when react-globe.gl isn't available
    return (
      <div className="h-[320px] w-[320px] rounded-full border border-white/10 bg-gradient-to-br from-sky-700/20 to-black/60 shadow-lg" />
    );
  }

  return (
    <div className="h-[320px] w-full">
      {/* @ts-ignore - dynamic import */}
      <GlobeComp
        ref={globeRef}
        globeImageUrl="https://unpkg.com/three-globe/example/img/earth-dark.jpg"
        showGlobe={true}
        showAtmosphere={true}
        atmosphereColor="#ffccd5"
        backgroundColor="rgba(0,0,0,0)"
        htmlElementsData={lat && lng ? [{ lat, lng, name: "selected" }] : []}
        htmlElement={(d: any) => {
          const el = document.createElement("div");
          el.className = "rounded-full bg-red-500/70 p-1 text-white text-xs";
          el.innerText = "•";
          return el;
        }}
        width={640}
        height={640}
      />
    </div>
  );
}
