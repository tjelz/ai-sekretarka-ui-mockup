'use client';

import { useEffect, useState } from 'react';

interface WebsiteTypewriterProps {
  phrases: string[];
}

export default function WebsiteTypewriter({ phrases }: WebsiteTypewriterProps) {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const phrase = phrases[currentPhrase];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < phrase.length) {
          setCurrentText(phrase.substring(0, currentText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (currentText.length === 0) {
          setIsDeleting(false);
          setCurrentPhrase((prev) => (prev + 1) % phrases.length);
        } else {
          setCurrentText(phrase.substring(0, currentText.length - 1));
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentPhrase, phrases]);

  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-800 relative">
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  );
}
