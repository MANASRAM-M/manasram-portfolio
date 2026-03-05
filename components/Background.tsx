'use client';

import React from 'react';
import { motion } from 'framer-motion';

const blobTransition = {
  duration: 26,
  repeat: Infinity,
  repeatType: 'mirror' as const,
  ease: 'easeInOut',
};

const particleTransition = {
  duration: 20,
  repeat: Infinity,
  repeatType: 'loop' as const,
  ease: 'linear',
};

const particles = Array.from({ length: 24 }).map((_, index) => ({
  id: index,
  left: `${(index * 37) % 100}%`,
  top: `${(index * 53) % 100}%`,
  delay: (index * 0.7) % 3,
}));

export function Background() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.12)_0,_rgba(15,23,42,0.9)_45%,_rgba(15,23,42,1)_100%),radial-gradient(circle_at_bottom,_rgba(129,140,248,0.12)_0,_rgba(15,23,42,0.96)_50%,_rgba(15,23,42,1)_100%)]" />

      <motion.div
        className="absolute -top-40 -left-32 h-96 w-96 rounded-full bg-cyan-500/24 blur-3xl"
        animate={{ x: [0, 40, -20, 0], y: [0, 30, 10, 0], scale: [1, 1.08, 1.02, 1] }}
        transition={blobTransition}
      />
      <motion.div
        className="absolute -bottom-40 left-1/3 h-[26rem] w-[26rem] rounded-full bg-indigo-500/22 blur-3xl"
        animate={{ x: [0, -30, 10, 0], y: [0, -40, -10, 0], scale: [1, 1.06, 1.03, 1] }}
        transition={{ ...blobTransition, duration: 30 }}
      />
      <motion.div
        className="absolute -right-40 top-10 h-[22rem] w-[22rem] rounded-full bg-fuchsia-500/18 blur-3xl"
        animate={{ x: [0, -25, 15, 0], y: [0, 25, -5, 0], scale: [1, 1.05, 1.02, 1] }}
        transition={{ ...blobTransition, duration: 32 }}
      />

      <motion.div
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage:
            'radial-gradient(circle at 0% 0%, rgba(148, 163, 184, 0.16) 0, transparent 55%), radial-gradient(circle at 100% 100%, rgba(30, 64, 175, 0.22) 0, transparent 60%)',
        }}
        animate={{ opacity: [0.6, 0.85, 0.7, 0.6] }}
        transition={{ duration: 18, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
      />

      <div className="absolute inset-0">
        {particles.map((p) => (
          <motion.span
            key={p.id}
            className="absolute h-[2px] w-[2px] rounded-full bg-cyan-300/40 shadow-[0_0_12px_rgba(34,211,238,0.7)]"
            style={{ left: p.left, top: p.top }}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{
              opacity: [0.1, 0.6, 0.2],
              scale: [0.4, 1, 0.7],
              y: ['0%', '-12%', '0%'],
            }}
            transition={{ ...particleTransition, delay: p.delay }}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0)_0,_rgba(15,23,42,0.75)_70%,_rgba(15,23,42,1)_100%)]" />
    </div>
  );
}

