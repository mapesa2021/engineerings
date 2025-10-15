import Head from 'next/head';
import Navbar from '../components/Navbar';

export default function HowItWorks() {
	return (
		<>
			<Head>
				<title>How It Works - Q Play</title>
				<meta name="description" content="How Q Play works: fans request songs, DJs play them, DJs earn tips. Simple, transparent, and built for nightlife." />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>

			<main className="min-h-screen bg-dark-bg">
				<Navbar />

				{/* Hero */}
				<section className="section-padding bg-gradient-to-br from-q-orange via-q-magenta to-q-purple">
					<div className="container-custom text-center">
						<h1 className="text-4xl md:text-6xl font-black text-white mb-4">How It Works</h1>
						<p className="text-xl text-white/90 max-w-3xl mx-auto">Q Play connects fans and DJs in real time to create unforgettable nights.</p>
					</div>
				</section>

				{/* Steps */}
				<section className="section-padding">
					<div className="container-custom grid grid-cols-1 md:grid-cols-3 gap-8">
						<div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center">
							<div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white flex items-center justify-center text-2xl">🎵</div>
							<h3 className="text-2xl font-bold text-white mb-2">1. Fans Request Songs</h3>
							<p className="text-white/80">Open Q Play, search a track, set a tip, and send the request to the DJ.</p>
						</div>
						<div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center">
							<div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white flex items-center justify-center text-2xl">🎧</div>
							<h3 className="text-2xl font-bold text-white mb-2">2. DJs Play Them</h3>
							<p className="text-white/80">Requests queue in real time. DJs play the highest tips first to hype the crowd.</p>
						</div>
						<div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center">
							<div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white flex items-center justify-center text-2xl">💰</div>
							<h3 className="text-2xl font-bold text-white mb-2">3. DJs Earn Tips</h3>
							<p className="text-white/80">DJs keep the tips, fans hear their songs, and everyone owns the night.</p>
						</div>
					</div>
				</section>

				{/* CTA */}
				<section className="section-padding bg-gradient-to-br from-q-orange via-q-magenta to-q-purple">
					<div className="container-custom text-center">
						<h2 className="text-3xl md:text-5xl font-black text-white mb-6">Ready to try Q Play?</h2>
						<p className="text-white/90 mb-8 max-w-2xl mx-auto">Download the app and bring Q Play to your next party.</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<button className="btn-app-store">Download on App Store</button>
							<button className="btn-google-play">Get it on Google Play</button>
						</div>
					</div>
				</section>
			</main>
		</>
	);
} 