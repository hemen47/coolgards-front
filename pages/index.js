import Head from 'next/head';
import styles from './home.module.scss';
import Link from 'next/link';
import ImageGallery from 'react-image-gallery';
import Image from 'next/image';
import { FaCheck, FaArrowRight, FaPhone, FaEnvelope, FaShoppingCart } from 'react-icons/fa';
import { MdLocalHospital, MdSportsHandball, MdHome } from 'react-icons/md';
import Script from 'next/script';

export default function Home() {
  const images = [
    { original: '/1.jpg', originalAlt: 'CoolGards cold compression device for knee therapy' },
    { original: '/2.jpg', originalAlt: 'CoolGards therapy system for athletic recovery' },
    { original: '/3.jpg', originalAlt: 'Cold compression wrap for shoulder recovery' },
    { original: '/4.jpg', originalAlt: 'CoolGards ankle therapy device in use' },
    { original: '/5.jpg', originalAlt: 'Patient using CoolGards for rehabilitation' },
    { original: '/6.jpg', originalAlt: 'CoolGards professional medical cold therapy unit' },
    { original: '/7.jpg', originalAlt: 'Cold compression therapy system for knee injury' },
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
    image: 'https://coolgards.com/1.jpg',
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

      <main>
        {/* Hero Section (Enhanced) */}
        <section className={styles.hero}>
          <div className={styles.heroText}>
            <div className="flex justify-center items-center">
              <Image
                className="w-[15vw] h-auto"
                src="/logo-big.png"
                alt="CoolGards cold compression therapy system logo"
                width={200}
                height={181}
                priority
              />
              <h1 className="text-logo">COOLGARDS</h1>
            </div>
            <p>Cold + Compression</p>
            <p>Therapy System</p>
            <p className={styles.heroTextSmall}>ENGINEERED FOR THE COMEBACK</p>

            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-blue-600 to-violet-600 shadow-lg shadow-transparent hover:shadow-blue-700/50 border border-transparent text-white text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white py-3 px-6"
                aria-label="Request a consultation or quote"
              >
                Request a Quote <FaArrowRight />
              </Link>
            </div>
          </div>
        </section>

        {/* Hero Details Section (Enhanced) */}
        <section className={styles.heroDetails}>
          <div className="container mx-auto">
            <p>
              The equipment is used for postoperative and post-injury rehabilitation treatment, to
              alleviate inflammatory reaction, control swelling and relieve pain by applying
              pressure and providing cold compress treatment.
              <br />
              <br />
              The goal of creating this product was to develop a safe, effective, affordable, and
              easy-to-use medical device that could be deployed in almost any setting.
            </p>
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
            <div className={styles.sliderContainer}>
              <div className={styles.details}>
                <h2 className="text-3xl font-bold mb-6">
                  Features of the CoolGards Cold and Compression System
                </h2>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <FaCheck className="text-blue-600 mt-1 mr-2 flex-shrink-0" />
                    <span>
                      Intermittent cold compression accelerates the healing process and reduces pain
                      and swelling
                    </span>
                  </li>
                  <li className="flex items-start">
                    <FaCheck className="text-blue-600 mt-1 mr-2 flex-shrink-0" />
                    <span>Preset flexible treatment options to achieve the best care for you</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheck className="text-blue-600 mt-1 mr-2 flex-shrink-0" />
                    <span>Perfect for athletic training rooms, clinics, and home use</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheck className="text-blue-600 mt-1 mr-2 flex-shrink-0" />
                    <span>Gives you a quiet environment during the treatment</span>
                  </li>
                  <li className="flex items-start">
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

              <div className={styles.slider}>
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
            <div className={`${styles.fdaSection} flex-col md:flex-row`}>
              <div className="max-w-md text-center md:text-left mb-6 md:mb-0">
                <h2 className="text-2xl font-bold mb-4">Regulatory Compliance</h2>
                <p className="text-lg">
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

        {/* Contact Information Section (New) */}
        <section className="py-12 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-between items-center">
              <div>
                <h3 className="text-xl font-bold mb-2">Have Questions?</h3>
                <p className="text-gray-600 mb-4">
                  Our team is ready to assist you with any inquiries about our products.
                </p>
                <div className="flex items-center text-gray-700 mb-2">
                  <FaPhone className="mr-2" /> +1 (888) COOL-GRD
                </div>
                <div className="flex items-center text-gray-700">
                  <FaEnvelope className="mr-2" /> info@coolgards.com
                </div>
              </div>

              <div className="mt-6 md:mt-0">
                <Link
                  href="/catalog.pdf"
                  className="inline-flex justify-center items-center gap-x-2 text-center border border-gray-300 text-gray-800 hover:bg-gray-100 font-medium rounded-md focus:outline-none transition py-2.5 px-4"
                >
                  Download Product Catalog
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
