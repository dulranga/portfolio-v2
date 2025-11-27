"use client";

import { useMemo, useState } from "react";
import {
  AwsIcon,
  BunIcon,
  DockerIcon,
  GitIcon,
  HtmlIcon,
  JavaScriptIcon,
  NodeIcon,
  ReactIcon,
  ViteIcon,
} from "./icons";
import { cn } from "~/lib/utils";

interface IconItem {
  id: number;
  Icon: React.ComponentType<{ className?: string }>;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  blur: number;
  opacity: number;
  zIndex: number;
  animationClass: string;
  animationDuration: number;
  animationDelay: number;
}

export function IconsBackground() {
  const [mounted, setMounted] = useState(false);

  // Generate icons on mount to avoid hydration mismatch
  const iconItems = useMemo(() => {
    // Precomputed random depth values for each icon (0 to 1)
    // Higher depth = closer/larger, lower depth = farther/smaller
    const depths = [0.65, 0.38, 0.92, 0.45, 0.72, 0.55, 0.35, 0.88, 0.42];

    const getSizeFromDepth = (depth: number) => {
      if (depth < 0.5) return 140; // Small
      if (depth < 0.75) return 170; // Medium
      return 200; // Large
    };

    const getBlurFromDepth = (depth: number) => {
      if (depth < 0.5) return 6; // Blurred
      if (depth < 0.75) return 2; // Slightly blurred
      return 0; // Sharp
    };

    const getOpacityFromDepth = (depth: number) => {
      if (depth < 0.5) return 0.28; // Far
      if (depth < 0.75) return 0.32; // Mid
      return 0.36; // Close
    };

    const getZIndexFromDepth = (depth: number) => {
      return Math.floor(depth * 10) + 1;
    };

    const icons = [
      { Icon: AwsIcon, x: 92, y: 58 },
      { Icon: BunIcon, x: 82, y: 79 },
      { Icon: DockerIcon, x: 63, y: 89 },
      { Icon: GitIcon, x: 30, y: 88 },
      { Icon: HtmlIcon, x: 11, y: 56 },
      { Icon: JavaScriptIcon, x: 20, y: 40 },
      { Icon: NodeIcon, x: 36, y: 15 },
      { Icon: ReactIcon, x: 63, y: 13 },
      { Icon: ViteIcon, x: 83, y: 20 },
    ];

    const items: IconItem[] = icons.map((icon, index) => {
      const depth = depths[index];
      const width = getSizeFromDepth(depth);
      const height = getSizeFromDepth(depth);
      const blur = getBlurFromDepth(depth);
      const opacity = getOpacityFromDepth(depth);
      const zIndex = getZIndexFromDepth(depth);
      const animationDuration = 15 + Math.random() * 20;
      const animationDelay = Math.random() * 5;

      return {
        id: index,
        Icon: icon.Icon,
        x: icon.x,
        y: icon.y,
        width,
        height,

        blur,
        opacity,
        zIndex,
        animationClass:
          index % 2 === 0 ? "animate-float" : "animate-float-slow",
        animationDuration,
        animationDelay,
      };
    });

    return items;
  }, []);

  // Set mounted after component mounts
  if (typeof window !== "undefined" && !mounted) {
    setTimeout(() => setMounted(true), 0);
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {iconItems.map((item) => (
        <div
          key={item.id}
          className={cn(
            "absolute transition-opacity duration-1000 opacity-0 scale-50 md:scale-100",
            item.animationClass,
            { "opacity-100": mounted },
          )}
          style={
            {
              left: `${item.x}%`,
              top: `${item.y}%`,
              width: `${item.width}px`,
              height: `${item.height}px`,
              transform: `translate(-50%, -50%)`,
              filter: `blur(${item.blur}px)`,
              opacity: mounted ? item.opacity : 0,
              zIndex: item.zIndex,
              "--duration": `${item.animationDuration}s`,
              "--delay": `${item.animationDelay}s`,
            } as React.CSSProperties
          }
        >
          <item.Icon className="w-full h-full" />
        </div>
      ))}
    </div>
  );
}
