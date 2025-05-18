import React, { useState } from 'react';
import Link from 'next/link';


export default function Footer() {
  const [year] = useState(new Date().getFullYear());

  return (
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-lg shadow-lg mt-10">
        <div className="w-full max-w-screen-xl mx-auto p-6 md:py-8">
          {/* Top section with logo and navigation */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            {/* Logo and company name */}
            <div className="flex items-center justify-center md:justify-start">
              <div className="bg-white p-2 rounded-full">
                <img
                    src="/logo.png"
                    alt="CoolGards logo"
                    width={40}
                    height={40}
                    className="object-contain"
                />
              </div>
              <p className="ml-3 text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                CoolGards
              </p>
            </div>

            {/* Social media icons */}
            <div className="flex justify-center space-x-5">
              <Link href="https://www.instagram.com/coolgards" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" aria-label="Instagram">
                  <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                  />
                </svg>
              </Link>

              <Link href="https://x.com/coolgards" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" aria-label="X (formerly Twitter)">
                  {/* X logo (formerly Twitter) */}
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </Link>

              <Link href="https://www.youtube.com/c/coolgards" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" aria-label="YouTube">
                  <path
                      fillRule="evenodd"
                      d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                      clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>

          {/* Middle section with links */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                      href="/payment-policy"
                      className="text-gray-300 hover:text-white transition-colors flex items-center"
                  >
                    <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                      ></path>
                    </svg>
                    Payment Policy
                  </Link>
                </li>
                <li>
                  <Link
                      href="/shipment-policy"
                      className="text-gray-300 hover:text-white transition-colors flex items-center"
                  >
                    <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                      ></path>
                    </svg>
                    Shipment Policy
                  </Link>
                </li>
                <li>
                  <Link
                      href="/privacy-policy"
                      className="text-gray-300 hover:text-white transition-colors flex items-center"
                  >
                    <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                      ></path>
                    </svg>
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                      href="/refund-policy"
                      className="text-gray-300 hover:text-white transition-colors flex items-center"
                  >
                    <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                      ></path>
                    </svg>
                    Refund Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Information - UPDATED with new address */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg
                      className="w-5 h-5 mr-2 mt-0.5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    ></path>
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                  <span className="text-gray-300">
                  Skrivarevägen 46
                  <br />
                  Lund, Sweden
                  <br />
                  226 27
                </span>
                </li>
                <li className="flex items-center">
                  <svg
                      className="w-5 h-5 mr-2 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    ></path>
                  </svg>
                  <a
                      href="mailto:info@coolgards.com"
                      className="text-gray-300 hover:text-white transition-colors"
                  >
                    info@coolgards.com
                  </a>
                </li>
                <li className="flex items-center">
                  <svg
                      className="w-5 h-5 mr-2 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    ></path>
                  </svg>
                  <a
                      href="tel:+17787762417"
                      className="text-gray-300 hover:text-white transition-colors"
                  >
                    +1-778-776-2417
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter Signup */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <p className="text-gray-300 mb-4">Stay updated with our latest products and offers.</p>
              <form className="flex flex-col sm:flex-row gap-2">
                <input
                    type="email"
                    placeholder="Your email"
                    className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                <button
                    type="submit"
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Bottom section with copyright */}
          <div className="mt-8 pt-6 border-t border-gray-700">
            <div className="flex flex-col sm:flex-row justify-between items-center">
            <span className="text-sm text-gray-400 mb-4 sm:mb-0">
              © {year} <span className="font-semibold">CoolGards™</span>. All Rights Reserved.
            </span>

              {/* Payment methods */}
              <div className="flex space-x-3">
                <span className="text-sm text-gray-400 mr-2">We accept:</span>
                <div className="flex space-x-2">
                  <div className="bg-white w-8 h-5 rounded flex items-center justify-center">
                    <svg
                        viewBox="0 0 38 24"
                        xmlns="http://www.w3.org/2000/svg"
                        height="16"
                        width="25"
                    >
                      <path
                          d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                          fill="#000"
                          opacity=".07"
                      />
                      <path
                          d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
                          fill="#fff"
                      />
                      <path
                          d="M28.3 10.1H28c-.4 1-.7 1.5-1 3h1.9c-.3-1.5-.3-2.2-.6-3zm2.9 5.9h-1.7c-.1 0-.1 0-.2-.1l-.2-.9-.1-.2h-2.4c-.1 0-.2 0-.2.2l-.3.9c0 .1-.1.1-.1.1h-2.1l.2-.5L27 8.7c0-.5.3-.7.8-.7h1.5c.1 0 .2 0 .2.2l1.4 6.5c.1.4.2.7.2 1.1.1.1.1.1.1.2zm-13.4-.3l.4-1.8c.1 0 .2.1.2.1.7.3 1.4.5 2.1.4.2 0 .5-.1.7-.2.5-.2.5-.7.1-1.1-.2-.2-.5-.3-.8-.5-.4-.2-.8-.4-1.1-.7-1.2-1-.8-2.4-.1-3.1.6-.4.9-.8 1.7-.8 1.2 0 2.5 0 3.1.2h.1c-.1.6-.2 1.1-.4 1.7-.5-.2-1-.4-1.5-.4-.3 0-.6 0-.9.1-.2 0-.3.1-.4.2-.2.2-.2.5 0 .7l.5.4c.4.2.8.4 1.1.6.5.3 1 .8 1.1 1.4.2.9-.1 1.7-.9 2.3-.5.4-.7.6-1.4.6-1.4 0-2.5.1-3.4-.2-.1.2-.1.2-.2.1zm-3.5.3c.1-.7.1-.7.2-1 .5-2.2 1-4.5 1.4-6.7.1-.2.1-.3.3-.3H18c-.2 1.2-.4 2.1-.7 3.2-.3 1.5-.6 3-1 4.5 0 .2-.1.2-.3.2M5 8.2c0-.1.2-.2.3-.2h3.4c.5 0 .9.3 1 .8l.9 4.4c0 .1 0 .1.1.2 0-.1.1-.1.1-.1l2.1-5.1c-.1-.1 0-.2.1-.2h2.1c0 .1 0 .1-.1.2l-3.1 7.3c-.1.2-.1.3-.2.4-.1.1-.3 0-.5 0H9.7c-.1 0-.2 0-.2-.2L7.9 9.5c-.2-.2-.5-.5-.9-.6-.6-.3-1.7-.5-1.9-.5L5 8.2z"
                          fill="#142688"
                      />
                    </svg>
                  </div>
                  <div className="bg-white w-8 h-5 rounded flex items-center justify-center">
                    <svg
                        viewBox="0 0 38 24"
                        xmlns="http://www.w3.org/2000/svg"
                        height="16"
                        width="25"
                    >
                      <path
                          d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                          fill="#000"
                          opacity=".07"
                      />
                      <path
                          d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
                          fill="#fff"
                      />
                      <path
                          d="M21.3 9.6h-3.4c-.3 0-.5.2-.6.5l-1.8 11.4c0 .2.1.3.3.3h1.6c.2 0 .4-.2.5-.4l.5-3h.4c3.1 0 5.2-1.5 5.7-4.4.3-1.3.1-2.3-.4-3-.6-.8-1.6-1.4-3.8-1.4z"
                          fill="#003087"
                      />
                      <path
                          d="M21.8 13.1c-.3 1.8-1.6 1.8-2.9 1.8h-.7l.5-3.1c0-.2.2-.3.4-.3h.3c.9 0 1.7 0 2.1.5.3.3.3.7.3 1.1z"
                          fill="#3086C8"
                      />
                      <path
                          d="M11.9 9.6h-3.4c-.3 0-.5.2-.6.5L6.1 21.5c0 .2.1.3.3.3H8c.3 0 .5-.2.6-.5l.5-3h.4c3.1 0 5.2-1.5 5.7-4.4.3-1.3.1-2.3-.4-3-.6-.8-1.6-1.4-3.8-1.4z"
                          fill="#003087"
                      />
                      <path
                          d="M12.3 13.1c-.3 1.8-1.6 1.8-2.9 1.8h-.7l.5-3.1c0-.2.2-.3.4-.3h.3c.9 0 1.7 0 2.1.5.3.3.4.7.3 1.1z"
                          fill="#3086C8"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
  );
}
