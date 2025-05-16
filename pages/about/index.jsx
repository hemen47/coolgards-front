import * as React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export default function About() {
  // Define meta content for SEO
  const pageTitle = 'About COOLGARDS | Rehabilitation Services & Products';
  const pageDescription =
    'COOLGARD provides comprehensive rehabilitation treatment services and premium products for athletes, physiotherapists, and health-conscious individuals.';
  const canonicalUrl = 'https://coolgards.com/about';
  const ogImage = 'https://coolgards.com/images/about-cover.jpg';

  // Company location coordinates (Lund, Sweden)
  const [viewState, setViewState] = useState({
    longitude: 13.1913, // Approximate longitude for Lund, Sweden
    latitude: 55.7047, // Approximate latitude for Lund, Sweden
    zoom: 14,
  });

  // State for map loading
  const [mapLoaded, setMapLoaded] = useState(false);

  // Handle map loading
  useEffect(() => {
    // This ensures the map is only rendered on the client side
    setMapLoaded(true);
  }, []);

  // Structured data for organization
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'COOLGARDS',
    url: 'https://coolgards.com',
    logo: 'https://coolgards.com/logo.png',
    description:
      'COOLGARD provides comprehensive rehabilitation treatment services and premium products for athletes, physiotherapists, and health-conscious individuals.',
    sameAs: [
      'https://facebook.com/coolgards',
      'https://twitter.com/coolgards',
      'https://instagram.com/coolgards',
      'https://linkedin.com/company/coolgards',
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Skrivarevägen 46',
      addressLocality: 'Lund',
      addressRegion: '',
      postalCode: '226 27',
      addressCountry: 'Sweden',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-778-776-2417',
      email: 'info@coolgards.com',
      contactType: 'Customer Service',
    },
  };

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph tags for social sharing */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:site_name" content="COOLGARDS" />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={ogImage} />

        {/* Additional meta tags for better SEO */}
        <meta
          name="keywords"
          content="rehabilitation, physiotherapy, athletes, health products, COOLGARDS, Lund, Sweden"
        />
        <meta name="author" content="COOLGARDS" />

        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      {/* Hero Section */}
      <div className="relative h-64 w-full bg-gradient-to-r from-blue-600 to-blue-800 md:h-80">
        <div className="absolute inset-0 bg-opacity-60"></div>
        <div className="container mx-auto flex h-full flex-col items-center justify-center px-4 text-center text-white">
          <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">
            About <span className="text-blue-200">COOLGARDS</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg">
            Rehabilitation solutions for health professionals and athletes
          </p>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="bg-gray-100">
        <div className="container mx-auto px-4 py-2">
          <nav aria-label="Breadcrumb">
            <ol className="flex text-sm text-gray-600">
              <li className="flex items-center">
                <Link href="/" className="hover:text-blue-600">
                  Home
                </Link>
                <svg className="mx-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </li>
              <li aria-current="page" className="text-blue-600">
                About
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Company Overview Section */}
        <div className="mb-20">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div className="order-2 md:order-1">
              <div className="relative">
                <div className="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-blue-100 z-0 -md:hidden"></div>
                <Image
                  src="/team.webp"
                  alt="COOLGARDS team providing rehabilitation services"
                  width={600}
                  height={600}
                  className="relative z-10 rounded-lg shadow-xl"
                  priority
                />
                <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-blue-50 z-0 -md:hidden"></div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-800">
                Our Story
              </div>
              <h2 className="mb-6 text-3xl font-bold text-gray-800 md:text-4xl">
                Pioneering Rehabilitation Solutions
              </h2>
              <p className="mb-6 text-lg text-gray-600">
                COOLGARD was established with the aim of providing customers a comprehensive range
                of services for rehabilitation treatment, along with offering premium and affordable
                products and services. Our target audience includes professional and amateur
                athletes, as well as health professionals such as physiotherapists, and individuals
                who seek to maintain a healthy lifestyle.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <svg
                    className="h-6 w-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Premium Quality</h3>
                  <p className="text-gray-600">Products designed for optimal performance</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quality Policy Section */}
        <div className="mb-20 bg-gray-50 p-8 rounded-xl shadow-sm">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-800">
              Our Commitment
            </div>
            <h2 className="mb-6 text-3xl font-bold text-gray-800">QUALITY POLICY</h2>
            <div className="mx-auto mb-8 h-1 w-24 rounded bg-blue-600"></div>
            <p className="text-lg text-gray-700">
              Our mission is to meet the high demands of our customers through continuous product
              development. We are dedicated to achieving a leading position in the industry we
              operate in. We carefully analyze any information related to non-conformance or
              customer dissatisfaction and utilize it as valuable input for improvement purposes.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-800">
              What Drives Us
            </div>
            <h2 className="text-3xl font-bold text-gray-800">OUR VALUES</h2>
            <div className="mx-auto mt-4 h-1 w-24 rounded bg-blue-600"></div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: (
                  <svg
                    className="h-8 w-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    ></path>
                  </svg>
                ),
                title: 'Customer Focus',
                description:
                  'We prioritize understanding and meeting the unique needs of each customer.',
              },
              {
                icon: (
                  <svg
                    className="h-8 w-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    ></path>
                  </svg>
                ),
                title: 'Innovation',
                description:
                  'Continuous development of new solutions to stay ahead in the industry.',
              },
              {
                icon: (
                  <svg
                    className="h-8 w-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    ></path>
                  </svg>
                ),
                title: 'Expertise',
                description: 'Professional knowledge and experience in rehabilitation solutions.',
              },
              {
                icon: (
                  <svg
                    className="h-8 w-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    ></path>
                  </svg>
                ),
                title: 'Quality',
                description: 'Commitment to delivering high-quality products at affordable prices.',
              },
            ].map((value, index) => (
              <div
                key={index}
                className="rounded-lg bg-white p-6 shadow-md transition-transform hover:transform hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                  {value.icon}
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-800">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mb-20 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-800 py-16 px-4 text-white">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold">Our Impact</h2>
              <p className="mt-2 text-blue-100">The difference we&#39;ve made in numbers</p>
            </div>
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {[
                { number: '100+', label: 'Satisfied Clients' },
                { number: '10+', label: 'Products' },
                { number: '5+', label: 'Years Experience' },
                { number: '20+', label: 'Countries Served' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold md:text-5xl">{stat.number}</div>
                  <div className="mt-2 text-blue-100">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Information Section with Mapbox */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-800">
              Get In Touch
            </div>
            <h2 className="text-3xl font-bold text-gray-800">FIND US</h2>
            <div className="mx-auto mt-4 h-1 w-24 rounded bg-blue-600"></div>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Contact Details */}
            <div className="bg-white p-8 rounded-xl shadow-lg transform transition-transform hover:-translate-y-1">
              <h3 className="text-2xl font-bold mb-6 text-gray-800 border-b border-gray-200 pb-3">
                Contact Information
              </h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 mr-4 flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-blue-600"
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
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-gray-800 mb-1">Address</h4>
                    <address className="not-italic text-gray-600 leading-relaxed">
                      Skrivarevägen 46
                      <br />
                      226 27 Lund
                      <br />
                      Sweden
                    </address>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 mr-4 flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-blue-600"
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
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-gray-800 mb-1">Phone</h4>
                    <p className="text-gray-600">
                      <a href="tel:+17787762417" className="hover:text-blue-600 transition-colors">
                        +1-778-776-2417
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 mr-4 flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-blue-600"
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
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-gray-800 mb-1">Email</h4>
                    <p className="text-gray-600">
                      <a
                        href="mailto:info@coolgards.com"
                        className="hover:text-blue-600 transition-colors"
                      >
                        info@coolgards.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h4 className="font-semibold text-lg text-gray-800 mb-3">Connect With Us</h4>
                  <div className="flex space-x-4">
                    {['facebook', 'twitter', 'instagram', 'linkedin'].map(social => (
                      <a
                        key={social}
                        href={`https://${social}.com/coolgards`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 transition-colors hover:bg-blue-600 hover:text-white"
                        aria-label={`Follow us on ${social}`}
                      >
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          {social === 'facebook' && (
                            <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" />
                          )}
                          {social === 'twitter' && (
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                          )}
                          {social === 'instagram' && (
                            <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                          )}
                          {social === 'linkedin' && (
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          )}
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Mapbox Map */}
            <div className="h-full min-h-[500px] rounded-xl overflow-hidden shadow-lg">
              {mapLoaded && (
                <Map
                  {...viewState}
                  onMove={evt => setViewState(evt.viewState)}
                  mapStyle="mapbox://styles/mapbox/streets-v11"
                  mapboxAccessToken={process.env.NEXT_PUBLIC_MAP_BOX_ACCESS_TOKEN}
                  style={{ width: '100%', height: '100%' }}
                >
                  <Marker longitude={13.1913} latitude={55.7047} anchor="bottom">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-blue-600 rounded-full border-4 border-white shadow-lg transform-gpu pulse-animation"></div>
                      <div className="mt-2 px-3 py-1.5 bg-white rounded-lg shadow-md text-sm font-medium">
                        COOLGARDS
                      </div>
                    </div>
                  </Marker>
                </Map>
              )}
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mb-20 bg-gray-50 rounded-2xl p-10">
          <div className="text-center mb-12">
            <div className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-800">
              What People Say
            </div>
            <h2 className="text-3xl font-bold text-gray-800">TESTIMONIALS</h2>
            <div className="mx-auto mt-4 h-1 w-24 rounded bg-blue-600"></div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                quote:
                  'COOLGARDS products have significantly improved my recovery time after sports injuries. Their rehabilitation solutions are top-notch.',
                author: 'Erik Johansson',
                title: 'Professional Athlete',
              },
              {
                quote:
                  'As a physiotherapist, I recommend COOLGARDS products to all my clients. The quality and effectiveness are unmatched in the industry.',
                author: 'Maria Andersson',
                title: 'Senior Physiotherapist',
              },
              {
                quote:
                  'The customer service at COOLGARDS is exceptional. They provided personalized recommendations for my rehabilitation needs.',
                author: 'Johan Lindberg',
                title: 'Fitness Coach',
              },
            ].map((testimonial, index) => (
              <div key={index} className="rounded-xl bg-white p-6 shadow-md">
                <div className="mb-4 text-blue-600">
                  <svg
                    className="h-8 w-8"
                    fill="currentColor"
                    viewBox="0 0 32 32"
                    aria-hidden="true"
                  >
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                </div>
                <p className="mb-6 text-gray-600">{testimonial.quote}</p>
                <div className="flex items-center">
                  <div>
                    <p className="font-bold text-gray-800">{testimonial.author}</p>
                    <p className="text-sm text-gray-600">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-blue-800 p-10 text-center text-white">
          <h2 className="mb-4 text-3xl font-bold">Ready to Experience COOLGARDS?</h2>
          <p className="mb-8 text-lg text-blue-100">
            Contact us today to learn more about our rehabilitation products and services.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-lg font-medium text-blue-600 shadow-lg transition-transform hover:transform hover:-translate-y-1"
            aria-label="Contact COOLGARDS for rehabilitation services"
          >
            Get in Touch
            <svg
              className="ml-2 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </Link>
        </div>
      </div>

      {/* Custom styles for animations */}
      <style jsx global>{`
        .pulse-animation {
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.7);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(37, 99, 235, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(37, 99, 235, 0);
          }
        }
      `}</style>
    </>
  );
}

// Add getStaticProps for better SEO performance
export async function getStaticProps() {
  return {
    props: {
      // Add any props you want to pass to the component
    },
    // Re-generate at most once per day
    revalidate: 86400, // in seconds
  };
}
