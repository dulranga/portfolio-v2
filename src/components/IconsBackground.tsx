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

interface IconItem {
  id: number;
  Icon: React.ComponentType<{ className?: string }>;
  x: number;
  y: number;
  sizeClass: string;
  rotation: number;
  blurClass: string;
  opacityClass: string;
  zIndex: number;
  animationClass: string;
  animationDuration: number;
  animationDelay: number;
}

export function IconsBackground() {
  const [mounted, setMounted] = useState(false);

  // Generate icons on mount to avoid hydration mismatch
  const iconItems = useMemo(() => {
    // const items: IconItem[] = [];
    // const centerX = 50; // Center of viewport (%)
    // const centerY = 50; // Center of viewport (%)

    // // Create circular arrangement around center
    // // Varying radii for more organic feel
    // const radii = [32, 38, 42]; // Different circle sizes (% from center)

    // icons.forEach((Icon, index) => {
    //   // Calculate angle for even distribution around circle
    //   const angleStep = (2 * Math.PI) / icons.length;
    //   const baseAngle = index * angleStep;

    //   // Add slight randomness to angle (±15 degrees)
    //   const angleVariation = (Math.random() - 0.5) * (Math.PI / 6);
    //   const angle = baseAngle + angleVariation;

    //   // Random depth value (0 to 1, where 0 is far back, 1 is front)
    //   const depth = 0.3 + Math.random() * 0.7; // 0.3-1.0 for better visibility

    //   // Choose radius based on depth (closer icons have larger radius)
    //   const radiusIndex = Math.floor(depth * radii.length);
    //   const baseRadius = radii[Math.min(radiusIndex, radii.length - 1)];

    //   // Add variation to radius (±5%)
    //   const radiusVariation = baseRadius * (Math.random() - 0.5) * 0.1;
    //   const radius = baseRadius + radiusVariation;

    //   // Calculate position using circular coordinates
    //   const x = centerX + radius * Math.cos(angle);
    //   const y = centerY + radius * Math.sin(angle);

    //   // Size correlates with depth: smaller in back, larger in front
    //   // Use Tailwind size classes
    //   let sizeClass: string;
    //   if (depth < 0.45) {
    //     sizeClass = "w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32"; // Small
    //   } else if (depth < 0.7) {
    //     sizeClass = "w-24 h-24 md:w-28 md:h-28 lg:w-36 lg:h-36 xl:w-40 xl:h-40"; // Medium
    //   } else {
    //     sizeClass = "w-28 h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 xl:w-52 xl:h-52"; // Large
    //   }

    //   // Blur inversely correlates with depth
    //   const blurClass =
    //     depth < 0.45 ? "blur-md" : depth < 0.7 ? "blur-sm" : "blur-none";

    //   // Opacity correlates with depth
    //   let opacityClass: string;
    //   if (depth < 0.45) {
    //     opacityClass = "opacity-20";
    //   } else if (depth < 0.7) {
    //     opacityClass = "opacity-30";
    //   } else {
    //     opacityClass = "opacity-40";
    //   }

    //   // Z-index based on depth
    //   const zIndex = Math.floor(depth * 10) + 1;

    //   // Random rotation
    //   const rotation = Math.random() * 360;

    //   // Random animation duration and delay for floating effect
    //   const animationDuration = 15 + Math.random() * 20;
    //   const animationDelay = Math.random() * 5;

    //   // Alternate animation types
    //   const animationClass =
    //     index % 2 === 0 ? "animate-float" : "animate-float-slow";

    //   items.push({
    //     id: index,
    //     Icon,
    //     IconN: Icon.name,
    //     x,
    //     y,
    //     sizeClass,
    //     rotation,
    //     blurClass,
    //     opacityClass,
    //     zIndex,
    //     animationClass,
    //     animationDuration,
    //     animationDelay,
    //   });
    // });

    const items: IconItem[] = [
      {
        id: 0,
        Icon: AwsIcon,
        x: 92,
        y: 58,
        sizeClass: "w-28 h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 xl:w-52 xl:h-52",
        rotation: 141,
        blurClass: "blur-none",
        opacityClass: "opacity-40",
        zIndex: 8,
        animationClass: "animate-float",
        animationDuration: 30,
        animationDelay: 3,
      },
      {
        id: 1,
        Icon: BunIcon,
        x: 82,
        y: 79,
        sizeClass: "w-28 h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 xl:w-52 xl:h-52",
        rotation: 230,
        blurClass: "blur-none",
        opacityClass: "opacity-40",
        zIndex: 10,
        animationClass: "animate-float-slow",
        animationDuration: 25,
        animationDelay: 2,
      },
      {
        id: 2,
        Icon: DockerIcon,
        x: 63,
        y: 89,
        sizeClass: "w-28 h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 xl:w-52 xl:h-52",
        rotation: 262,
        blurClass: "blur-none",
        opacityClass: "opacity-40",
        zIndex: 8,
        animationClass: "animate-float",
        animationDuration: 29,
        animationDelay: 2,
      },
      {
        id: 3,
        Icon: GitIcon,
        x: 30,
        y: 88,
        sizeClass: "w-28 h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 xl:w-52 xl:h-52",
        rotation: 262,
        blurClass: "blur-none",
        opacityClass: "opacity-40",
        zIndex: 9,
        animationClass: "animate-float-slow",
        animationDuration: 24,
        animationDelay: 2,
      },
      {
        id: 4,
        Icon: HtmlIcon,
        x: 11,
        y: 56,
        sizeClass: "w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32",
        rotation: 167,
        blurClass: "blur-md",
        opacityClass: "opacity-20",
        zIndex: 4,
        animationClass: "animate-float",
        animationDuration: 21,
        animationDelay: 1,
      },
      {
        id: 5,
        Icon: JavaScriptIcon,
        x: 20,
        y: 40,
        sizeClass: "w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32",
        rotation: 258,
        blurClass: "blur-md",
        opacityClass: "opacity-20",
        zIndex: 4,
        animationClass: "animate-float-slow",
        animationDuration: 23,
        animationDelay: 3,
      },
      {
        id: 6,
        Icon: NodeIcon,
        x: 36,
        y: 15,
        sizeClass: "w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32",
        rotation: 30,
        blurClass: "blur-md",
        opacityClass: "opacity-20",
        zIndex: 4,
        animationClass: "animate-float",
        animationDuration: 17,
        animationDelay: 0,
      },
      {
        id: 7,
        Icon: ReactIcon,
        x: 63,
        y: 13,
        sizeClass: "w-24 h-24 md:w-28 md:h-28 lg:w-36 lg:h-36 xl:w-40 xl:h-40",
        rotation: 129,
        blurClass: "blur-sm",
        opacityClass: "opacity-30",
        zIndex: 5,
        animationClass: "animate-float-slow",
        animationDuration: 19,
        animationDelay: 3,
      },
      {
        id: 8,
        Icon: ViteIcon,
        x: 83,
        y: 20,
        sizeClass: "w-24 h-24 md:w-28 md:h-28 lg:w-36 lg:h-36 xl:w-40 xl:h-40",
        rotation: 78,
        blurClass: "blur-sm",
        opacityClass: "opacity-30",
        zIndex: 7,
        animationClass: "animate-float",
        animationDuration: 19,
        animationDelay: 4,
      },
    ];
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
          className={`absolute ${item.sizeClass} ${item.blurClass} ${item.opacityClass} ${item.animationClass} transition-opacity duration-1000 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
          style={
            {
              left: `${item.x}%`,
              top: `${item.y}%`,
              transform: `translate(-50%, -50%) rotate(0deg)`,
              zIndex: item.zIndex,
              "--rotation": `0deg`,
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
