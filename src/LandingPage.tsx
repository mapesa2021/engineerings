import React, { useState, useEffect } from 'react';
import Footer from './Footer';

const LandingPage: React.FC = () => {
  const [quizAnswers, setQuizAnswers] = useState({
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    q5: ''
  });
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState('');
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    phoneNumber: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [orderId, setOrderId] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false); // New state for loading animation

  const handleQuizChange = (question: string, value: string) => {
    setQuizAnswers(prev => ({
      ...prev,
      [question]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const allAnswered = Object.values(quizAnswers).every(answer => answer !== '');
    
    if (allAnswered) {
      setError('');
      setIsLoading(true); // Show loading animation
      
      // Simulate processing for 2 seconds
      setTimeout(() => {
        setIsLoading(false);
        setShowResults(true);
        // Scroll to results section
        setTimeout(() => {
          const resultsElement = document.getElementById('results-section');
          if (resultsElement) {
            resultsElement.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }, 2000);
    } else {
      setError('Please answer all questions to see your pattern.');
    }
  };

  const handlePaymentClick = () => {
    setShowPaymentPopup(true);
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setPaymentError('');
    
    try {
      // Send payment data to our backend with hardcoded test values
      const response = await fetch('http://localhost:5000/api/process-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          buyer_email: 'test@example.com', // Hardcoded test email
          buyer_name: 'Test User', // Hardcoded test name
          buyer_phone: paymentDetails.phoneNumber,
          amount: 30000 // 30,000 Tsh
        })
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        // Store order ID for status checking
        setOrderId(result.orderId);
        // Show processing message
        setPaymentError(`Processing... USSD has been sent to your phone ${paymentDetails.phoneNumber}. Please respond to the prompt to complete your payment of 30,000 Tsh.`);
        setPaymentStatus('processing');
      } else {
        setPaymentError(result.error || 'Payment failed. Please try again.');
        setIsProcessing(false);
      }
      
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentError('An error occurred while processing your payment. Please try again.');
      setIsProcessing(false);
    }
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Poll for payment status
  useEffect(() => {
    let statusCheckInterval: ReturnType<typeof setInterval>;
    
    if (orderId && paymentStatus === 'processing') {
      statusCheckInterval = setInterval(async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/payment-status/${orderId}`);
          const result = await response.json();
          
          if (result.success && result.status === 'completed') {
            // Payment completed - show success message and close popup after delay
            setPaymentError('Payment successful! Redirecting you to download your e-book...');
            clearInterval(statusCheckInterval);
            
            // Close popup and show success after delay
            setTimeout(() => {
              setIsProcessing(false);
              setShowPaymentPopup(false);
              setOrderId('');
              setPaymentStatus('');
              setPaymentDetails({ phoneNumber: '' });
              
              // Show success message to user (in a real app, you might redirect to a download page)
              alert('Payment successful! Your e-book will be sent to your email shortly.');
            }, 3000);
          }
        } catch (error) {
          console.error('Error checking payment status:', error);
        }
      }, 5000); // Check every 5 seconds
    }
    
    // Cleanup interval on component unmount or when dependencies change
    return () => {
      if (statusCheckInterval) {
        clearInterval(statusCheckInterval);
      }
    };
  }, [orderId, paymentStatus]);

  return (
    <>
      <main className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 max-w-4xl">
        {/* Section 1: You Are Not Alone (The Hook) */}
        <section className="text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
            The Cycle You Can't Seem to Break.
          </h1>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-700 max-w-3xl mx-auto">
            If you're reading this, you've likely taken a step that requires immense courage. You've decided to confront something in your life that you feel is holding you back.
          </p>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
            I want to start by saying one thing loud and clear: <strong>You are not alone.</strong>
          </p>
        </section>

        <div className="my-8 sm:my-12 border-t border-gray-200"></div>

        {/* Section 2: The Science (The "Why") */}
        <section>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 text-center">Have You Ever Wondered Why It's So Hard to "Just Stop"?</h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-700">
            It's not a failure of character or a lack of willpower. The answer lies in the powerful, predictable science of your brain. Your brain is wired with a motivation system, powered by a chemical called dopamine. It's designed to make you repeat activities essential for survival.
          </p>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-700">
            Internet pornography is a "supernormal stimulus"—it's designed to be more novel and stimulating than anything in the real world. When you watch it, your brain releases a massive flood of dopamine. Your brain logs this as incredibly important and creates a powerful loop:
          </p>
          <div className="mt-4 sm:mt-6 bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
            <p className="text-center text-base sm:text-lg text-gray-800">
              <span className="font-semibold text-gray-900">Cue</span> (feeling bored or stressed) → 
              <span className="font-semibold text-gray-900"> Craving</span> → 
              <span className="font-semibold text-gray-900"> Response</span> (watching porn) → 
              <span className="font-semibold text-gray-900"> Reward</span> (intense dopamine rush).
            </p>
          </div>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-700">
            The more you repeat this, the stronger the wiring becomes. Over time, your brain adapts and what used to work no longer does. This is why you might seek out more extreme content. You're not broken—<strong className="text-blue-600">you're caught in a biological loop.</strong>
          </p>
        </section>

        <div className="my-8 sm:my-12 border-t border-gray-200"></div>

        {/* Section 3: The Triggers (The Resonance) */}
        <section>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 text-center">It's More Than Just Brain Chemistry</h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-700 text-center max-w-3xl mx-auto">
            This habit almost always serves a purpose—it's a way to cope with other difficult feelings. It's an instant, temporary escape from the real world.
          </p>
          <h3 className="mt-4 sm:mt-6 text-lg sm:text-xl font-semibold text-gray-800 text-center">When are you most likely to turn to the screen?</h3>
          <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200 text-center">When you're feeling <strong className="text-red-600">Stressed?</strong></div>
            <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200 text-center">When you're feeling <strong className="text-yellow-600">Bored?</strong></div>
            <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200 text-center">When you're feeling <strong className="text-blue-600">Lonely?</strong></div>
            <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200 text-center">When you're feeling <strong className="text-indigo-600">Anxious?</strong></div>
          </div>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-700">
            For many, it becomes a form of self-medication. A short-term solution that creates a bigger long-term problem. Once you know what you're running from, you can start to find healthier ways to face it.
          </p>
        </section>

        <div className="my-8 sm:my-12 border-t border-gray-200"></div>

        {/* Section 4: The Quiz (The Call to Action) */}
        <section id="quiz-section" className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 text-center">The 60-Second Self-Awareness Quiz</h2>
          <p className="mt-2 sm:mt-3 text-base sm:text-lg text-gray-600 text-center">Answer these 5 questions honestly to see your pattern more clearly.</p>
          
          {/* Loading Animation */}
          {isLoading && (
            <div className="loading-container">
              <div className="loading-spinner">
                <div className="loading-spinner-ring"></div>
                <div className="loading-spinner-ring"></div>
                <div className="loading-spinner-ring"></div>
                <div className="loading-spinner-ring"></div>
              </div>
              <p className="loading-text">AI Processing Your Answers...</p>
              <p className="loading-subtext">Analyzing your responses to provide personalized insights</p>
            </div>
          )}
          
          <form id="awareness-quiz" onSubmit={handleSubmit} className={`mt-6 sm:mt-8 space-y-6 sm:space-y-8 ${isLoading ? 'hidden' : ''}`}>
            {/* Question 1 */}
            <div>
              <p className="font-semibold text-base sm:text-lg text-gray-800">1. After you engage in the habit, how do you typically feel?</p>
              <div className="mt-3 space-y-2">
                <div className="quiz-option">
                  <input 
                    type="radio" 
                    id="q1a" 
                    name="q1" 
                    value="a" 
                    checked={quizAnswers.q1 === 'a'}
                    onChange={() => handleQuizChange('q1', 'a')}
                    className="hidden"
                  />
                  <label htmlFor="q1a" className="block w-full p-3 sm:p-4 border border-gray-300 rounded-lg cursor-pointer quiz-option-label">A brief sense of relief, followed by a wave of shame or regret.</label>
                </div>
                <div className="quiz-option">
                  <input 
                    type="radio" 
                    id="q1b" 
                    name="q1" 
                    value="b" 
                    checked={quizAnswers.q1 === 'b'}
                    onChange={() => handleQuizChange('q1', 'b')}
                    className="hidden"
                  />
                  <label htmlFor="q1b" className="block w-full p-3 sm:p-4 border border-gray-300 rounded-lg cursor-pointer quiz-option-label">Mostly fine, but I worry about the time I've wasted.</label>
                </div>
                <div className="quiz-option">
                  <input 
                    type="radio" 
                    id="q1c" 
                    name="q1" 
                    value="c" 
                    checked={quizAnswers.q1 === 'c'}
                    onChange={() => handleQuizChange('q1', 'c')}
                    className="hidden"
                  />
                  <label htmlFor="q1c" className="block w-full p-3 sm:p-4 border border-gray-300 rounded-lg cursor-pointer quiz-option-label">Emotionally numb or empty.</label>
                </div>
              </div>
            </div>

            {/* Question 2 */}
            <div>
              <p className="font-semibold text-base sm:text-lg text-gray-800">2. How has the time you spend on this habit changed over the last year?</p>
              <div className="mt-3 space-y-2">
                <div className="quiz-option">
                  <input 
                    type="radio" 
                    id="q2a" 
                    name="q2" 
                    value="a" 
                    checked={quizAnswers.q2 === 'a'}
                    onChange={() => handleQuizChange('q2', 'a')}
                    className="hidden"
                  />
                  <label htmlFor="q2a" className="block w-full p-3 sm:p-4 border border-gray-300 rounded-lg cursor-pointer quiz-option-label">It has noticeably increased.</label>
                </div>
                <div className="quiz-option">
                  <input 
                    type="radio" 
                    id="q2b" 
                    name="q2" 
                    value="b" 
                    checked={quizAnswers.q2 === 'b'}
                    onChange={() => handleQuizChange('q2', 'b')}
                    className="hidden"
                  />
                  <label htmlFor="q2b" className="block w-full p-3 sm:p-4 border border-gray-300 rounded-lg cursor-pointer quiz-option-label">It has stayed about the same.</label>
                </div>
                <div className="quiz-option">
                  <input 
                    type="radio" 
                    id="q2c" 
                    name="q2" 
                    value="c" 
                    checked={quizAnswers.q2 === 'c'}
                    onChange={() => handleQuizChange('q2', 'c')}
                    className="hidden"
                  />
                  <label htmlFor="q2c" className="block w-full p-3 sm:p-4 border border-gray-300 rounded-lg cursor-pointer quiz-option-label">It varies wildly depending on my stress levels.</label>
                </div>
              </div>
            </div>

            {/* Question 3 */}
            <div>
              <p className="font-semibold text-base sm:text-lg text-gray-800">3. Have you found yourself looking at content you once considered too extreme or strange?</p>
              <div className="mt-3 space-y-2">
                <div className="quiz-option">
                  <input 
                    type="radio" 
                    id="q3a" 
                    name="q3" 
                    value="a" 
                    checked={quizAnswers.q3 === 'a'}
                    onChange={() => handleQuizChange('q3', 'a')}
                    className="hidden"
                  />
                  <label htmlFor="q3a" className="block w-full p-3 sm:p-4 border border-gray-300 rounded-lg cursor-pointer quiz-option-label">Yes, my tastes have definitely escalated over time.</label>
                </div>
                <div className="quiz-option">
                  <input 
                    type="radio" 
                    id="q3b" 
                    name="q3" 
                    value="b" 
                    checked={quizAnswers.q3 === 'b'}
                    onChange={() => handleQuizChange('q3', 'b')}
                    className="hidden"
                  />
                  <label htmlFor="q3b" className="block w-full p-3 sm:p-4 border border-gray-300 rounded-lg cursor-pointer quiz-option-label">Sometimes, out of curiosity.</label>
                </div>
                <div className="quiz-option">
                  <input 
                    type="radio" 
                    id="q3c" 
                    name="q3" 
                    value="c" 
                    checked={quizAnswers.q3 === 'c'}
                    onChange={() => handleQuizChange('q3', 'c')}
                    className="hidden"
                  />
                  <label htmlFor="q3c" className="block w-full p-3 sm:p-4 border border-gray-300 rounded-lg cursor-pointer quiz-option-label">No, I stick to the same types of content.</label>
                </div>
              </div>
            </div>
            
            {/* Question 4 */}
            <div>
              <p className="font-semibold text-base sm:text-lg text-gray-800">4. Do you use porn and masturbation as a way to cope with stress, loneliness, or boredom?</p>
              <div className="mt-3 space-y-2">
                <div className="quiz-option">
                  <input 
                    type="radio" 
                    id="q4a" 
                    name="q4" 
                    value="a" 
                    checked={quizAnswers.q4 === 'a'}
                    onChange={() => handleQuizChange('q4', 'a')}
                    className="hidden"
                  />
                  <label htmlFor="q4a" className="block w-full p-3 sm:p-4 border border-gray-300 rounded-lg cursor-pointer quiz-option-label">Yes, it's one of my main ways to deal with those feelings.</label>
                </div>
                <div className="quiz-option">
                  <input 
                    type="radio" 
                    id="q4b" 
                    name="q4" 
                    value="b" 
                    checked={quizAnswers.q4 === 'b'}
                    onChange={() => handleQuizChange('q4', 'b')}
                    className="hidden"
                  />
                  <label htmlFor="q4b" className="block w-full p-3 sm:p-4 border border-gray-300 rounded-lg cursor-pointer quiz-option-label">Sometimes, but not always.</label>
                </div>
                <div className="quiz-option">
                  <input 
                    type="radio" 
                    id="q4c" 
                    name="q4" 
                    value="c" 
                    checked={quizAnswers.q4 === 'c'}
                    onChange={() => handleQuizChange('q4', 'c')}
                    className="hidden"
                  />
                  <label htmlFor="q4c" className="block w-full p-3 sm:p-4 border border-gray-300 rounded-lg cursor-pointer quiz-option-label">No, it's completely separate from my emotional state.</label>
                </div>
              </div>
            </div>

            {/* Question 5 */}
            <div>
              <p className="font-semibold text-base sm:text-lg text-gray-800">5. If you could press a button and be free of this cycle tomorrow, would you?</p>
              <div className="mt-3 space-y-2">
                <div className="quiz-option">
                  <input 
                    type="radio" 
                    id="q5a" 
                    name="q5" 
                    value="a" 
                    checked={quizAnswers.q5 === 'a'}
                    onChange={() => handleQuizChange('q5', 'a')}
                    className="hidden"
                  />
                  <label htmlFor="q5a" className="block w-full p-3 sm:p-4 border border-gray-300 rounded-lg cursor-pointer quiz-option-label">Absolutely, in a heartbeat.</label>
                </div>
                <div className="quiz-option">
                  <input 
                    type="radio" 
                    id="q5b" 
                    name="q5" 
                    value="b" 
                    checked={quizAnswers.q5 === 'b'}
                    onChange={() => handleQuizChange('q5', 'b')}
                    className="hidden"
                  />
                  <label htmlFor="q5b" className="block w-full p-3 sm:p-4 border border-gray-300 rounded-lg cursor-pointer quiz-option-label">I'm not sure. Part of me would miss it.</label>
                </div>
                <div className="quiz-option">
                  <input 
                    type="radio" 
                    id="q5c" 
                    name="q5" 
                    value="c" 
                    checked={quizAnswers.q5 === 'c'}
                    onChange={() => handleQuizChange('q5', 'c')}
                    className="hidden"
                  />
                  <label htmlFor="q5c" className="block w-full p-3 sm:p-4 border border-gray-300 rounded-lg cursor-pointer quiz-option-label">I think about it often.</label>
                </div>
              </div>
            </div>
            
            <div className="text-center pt-4">
              <p id="quiz-error" className="text-red-500 mb-4 h-6">{error}</p>
              <button type="submit" className="cta-button">
                See My Pattern
              </button>
            </div>
          </form>
        </section>

        {/* Section 5: The Results & Offer (Hidden by default) */}
        <section id="results-section" className={`${showResults ? '' : 'hidden'} mt-8 sm:mt-16 bg-white p-4 sm:p-6 md:p-10 rounded-xl shadow-2xl border-2 border-blue-500`}>
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Your answers show you're in a common but difficult cycle.</h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-700 max-w-2xl mx-auto">
              The feelings of regret, the escalating use, the reliance on it for emotional coping... these are classic signs of the loop we talked about.
            </p>
            <p className="mt-3 sm:mt-4 text-lg sm:text-xl font-semibold text-blue-700 max-w-2xl mx-auto">
              But the most important answer you gave is that you want to change. That desire is the most powerful tool you have.
            </p>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-700 max-w-2xl mx-auto">
              Now that you see the pattern, you need a plan to break it.
            </p>
          </div>

          <div className="my-6 sm:my-10 border-t border-gray-200"></div>

          <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8">
            <div className="md:w-1/3 flex-shrink-0">
              <img src="https://placehold.co/600x800/e9ecef/334155?text=Reclaim\nYour\nFocus" alt="E-book cover" className="rounded-lg shadow-lg w-full max-w-xs mx-auto" />
            </div>
            <div className="md:w-2/3">
              <span className="text-xs sm:text-sm font-semibold text-blue-600 uppercase tracking-wider">THE NEXT STEP</span>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">Introducing: <br /><span className="text-blue-700">Reclaim Your Focus</span></h3>
              <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-700">
                This 15-page e-book is the practical, step-by-step roadmap to guide you out of the cycle. It's the plan you've been missing.
              </p>
              <ul className="mt-3 sm:mt-4 space-y-2 text-gray-700">
                <li className="flex items-start"><span className="text-blue-500 font-bold mr-2">✓</span> <span>A powerful exercise to build an unshakable motivation to quit.</span></li>
                <li className="flex items-start"><span className="text-blue-500 font-bold mr-2">✓</span> <span>A practical toolkit with strategies like "Urge Surfing" to manage cravings.</span></li>
                <li className="flex items-start"><span className="text-blue-500 font-bold mr-2">✓</span> <span>A step-by-step "Relapse Playbook" to handle setbacks without shame.</span></li>
                <li className="flex items-start"><span className="text-blue-500 font-bold mr-2">✓</span> <span>Guidance on reclaiming real intimacy and building a life of purpose.</span></li>
              </ul>
            </div>
          </div>
          <div className="mt-6 sm:mt-10 text-center">
            <button 
              onClick={handlePaymentClick}
              className="cta-button"
            >
              Get the E-book and Start Today for 30,000 Tsh
            </button>
            <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-600"><strong>30-Day Money-Back Guarantee:</strong> If this guide doesn't help you, get a full refund. No questions asked.</p>
          </div>
        </section>
      </main>
      <Footer />

      {/* Payment Popup */}
      {showPaymentPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <div className="popup-header">
              <h3 className="popup-title">Complete Your Purchase</h3>
              <button 
                onClick={() => setShowPaymentPopup(false)}
                className="popup-close"
                disabled={isProcessing && paymentStatus === 'processing'}
              >
                &times;
              </button>
            </div>
            <div className="popup-body">
              <p className="text-gray-600 mb-4 sm:mb-6">Enter your phone number to complete the payment of <strong>30,000 Tsh</strong></p>
              
              {paymentError && !isProcessing && (
                <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-4">
                  {paymentError}
                </div>
              )}
              
              {isProcessing && paymentError && (
                <div className={`p-3 rounded-lg mb-4 ${paymentStatus === 'processing' ? 'bg-blue-50 text-blue-700' : 'bg-red-50 text-red-700'}`}>
                  {paymentError}
                </div>
              )}
              
              <form onSubmit={handlePaymentSubmit}>
                <div className="form-group">
                  <label htmlFor="phoneNumber" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={paymentDetails.phoneNumber}
                    onChange={handlePaymentChange}
                    required
                    className="form-input"
                    placeholder="e.g., 0754546567"
                    disabled={isProcessing}
                  />
                </div>
                
                <div className="payment-info">
                  <p className="text-sm text-gray-700">
                    <span className="payment-amount">Amount:</span> 30,000 Tsh
                  </p>
                  <p className="text-sm text-gray-700 mt-1">
                    After submitting, you will receive a prompt on your phone to complete the mobile money payment.
                  </p>
                </div>
                
                {!isProcessing && (
                  <div className="popup-footer">
                    <button
                      type="button"
                      onClick={() => setShowPaymentPopup(false)}
                      className="btn btn-cancel"
                      disabled={isProcessing}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-pay"
                      disabled={isProcessing}
                    >
                      Pay Now
                    </button>
                  </div>
                )}
                
                {isProcessing && (
                  <div className="popup-footer">
                    <button
                      type="button"
                      onClick={() => setShowPaymentPopup(false)}
                      className="btn btn-cancel"
                      disabled={paymentStatus === 'processing'}
                    >
                      {paymentStatus === 'processing' ? 'Checking Status...' : 'Close'}
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LandingPage;