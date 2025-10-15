import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-oleum-navy text-white">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-oleum-yellow rounded-lg flex items-center justify-center">
                <span className="text-oleum-black font-bold text-xl">O</span>
              </div>
              <h3 className="text-xl font-bold">Oleum Company Limited</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted partner in engineering solutions. Providing comprehensive technical services, industrial automation, and professional guidance to help you achieve your engineering goals with confidence.
            </p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">📧</span>
              </div>
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">🏢</span>
              </div>
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">💬</span>
              </div>
            </div>
          </div>
          
          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="footer-icon">
                  📞
                </div>
                <a href="tel:+255674685062" className="text-gray-300 text-sm hover:text-oleum-yellow transition-colors duration-300">
                  +255 674 685 062
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <div className="footer-icon">
                  📧
                </div>
                <a href="mailto:info@oleum.co.tz" className="text-gray-300 text-sm hover:text-oleum-yellow transition-colors duration-300">
                  info@oleum.co.tz
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <div className="footer-icon">
                  📍
                </div>
                <span className="text-gray-300 text-sm">Ubungo, Dar es Salaam, Tanzania</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="footer-icon mt-1">
                  🕒
                </div>
                <div className="text-gray-300 text-sm">
                  <div>Monday - Friday: 8:00 AM - 6:00 PM</div>
                  <div>Saturday: 9:00 AM - 3:00 PM</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Company Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold mb-4">Company</h3>
            <div className="space-y-3">
              <Link href="/about" className="block text-gray-300 text-sm hover:text-oleum-yellow transition-colors duration-300">
                About Us
              </Link>
              <Link href="/services" className="block text-gray-300 text-sm hover:text-oleum-yellow transition-colors duration-300">
                Our Services
              </Link>
              <Link href="/projects" className="block text-gray-300 text-sm hover:text-oleum-yellow transition-colors duration-300">
                Projects
              </Link>
              <Link href="/contact" className="block text-gray-300 text-sm hover:text-oleum-yellow transition-colors duration-300">
                Contact
              </Link>
              
            </div>
          </div>
          
          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold mb-4">Services</h3>
            <div className="space-y-3">
              <Link href="/services" className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-300">
                <div className="w-6 h-6 bg-oleum-yellow rounded-full flex items-center justify-center text-xs text-oleum-black">
                  📦
                </div>
                <span className="text-gray-300 text-sm hover:text-oleum-yellow transition-colors duration-300">Supplies & Materials</span>
              </Link>
              <Link href="/services" className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-300">
                <div className="w-6 h-6 bg-oleum-yellow rounded-full flex items-center justify-center text-xs text-oleum-black">
                  ⚙️
                </div>
                <span className="text-gray-300 text-sm hover:text-oleum-yellow transition-colors duration-300">Engineering & Technical Solutions</span>
              </Link>
              <Link href="/services" className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-300">
                <div className="w-6 h-6 bg-oleum-yellow rounded-full flex items-center justify-center text-xs text-oleum-black">
                  🌱
                </div>
                <span className="text-gray-300 text-sm hover:text-oleum-yellow transition-colors duration-300">Environmental & Sustainability Services</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Footer */}
      <div className="border-t border-oleum-navy-light">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-300 text-sm">
              © 2025 Oleum Company Limited. All rights reserved. Made with ❤️ for engineering excellence.
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-oleum-yellow rounded-full flex items-center justify-center text-xs text-oleum-black">
                  ✓
                </div>
                <span className="text-gray-300 text-sm">Licensed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
