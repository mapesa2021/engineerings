import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-400 py-10 mt-16">
      <div className="container mx-auto px-6 text-center">
        <p>&copy; 2025 Reclaim Your Focus. All Rights Reserved.</p>
        <p className="mt-4 text-xs max-w-2xl mx-auto">
          Disclaimer: This website and e-book provide information for self-help. They are not a substitute for professional medical or psychological advice. Always seek the advice of a qualified health provider.
        </p>
      </div>
    </footer>
  );
};

export default Footer;