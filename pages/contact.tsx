import Head from 'next/head';
import Navbar from '../components/Navbar';
import NewsletterForm from '../components/NewsletterForm';

import AnimatedSection from '../components/AnimatedSection';
import AnimatedCard from '../components/AnimatedCard';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function Contact() {
	return (
		<>
			<Head>
				<title>Contact Us - Oleum Company Limited | Engineering Solutions in Tanzania</title>
				<meta name="description" content="Get in touch with Oleum Company Limited for engineering solutions, consultations, and project inquiries across Tanzania." />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="min-h-screen bg-oleum-white">
				<Navbar />
				
				{/* Hero */}
				<AnimatedSection delay={0.1}>
					<section className="section-padding bg-gradient-to-br from-oleum-navy via-oleum-navy-dark to-oleum-navy">
						<div className="container-custom text-center">
							<h1 className="text-4xl md:text-6xl font-black text-white mb-6 font-display">Get In Touch</h1>
							<p className="text-xl text-white/90 max-w-3xl mx-auto font-body">Ready to discuss your engineering project? We're here to help with consultations, quotes, and technical support.</p>
						</div>
					</section>
				</AnimatedSection>

				{/* Contact */}
				<AnimatedSection delay={0.2}>
					<section className="section-padding bg-oleum-white">
						<div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-12">
							<AnimatedCard delay={0.1}>
								<div className="px-6 py-8">
									<h2 className="text-3xl font-bold text-oleum-navy mb-10 text-center">Get in Touch via WhatsApp</h2>
									<div className="max-w-md mx-auto">
										<div className="text-center mb-10">
											<div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
												<svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
													<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
												</svg>
											</div>
											<h3 className="text-xl font-bold text-oleum-navy mb-4">Chat with us on WhatsApp</h3>
											<p className="text-oleum-navy/70 mb-6 leading-relaxed">
												Get instant responses to your engineering inquiries, project quotes, and technical support questions.
											</p>
											<div className="bg-oleum-gray/50 rounded-lg p-4 mb-6">
												<p className="text-sm text-oleum-navy/70 font-medium mb-2">Available during business hours:</p>
												<p className="text-sm text-oleum-navy/60">Monday - Friday: 8:00 AM - 6:00 PM</p>
												<p className="text-sm text-oleum-navy/60">Saturday: 9:00 AM - 3:00 PM</p>
											</div>
										</div>
										<div className="text-center">
											<a 
												href="https://wa.me/255674685062?text=Hello! I'm interested in your engineering services. Can you help me with a project inquiry?"
												target="_blank"
												rel="noopener noreferrer"
												className="inline-flex items-center justify-center w-full px-6 py-4 bg-green-500 hover:bg-green-600 text-white font-bold text-lg rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
											>
												<svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
													<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
												</svg>
												Start WhatsApp Chat
											</a>
											<p className="text-xs text-oleum-navy/50 mt-4">
												Click the button above to open WhatsApp with a pre-filled message
											</p>
										</div>
									</div>
								</div>
							</AnimatedCard>
							<AnimatedCard delay={0.2}>
								<div>
									<h2 className="text-3xl font-bold text-oleum-navy mb-8">Contact Information</h2>
									<div className="space-y-6 text-oleum-navy/80">
										<div className="flex items-center space-x-4 p-4 bg-oleum-gray rounded-lg">
											<div className="w-12 h-12 bg-oleum-yellow rounded-lg flex items-center justify-center text-oleum-black">
												📧
											</div>
											<div>
												<div className="font-semibold text-oleum-navy">Email</div>
												<a 
													href="mailto:info@oleum.co.tz"
													className="text-oleum-navy hover:text-oleum-yellow transition-colors duration-300 font-medium"
												>
													info@oleum.co.tz
												</a>
											</div>
										</div>
										<div className="flex items-center space-x-4 p-4 bg-oleum-gray rounded-lg">
											<div className="w-12 h-12 bg-oleum-navy rounded-lg flex items-center justify-center text-white">
												📞
											</div>
											<div>
												<div className="font-semibold text-oleum-navy">Phone</div>
												<a 
													href="tel:+255674685062"
													className="text-oleum-navy hover:text-oleum-yellow transition-colors duration-300 font-medium"
												>
													+255 674 685 062
												</a>
											</div>
										</div>
										<div className="flex items-center space-x-4 p-4 bg-oleum-gray rounded-lg">
											<div className="w-12 h-12 bg-oleum-yellow rounded-lg flex items-center justify-center text-oleum-black">
												📍
											</div>
											<div>
												<div className="font-semibold text-oleum-navy">Address</div>
												              <div>Ubungo, Dar es Salaam, Tanzania</div>
											</div>
										</div>
										<div className="flex items-center space-x-4 p-4 bg-oleum-gray rounded-lg">
											<div className="w-12 h-12 bg-oleum-navy rounded-lg flex items-center justify-center text-white">
												🕒
											</div>
											<div>
												<div className="font-semibold text-oleum-navy">Business Hours</div>
												<div>Monday - Friday: 8:00 AM - 6:00 PM</div>
												<div>Saturday: 9:00 AM - 3:00 PM</div>
											</div>
										</div>
									</div>
								</div>
							</AnimatedCard>
						</div>
					</section>
				</AnimatedSection>

				{/* Newsletter */}
				<AnimatedSection delay={0.3}>
					<section className="section-padding bg-gradient-to-br from-oleum-navy via-oleum-navy-dark to-oleum-navy">
						<div className="container-custom text-center">
							<h2 className="text-3xl font-bold text-white mb-6">Stay Connected</h2>
							<p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">Subscribe for updates about new services, project insights, and industry news.</p>
							<div className="max-w-md mx-auto">
								<NewsletterForm />
							</div>
						</div>
					</section>
				</AnimatedSection>

				<Footer />
			</main>
		</>
	);
} 