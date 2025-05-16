import Head from 'next/head';
import Link from 'next/link';
import ImageGallery from 'react-image-gallery';
import Image from 'next/image';
import { FaCheck, FaArrowRight, FaPhone, FaEnvelope, FaShoppingCart } from 'react-icons/fa';
import { MdLocalHospital, MdSportsHandball, MdHome } from 'react-icons/md';
import Script from 'next/script';
import ContactCards from '../components/ContactCards';

export default function Home() {
  const images = [
    { original: '/1.webp', originalAlt: 'CoolGards cold compression device for knee therapy' },
    { original: '/2.webp', originalAlt: 'CoolGards therapy system for athletic recovery' },
    { original: '/3.webp', originalAlt: 'Cold compression wrap for shoulder recovery' },
    { original: '/4.webp', originalAlt: 'CoolGards ankle therapy device in use' },
    { original: '/5.webp', originalAlt: 'Patient using CoolGards for rehabilitation' },
    { original: '/6.webp', originalAlt: 'CoolGards professional medical cold therapy unit' },
    { original: '/7.webp', originalAlt: 'Cold compression therapy system for knee injury' },
  ];

  const benefits = [
    {
      title: 'Reduce Pain & Swelling',
      description: 'Clinically proven to reduce inflammation and pain following injury or surgery',
      icon: '❄️',
    },
    {
      title: 'Accelerate Recovery',
      description: 'Speed up healing time by up to 50% with consistent cold compression therapy',
      icon: '⚡',
    },
    {
      title: 'Targeted Treatment',
      description: 'Specialized wraps designed for specific body parts ensure optimal therapy',
      icon: '🎯',
    },
    {
      title: 'Easy to Use',
      description: 'Simple controls and intuitive design for professional and home use',
      icon: '👍',
    },
  ];

  const applications = [
    {
      title: 'Sports Injuries',
      description:
        'Ideal for treating injuries from athletic activities like sprains, strains, and contusions',
      icon: <MdSportsHandball size={48} className="text-blue-500 mb-4" />,
      examples: "ACL tears, tennis elbow, runner's knee",
    },
    {
      title: 'Post-Surgery Recovery',
      description: 'Physician-recommended for post-operative care to reduce swelling and pain',
      icon: <MdLocalHospital size={48} className="text-blue-500 mb-4" />,
      examples: 'Knee replacement, shoulder surgery, ankle reconstruction',
    },
    {
      title: 'Home Rehabilitation',
      description: 'Continue your professional-grade therapy in the comfort of your home',
      icon: <MdHome size={48} className="text-blue-500 mb-4" />,
      examples: 'Chronic pain management, arthritis relief, injury prevention',
    },
  ];

  const faqs = [
    {
      question: 'How long should I use the CoolGards device per session?',
      answer:
        "Most treatment protocols recommend 20-30 minute sessions, 3-5 times daily. Always follow your healthcare provider's specific instructions for your condition.",
    },
    {
      question: 'Is the CoolGards system covered by insurance?',
      answer:
        'Many insurance plans cover cold compression therapy devices with a prescription. We recommend checking with your insurance provider about coverage options.',
    },
    {
      question: 'How does CoolGards compare to ice packs?',
      answer:
        'Unlike traditional ice packs, CoolGards provides consistent temperature control and adds therapeutic compression. This combination delivers more effective treatment and eliminates the mess and inconvenience of melting ice.',
    },
    {
      question: 'Can I travel with my CoolGards system?',
      answer:
        'Yes! The CoolGards system is designed to be portable and comes with a carrying case for easy transport, allowing you to continue therapy while traveling.',
    },
  ];

  // Structured data for Product
  const productStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'CoolGards Cold Compression Therapy System',
    description:
      'Medical device for cold and compression therapy to treat injuries, reduce inflammation and accelerate recovery.',
    image: 'https://coolgards.com/1.webp',
    brand: {
      '@type': 'Brand',
      name: 'CoolGards',
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      url: 'https://coolgards.com',
      priceCurrency: 'USD',
    },
    category: 'Medical Device',
  };

  return (
    <>
      <Head>
        <title>CoolGards | Professional Cold Compression Therapy Systems</title>
        <meta
          name="description"
          content="CoolGards provides medical-grade cold compression therapy systems for injury recovery, post-operative rehabilitation, and pain management. FDA & CE approved."
        />
        <meta
          name="keywords"
          content="cold compression therapy, cold therapy, compression therapy, rehabilitation, injury recovery, post-surgery recovery, pain management, swelling reduction, sports medicine"
        />
        <meta property="og:title" content="CoolGards | Cold Compression Therapy Systems" />
        <meta
          property="og:description"
          content="Medical-grade cold compression therapy systems for injury recovery, rehabilitation, and pain management. FDA & CE approved."
        />
        <meta property="og:image" content="https://coolgards.com/cover.jpg" />
        <meta property="og:url" content="https://coolgards.com" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://coolgards.com" />
      </Head>

      <Script id="product-schema" type="application/ld+json">
        {JSON.stringify(productStructuredData)}
      </Script>

      <main className="pt-28">
        {/* Hero Section (Updated with new button link) */}
        <section className="relative w-full h-auto overflow-hidden bg-gradient-to-r from-gray-900 to-blue-900 md:aspect-[1920/1260]">
          {/* Background Image with Overlay */}
          <div
            className="absolute inset-0 bg-[url('/cover.jpg')] aspect-auto bg-cover bg-right bg-no-repeat opacity-70"
            aria-hidden="true"
          ></div>

          {/* Content Container */}
          <div className="relative container mx-auto px-4 py-20 md:py-28 lg:py-32 flex flex-col items-center md:items-start">
            {/* Logo and Title */}
            <div className="flex flex-col md:flex-row items-center mb-6 md:mb-8">
              <Image
                className="w-32 h-auto md:w-40 lg:w-48"
                src="/logo-big.png"
                alt="CoolGards cold compression therapy system logo"
                width={200}
                height={181}
                priority
              />
              <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold ml-3 tracking-wide">
                COOLGARDS
              </h1>
            </div>

            {/* Tagline with improved spacing */}
            <div className="text-white text-center md:text-left">
              <p className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
                Cold + Compression
              </p>
              <p className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-2">
                Therapy System
              </p>
              <p className="text-lg md:text-xl lg:text-2xl font-medium tracking-wider mt-2 mb-8 text-blue-200">
                ENGINEERED FOR THE COMEBACK
              </p>
            </div>

            {/* CTA Button - Updated link to /products */}
            <div className="mt-4 md:mt-6">
              <Link
                href="/products"
                className="inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-r from-blue-600 to-violet-600 shadow-lg hover:shadow-blue-700/50 border border-transparent text-white text-base md:text-lg font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white py-3 px-6 md:px-8 transition-all duration-300 hover:-translate-y-1"
                aria-label="View our products"
              >
                View Products
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Completely Redesigned Hero Details Section */}
        <section className="relative w-full py-20 md:py-28 overflow-hidden">
          {/* Polygon Background */}
          <div
            className="absolute inset-0 bg-[url('/polygon.png')] bg-cover bg-center bg-no-repeat"
            aria-hidden="true"
          ></div>

          {/* Gradient Overlay for Better Text Contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-blue-50/90"></div>

          {/* Content Container */}
          <div className="relative container mx-auto px-4">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Advanced Recovery Technology
              </h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                The CoolGards system combines precise cold therapy with targeted compression to
                accelerate healing and reduce pain after surgery or injury.
              </p>
            </div>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {/* Feature Card 1 */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-blue-600 group-hover:text-white transition-colors duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                  Rapid Pain Relief
                </h3>
                <p className="text-gray-700 mb-4">
                  Controlled cold therapy reduces nerve conduction velocity and inflammatory
                  response, providing immediate pain relief after injury or surgery.
                </p>
                <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-4"></div>
                <p className="text-blue-600 font-medium">
                  Clinically proven to reduce pain medication usage by up to 50%
                </p>
              </div>

              {/* Feature Card 2 */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-blue-600 group-hover:text-white transition-colors duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                  Targeted Compression
                </h3>
                <p className="text-gray-700 mb-4">
                  Precision-controlled compression reduces swelling by limiting fluid build-up in
                  the injured area while improving blood circulation to promote healing.
                </p>
                <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-4"></div>
                <p className="text-blue-600 font-medium">
                  Adjustable pressure settings for personalized treatment protocols
                </p>
              </div>

              {/* Feature Card 3 */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-blue-600 group-hover:text-white transition-colors duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                  Accelerated Recovery
                </h3>
                <p className="text-gray-700 mb-4">
                  The synergistic effect of cold and compression therapy significantly reduces
                  recovery time, allowing patients to return to normal activities faster.
                </p>
                <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-4"></div>
                <p className="text-blue-600 font-medium">
                  Up to 40% faster rehabilitation compared to traditional methods
                </p>
              </div>
            </div>

            {/* Bottom Description with Call to Action */}
            <div className="mt-16 md:mt-20 max-w-4xl mx-auto bg-gradient-to-r from-blue-600/10 to-violet-600/10 rounded-3xl p-8 md:p-10 backdrop-blur-sm border border-white/20">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-2/3 md:pr-8">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    Safe, Effective, and Easy to Use
                  </h3>
                  <p className="text-gray-700 mb-6">
                    The CoolGards system was developed to be a safe, effective, and affordable
                    medical device that can be deployed in almost any setting. Whether in a
                    hospital, physical therapy clinic, athletic facility, or at home, our system
                    provides professional-grade cold compression therapy with intuitive controls and
                    minimal setup time.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                      <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      FDA Approved
                    </span>
                    <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                      <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      Clinically Tested
                    </span>
                    <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                      <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      Portable Design
                    </span>
                  </div>
                </div>
                <div className="mt-8 md:mt-0 md:w-1/3 flex justify-center">
                  <Link
                    href="/news"
                    className="inline-flex justify-center items-center gap-x-2 text-center bg-white text-blue-700 hover:bg-blue-50 border border-blue-200 font-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 py-3 px-6 transition-all duration-300"
                  >
                    Learn More About Our Technology
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12">
              <div className="flex items-center">
                <div className="w-16 h-16 flex justify-center items-center bg-blue-50 rounded-full">
                  <Image
                    src="/ce.webp"
                    alt="CE certification mark"
                    width={60}
                    height={60}
                    className="object-contain"
                  />
                </div>
                <span className="ml-3 text-gray-700 font-medium">CE Certified</span>
              </div>
              <div className="flex items-center">
                <div className="w-16 h-16 flex justify-center items-center bg-blue-50 rounded-full">
                  <Image
                    src="/fda.webp"
                    alt="FDA approved mark"
                    width={60}
                    height={60}
                    className="object-contain"
                  />
                </div>
                <span className="ml-3 text-gray-700 font-medium">FDA Approved</span>
              </div>
              <div className="flex items-center">
                <div className="w-16 h-16 flex justify-center items-center bg-blue-50 rounded-full">
                  <div className="text-blue-600 text-2xl font-bold">5★</div>
                </div>
                <span className="ml-3 text-gray-700 font-medium">Trusted by Professionals</span>
              </div>
            </div>
          </div>
        </section>

        {/* Product Benefits */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Benefits of CoolGards Therapy
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="text-4xl mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Product Features Section (Enhanced) */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-center items-center flex-wrap md:m-8 md:p-8">
              <div className="m-8">
                <h2 className="text-3xl font-bold mb-6">
                  Features of the CoolGards Cold and Compression System
                </h2>
                <ul className="space-y-4">
                  <li className="flex items-start font-extralight text-lg">
                    <FaCheck className="text-blue-600 mt-1 mr-2 flex-shrink-0" />
                    <span>
                      Intermittent cold compression accelerates the healing process and reduces pain
                      and swelling
                    </span>
                  </li>
                  <li className="flex items-start font-extralight text-lg">
                    <FaCheck className="text-blue-600 mt-1 mr-2 flex-shrink-0" />
                    <span>Preset flexible treatment options to achieve the best care for you</span>
                  </li>
                  <li className="flex items-start font-extralight text-lg">
                    <FaCheck className="text-blue-600 mt-1 mr-2 flex-shrink-0" />
                    <span>Perfect for athletic training rooms, clinics, and home use</span>
                  </li>
                  <li className="flex items-start font-extralight text-lg">
                    <FaCheck className="text-blue-600 mt-1 mr-2 flex-shrink-0" />
                    <span>Gives you a quiet environment during the treatment</span>
                  </li>
                  <li className="flex items-start font-extralight text-lg">
                    <FaCheck className="text-blue-600 mt-1 mr-2 flex-shrink-0" />
                    <span>Covers the ankle, shoulder, leg, and knee with specialized wraps</span>
                  </li>
                </ul>
                <div className="flex justify-center mt-8">
                  <a
                    className="inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-blue-600 to-violet-600 shadow-lg shadow-transparent hover:shadow-blue-700/50 border border-transparent text-white text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white py-3 px-6"
                    href="/catalog.pdf"
                    aria-label="Download CoolGards product catalog"
                  >
                    Download Our Catalog
                    <FaArrowRight />
                  </a>
                </div>
              </div>

              <div className="w-[500px]">
                <ImageGallery
                  showPlayButton={false}
                  showFullscreenButton={false}
                  showBullets
                  showNav={false}
                  showThumbnails={false}
                  autoPlay
                  slideInterval={4000}
                  items={images}
                />
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section (Enhanced) */}
        <section className="bg-slate-900">
          <div className="bg-gradient-to-b from-violet-600/[.15] via-transparent">
            <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-8">
              <div className="max-w-3xl text-center mx-auto">
                <h2 className="block font-medium text-gray-200 text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                  How does it work?
                </h2>
              </div>

              <div className="max-w-3xl text-center mx-auto">
                <p className="text-lg text-gray-400">
                  Cold compression therapy works by constricting the blood vessels, which in turn
                  reduces swelling and inflammation. Calms muscle spasms, minimizes bruising and
                  soothes nerve endings, encouraging quick and effective healing for a variety of
                  muscle, tendon and ligament injuries.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-12">
                <div className="bg-slate-800 rounded-xl p-6 text-center">
                  <h3 className="text-blue-400 font-bold text-xl mb-3">1. Reduced Blood Flow</h3>
                  <p className="text-gray-300">
                    Cold therapy causes blood vessels to constrict, limiting blood flow to the
                    injured area and reducing swelling.
                  </p>
                </div>
                <div className="bg-slate-800 rounded-xl p-6 text-center">
                  <h3 className="text-blue-400 font-bold text-xl mb-3">2. Controlled Pressure</h3>
                  <p className="text-gray-300">
                    Compression provides mechanical pressure to limit fluid buildup while supporting
                    the injured area.
                  </p>
                </div>
                <div className="bg-slate-800 rounded-xl p-6 text-center">
                  <h3 className="text-blue-400 font-bold text-xl mb-3">3. Pain Reduction</h3>
                  <p className="text-gray-300">
                    Cold temperature numbs nerve endings, significantly reducing pain signals to the
                    brain.
                  </p>
                </div>
              </div>

              <div className="text-center pt-8">
                <Link
                  className="inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-blue-600 to-violet-600 shadow-lg shadow-transparent hover:shadow-blue-700/50 border border-transparent text-white text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white py-3 px-6"
                  href="/news"
                >
                  Visit our News to learn more
                  <FaArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Applications Section (New) */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Applications</h2>
            <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
              CoolGards therapy systems are versatile and can be used in various settings for
              different conditions.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {applications.map((app, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex justify-center">{app.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{app.title}</h3>
                  <p className="text-gray-600 mb-4">{app.description}</p>
                  <p className="text-sm text-blue-600 font-medium">Examples: {app.examples}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section (New) */}
        <section className="py-16 bg-gradient-to-b from-gray-100 to-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              What Our Customers Say
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow">
                <div className="text-yellow-400 flex mb-2">{'★'.repeat(5)}</div>
                <blockquote className="mb-4 text-gray-700">
                  &quot;As a physical therapist, I&apos;ve used many cold therapy systems. CoolGards
                  stands out for its consistent temperature control and ease of use. My patients
                  report faster recovery times.&quot;
                </blockquote>
                <div className="font-medium">Dr. Sarah Johnson</div>
                <div className="text-gray-500 text-sm">Physical Therapy Clinic Director</div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow">
                <div className="text-yellow-400 flex mb-2">{'★'.repeat(5)}</div>
                <blockquote className="mb-4 text-gray-700">
                  &quot;After my ACL reconstruction, the CoolGards system was a game-changer for my
                  home recovery. Much better than ice packs that constantly need replacing.&quot;
                </blockquote>
                <div className="font-medium">Michael T.</div>
                <div className="text-gray-500 text-sm">Professional Athlete</div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow">
                <div className="text-yellow-400 flex mb-2">{'★'.repeat(5)}</div>
                <blockquote className="mb-4 text-gray-700">
                  &quot;Our sports medicine department equipped all training rooms with CoolGards
                  systems. The portability and effectiveness have made them essential tools for our
                  trainers.&quot;
                </blockquote>
                <div className="font-medium">Coach Rodriguez</div>
                <div className="text-gray-500 text-sm">University Athletics Director</div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section (New) */}
        <section id="faq" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
              Find answers to common questions about CoolGards cold compression therapy systems.
            </p>

            <div className="max-w-3xl mx-auto divide-y divide-gray-200">
              {faqs.map((faq, index) => (
                <div key={index} className="py-6">
                  <h3 className="text-xl font-medium mb-3">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <p className="mb-4">Don&apos;t see your question? Contact our support team.</p>
              <Link
                href="/contact"
                className="inline-flex justify-center items-center gap-x-2 text-center bg-blue-600 hover:bg-blue-700 border border-transparent text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition py-2.5 px-6"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </section>

        {/* Certifications Section (Enhanced) */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-center items-center m-8">
              <div className="max-w-md text-center md:text-left mb-6 md:mb-0">
                <h2 className="text-2xl font-bold mb-4">Regulatory Compliance</h2>
                <p className="text-lg text-gray-800 font-extralight">
                  All CoolGards devices are fully compliant with CE and FDA regulatory approval,
                  ensuring the highest standards of safety and efficacy for medical use.
                </p>
              </div>
              <div className="flex">
                <Image
                  src="/ce.webp"
                  alt="CE certification mark indicating European conformity"
                  width={112}
                  height={80}
                  className="mx-4"
                />
                <Image
                  src="/fda.webp"
                  alt="FDA approval mark from the U.S. Food and Drug Administration"
                  width={82}
                  height={89}
                  className="mx-4"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action (New) */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-violet-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Experience the Power of Cold Compression Therapy?
            </h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Join thousands of healthcare professionals, athletes, and patients who trust CoolGards
              for their recovery needs.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/products"
                className="inline-flex items-center px-6 py-3 border border-white text-white bg-transparent hover:bg-white hover:text-blue-600 rounded-full transition duration-300"
              >
                <FaShoppingCart className="mr-2" /> Browse Products
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-white text-blue-600 hover:bg-blue-50 rounded-full transition duration-300"
              >
                <FaPhone className="mr-2" /> Request a Consultation
              </Link>
            </div>
          </div>
        </section>

        <ContactCards />
      </main>
    </>
  );
}
