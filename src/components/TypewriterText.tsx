import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypewriterTextProps {
  texts: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseTime?: number;
  className?: string;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  texts,
  typeSpeed = 100,
  deleteSpeed = 50,
  pauseTime = 2000,
  className = ''
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const fullText = texts[currentTextIndex];

      if (!isDeleting) {
        // Typing
        setCurrentText(fullText.substring(0, currentText.length + 1));
        
        if (currentText === fullText) {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        // Deleting
        setCurrentText(fullText.substring(0, currentText.length - 1));
        
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }
      }
    }, isDeleting ? deleteSpeed : typeSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentTextIndex, texts, typeSpeed, deleteSpeed, pauseTime]);

  return (
    <span className={className}>
      {currentText}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="text-indigo-600"
      >
        |
      </motion.span>
    </span>
  );
};

export default TypewriterText;