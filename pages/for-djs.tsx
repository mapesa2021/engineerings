import Head from 'next/head';
import Navbar from '../components/Navbar';

export default function ForDJs() {
	return (
		<>
			<Head>
				<title>For DJs - Q Play</title>
				<meta name="description" content="Earn more, engage fans, and grow your following with Q Play. Join thousands of DJs already making extra income." />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>

			<main className="min-h-screen bg-dark-bg">
				<Navbar />

				{/* Hero */}
				<section className="section-padding bg-gradient-to-br from-q-orange via-q-magenta to-q-purple">
					<div className="container-custom text-center">
						<h1 className="text-4xl md:text-6xl font-black text-white mb-4">Built for DJs</h1>
						<p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">Monetize song requests, keep crowds hyped, and own the night with Q Play.</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<button className="btn-app-store">Download on App Store</button>
							<button className="btn-google-play">Get it on Google Play</button>
						</div>
					</div>
				</section>

				{/* Stats */}
				<section className="section-padding">
					<div className="container-custom grid grid-cols-1 md:grid-cols-3 gap-6">
						<div className="bg-white/10 border border-white/20 rounded-2xl p-6 text-center">
							<div className="text-4xl font-black text-white">+$250</div>
							<div className="text-white/70">Avg. extra per night</div>
						</div>
						<div className="bg-white/10 border border-white/20 rounded-2xl p-6 text-center">
							<div className="text-4xl font-black text-white">2.5x</div>
							<div className="text-white/70">More fan engagement</div>
						</div>
						<div className="bg-white/10 border border-white/20 rounded-2xl p-6 text-center">
							<div className="text-4xl font-black text-white">10K+</div>
							<div className="text-white/70">Fans already on Q Play</div>
						</div>
					</div>
				</section>

				{/* Features */}
				<section className="section-padding bg-gradient-to-br from-q-orange via-q-magenta to-q-purple">
					<div className="container-custom">
						<div className="text-center mb-16">
							<h2 className="text-3xl md:text-5xl font-black text-white mb-6">Why DJs Love Q Play</h2>
							<p className="text-xl text-white/90 max-w-3xl mx-auto">Everything you need to boost your earnings and connect with fans.</p>
						</div>
						
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
							<div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center">
								<div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">💰</div>
								<h3 className="text-2xl font-bold text-white mb-4">Earn Extra Income</h3>
								<p className="text-white/80">Get paid for playing the songs your crowd wants—right when they want it. Tips range from $5 to $50+ per request.</p>
							</div>
							
							<div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center">
								<div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">🎧</div>
								<h3 className="text-2xl font-bold text-white mb-4">Live Request Queue</h3>
								<p className="text-white/80">See requests in real-time with song titles, artist names, and tip amounts. Play the highest-paying songs first.</p>
							</div>
							
							<div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center">
								<div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">👥</div>
								<h3 className="text-2xl font-bold text-white mb-4">Build Your Following</h3>
								<p className="text-white/80">Fans can follow you, see your upcoming gigs, and get notified when you're playing nearby.</p>
							</div>
							
							<div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center">
								<div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">📊</div>
								<h3 className="text-2xl font-bold text-white mb-4">Analytics Dashboard</h3>
								<p className="text-white/80">Track your earnings, most requested songs, and fan engagement metrics to optimize your sets.</p>
							</div>
							
							<div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center">
								<div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">🎵</div>
								<h3 className="text-2xl font-bold text-white mb-4">Song Library</h3>
								<p className="text-white/80">Access a vast library of songs. Fans can request anything from current hits to classic tracks.</p>
							</div>
							
							<div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center">
								<div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">💬</div>
								<h3 className="text-2xl font-bold text-white mb-4">Fan Interaction</h3>
								<p className="text-white/80">Fans can send messages with their requests and you can respond directly through the app.</p>
							</div>
						</div>
					</div>
				</section>

				{/* How It Works for DJs */}
				<section className="section-padding">
					<div className="container-custom">
						<div className="text-center mb-16">
							<h2 className="text-3xl md:text-5xl font-black text-white mb-6">How It Works for DJs</h2>
							<p className="text-xl text-white/90 max-w-3xl mx-auto">Get started in minutes and start earning from your first gig.</p>
						</div>
						
						<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
							<div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center">
								<div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">📱</div>
								<h3 className="text-2xl font-bold text-white mb-4">1. Download & Setup</h3>
								<p className="text-white/80">Download Q Play, create your DJ profile, and connect your payment method. Setup takes less than 5 minutes.</p>
							</div>
							
							<div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center">
								<div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">🎯</div>
								<h3 className="text-2xl font-bold text-white mb-4">2. Go Live</h3>
								<p className="text-white/80">Start your set and go live on Q Play. Fans at your venue can start requesting songs immediately.</p>
							</div>
							
							<div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center">
								<div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">💸</div>
								<h3 className="text-2xl font-bold text-white mb-4">3. Earn Money</h3>
								<p className="text-white/80">Play requested songs and earn tips instantly. Money is transferred to your account within 24 hours.</p>
							</div>
						</div>
					</div>
				</section>

				{/* Earnings Breakdown */}
				<section className="section-padding bg-gradient-to-br from-q-purple via-q-magenta to-q-orange">
					<div className="container-custom">
						<div className="text-center mb-16">
							<h2 className="text-3xl md:text-5xl font-black text-white mb-6">Real Earnings Examples</h2>
							<p className="text-xl text-white/90 max-w-3xl mx-auto">See how much DJs are actually making with Q Play.</p>
						</div>
						
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							<div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
								<h3 className="text-2xl font-bold text-white mb-4">Club DJ - 4 Hour Set</h3>
								<div className="space-y-4 mb-6">
									<div className="flex justify-between text-white/80">
										<span>Song Requests:</span>
										<span>24 requests</span>
									</div>
									<div className="flex justify-between text-white/80">
										<span>Average Tip:</span>
										<span>$12.50</span>
									</div>
									<div className="flex justify-between text-white/80">
										<span>Q Play Fee (15%):</span>
										<span>-$45</span>
									</div>
									<div className="border-t border-white/20 pt-2 flex justify-between text-white font-bold text-lg">
										<span>Total Earnings:</span>
										<span>$255</span>
									</div>
								</div>
								<p className="text-white/70 text-sm">*Based on actual DJ earnings data</p>
							</div>
							
							<div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
								<h3 className="text-2xl font-bold text-white mb-4">Wedding DJ - 6 Hour Event</h3>
								<div className="space-y-4 mb-6">
									<div className="flex justify-between text-white/80">
										<span>Song Requests:</span>
										<span>18 requests</span>
									</div>
									<div className="flex justify-between text-white/80">
										<span>Average Tip:</span>
										<span>$15.00</span>
									</div>
									<div className="flex justify-between text-white/80">
										<span>Q Play Fee (15%):</span>
										<span>-$40.50</span>
									</div>
									<div className="border-t border-white/20 pt-2 flex justify-between text-white font-bold text-lg">
										<span>Total Earnings:</span>
										<span>$229.50</span>
									</div>
								</div>
								<p className="text-white/70 text-sm">*Based on actual DJ earnings data</p>
							</div>
						</div>
					</div>
				</section>

				{/* Testimonials */}
				<section className="section-padding">
					<div className="container-custom">
						<div className="text-center mb-16">
							<h2 className="text-3xl md:text-5xl font-black text-white mb-6">What DJs Are Saying</h2>
							<p className="text-xl text-white/90 max-w-3xl mx-auto">Join thousands of DJs who've transformed their careers with Q Play.</p>
						</div>
						
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							<div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
								<div className="flex items-center mb-6">
									<div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-2xl mr-4">🎛️</div>
									<div>
										<div className="text-white font-bold text-lg">DJ Mike</div>
										<div className="text-white/70">Professional Club DJ</div>
									</div>
								</div>
								<p className="text-white/80 italic mb-4">
									"Q Play has completely changed my income. I'm making an extra $300-500 per night just from song requests. The crowd loves it because they get to hear their favorite songs, and I love it because I'm getting paid more to do what I already love."
								</p>
								<div className="text-white/60 text-sm">Los Angeles, CA</div>
							</div>
							
							<div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
								<div className="flex items-center mb-6">
									<div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-2xl mr-4">🎧</div>
									<div>
										<div className="text-white font-bold text-lg">Sarah Chen</div>
										<div className="text-white/70">Wedding & Event DJ</div>
									</div>
								</div>
								<p className="text-white/80 italic mb-4">
									"The engagement level at my events has skyrocketed since using Q Play. Guests are more involved, the energy is incredible, and I'm earning significantly more. It's a win-win for everyone."
								</p>
								<div className="text-white/60 text-sm">Miami, FL</div>
							</div>
						</div>
					</div>
				</section>

				{/* FAQ */}
				<section className="section-padding bg-gradient-to-br from-q-orange via-q-magenta to-q-purple">
					<div className="container-custom">
						<div className="text-center mb-16">
							<h2 className="text-3xl md:text-5xl font-black text-white mb-6">Frequently Asked Questions</h2>
							<p className="text-xl text-white/90 max-w-3xl mx-auto">Everything you need to know about getting started with Q Play.</p>
						</div>
						
						<div className="max-w-4xl mx-auto space-y-6">
							<div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
								<h3 className="text-xl font-bold text-white mb-3">How much does it cost to join Q Play?</h3>
								<p className="text-white/80">Q Play is completely free to download and use. We only take a 15% fee from song request tips, so you keep 85% of all earnings.</p>
							</div>
							
							<div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
								<h3 className="text-xl font-bold text-white mb-3">Do I need special equipment?</h3>
								<p className="text-white/80">No special equipment needed! Just download the Q Play app on your phone or tablet. You can use it alongside your existing DJ setup.</p>
							</div>
							
							<div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
								<h3 className="text-xl font-bold text-white mb-3">How do I get paid?</h3>
								<p className="text-white/80">Earnings are automatically transferred to your connected bank account or PayPal within 24 hours of each gig. You can also track all earnings in real-time through the app.</p>
							</div>
							
							<div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
								<h3 className="text-xl font-bold text-white mb-3">Can I decline song requests?</h3>
								<p className="text-white/80">Absolutely! You have full control over which songs to play. You can decline requests that don't fit your set or venue requirements.</p>
							</div>
							
							<div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
								<h3 className="text-xl font-bold text-white mb-3">What if I don't have the requested song?</h3>
								<p className="text-white/80">You can decline requests for songs you don't have. Fans will be notified and can request a different song instead.</p>
							</div>
						</div>
					</div>
				</section>

				{/* CTA */}
				<section className="section-padding bg-gradient-to-br from-q-orange via-q-magenta to-q-purple">
					<div className="container-custom text-center">
						<h2 className="text-3xl md:text-5xl font-black text-white mb-6">Ready to Start Earning More?</h2>
						<p className="text-white/90 mb-8 max-w-2xl mx-auto">Join thousands of DJs who are already making extra income with Q Play. Download now and start earning from your next gig.</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<button className="btn-app-store">Download on App Store</button>
							<button className="btn-google-play">Get it on Google Play</button>
						</div>
						<p className="text-white/70 mt-4 text-sm">Free to download • No monthly fees • Start earning immediately</p>
					</div>
				</section>
			</main>
		</>
	);
} 