import React from 'react';
import { X } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-black border border-pink-500/20 p-8 rounded-lg max-w-md w-full" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">About S&M</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>
        <p className="text-gray-300">
          S&M is a revolutionary ceramics brand that blends retro aesthetics with modern design. Our pieces are crafted for those who dare to stand out.
        </p>
      </div>
    </div>
  );
};

export default AboutModal;