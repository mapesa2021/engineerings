import Head from 'next/head';
import Navbar from '../components/Navbar';

export default function Privacy() {
	return (
		<>
			<Head>
				<title>Privacy Policy - Q Play</title>
				<meta name="description" content="Q Play Privacy Policy - Learn how we collect, use, and protect your personal information." />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>

			<main className="min-h-screen bg-dark-bg">
				<Navbar />

				{/* Hero */}
				<section className="section-padding bg-gradient-to-br from-q-orange via-q-magenta to-q-purple">
					<div className="container-custom text-center">
						<h1 className="text-4xl md:text-6xl font-black text-white mb-4">Privacy Policy</h1>
						<p className="text-xl text-white/90 max-w-3xl mx-auto">Last updated: August 2024</p>
					</div>
				</section>

				{/* Privacy Content */}
				<section className="section-padding">
					<div className="container-custom max-w-4xl">
						<div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 space-y-8">
							<div>
								<h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
								<p className="text-white/80 leading-relaxed mb-4">
									We collect information you provide directly to us, such as when you create an account, make a payment, or contact us for support.
								</p>
								<ul className="text-white/80 leading-relaxed space-y-2">
									<li>• Account information (name, email, phone number)</li>
									<li>• Payment information (processed securely by third parties)</li>
									<li>• Usage data and app interactions</li>
									<li>• Device information and location data</li>
								</ul>
							</div>

							<div>
								<h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
								<p className="text-white/80 leading-relaxed mb-4">
									We use the information we collect to provide, maintain, and improve our services:
								</p>
								<ul className="text-white/80 leading-relaxed space-y-2">
									<li>• Process song requests and payments</li>
									<li>• Connect fans with DJs</li>
									<li>• Provide customer support</li>
									<li>• Send important updates and notifications</li>
									<li>• Improve our platform and user experience</li>
								</ul>
							</div>

							<div>
								<h2 className="text-2xl font-bold text-white mb-4">3. Information Sharing</h2>
								<p className="text-white/80 leading-relaxed">
									We do not sell, trade, or otherwise transfer your personal information to third parties except as described in this policy. We may share information with:
								</p>
								<ul className="text-white/80 leading-relaxed space-y-2 mt-4">
									<li>• Payment processors to complete transactions</li>
									<li>• Service providers who assist in our operations</li>
									<li>• Law enforcement when required by law</li>
									<li>• Other users only with your explicit consent</li>
								</ul>
							</div>

							<div>
								<h2 className="text-2xl font-bold text-white mb-4">4. Data Security</h2>
								<p className="text-white/80 leading-relaxed">
									We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
								</p>
							</div>

							<div>
								<h2 className="text-2xl font-bold text-white mb-4">5. Data Retention</h2>
								<p className="text-white/80 leading-relaxed">
									We retain your personal information for as long as necessary to provide our services and comply with legal obligations. You may request deletion of your account and associated data at any time.
								</p>
							</div>

							<div>
								<h2 className="text-2xl font-bold text-white mb-4">6. Your Rights</h2>
								<p className="text-white/80 leading-relaxed mb-4">
									You have the right to:
								</p>
								<ul className="text-white/80 leading-relaxed space-y-2">
									<li>• Access your personal information</li>
									<li>• Correct inaccurate information</li>
									<li>• Request deletion of your data</li>
									<li>• Opt out of marketing communications</li>
									<li>• Export your data</li>
								</ul>
							</div>

							<div>
								<h2 className="text-2xl font-bold text-white mb-4">7. Cookies and Tracking</h2>
								<p className="text-white/80 leading-relaxed">
									We use cookies and similar technologies to enhance your experience, analyze usage, and provide personalized content. You can control cookie settings through your browser preferences.
								</p>
							</div>

							<div>
								<h2 className="text-2xl font-bold text-white mb-4">8. Third-Party Services</h2>
								<p className="text-white/80 leading-relaxed">
									Our app may contain links to third-party services. We are not responsible for the privacy practices of these services. Please review their privacy policies before using them.
								</p>
							</div>

							<div>
								<h2 className="text-2xl font-bold text-white mb-4">9. Children's Privacy</h2>
								<p className="text-white/80 leading-relaxed">
									Q Play is not intended for children under 18. We do not knowingly collect personal information from children under 18. If you believe we have collected such information, please contact us immediately.
								</p>
							</div>

							<div>
								<h2 className="text-2xl font-bold text-white mb-4">10. Changes to This Policy</h2>
								<p className="text-white/80 leading-relaxed">
									We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
								</p>
							</div>

							<div>
								<h2 className="text-2xl font-bold text-white mb-4">11. Contact Us</h2>
								<p className="text-white/80 leading-relaxed">
									If you have any questions about this Privacy Policy, please contact us at privacy@oleum.co.tz
								</p>
							</div>
						</div>
					</div>
				</section>
			</main>
		</>
	);
} 