import { useState, useEffect } from 'react';
import { getHeroSlides, addHeroSlide, updateHeroSlide, deleteHeroSlide } from '../lib/adminData';
import type { HeroSlide } from '../lib/adminData';

export default function TestHero() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [testResult, setTestResult] = useState<string>('');

  useEffect(() => {
    loadSlides();
  }, []);

  const loadSlides = () => {
    const currentSlides = getHeroSlides();
    setSlides(currentSlides);
    setTestResult(`Loaded ${currentSlides.length} slides`);
  };

  const testAddSlide = () => {
    const newSlide: Omit<HeroSlide, 'id'> = {
      title: 'Test Slide ' + Date.now(),
      subtitle: 'Test Subtitle',
      description: 'This is a test slide created at ' + new Date().toLocaleString(),
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop',
      buttonText: 'Test Button',
      buttonLink: '/test',
      isActive: true,
      order: slides.length + 1
    };

    const addedSlide = addHeroSlide(newSlide);
    setTestResult(`Added new slide: ${addedSlide.title}`);
    loadSlides();
  };

  const testUpdateSlide = () => {
    if (slides.length === 0) {
      setTestResult('No slides to update');
      return;
    }

    const firstSlide = slides[0];
    const updatedSlide = updateHeroSlide(firstSlide.id, {
      title: firstSlide.title + ' (UPDATED)',
      isActive: !firstSlide.isActive
    });

    if (updatedSlide) {
      setTestResult(`Updated slide: ${updatedSlide.title}`);
      loadSlides();
    } else {
      setTestResult('Failed to update slide');
    }
  };

  const testDeleteSlide = () => {
    if (slides.length === 0) {
      setTestResult('No slides to delete');
      return;
    }

    const lastSlide = slides[slides.length - 1];
    const success = deleteHeroSlide(lastSlide.id);

    if (success) {
      setTestResult(`Deleted slide: ${lastSlide.title}`);
      loadSlides();
    } else {
      setTestResult('Failed to delete slide');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Hero Slider Admin Data Test</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Controls</h2>
          <div className="flex gap-4 mb-4">
            <button
              onClick={loadSlides}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Load Slides
            </button>
            <button
              onClick={testAddSlide}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Add Test Slide
            </button>
            <button
              onClick={testUpdateSlide}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
              Update First Slide
            </button>
            <button
              onClick={testDeleteSlide}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Delete Last Slide
            </button>
          </div>
          
          <div className="bg-gray-100 p-4 rounded">
            <strong>Test Result:</strong> {testResult}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Current Slides ({slides.length})</h2>
          {slides.length === 0 ? (
            <p className="text-gray-500">No slides found</p>
          ) : (
            <div className="space-y-4">
              {slides.map((slide, index) => (
                <div key={slide.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{slide.title}</h3>
                      <p className="text-gray-600">{slide.subtitle}</p>
                      <p className="text-sm text-gray-500">{slide.description}</p>
                      <div className="flex gap-4 mt-2 text-sm">
                        <span>Button: {slide.buttonText}</span>
                        <span>Link: {slide.buttonLink}</span>
                        <span>Order: {slide.order}</span>
                        <span className={slide.isActive ? 'text-green-600' : 'text-red-600'}>
                          {slide.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-400">
                      ID: {slide.id}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Instructions:</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            <li>Click "Load Slides" to see current slides</li>
            <li>Click "Add Test Slide" to create a new slide</li>
            <li>Click "Update First Slide" to modify the first slide</li>
            <li>Click "Delete Last Slide" to remove the last slide</li>
            <li>Check the browser console for detailed logs</li>
            <li>Go to the homepage to see if changes appear in the hero slider</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
