import Head from 'next/head';
import Navbar from '../components/Navbar';

export default function Terms() {
	return (
		<>
			<Head>
				<title>Terms of Service - Q Play</title>
				<meta name="description" content="Q Play Terms of Service - Learn about our terms and conditions for using the Q Play platform." />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>

			<main className="min-h-screen bg-dark-bg">
				<Navbar />

				{/* Hero */}
				<section className="section-padding bg-gradient-to-br from-q-orange via-q-magenta to-q-purple">
					<div className="container-custom text-center">
						<h1 className="text-4xl md:text-6xl font-black text-white mb-4">Terms of Service</h1>
						<p className="text-xl text-white/90 max-w-3xl mx-auto">Last updated: August 2024</p>
					</div>
				</section>

				{/* Terms Content */}
				<section className="section-padding">
					<div className="container-custom max-w-4xl">
						<div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 space-y-8">
							<div>
								<h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
								<p className="text-white/80 leading-relaxed">
									By accessing and using Q Play, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
								</p>
							</div>

							<div>
								<h2 className="text-2xl font-bold text-white mb-4">2. Description of Service</h2>
								<p className="text-white/80 leading-relaxed">
									Q Play is a platform that connects fans with DJs through paid song requests. Users can request songs by paying tips, and DJs can earn income by playing requested songs.
								</p>
							</div>

							<div>
								<h2 className="text-2xl font-bold text-white mb-4">3. User Responsibilities</h2>
								<ul className="text-white/80 leading-relaxed space-y-2">
									<li>• You must be 18 years or older to use Q Play</li>
									<li>• You are responsible for maintaining the confidentiality of your account</li>
									<li>• You agree not to use the service for any unlawful purpose</li>
									<li>• You must provide accurate and complete information</li>
								</ul>
							</div>

							<div>
								<h2 className="text-2xl font-bold text-white mb-4">4. Payment Terms</h2>
								<p className="text-white/80 leading-relaxed">
									All payments for song requests are processed through secure third-party payment processors. Tips are non-refundable once a song has been played. Q Play takes a small percentage of each transaction as a service fee.
								</p>
							</div>

							<div>
								<h2 className="text-2xl font-bold text-white mb-4">5. DJ Responsibilities</h2>
								<ul className="text-white/80 leading-relaxed space-y-2">
									<li>• DJs must have proper licensing for music played</li>
									<li>• DJs are responsible for their own tax obligations</li>
									<li>• DJs must maintain appropriate behavior and content</li>
									<li>• DJs can choose which requests to accept or decline</li>
								</ul>
							</div>

							<div>
								<h2 className="text-2xl font-bold text-white mb-4">6. Intellectual Property</h2>
								<p className="text-white/80 leading-relaxed">
									Q Play and its original content, features, and functionality are owned by Q Play and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
								</p>
							</div>

							<div>
								<h2 className="text-2xl font-bold text-white mb-4">7. Privacy</h2>
								<p className="text-white/80 leading-relaxed">
									Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the service, to understand our practices.
								</p>
							</div>

							<div>
								<h2 className="text-2xl font-bold text-white mb-4">8. Termination</h2>
								<p className="text-white/80 leading-relaxed">
									We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
								</p>
							</div>

							<div>
								<h2 className="text-2xl font-bold text-white mb-4">9. Limitation of Liability</h2>
								<p className="text-white/80 leading-relaxed">
									In no event shall Q Play, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages.
								</p>
							</div>

							<div>
								<h2 className="text-2xl font-bold text-white mb-4">10. Changes to Terms</h2>
								<p className="text-white/80 leading-relaxed">
									We reserve the right to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
								</p>
							</div>

							<div>
								<h2 className="text-2xl font-bold text-white mb-4">11. Contact Information</h2>
								<p className="text-white/80 leading-relaxed">
									If you have any questions about these Terms of Service, please contact us at legal@oleum.co.tz
								</p>
							</div>
						</div>
					</div>
				</section>
			</main>
		</>
	);
} 