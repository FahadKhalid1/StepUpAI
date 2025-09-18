import React from 'react';
import { motion } from 'framer-motion';

type AnimatedBackgroundProps = {
  showDots?: boolean;
};

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ showDots = true }) => {
  // safe fallbacks for window usage (SSR)
  const winWidth = typeof window !== 'undefined' ? window.innerWidth : 1024;
  const winHeight = typeof window !== 'undefined' ? window.innerHeight : 768;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Floating Code Elements */}
      <motion.div
        className="absolute text-indigo-100 text-xs font-mono opacity-20"
        initial={{ x: -100, y: 100 }}
        animate={{ 
          x: ['-100px', '100px', '-50px', '150px'],
          y: ['100px', '50px', '200px', '20px']
        }}
        transition={{
          duration: 2000,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{ top: '10%', left: '10%' }}
      >
        {'{ "ai": "automation" }'}
      </motion.div>

      <motion.div
        className="absolute text-purple-100 text-xs font-mono opacity-20"
        initial={{ x: 200, y: 200 }}
        animate={{ 
          x: ['200px', '-50px', '180px', '-30px'],
          y: ['200px', '150px', '50px', '180px']
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{ top: '20%', right: '15%' }}
      >
        {'const stepup = () => intelligence'}
      </motion.div>

      <motion.div
        className="absolute text-indigo-100 text-xs font-mono opacity-20"
        initial={{ x: -50, y: 300 }}
        animate={{ 
          x: ['-50px', '120px', '20px', '200px'],
          y: ['300px', '250px', '400px', '200px']
        }}
        transition={{
          duration: 3000,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{ bottom: '20%', left: '5%' }}
      >
        {'import { future } from "ai"'}
      </motion.div>

      {/* Floating Dots */}
      {showDots && [...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-30"
          initial={{ 
            x: Math.random() * winWidth,
            y: Math.random() * winHeight
          }}
          animate={{
            x: Math.random() * winWidth,
            y: Math.random() * winHeight,
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear"
          }}
        />
      ))}

      {/* Gradient Orbs */}
      <motion.div
  className="absolute w-64 h-64 bg-gradient-to-r from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl"
  initial={{ x: -200, y: -200 }}
        animate={{
          x: [-200, 300, -100, 400],
          y: [-200, 100, 200, -50]
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <motion.div
        className="absolute w-96 h-96 bg-gradient-to-r from-purple-400/5 to-indigo-400/5 rounded-full blur-3xl"
        initial={{ x: window.innerWidth + 200, y: window.innerHeight + 200 }}
        animate={{
          x: [window.innerWidth + 200, -300, window.innerWidth + 100, -200],
          y: [window.innerHeight + 200, -100, window.innerHeight - 200, 50]
        }}
        transition={{
          duration: 3050,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
};

export default AnimatedBackground;