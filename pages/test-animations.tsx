import { useState } from 'react';
import AnimatedSection from '../components/AnimatedSection';
import AnimatedCard from '../components/AnimatedCard';

export default function TestAnimations() {
  const [activeDemo, setActiveDemo] = useState<string>('scroll');

  const animationTypes = [
    'fadeIn',
    'slideUp', 
    'slideInLeft',
    'slideInRight',
    'scaleUp',
    'rotateIn',
    'bounceIn'
  ];

  const hoverEffects = [
    'lift',
    'scale',
    'rotate',
    'glow',
    'tilt'
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveDemo('scroll')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeDemo === 'scroll' 
                  ? 'bg-oleum-navy text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Scroll Animations
            </button>
            <button
              onClick={() => setActiveDemo('hover')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeDemo === 'hover' 
                  ? 'bg-oleum-navy text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Hover Effects
            </button>
            <button
              onClick={() => setActiveDemo('css')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeDemo === 'css' 
                  ? 'bg-oleum-navy text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              CSS Animations
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Animation Effects Showcase</h1>

        {/* Scroll-Triggered Animations */}
        {activeDemo === 'scroll' && (
          <div className="space-y-16">
            <h2 className="text-2xl font-semibold mb-8">Scroll-Triggered Animations</h2>
            
            {animationTypes.map((type, index) => (
              <AnimatedSection 
                key={type}
                animationType={type as any}
                delay={index * 100}
              >
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <h3 className="text-xl font-semibold mb-4 capitalize">{type} Animation</h3>
                  <p className="text-gray-600 mb-4">
                    This section demonstrates the {type} animation effect. Scroll down to see it in action!
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-oleum-yellow/20 p-4 rounded-lg">
                      <div className="text-2xl mb-2">🎯</div>
                      <div className="font-semibold">Trigger</div>
                      <div className="text-sm text-gray-600">On scroll into viewport</div>
                    </div>
                    <div className="bg-oleum-navy/20 p-4 rounded-lg">
                      <div className="text-2xl mb-2">⚡</div>
                      <div className="font-semibold">Behavior</div>
                      <div className="text-sm text-gray-600 capitalize">{type.replace(/([A-Z])/g, ' $1')}</div>
                    </div>
                    <div className="bg-green-100 p-4 rounded-lg">
                      <div className="text-2xl mb-2">⏱️</div>
                      <div className="font-semibold">Duration</div>
                      <div className="text-sm text-gray-600">1 second</div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        )}

        {/* Hover Effects */}
        {activeDemo === 'hover' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-semibold mb-8">Hover Effects</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hoverEffects.map((effect, index) => (
                <AnimatedCard
                  key={effect}
                  hoverEffect={effect as any}
                  animationType="fadeIn"
                  delay={index * 100}
                >
                  <div className="bg-white rounded-lg shadow-lg p-6 h-48 flex flex-col items-center justify-center">
                    <div className="text-4xl mb-4">🎨</div>
                    <h3 className="text-lg font-semibold mb-2 capitalize">{effect} Effect</h3>
                    <p className="text-gray-600 text-center text-sm">
                      Hover over this card to see the {effect} effect in action!
                    </p>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </div>
        )}

        {/* CSS Animations */}
        {activeDemo === 'css' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-semibold mb-8">CSS Animations</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-4xl mb-4 animate-float">🎈</div>
                <h3 className="text-lg font-semibold mb-2">Float Animation</h3>
                <p className="text-gray-600 text-sm">Continuous floating motion</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-4xl mb-4 animate-pulse-glow">✨</div>
                <h3 className="text-lg font-semibold mb-2">Pulse Glow</h3>
                <p className="text-gray-600 text-sm">Glowing pulse effect</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-4xl mb-4 animate-slide-in-left">➡️</div>
                <h3 className="text-lg font-semibold mb-2">Slide In Left</h3>
                <p className="text-gray-600 text-sm">Slides in from left</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-4xl mb-4 animate-slide-in-right">⬅️</div>
                <h3 className="text-lg font-semibold mb-2">Slide In Right</h3>
                <p className="text-gray-600 text-sm">Slides in from right</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-4xl mb-4 animate-scale-in">📏</div>
                <h3 className="text-lg font-semibold mb-2">Scale In</h3>
                <p className="text-gray-600 text-sm">Scales up from small</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-4xl mb-4 animate-rotate-in">🔄</div>
                <h3 className="text-lg font-semibold mb-2">Rotate In</h3>
                <p className="text-gray-600 text-sm">Rotates while scaling</p>
              </div>
            </div>

            {/* Staggered Animations */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-semibold mb-6">Staggered Animations</h3>
              <div className="flex gap-4 justify-center">
                {[1, 2, 3, 4, 5].map((num) => (
                  <div
                    key={num}
                    className={`w-16 h-16 bg-oleum-yellow rounded-lg flex items-center justify-center text-2xl font-bold text-oleum-black animate-scale-in stagger-${num}`}
                  >
                    {num}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
