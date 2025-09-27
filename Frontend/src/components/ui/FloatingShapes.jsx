'use client';

import { motion } from 'framer-motion';

export default function FloatingShapes() {
  const shapes = [
    { size: 40, x: 50, y: 20, color: 'rgba(255,255,255,0.1)' },
    { size: 60, x: 200, y: 80, color: 'rgba(255,255,255,0.08)' },
    { size: 30, x: 400, y: 150, color: 'rgba(255,255,255,0.12)' },
    { size: 50, x: 600, y: 40, color: 'rgba(255,255,255,0.07)' },
    { size: 70, x: 800, y: 100, color: 'rgba(255,255,255,0.05)' },
  ];

  return (
    <>
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: shape.size,
            height: shape.size,
            backgroundColor: shape.color,
            top: shape.y,
            left: shape.x,
            zIndex: 0,
          }}
          animate={{
            y: [0, 15, 0],
            x: [0, -10, 0],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
        />
      ))}
    </>
  );
}
